const fs = require('fs');
const tailwind = require('./node_modules/tailwindcss/dist/lib.js');

function test(css) {
  console.log('--- TEST START ---');
  try {
    const result = tailwind.compile(css, { filename: 'test.css' });
    console.log('OK', typeof result, Object.keys(result || {}));
    console.log('css len', result.css ? result.css.length : 'no css');
  } catch (e) {
    console.error('ERR', e.message);
    console.error('line', e.line, 'col', e.column, 'loc', e.loc);
  }
}

const cases = {
  minimal: '@import "tailwindcss" source("none");\n@theme inline { --foo: red; }\n',
  full: fs.readFileSync('src/styles.css', 'utf8'),
};

for (const [name, css] of Object.entries(cases)) {
  console.log('CASE', name);
  test(css);
}
