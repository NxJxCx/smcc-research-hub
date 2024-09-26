<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

class Journal extends Model
{
  public function getColumns(): array
  {
    return [
      'id' => ['BIGINT', 'NOT NULL', 'AUTO_INCREMENT'],
      'title' => ['VARCHAR(255)', 'NOT NULL'],
      'author' => ['VARCHAR(255)', 'NOT NULL'],
      'year' => ['YEAR', 'NOT NULL'],
      'url' => ['TEXT', 'NOT NULL'],
      'volume' => ['VARCHAR(255)', "DEFAULT ''"],
      'number' => ['VARCHAR(255)', "DEFAULT ''"],
      'thumbnail' => ['TEXT', "DEFAULT ''"],
      'publisher' => ['VARCHAR(255)', 'NOT NULL'],
      'published_date' => ['DATE', 'NOT NULL'],
      'is_public' => ['BOOLEAN', 'DEFAULT FALSE'],
      'created_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP'],
      'updated_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP', 'ON UPDATE CURRENT_TIMESTAMP'],
    ];
  }

  public function getUniqueKeys(): array
  {
    return [
      ['title', 'volume', 'number', 'year']
    ];
  }

}
