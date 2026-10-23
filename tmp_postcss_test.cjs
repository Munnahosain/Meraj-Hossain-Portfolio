const postcss = require('postcss');
const css = `body {
  background-image: url("data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Crect width='160' height='160' fill='%23040a07'/%3E%3Cg opacity='0.035' stroke='%2319c282' stroke-width='1'%3E%3Cpath d='M0 20 L160 20'/%3E%3Cpath d='M0 60 L160 60'/%3E%3Cpath d='M0 100 L160 100'/%3E%3Cpath d='M0 140 L160 140'/%3E%3C/g%3E%3C/svg%3E", radial-gradient(1200px 800px at 10% 10%, rgba(25,194,130,0.02), transparent 6%), linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.28));
}`;
try {
  const root = postcss.parse(css, { from: 'tmp' });
  console.log('ok');
  console.log(root.toString());
} catch (e) {
  console.error('error', e.message);
  console.error('line', e.line, 'col', e.column);
}
