const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const subdirs = fs.readdirSync(outDir, { withFileTypes: true })
  .filter(d => d.isDirectory() && d.name !== '_next')
  .map(d => d.name);

const assetsToCopy = ['_next', 'manifest.json', 'icon.svg'];

for (const dir of subdirs) {
  const destDir = path.join(outDir, dir);
  for (const asset of assetsToCopy) {
    const src = path.join(outDir, asset);
    const dest = path.join(destDir, asset);
    if (fs.existsSync(src)) {
      fs.cpSync(src, dest, { recursive: true });
    }
  }
}
