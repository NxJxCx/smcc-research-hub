<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Logger;

class Logger
{
  static public function write_error(string $message)
  {
    $txt = "[USER ERROR] $message";
    error_log($txt, 3, "php://stderr");
    error_log($txt . PHP_EOL, 3, LOGGER_FILE_PATH);
  }
  static public function write_warning(string $message)
  {
    $txt = "[USER WARNING] $message";
    error_log($txt);
    error_log($txt . PHP_EOL, 3, LOGGER_FILE_PATH);
  }
  static public function write_info(string $message)
  {
    $txt = "[USER INFO] $message";
    error_log($txt);
    error_log($txt . PHP_EOL, 3, LOGGER_FILE_PATH);
  }
  static public function write_debug(string $message)
  {
    if (PHP_ENV === 'development') {
      $txt = "[USER DEBUG] $message";
      error_log($txt);
      error_log($txt . PHP_EOL, 3,LOGGER_FILE_PATH);
    }
  }

  static public function read_log_file() {
    if (file_exists(LOGGER_FILE_PATH)) {
      return file_get_contents(LOGGER_FILE_PATH);
    }
  }
}