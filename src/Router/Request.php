<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Router;

class Request {
  private string $method;
  private string $uri;
  private array $query;
  private array $body;
  private array $files;
  private array $headers;
  public function __construct(string $method, string $uri, array $query = [], array $body = [], array $files = [], array $headers = [])
  {
    $this->method = $method;
    $this->uri = $uri;
    $this->query = $query;
    $this->body = $body;
    $this->files = $files;
    $this->headers = $headers;
  }
  public function getMethod(): string {
    return $this->method;
  }
  public function getUri(): string {
    return $this->uri;
  }
  public function getQuery(): array {
    return $this->query;
  }
  public function getBody(): array {
    return $this->body;
  }
  public function getFiles(): array {
    return $this->files;
  }
  public function getHeaders(): array {
    return $this->headers;
  }

  public function getQueryParam(string $key): string {
    return $this->query[$key] ?? "";
  }
}