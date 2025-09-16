import React, { useCallback } from 'react';

import { DndContext, type DragEndEvent, rectIntersection } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useVirtualizer } from '@tanstack/react-virtual';

import styles from './App.module.css';
import { DraggableSlot } from './components/DraggableSlot/DraggableSlot';
import { DroppableSlot } from './components/DroppableSlot/DroppableSlot';
import { WidgetBarChart } from './components/WidgetBarChart/WidgetBarChart';
import { WidgetEmpty } from './components/WidgetEmpty/WidgetEmpty';
import { WidgetLineChart } from './components/WidgetLineChart/WidgetLineChart';
import { WidgetTextBlock } from './components/WidgetTextBlock/WidgetTextBlock';
import { BitsetIndexed } from './helpers/bitset';
import { type AddableWidgetType, WidgetType } from './types/widget';

const widgets = [...Array.from({ length: 1_000 })];

const widgetsMap = {
  [WidgetType.BAR]: WidgetBarChart,
  [WidgetType.LINE]: WidgetLineChart,
  [WidgetType.TEXT]: WidgetTextBlock,
  [WidgetType.EMPTY]: WidgetEmpty,
};

const COLUMNS = 3;

function App() {
  const parentRef = React.useRef<HTMLDivElement>(null);
  const [occupiedSlots, setOccupiedSlots] = React.useState(
    new Map([
      [0, WidgetType.BAR],
      [1, WidgetType.LINE],
      [2, WidgetType.TEXT],
      [23, WidgetType.LINE],
    ])
  );
  const bitset = BitsetIndexed.getInstance(
    widgets.length,
    occupiedSlots.keys()
  );

  const totalRows = Math.ceil(widgets.length / COLUMNS);

  const virtualizer = useVirtualizer({
    count: totalRows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 10,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    const fromSlot = activeData.widgetIndex;
    const toSlot = overData.slotIndex;

    if (fromSlot === toSlot) return;

    setOccupiedSlots((prev) => {
      const newSlots = new Map(prev);
      const widgetType = newSlots.get(fromSlot);

      if (widgetType) {
        bitset.free(fromSlot);
        bitset.use(toSlot);
        newSlots.delete(fromSlot);
        newSlots.set(toSlot, widgetType);
      }

      return newSlots;
    });
  };

  const handleAddWidget = (event: React.MouseEvent<HTMLButtonElement>) => {
    const widgetType = event.currentTarget.name as AddableWidgetType;
    setOccupiedSlots((prev) => {
      const newSlots = new Map(prev);
      if (bitset.getFirstFreeBit() !== -1) {
        const firstFreeIndex = bitset.getFirstFreeBit();
        bitset.use(firstFreeIndex);
        newSlots.set(firstFreeIndex, widgetType);
      }
      return newSlots;
    });
  };

  const handleDeleteWidget = useCallback(
    (id: number) => {
      setOccupiedSlots((prev) => {
        const newSlots = new Map(prev);
        newSlots.delete(id);
        return newSlots;
      });
      bitset.free(id);
    },
    [bitset]
  );

  return (
    <>
      <div className={styles.actions}>
        <button
          className={styles.action}
          name={WidgetType.TEXT}
          onClick={handleAddWidget}
        >
          Add Text Block
        </button>
        <button
          className={styles.action}
          name={WidgetType.LINE}
          onClick={handleAddWidget}
        >
          Add Line Chart
        </button>
        <button
          className={styles.action}
          name={WidgetType.BAR}
          onClick={handleAddWidget}
        >
          Add Bar Chart
        </button>
      </div>
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
        collisionDetection={rectIntersection}
      >
        <div ref={parentRef} className={styles.container}>
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
            }}
            className={styles.scrollBox}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const rowIndex = virtualRow.index;
              const startIndex = rowIndex * COLUMNS;

              return (
                <div
                  key={virtualRow.key}
                  style={
                    {
                      ['--height']: `${virtualRow.size}px`,
                      ['--transform']: `${virtualRow.start}px`,
                    } as React.CSSProperties
                  }
                  className={styles.rowWrapper}
                >
                  {Array.from({ length: COLUMNS }, (_, colIndex) => {
                    const widgetIndex = startIndex + colIndex;
                    if (widgetIndex >= widgets.length) return null;

                    const widgetType =
                      occupiedSlots.get(widgetIndex) ?? WidgetType.EMPTY;
                    const WidgetRender = widgetsMap[widgetType];

                    if (widgetType === WidgetType.EMPTY) {
                      return (
                        <DroppableSlot
                          key={widgetIndex}
                          slotIndex={widgetIndex}
                        >
                          <WidgetRender />
                        </DroppableSlot>
                      );
                    }

                    return (
                      <DraggableSlot
                        widgetIndex={widgetIndex}
                        widgetType={widgetType}
                        key={widgetIndex}
                      >
                        <WidgetRender
                          id={widgetIndex}
                          onDelete={handleDeleteWidget}
                        />
                      </DraggableSlot>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default App;
