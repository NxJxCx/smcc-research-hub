<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Logger;

class Logger
{
  static public function write_error(string $message)
  {
    $txt = "[USER ERROR] $message";
    error_log($txt, 3, "php://stderr");
    error_log($txt . PHP_EOL, 3, implode(DIRECTORY_SEPARATOR, [APP_PATH, "uploads", "mylogs.log"]));
  }
  static public function write_warning(string $message)
  {
    $txt = "[USER WARNING] $message";
    error_log($txt);
    error_log($txt . PHP_EOL, 3, implode(DIRECTORY_SEPARATOR, [APP_PATH, "uploads", "mylogs.log"]));
  }
  static public function write_info(string $message)
  {
    $txt = "[USER INFO] $message";
    error_log($txt);
    error_log($txt . PHP_EOL, 3, implode(DIRECTORY_SEPARATOR, [APP_PATH, "uploads", "mylogs.log"]));
  }
  static public function write_debug(string $message)
  {
    if ($_ENV['PHP_ENV'] !== 'production') {
      $txt = "[USER DEBUG] $message";
      error_log($txt);
      error_log($txt . PHP_EOL, 3, implode(DIRECTORY_SEPARATOR, [APP_PATH, "uploads", "mylogs.log"]));
    }
  }
}