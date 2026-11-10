const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find the boundaries of showcase section
const showcaseStartComment = '  <!-- =========================================================================\r\n       04 // AUDIENCE SHOWCASE';
const showcaseStartAlt = '  <!-- =========================================================================\n       04 // AUDIENCE SHOWCASE';

let showcaseStartIndex = html.indexOf('<!-- =========================================================================\r\n       04 // AUDIENCE SHOWCASE');
let isCRLF = true;
if (showcaseStartIndex === -1) {
  showcaseStartIndex = html.indexOf('<!-- =========================================================================\n       04 // AUDIENCE SHOWCASE');
  isCRLF = false;
}

const newline = isCRLF ? '\r\n' : '\n';

// Find end of showcase section: '</section>' right before '<!-- =========================================================================' (05 // FOOTER)
const footerComment = `<!-- =========================================================================${newline}       05 // FOOTER DIRECTORY`;
const footerIndex = html.indexOf(footerComment);

if (showcaseStartIndex === -1 || footerIndex === -1) {
  console.error("Could not find showcase or footer index", { showcaseStartIndex, footerIndex });
  process.exit(1);
}

// Slice out the showcase block
const showcaseBlock = html.substring(showcaseStartIndex, footerIndex).trim();

// Remove showcase block from its current location
const withoutShowcase = html.substring(0, showcaseStartIndex) + html.substring(footerIndex);

// Find where philosophy starts:
const philosophyComment = `<!-- =========================================================================${newline}       02 // EXACT LAYR MEDIA SECOND SECTION: WHO WE ARE // THE LAYERS PHILOSOPHY`;
const philosophyIndex = withoutShowcase.indexOf(philosophyComment);

if (philosophyIndex === -1) {
  console.error("Could not find philosophy comment in withoutShowcase");
  process.exit(1);
}

// Update section comments/numbering:
// Showcase becomes 03 // AUDIENCE SHOWCASE
const updatedShowcaseBlock = showcaseBlock.replace('04 // AUDIENCE SHOWCASE', '03 // AUDIENCE SHOWCASE');

// Insert showcase right before philosophy
const finalHtml = withoutShowcase.substring(0, philosophyIndex) +
  updatedShowcaseBlock + newline + newline + '  ' +
  withoutShowcase.substring(philosophyIndex);

fs.writeFileSync('index.html', finalHtml, 'utf8');
console.log('Successfully reordered sections in index.html! Showcase is now 3rd section.');
