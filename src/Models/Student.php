<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

class Student extends Model
{
  public function getColumns(): array {
    return [
      'student_id' => ['BIGINT', 'NOT NULL'],
      'full_name' => ['VARCHAR(255)', 'NOT NULL'],
      'password' => ['VARCHAR(255)', 'NOT NULL'],
      'course' => ['VARCHAR(255)', 'NOT NULL'],
      'year' => ['INT', 'NOT NULL'],
      'created_at' => ['TIMESTAMP', 'DEFAULT CURRENT_TIMESTAMP'],
      'updated_at' => ['TIMESTAMP', 'DEFAULT CURRENT_TIMESTAMP', 'ON UPDATE CURRENT_TIMESTAMP'],
    ];
  }
  public function getUniqueKeys(): array {
    return [
      ['student_id', 'full_name', 'course']
    ];
  }
}