// Bygger mappen www/ som iOS-appen (Capacitor) viser.
// Webappen i roden ændres ikke. Her kopieres den, og React hentes fra
// node_modules i stedet for internettet, så iOS-appen virker helt offline.
import { rmSync, mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';

const OUT = 'www';
rmSync(OUT, { recursive: true, force: true });
mkdirSync(`${OUT}/vendor`, { recursive: true });

for (const f of ['manifest.webmanifest', 'icon-180.png', 'icon-512.png']) copyFileSync(f, `${OUT}/${f}`);

const vendor = [
  ['https://unpkg.com/react@18.3.1/umd/react.production.min.js', 'node_modules/react/umd/react.production.min.js', 'react.production.min.js'],
  ['https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js', 'node_modules/react-dom/umd/react-dom.production.min.js', 'react-dom.production.min.js'],
  ['https://unpkg.com/htm@3.1.1/dist/htm.js', 'node_modules/htm/dist/htm.js', 'htm.js'],
];

let html = readFileSync('index.html', 'utf8');
for (const [url, src, name] of vendor) {
  if (!html.includes(`src="${url}"`)) throw new Error(`Fandt ikke ${url} i index.html`);
  copyFileSync(src, `${OUT}/vendor/${name}`);
  html = html.replace(`src="${url}"`, `src="vendor/${name}"`);
}
writeFileSync(`${OUT}/index.html`, html);
console.log('www/ er bygget (offline-klar til iOS).');
