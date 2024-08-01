const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const tscOutputDir = 'jsxbuild';

// Helper function to run a command and log its output
function runCommand(command, args = [], options = {}) {
    return spawn(command, args, {
        stdio: 'inherit',
        shell: true,
        ...options
    });
}

// Main function to execute all commands
async function main() {
    console.log('Running Tailwind build watcher...');
    // Run postcss with Tailwind CSS in watch mode
    runCommand('npx', ['postcss', './src/tailwind.css', '-o', './public/css/main.min.css', '--watch']);

    // Remove old typescript build directory
    if (fs.existsSync(tscOutputDir)) {
        fs.rmSync(tscOutputDir, {recursive: true });
    }

    console.log('Running Typescript build watcher...');
    // Run TypeScript compiler in watch mode
    runCommand('npx', ['tsc', '--watch']);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for two second before starting other watchers

    console.log('Compiling ESM React Modules watcher...');
    // Run the custom compile script in watch mode
    runCommand('node', ['compile.js', '--watch']);

    console.log('Web: https://localhost:8000');
    // Start the PHP server
    runCommand('php', ['-S', '0.0.0.0:8000', 'index.php']);
}

// Execute the main function
main();