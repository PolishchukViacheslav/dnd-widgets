module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '^react$',
    '^react-dom$',
    '^next',
    '<THIRD_PARTY_MODULES>',
    '^@/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: ['*.ts'],
      options: {
        parser: 'typescript',
        bracketSpacing: true,
      },
    },
    {
      files: ['*.tsx'],
      options: {
        parser: 'typescript',
        jsxBracketSameLine: false,
        jsxSingleQuote: true,
        bracketSpacing: true,
      },
    },
  ],
};
