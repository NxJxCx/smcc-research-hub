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
    // Remove old typescript build directory
    if (fs.existsSync(tscOutputDir)) {
        fs.rmSync(tscOutputDir, {recursive: true });
    }

    console.log('Running Tailwind build watcher...');
    // Run postcss with Tailwind CSS in watch mode
    runCommand('npx', ['postcss', './src/tailwind.css', '-o', './public/css/main.min.css']);


    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for a second

    console.log('Running Typescript build watcher...');
    // Run TypeScript compiler in watch mode
    runCommand('npx', ['tsc']);

    await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for five second before starting other watchers

    console.log('Compiling ESM React Modules watcher...');
    // Run the custom compile script in watch mode
    runCommand('node', ['compile.js']);
}

// Execute the main function
main();