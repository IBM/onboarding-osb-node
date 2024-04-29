module.exports = {
  semi: false,
  singleQuote: true,
  bracketSameLine: true,
  tabWidth: 2,
  arrowParens: 'avoid',
  quoteProps: 'consistent',
  proseWrap: 'always',
  singleAttributePerLine: true,
  overrides: [
    {
      files: './src/db/migrations/**',
      options: {
        printWidth: 80,
      },
    },
  ],
}
