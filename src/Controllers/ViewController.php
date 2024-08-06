<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use Smcc\ResearchHub\Router\Router;
use Smcc\ResearchHub\Router\Session;
use Smcc\ResearchHub\Views\Errors\ErrorPage;
use Smcc\ResearchHub\Views\Pages\HomePage;
use Smcc\ResearchHub\Views\Pages\Student\LoginPage;
use Smcc\ResearchHub\Views\Pages\Student\SignupPage;

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
    if (Session::isAuthenticated()) {
      Router::redirect("/");
    }
    LoginPage::view("Student Login");
  }
  public function personnelLogin()
  {
  }

  public function studentSignup()
  {
    if (Session::isAuthenticated()) {
      Router::redirect("/");
    }
    SignupPage::view("Student Registration");
  }
  public function notFound()
  {
    ErrorPage::notFound("Page not found - " . $this->head_title);
  }
  public function error($message)
  {
    ErrorPage::internalServerError("Error 500 - " . $this->head_title, $message);
  }

  public function favicon()
  {
    readfile(implode(DIRECTORY_SEPARATOR, [ASSETS_PATH,  'favicon.ico']));
    exit;
  }
}
