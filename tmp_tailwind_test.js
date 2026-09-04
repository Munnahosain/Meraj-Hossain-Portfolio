const fs = require('fs');
const tailwind = require('./node_modules/tailwindcss/dist/lib.js');
const css = `@import "tailwindcss" source("none");
@source "../src";
@custom-variant dark (&:is(.dark *));
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
}
`;
try {
  const result = tailwind.compile(css, { filename: 'test.css' });
  console.log('RESULT_TYPE', typeof result);
  console.log('RESULT_KEYS', Object.keys(result || {}));
  if (result && result.css) console.log('CSS_LENGTH', result.css.length);
} catch (e) {
  console.error('ERR_MESSAGE', e.message);
  console.error('ERR_LOC', e.loc ? JSON.stringify(e.loc) : null);
  console.error('ERR_LINE', e.line, 'ERR_COL', e.column);
  console.error(e.stack);
}
