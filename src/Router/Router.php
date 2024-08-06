<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Router;

use Exception;
use Smcc\ResearchHub\Logger\Logger;



class Router
{
  private string $uri;
  private array $query;
  private array $body;
  private array $files;

  static $Router__routes = [
    'STATIC' => [],
    'GET' => [],
    'POST' => [],
    'PUT' => [],
    'PATCH' => [],
    'DELETE' => [],
    'NOTFOUND' => [],
    'ERROR' => [],
  ];

  public function __construct()
  {
    $this->uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $this->query = json_decode(json_encode($_GET), true);

    $contentType = $_SERVER['CONTENT_TYPE'] ?? 'Not Set';

    if (str_starts_with($contentType, 'application/json')) {
      $rawData = file_get_contents('php://input');
      $this->body = json_decode($rawData, true);
    } else {
      $this->body = $_SERVER['REQUEST_METHOD'] !== 'GET' ? json_decode(json_encode($_POST), true) : [];
    }
    $this->files = $_SERVER['REQUEST_METHOD'] === 'POST' ? json_decode(json_encode($_FILES), true) : [];
  }

  public function run(): void
  {
    try {
      // check public files
      $this->publicAssets();
      // check static files
      $paths = array_keys(Router::$Router__routes['STATIC']);
      $matchingPaths = array_filter($paths, function ($path) {
        return str_starts_with($this->uri, $path);
      });
      if ($matchingPath = reset($matchingPaths)) {
        // static folder found
        $this->staticPage(Router::$Router__routes['STATIC'][$matchingPath][0], strlen($matchingPath), Router::$Router__routes['STATIC'][$matchingPath][1]);
      }
      // Request Method: GET, POST, PUT, PATCH, DELETE
      if (
        in_array($_SERVER['REQUEST_METHOD'], ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
        && isset(Router::$Router__routes[$_SERVER['REQUEST_METHOD']][$this->uri])
      ) {
        $route = Router::$Router__routes[$_SERVER['REQUEST_METHOD']][$this->uri];
        if (is_array($route) && count($route) === 2) {
          $class = $route[0];
          $method = $route[1];
          // Create an instance of the class
          $instance = new $class();
          if (method_exists($class, $method)) {
            call_user_func([$instance, $method], $this->uri, $this->query, $this->body, $this->files);
            exit;
          }
        } else {
          throw new Exception('Invalid route configuration for route: ' . $this->uri);
        }
      }
      // 404 Not Found
      header('HTTP/1.1 404 Not Found');
      if (!empty(Router::$Router__routes['NOT_FOUND_PAGE'])) {
        // 404 Not Found page exists
        $class = Router::$Router__routes['NOT_FOUND_PAGE'][0];
        $method = Router::$Router__routes['NOT_FOUND_PAGE'][1];
        // Create an instance of the class
        $instance = new $class();
        if (method_exists($class, $method)) {
          call_user_func([$instance, $method]);
          exit;
        }
      }
      // default not found page
      echo 'Error 404 Not Found';
      exit;
    } catch (\Throwable $e) {
      // 500 Error
      header('HTTP/1.1 500 Internal Server Error');
      Logger::write_error("Internal Server Error - " . $e->getMessage() . "\n" . $e->getTraceAsString());
      if (!empty(Router::$Router__routes['ERROR_PAGE'])) {
        $class = Router::$Router__routes['ERROR_PAGE'][0];
        $method = Router::$Router__routes['ERROR_PAGE'][1];
        // Create an instance of the class
        $instance = new $class();
        if (method_exists($class, $method)) {
          call_user_func([$instance, $method], "Internal Server Error - " . str_replace("\n", "<br />", $e->getMessage() . "\n" . $e->getTraceAsString()));
          exit;
        }
      }
      // default error page
      echo 'Error 500 Internal Server Error';
      exit;
    }
  }

  private function publicAssets(): void {
    $filePath = implode(DIRECTORY_SEPARATOR, [ASSETS_PATH, substr($this->uri, 1)]);
    if (file_exists($filePath) && is_file($filePath) && is_readable($filePath)) {
      $_splitted_ext = explode('.', strtolower($filePath));
      $_headerContentType = "Content-Type: " . MIMETYPES['.' . array_pop($_splitted_ext)];
      header($_headerContentType);
      header('HTTP/1.1 200 OK');
      readfile($filePath);
      exit;
    }
  }
  private function staticPage(string $diskPath, int $offset, ?string $ignoreExtension): void
  {
    $filePath = implode(DIRECTORY_SEPARATOR, [$diskPath, substr($this->uri, $offset + 1)]);
    $info = pathinfo($filePath);

    if (empty($info['extension'])) {
      // no file extension
      // then try adding $ignoreExtension to the end of the path
      if (!empty($ignoreExtension)) {
        $filePath .= '.'. $ignoreExtension;
      }
    }
    if (file_exists($filePath) && is_file($filePath) && is_readable($filePath)) {
      $_splitted_ext = explode('.', strtolower($filePath));
      $_headerContentType = "Content-Type: " . MIMETYPES['.' . array_pop($_splitted_ext)];
      header($_headerContentType);
      header('HTTP/1.1 200 OK');
      readfile($filePath);
      exit;
    }
  }
  public static function GET(string $uriPath, string $class, string $method): void
  {
    Router::$Router__routes['GET'][$uriPath] = [$class, $method];
  }
  public static function POST(string $uriPath, string $class, string $method): void
  {
    Router::$Router__routes['POST'][$uriPath] = [$class, $method];
  }
  public static function PUT(string $uriPath, string $class, string $method): void
  {
    Router::$Router__routes['PUT'][$uriPath] = [$class, $method];
  }
  public static function PATCH(string $uriPath, string $class, string $method): void
  {
    Router::$Router__routes['PATCH'][$uriPath] = [$class, $method];
  }
  public static function DELETE(string $uriPath, string $class, string $method): void
  {
    Router::$Router__routes['DELETE'][$uriPath] = [$class, $method];
  }
  public static function STATIC(string $uriPath, string $diskPath, ?string $ignoreExtension = null): void
  {
    Router::$Router__routes['STATIC'][$uriPath] = [$diskPath, $ignoreExtension];
  }

  public static function NOTFOUND(string $class, string $method): void
  {
    Router::$Router__routes['NOT_FOUND_PAGE'] = [$class, $method];
  }

  public static function ERROR(string $class, string $method): void
  {
    Router::$Router__routes['ERROR_PAGE'] = [$class, $method];
  }

  public static function redirect(string $url): void
  {
    header("Location: $url");
    exit;
  }
}
