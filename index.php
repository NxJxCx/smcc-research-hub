<?php

declare(strict_types=1);

// Set error reporting level
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

define('APP_PATH', realpath(__DIR__ . '/.'));

require_once implode(DIRECTORY_SEPARATOR, [APP_PATH, 'vendor', 'autoload.php']);
require_once implode(DIRECTORY_SEPARATOR, [APP_PATH, 'config', 'bootstrap.php']);
