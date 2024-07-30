<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

use DateTime;

class Student implements Model
{
  private ?int $student_id;
  private string $fullname;
  private string $password;
  private string $course;
  private int $year;
  private DateTime $created_at;
  private DateTime $updated_at;

  public function getStudentId(): ?int
  {
    return $this->student_id;
  }
  public function getFullName(): string
  {
    return $this->fullname;
  }
  public function getPassword(): string
  {
    return $this->password;
  }
  public function getCourse(): string
  {
    return $this->course;
  }
  public function getYear(): int
  {
    return $this->year;
  }
  public function getCreatedAt(): DateTime
  {
    return $this->created_at;
  }
  public function getUpdatedAt(): DateTime
  {
    return $this->updated_at;
  }

  public function setStudent(?int $student_id, ?string $fullname, ?string $password, ?string $course, ?int $year, ?DateTime $created_at, ?DateTime $updated_at): void
  {
    if (!is_null($student_id)) {
      $this->student_id = $student_id;
    }
    if (!is_null($fullname)) {
      $this->fullname = $fullname;
    }
    if (!is_null($password)) {
      $this->password = password_hash($password, PASSWORD_DEFAULT);
    }
    if (!is_null($course)) {
      $this->course = $course;
    }
    if (!is_null($year)) {
      $this->year = $year;
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
      "INSERT INTO student(student_id, full_name, password, course, year) VALUES(:student_id, :fullname, :password, :course, :year)"
    );
    $stmt->bindParam(':student_id', $this->student_id);
    $stmt->bindParam(':fullname', $this->fullname);
    $stmt->bindParam(':password', $this->password);
    $stmt->bindParam(':course', $this->course);
    $stmt->bindParam(':year', $this->year);
    $stmt->execute();
    $id = $db->getDb()->lastInsertId();
    if (!$id) {
      return null;
    }
    $this->student_id = intval($id);
    return $this->student_id;
  }

  public function update(): bool
  {
    $db = Database::getInstance();
    $stmt = $db->getDb()->prepare(
      "UPDATE student SET full_name = :fullname, password = :password, course = :course, year = :year WHERE student_id = :student_id"
    );
    $stmt->bindParam(':fullname', $this->fullname);
    $stmt->bindParam(':password', $this->password);
    $stmt->bindParam(':course', $this->course);
    $stmt->bindParam(':year', $this->year);
    $stmt->bindParam(':student_id', $this->student_id);
    return $stmt->execute();
  }
}
