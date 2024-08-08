<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

class Thesis extends Model
{
  public function getColumns(): array
  {
    return [
      'id' => ['BIGINT', 'NOT NULL', 'AUTO_INCREMENT'],
      'title' => ['VARCHAR(255)', 'NOT NULL'],
      'author' => ['VARCHAR(255)', 'NOT NULL'],
      'year' => ['YEAR', 'NOT NULL'],
      'department' => ['VARCHAR(255)', 'NOT NULL'],
      'course' => ['VARCHAR(255)', 'NOT NULL'],
      'url' => ['TEXT', 'NOT NULL'],
      'published' => ['BOOLEAN', 'NOT NULL', 'DEFAULT FALSE'],
      'created_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP'],
      'updated_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP', 'ON UPDATE CURRENT_TIMESTAMP'],
    ];
  }

  public function getUniqueKeys(): array
  {
    return [
      ['title']
    ];
  }
}
