<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Config;

class Logger
{
  static public function write_error(string $message)
  {
    $txt = "[USER ERROR] $message\n";
    error_log($txt, 3, "php://stderr");
  }
  static public function write_warning(string $message)
  {
    $txt = "[USER WARNING] $message\n";
    error_log($txt);
  }
  static public function write_info(string $message)
  {
    $txt = "[USER INFO] $message\n";
    error_log($txt);
  }
  static public function write_debug(string $message)
  {
    $txt = "[USER DEBUG] $message\n";
    error_log($txt);
  }
}
