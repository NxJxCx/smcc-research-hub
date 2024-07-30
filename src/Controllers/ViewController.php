<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use Smcc\ResearchHub\Views\Errors\ErrorPage;
use Smcc\ResearchHub\Views\Pages\HomePage;

class ViewController extends Controller
{

  public function index(string $uri, array $query, array $body)
  {
    HomePage::view("Home");
  }

  public function adminLogin()
  {
  }
  public function studentLogin()
  {
  }
  public function personnelLogin()
  {
  }

  public function notFound()
  {
    ErrorPage::notFound("Page not found - " . $this->head_title);
  }
  public function error($message)
  {
    ErrorPage::internalServerError("Error 500 - " . $this->head_title, $message);
  }
}
