export class BitsetIndexed {
  private words: Uint32Array;
  private firstFreeBit: number;
  size: number;
  private static instance: BitsetIndexed | null = null;

  constructor(size: number, occupied: number[]) {
    this.size = size;
    const wordCount = (size + 31) >>> 5;
    this.words = new Uint32Array(wordCount);

    for (const index of occupied) {
      if (index >= 0 && index < size) {
        this.use(index);
      }
    }

    this.firstFreeBit = this.findFirstFree();
  }

  static getInstance(
    size: number,
    occupied: MapIterator<number>
  ): BitsetIndexed {
    if (!BitsetIndexed.instance) {
      BitsetIndexed.instance = new BitsetIndexed(size, Array.from(occupied));
    }
    return BitsetIndexed.instance;
  }

  getFirstFreeBit(): number {
    return this.firstFreeBit;
  }

  use(index: number) {
    const wordIndex = index >>> 5;
    const bitPosition = index & 31;
    const beforeWord = this.words[wordIndex];
    const afterWord = beforeWord | (1 << bitPosition);

    if (beforeWord !== afterWord) {
      this.words[wordIndex] = afterWord;

      if (index === this.firstFreeBit) {
        this.firstFreeBit = this.findFirstFree();
      }
    }
  }

  free(index: number) {
    const wordIndex = index >>> 5;
    const bitPosition = index & 31;
    const beforeWord = this.words[wordIndex];
    const afterWord = beforeWord & ~(1 << bitPosition);

    if (beforeWord !== afterWord) {
      this.words[wordIndex] = afterWord;

      if (index < this.firstFreeBit) {
        this.firstFreeBit = index;
      }
    }
  }

  private findFirstFree(): number {
    for (let wordIndex = 0; wordIndex < this.words.length; wordIndex++) {
      const currentWord = this.words[wordIndex];
      if (currentWord !== 0xffffffff) {
        const invertedWord = ~currentWord >>> 0;
        const firstFreeBitMask = invertedWord & -invertedWord;
        const bitPosition = 31 - Math.clz32(firstFreeBitMask);
        const globalIndex = (wordIndex << 5) + bitPosition;

        if (globalIndex < this.size) {
          return globalIndex;
        }
      }
    }
    return -1;
  }
}
