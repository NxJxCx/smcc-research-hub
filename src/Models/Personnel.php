<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

use DateTime;

class Personnel implements Model
{
  private ?int $personnel_id;
  private string $full_name;
  private string $email;
  private string $password;
  private DateTime $created_at;
  private DateTime $updated_at;

  public function getId(): ?int
  {
    return $this->personnel_id;
  }
  public function getFullName(): string
  {
    return $this->full_name;
  }
  public function getEmail(): string
  {
    return $this->email;
  }
  public function getPassword(): string
  {
    return $this->password;
  }
  public function getCreatedAt(): DateTime
  {
    return $this->created_at;
  }
  public function getUpdatedAt(): DateTime
  {
    return $this->updated_at;
  }

  public function setData(?int $personnel_id, ?string $full_name, ?string $email, ?string $password, ?DateTime $created_at, ?DateTime $updated_at): void
  {
    if (!is_null($personnel_id)) {
      $this->personnel_id = $personnel_id;
    }
    if (!is_null($full_name)) {
      $this->full_name = $full_name;
    }
    if (!is_null($email)) {
      $this->email = $email;
    }
    if (!is_null($password)) {
      $this->password = password_hash($password, PASSWORD_DEFAULT);
    }
  }

  public function create(): ?int
  {
    $db = Database::getInstance();
    $stmt = $db->getDb()->prepare(
      "INSERT INTO admin(personnel_id, full_name, email, password) VALUES(:personnel_id, :full_name, :email, :password)"
    );
    $stmt->bindParam(':personnel_id', $this->personnel_id);
    $stmt->bindParam(':full_name', $this->full_name);
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':password', $this->password);
    $stmt->execute();
    $id = $db->getDb()->lastInsertId();
    if (!$id) {
      return null;
    }
    $this->personnel_id = intval($id);
    return $this->personnel_id;
  }

  public function update(): bool
  {
    $db = Database::getInstance();
    $stmt = $db->getDb()->prepare(
      "UPDATE admin SET full_name = :full_name, email = :email, password = :password WHERE personnel_id = :personnel_id"
    );
    $stmt->bindParam(':full_name', $this->full_name);
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':password', $this->password);
    $stmt->bindParam(':personnel_id', $this->personnel_id);
    return $stmt->execute();
  }
}
