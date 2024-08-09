<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Pages;

use Smcc\ResearchHub\Views\Global\HeadTemplate;
use Smcc\ResearchHub\Views\Global\ReactTemplate;

class LogsPage
{
  static public function view(string $title)
  {
    HeadTemplate::default($title);
    ReactTemplate::render('logs', []);
  }
}