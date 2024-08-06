<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Pages\Admin;

use Smcc\ResearchHub\Views\Global\HeadTemplate;
use Smcc\ResearchHub\Views\Global\ReactTemplate;

class DashboardPage
{
  static public function view(string $title)
  {
    HeadTemplate::default($title);
    ReactTemplate::renderWithSidebar('admin/dashboard', [], [
      [
        'label' => 'Dashboard',
        'url' => '/admin/dashboard',
      ],
      [
        'label' => 'Thesis List',
        'url' => '/admin/theses',
      ],
      [
        'label' => 'Weekly Visit',
        'url' => '/admin/weekly',
      ],
      [
        'label' => 'Department List',
        'url' => '/admin/departments',
      ],
      [
        'label' => 'Recent Thesis Deployed',
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
      ]
    ]);
  }
}