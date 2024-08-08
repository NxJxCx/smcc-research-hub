<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Router;

use Smcc\ResearchHub\Logger\Logger;

enum StatusCode: int
{
  case OK = 200;
  case CREATED = 201;
  case ACCEPTED = 202;
  case NO_CONTENT = 204;
  case MOVED_PERMANENTLY = 301;
  case FOUND = 302;
  case NOT_MODIFIED = 304;
  case BAD_REQUEST = 400;
  case UNAUTHORIZED = 401;
  case FORBIDDEN = 403;
  case NOT_FOUND = 404;
  case METHOD_NOT_ALLOWED = 405;
  case CONFLICT = 409;
  case GONE = 410;
  case LENGTH_REQUIRED = 411;
  case PRECONDITION_FAILED = 412;
  case PAYLOAD_TOO_LARGE = 413;
  case REQUEST_URI_TOO_LONG = 414;
  case UNSUPPORTED_MEDIA = 415;
  case REQUESTED_RANGE_NOT_SATISFIABLE = 416;
  case EXPECTATION_FAILED = 417;
  case UNPROCESSABLE_ENTITY = 422;
  case TOO_MANY_REQUESTS = 429;
  case REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
  case UNAVAILABLE_FOR_LEGAL_REASONS = 451;
  case INTERNAL_SERVER_ERROR = 500;
  case NOT_IMPLEMENTED = 501;
  case SERVICE_UNAVAILABLE = 503;
  case GATEWAY_TIMEOUT = 504;
  case HTTP_VERSION_NOT_SUPPORTED = 505;
}

enum ResponseSendType
{
  case JSON;
  case TEXT;
  case FILE;
  case BLOB;
  case REDIRECT;
}

class Response
{
  private array $headers;
  private StatusCode $statusCode;
  private ResponseSendType $sendType;
  private string $content;

  public function __construct(array $headers, StatusCode $statusCode = StatusCode::OK, ResponseSendType $sendType = ResponseSendType::TEXT, string $content = '')
  {
    $this->headers = $headers;
    $this->statusCode = $statusCode;
    $this->sendType = $sendType;
    $this->content = $content;
  }

  private function getMimeType(string $filePath): string
  {
    $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
    return MIMETYPES[".$extension"] ?? 'application/octet-stream';
  }

  public function sendResponse(): void
  {
    $contentType = match ($this->sendType) {
      ResponseSendType::JSON => 'application/json',
      ResponseSendType::TEXT => 'text/plain',
      ResponseSendType::FILE => $this->getMimeType($this->content),
      ResponseSendType::BLOB => 'application/octet-stream',
      ResponseSendType::REDIRECT => 'text/plain',
    };
    header("Content-Type: $contentType");
    foreach ($this->headers as $key => $value) {
      header("$key: $value");
    }
    http_response_code($this->statusCode->value);
    if ($this->sendType === ResponseSendType::REDIRECT) {
      Router::redirect($this->content);
    } else if ($this->sendType === ResponseSendType::FILE) {
      readfile($this->content);
    } else {
      echo $this->content;
    }
    Logger::write_info("{$_SERVER['REQUEST_URI']} (HTTP Response: {$this->statusCode->value})");
    exit;
  }

  public static function json(array $data, StatusCode $statusCode = StatusCode::OK, array $headers = []): Response
  {
    return new self($headers, $statusCode, ResponseSendType::JSON, json_encode($data));
  }

  public static function text(string $content, StatusCode $statusCode = StatusCode::OK, array $headers = []): Response
  {
    return new self($headers, $statusCode, ResponseSendType::TEXT, $content);
  }

  public static function file(string $filePath, StatusCode $statusCode = StatusCode::OK, array $headers = []): Response
  {
    return new self($headers, $statusCode, ResponseSendType::FILE, $filePath);
  }

  public static function blob(string $content, StatusCode $statusCode = StatusCode::OK, array $headers = []): Response
  {
    return new self($headers, $statusCode, ResponseSendType::BLOB, $content);
  }

  public static function redirect(string $url, StatusCode $statusCode = StatusCode::FOUND): Response
  {
    return new self([], $statusCode, ResponseSendType::REDIRECT, $url);
  }
}
