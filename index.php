<?php

declare(strict_types=1);

// Set error reporting level
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

define('APP_PATH', realpath(__DIR__ . '/.'));


// Define the path to the .env file
$envFile = implode(DIRECTORY_SEPARATOR, [APP_PATH, '.env']);

// Check if the .env file exists
if (file_exists($envFile)) {
  // Read the file content
  $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
  foreach ($lines as $line) {
    // Remove comments (lines starting with #)
    $line = trim($line);
    if ($line[0] === '#' || empty($line)) {
      continue;
    }
    // Split the line into key and value
    list($key, $value) = explode('=', $line, 2) + [NULL, NULL];
    if ($key !== NULL) {
      // Trim whitespace around the key and value
      $key = trim($key);
      $value = trim($value);
      // Add to $_ENV array
      $_ENV[$key] = $value;
    }
  }
}
require_once implode(DIRECTORY_SEPARATOR, [APP_PATH, 'vendor', 'autoload.php']);
require_once implode(DIRECTORY_SEPARATOR, [APP_PATH, 'config', 'bootstrap.php']);
