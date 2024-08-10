<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

class ThesisPersonnelReads extends Model
{
  public function getColumns(): array
  {
    return [
      'id' => ['BIGINT', 'NOT NULL', 'AUTO_INCREMENT'],
      'published_thesis_id' => ['BIGINT', 'NOT NULL'],
      'personnel_id' => ['BIGINT', 'NOT NULL'],
      'created_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP'],
      'updated_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP', 'ON UPDATE CURRENT_TIMESTAMP'],
    ];
  }

  public function getForeignConstraints(): array
  {
    return [
      'published_thesis_id' => [PublishedThesis::class, 'CASCADE', 'CASCADE'],
      'personnel_id' => [Personnel::class, 'CASCADE', 'CASCADE'],
    ];
  }
}
