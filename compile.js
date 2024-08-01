const fs = require('fs');
const path = require('path');
const Terser = require('terser');
const chokidar = require('chokidar');

// Directories
const inputDir = 'jsxbundle';
const outputDir = 'public/jsx';

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Function to minify a file
async function minifyFile(filePath) {
  const fileName = path.basename(filePath);
  const outputFile = path.join(outputDir, fileName.replace(/\.js$/, '.min.js'));
  try {
    const code = fs.readFileSync(filePath, 'utf8');
    const result = await Terser.minify(code, { module: true });
    fs.writeFileSync(outputFile, result.code);
    console.log(`Minified ${filePath} to ${outputFile}`);
  } catch (err) {
    console.error(`Error minifying ${filePath}:`, err);
  }
}

// Check if `--watch` argument is present
const watchMode = process.argv.includes('--watch');

// Watch for changes in the input directory
if (watchMode) {
  chokidar.watch(path.join(inputDir, '**/*.js')).on('change', filePath => {
    console.log(`File changed: ${filePath}`);
    minifyFile(filePath);
  });
}

// Minify existing files initially
fs.readdirSync(inputDir).forEach(file => {
  if (path.extname(file) === '.js') {
    minifyFile(path.join(inputDir, file));
  }
});

console.log(watchMode ? 'Watching for file changes...' : 'Minification complete.');
