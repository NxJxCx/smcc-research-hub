<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

use PDO;

interface BaseDatabase
{
  public function getAllRows(string $tableName, ?string $modelClass = "stdClass"): array;
  public function getRowById(string $tableName, int $id, ?string $modelClass = "stdClass"): bool|object;
  public function findOne(string $tableName, array $conditions = [], ?string $modelClass = "stdClass"): bool|object;
  public function findMany(string $tableName, array $conditions = [], ?string $modelClass = "stdClass"): array;
}

$_open_database = null;

class Database implements BaseDatabase
{
  private ?PDO $db;

  public function __construct(string $host = MYSQL_HOST, string $port = MYSQL_PORT, string $dbname = MYSQL_DATABASE, string $user = MYSQL_USER, string $password = MYSQL_PASSWORD)
  {
    global $_open_database;
    // implement database connection using PDO mysql
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname";
    $options = [
      PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    // Check if database connection already exists
    if (!is_null($_open_database)) {
      return;
    }
    $_open_database = $this->db = new PDO($dsn, $user, $password, $options);
    $tables = [
      'admin' => 'CREATE TABLE IF NOT EXISTS admin ('
        . 'id BIGINT NOT NULL AUTO_INCREMENT,'
        . 'admin_user VARCHAR(255) NOT NULL,'
        . 'full_name VARCHAR(255) NOT NULL,'
        . 'email VARCHAR(255) NOT NULL,'
        . 'password VARCHAR(255) NOT NULL,'
        . 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,'
        . 'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'
        . 'PRIMARY KEY (id),'
        . 'UNIQUE (admin_user)'
        . ')',
      'student' => 'CREATE TABLE IF NOT EXISTS student ('
        . 'student_id BIGINT NOT NULL,'
        . 'full_name VARCHAR(255) NOT NULL,'
        . 'password VARCHAR(255) NOT NULL,'
        . 'course VARCHAR(255) NOT NULL,'
        . 'year int NOT NULL,'
        . 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,'
        . 'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'
        . 'PRIMARY KEY (student_id),'
        . 'UNIQUE (student_id, full_name)'
        . ')',
      'personnel' => 'CREATE TABLE IF NOT EXISTS personnel ('
        . 'personnel_id BIGINT NOT NULL,'
        . 'full_name VARCHAR(255) NOT NULL,'
        . 'email VARCHAR(255) NOT NULL,'
        . 'password VARCHAR(255) NOT NULL,'
        . 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,'
        . 'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'
        . 'PRIMARY KEY (personnel_id)'
        . ')',
      'admin_logs' => 'CREATE TABLE IF NOT EXISTS admin_logs ('
        . 'id BIGINT NOT NULL AUTO_INCREMENT,'
        . 'admin_id BIGINT NOT NULL,'
        . 'activity VARCHAR(255) NOT NULL,'
        . 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,'
        . 'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'
        . 'PRIMARY KEY (id),'
        . 'FOREIGN KEY (admin_id) REFERENCES admin(id) ON UPDATE CASCADE ON DELETE CASCADE'
        . ')',
      'personnel_logs' => 'CREATE TABLE IF NOT EXISTS personnel_logs ('
        . 'id INT NOT NULL AUTO_INCREMENT,'
        . 'personnel_id BIGINT NOT NULL,'
        . 'activity VARCHAR(255) NOT NULL,'
        . 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,'
        . 'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'
        . 'PRIMARY KEY (id),'
        . 'FOREIGN KEY (personnel_id) REFERENCES personnel(personnel_id) ON UPDATE CASCADE ON DELETE CASCADE'
        . ')',
      'student_logs' => 'CREATE TABLE IF NOT EXISTS student_logs ('
        . 'id BIGINT NOT NULL AUTO_INCREMENT,'
        . 'student_id BIGINT NOT NULL,'
        . 'activity VARCHAR(255) NOT NULL,'
        . 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,'
        . 'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'
        . 'PRIMARY KEY (id),'
        . 'FOREIGN KEY (student_id) REFERENCES student(student_id) ON UPDATE CASCADE ON DELETE CASCADE'
        . ')',
      'session' => 'CREATE TABLE IF NOT EXISTS sessions ('
        . 'id INT AUTO_INCREMENT,'
        . 'session_id VARCHAR(255) NOT NULL,'
        . 'token TEXT,'
        . 'created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,'
        . 'updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,'
        . 'PRIMARY KEY (id),'
        . 'UNIQUE (session_id)'
        . ')',
    ];
    foreach ($tables as $_ => $createTable) {
      $this->db->exec($createTable);
    }
  }

  public function getDb(): PDO
  {
    $this->getAllRows('admin', Student::class);
    return $this->db;
  }

  static function getInstance(): Database
  {
    global $_open_database;
    if (is_null($_open_database)) {
      $_open_database = new Database();
    }
    return $_open_database;
  }
  /**
   * @inheritDoc
   */
  public function getAllRows(string $tableName, string|null $modelClass = "stdClass"): array
  {
    $stmt = $this->db->prepare("SELECT * FROM $tableName");
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_CLASS, $modelClass);
  }

  /**
   * @inheritDoc
   */
  public function getRowById(string $tableName, int $id, ?string $modelClass = "stdClass"): bool|object
  {
    $stmt = $this->db->prepare("SELECT * FROM $tableName WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    return $stmt->fetchObject($modelClass);
  }
  /**
   * @inheritDoc
   */
  public function findMany(string $tableName, array $conditions = [], ?string $modelClass = "stdClass"): array
  {
    // select many rows using prepared statements and return the results array of models
    $sql = "SELECT * FROM $tableName WHERE " . implode(' AND ', array_map(fn ($key, $value) => "$key = :$key", array_keys($conditions), $conditions));
    $stmt = $this->db->prepare($sql);
    $stmt->execute($conditions);
    return $stmt->fetchAll(PDO::FETCH_CLASS, $modelClass);
  }

  /**
   * @inheritDoc
   */
  public function findOne(string $tableName, array $conditions = [], ?string $modelClass = "stdClass"): bool|object
  {
    // select one row using prepared statements and return the model object
    $sql = "SELECT * FROM $tableName WHERE " . implode(' AND ', array_map(fn ($key, $value) => "$key = :$key", array_keys($conditions), $conditions));
    $stmt = $this->db->prepare($sql);
    $stmt->execute($conditions);
    return $stmt->fetchObject($modelClass);
  }

  public function __destruct()
  {
    global $_open_database;
    // close database connection when object is destroyed
    if (!is_null($_open_database)) {
      $_open_database = null;
      $this->db = null;
    }
  }
}
