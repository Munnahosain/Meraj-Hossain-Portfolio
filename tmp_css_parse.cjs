const fs = require('fs');
const postcss = require('postcss');
const css = fs.readFileSync('src/styles.css', 'utf8');
try {
  const root = postcss.parse(css, { from: 'src/styles.css' });
  console.log('postcss parse ok');
  console.log('nodes', root.nodes.length);
} catch (e) {
  console.error('postcss error', e.message);
  if (e.name) console.error('name', e.name);
  if (e.line) console.error('line', e.line, 'col', e.column);
  console.error(e.stack);
}
