<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Pages\Student;

use Smcc\ResearchHub\Router\Session;
use Smcc\ResearchHub\Views\Global\HeadTemplate;
use Smcc\ResearchHub\Views\Global\ReactTemplate;

class LoginPage
{
  static public function view(string $title)
  {
    HeadTemplate::default($title);
    ReactTemplate::render('student/login', ['session' => Session::getSession()]);
  }
}