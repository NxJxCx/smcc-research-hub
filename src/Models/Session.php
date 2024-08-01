<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

use DateTime;

class Session implements Model
{
  private ?int $id;
  private string $session_id;
  private ?string $token;
  private DateTime $created_at;
  private DateTime $updated_at;

  public function getId(): ?int
  {
    return $this->id;
  }
  public function getSessionId(): string
  {
    return $this->session_id;
  }
  public function getToken(): ?string
  {
    return $this->token;
  }
  public function getCreatedAt(): DateTime
  {
    return $this->created_at;
  }
  public function getUpdatedAt(): DateTime
  {
    return $this->updated_at;
  }

  public function setData(?int $id = null, ?string $session_id = null, ?string $token = null, ?DateTime $created_at = null, ?DateTime $updated_at = null): void
  {
    if (!is_null($id)) {
      $this->id = $id;
    }
    if (!is_null($session_id)) {
      $this->session_id = $session_id;
    }
    if (!is_null($token)) {
      $this->token = $token;
    }
    if (!is_null($created_at)) {
      $this->created_at = $created_at;
    }
    if (!is_null($updated_at)) {
      $this->updated_at = $updated_at;
    }
  }
  public function create(): ?int
  {
    $db = Database::getInstance();
    $stmt = $db->getDb()->prepare(
      "INSERT INTO admin(session_id, token, created_at, updated_at) VALUES(:session_id, :token, :created_at, :updated_at) RETURNING id"
    );
    $stmt->bindParam(':session_id', $this->session_id);
    $stmt->bindParam(':token', $this->token);
    $stmt->bindParam(':created_at', $this->created_at);
    $stmt->bindParam(':updated_at', $this->updated_at);
    $stmt->execute();
    $id = $stmt->fetchColumn();
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
      "UPDATE admin SET session_id = :session_id, token = :token, updated_at = :updated_at WHERE id = :id"
    );
    $stmt->bindParam(':session_id', $this->session_id);
    $stmt->bindParam(':token', $this->token);
    $stmt->bindParam(':updated_at', $this->updated_at);
    $stmt->bindParam(':id', $this->id);
    return $stmt->execute();
  }

  public function delete(): bool
  {
    $db = Database::getInstance();
    $stmt = $db->getDb()->prepare(
      "DELETE FROM admin WHERE id = :id"
    );
    $stmt->bindParam(':id', $this->id);
    return $stmt->execute();
  }
}
