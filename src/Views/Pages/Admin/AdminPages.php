<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Pages\Admin;

use Smcc\ResearchHub\Views\Global\HeadTemplate;
use Smcc\ResearchHub\Views\Global\ReactTemplate;

class AdminPages
{
  static public function view(string $title, string $reactAppPath)
  {
    HeadTemplate::default($title);
    ReactTemplate::renderWithSidebar($reactAppPath, [], [
      [
        'label' => 'Dashboard',
        'url' => '/admin/dashboard',
      ],
      [
        'label' => 'Thesis List',
        'url' => '/admin/theses',
      ],
      [
        'label' => 'Journal List',
        'url' => '/admin/journal',
      ],
      [
        'label' => 'Recently Published',
        'url' => '/admin/recent',
      ],
      [
        'label' => 'Announcements',
        'url' => '/admin/announcements',
      ],
      [
        'label' => 'Downloads',
        'url' => '/admin/downloads',
      ],
      [
        'label' => 'Student List',
        'url' => '/admin/students',
      ],
      [
        'label' => 'Teacher Accounts',
        'url' => '/admin/teachers',
      ]
    ]);
  }
}