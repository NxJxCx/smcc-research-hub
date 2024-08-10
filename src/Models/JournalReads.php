<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

class JournalReads extends Model
{
  public function getColumns(): array
  {
    return [
      'id' => ['BIGINT', 'NOT NULL', 'AUTO_INCREMENT'],
      'published_journal_id' => ['BIGINT', 'NOT NULL'],
      'student_id' => ['BIGINT', 'NOT NULL'],
      'created_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP'],
      'updated_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP', 'ON UPDATE CURRENT_TIMESTAMP'],
    ];
  }

  public function getForeignConstraints(): array
  {
    return [
      'published_journal_id' => [PublishedJournal::class, 'CASCADE', 'CASCADE'],
      'student_id' => [Student::class, 'CASCADE', 'CASCADE'],
    ];
  }
}