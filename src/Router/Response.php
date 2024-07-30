<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Router;

class Response {
  public static function json(array $data, ?int $statusCode = 200, ?array $headers = []): void {
    header('Content-Type: application/json');
    foreach ($headers as $key => $value) {
      header($key. ': '. $value);
    }
    http_response_code($statusCode);
    echo json_encode($data);
    exit;
  }

  public static function redirect($url) {
    header('Location: ' . $url);
    exit;
  }

  public static function send(string $content, ?int $statusCode = 200, ?array $headers = []): void {
    header('Content-Type: text/plain');
    foreach ($headers as $key => $value) {
      header($key. ': '. $value);
    }
    http_response_code($statusCode);
    echo $content;
    exit;
  }

  public static function sendFile(string $filePath, ?int $statusCode = 200, ?array $headers = []): void {
    header('Content-Type: application/octet-stream');
    foreach ($headers as $key => $value) {
      header($key. ': '. $value);
    }
    http_response_code($statusCode);
    readfile($filePath);
    exit;
  }

  public static function sendBlob(string $content, ?int $statusCode = 200, ?array $headers = []): void {
    header('Content-Type: application/octet-stream');
    foreach ($headers as $key => $value) {
      header($key. ': '. $value);
    }
    http_response_code($statusCode);
    echo $content;
    exit;
  }
}