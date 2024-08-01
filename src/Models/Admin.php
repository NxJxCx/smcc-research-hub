<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

use DateTime;

class Admin implements Model
{
  private ?int $id;
  private string $admin_user;
  private string $full_name;
  private string $email;
  private string $password;
  private DateTime $created_at;
  private DateTime $updated_at;

  public function getId(): ?int
  {
    return $this->id;
  }
  public function getAdminUser(): string
  {
    return $this->admin_user;
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

  public function setData(?int $id, ?string $admin_user, ?string $full_name, ?string $email, ?string $password, ?DateTime $created_at, ?DateTime $updated_at): void
  {
    if (!is_null($id)) {
      $this->id = $id;
    }
    if (!is_null($admin_user)) {
      $this->admin_user = $admin_user;
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
      "INSERT INTO admin(id, admin_user, full_name, email, password) VALUES(:id, :admin_user, :full_name, :email, :password)"
    );
    $stmt->bindParam(':id', $this->id);
    $stmt->bindParam(':admin_user', $this->admin_user);
    $stmt->bindParam(':full_name', $this->full_name);
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':password', $this->password);
    $stmt->execute();
    $id = $db->getDb()->lastInsertId();
    if (!$id) {
      return null;
    }
    $this->id = intval($id);
    return $this->id;
  }

  public function update(): bool
  {
    $db = Database::getInstance();
    $stmt = $db->getDb()->prepare(
      "UPDATE admin SET admin_user = :admin_user, full_name = :full_name, email = :email, password = :password WHERE id = :id"
    );
    $stmt->bindParam(':admin_user', $this->admin_user);
    $stmt->bindParam(':full_name', $this->full_name);
    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':password', $this->password);
    $stmt->bindParam(':id', $this->id);
    return $stmt->execute();
  }
}
