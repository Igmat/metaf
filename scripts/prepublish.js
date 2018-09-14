const path = require('path');
const fs = require('fs');

const metafReadme = path.resolve(__dirname, '../packages/metaf/README.md');
const rootReadme = path.resolve(__dirname, './../README.md');
fs.writeFileSync(rootReadme, fs.readFileSync(metafReadme));
