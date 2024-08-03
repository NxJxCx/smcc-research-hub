<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

class Personnel extends Model
{
  public function getColumns(): array
  {
    return [
      'personnel_id' => ['BIGINT', 'NOT NULL'],
      'full_name' => ['VARCHAR(255)', 'NOT NULL'],
      'email' => ['VARCHAR(255)', 'NOT NULL'],
      'password' => ['VARCHAR(255)', 'NOT NULL'],
      'created_at' => ['TIMESTAMP', 'DEFAULT CURRENT_TIMESTAMP'],
      'updated_at' => ['TIMESTAMP', 'DEFAULT CURRENT_TIMESTAMP', 'ON UPDATE CURRENT_TIMESTAMP'],
    ];
  }
}
