<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

class PublishedThesis extends Model
{
  public function getColumns(): array
  {
    return [
      'id' => ['BIGINT', 'NOT NULL', 'AUTO_INCREMENT'],
      'thesis_id' => ['BIGINT', 'NOT NULL'],
      'abstract' => ['TEXT', 'NOT NULL'],
      'created_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP'],
      'updated_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP', 'ON UPDATE CURRENT_TIMESTAMP'],
    ];
  }

  public function getUniqueKeys(): array
  {
    return [
      ['thesis_id']
    ];
  }

  public function getForeignConstraints(): array
  {
    return [
      'thesis_id' => [Thesis::class, 'CASCADE', 'CASCADE'],
    ];
  }
}
