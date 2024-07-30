<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

interface Model
{
  /**
   * Summary of create
   * @return int Inserted ID on success, null on failure
   */
  public function create(): ?int;
  public function update(): bool;
}
