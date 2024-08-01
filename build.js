const { spawn } = require('child_process');
const path = require('path');

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
    runCommand('npx', ['postcss', './src/tailwind.css', '-o', './public/css/main.min.css']);

    console.log('Running Typescript build watcher...');
    // Run TypeScript compiler in watch mode
    runCommand('npx', ['tsc']);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for two second before starting other watchers

    console.log('Compiling ESM React Modules watcher...');
    // Run the custom compile script in watch mode
    runCommand('node', ['compile.js']);
}

// Execute the main function
main();