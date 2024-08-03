<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Models;

use PDO;
use PDOException;
use ReflectionClass;

interface ModelInterface
{
  function getTableName(): string;
  function getColumns(): array;
  function getPrimaryKey(): string;
  function getPrimaryKeyValue(): mixed;
  function getPrimaryKeyPDOType(): int;
  function getForeignConstraints(): array;
  function getUniqueKeys(): array;
  function createTable(Database $database): void;
  function createForeignConstraints(Database $database): void;
  function get(string $columnName): mixed;
  function create(bool $includePrimaryKeyValue = false): string|false;
  function update(): bool;
  function delete(): bool;
}


// superclass for all model classes
class Model implements ModelInterface
{
  private array $data = [];
  private bool $isCreateOnly = false;

  public function __construct(array $data = [], bool $isCreateOnly = false)
  {
    if ($isCreateOnly) {
      $this->isCreateOnly = true;
    } else {
      // Fetch column definitions
      $columns = $this->getColumns();
      // Initialize properties
      foreach ($columns as $columnName => $attributes) {
        $this->initializeProperty($columnName, $attributes);
      }
      foreach ($data as $columnName => $value) {
        if (array_key_exists($columnName, $this->data)) {
          $this->data[$columnName] = $value;
        }
      }
    }
  }

  public function __get(string $propertyName)
  {
    if (!$this->isCreateOnly && array_key_exists($propertyName, $this->data)) {
      return $this->data[$propertyName];
    }

    return null;
  }

  public function __set(string $propertyName, $value): void
  {
    if (!$this->isCreateOnly && array_key_exists($propertyName, $this->data)) {
      $this->data[$propertyName] = $value;
      // check if property is foreign key and set related model if it exists
      foreach ($this->getForeignConstraints() as $fkColumn => $fkDetails) {
        [$modelClass, $onUpdate, $onDelete] = $fkDetails;
        if (class_exists($modelClass)) {
          $reflection = new ReflectionClass($modelClass);
          if ($reflection->isSubclassOf(Model::class)) {
            if ($fkColumn === $propertyName) {
              $fkColumnName = "{$propertyName}_fk";
              $fkValue = $this->fetchForeignKey($modelClass, $value);
              $this->data[$fkColumnName] = $fkValue;
            }
          }
        }
      }
    }
  }

  private function initializeProperty(string $columnName, array $attributes): void
  {
    $type = 'mixed'; // Default type
    $typeDefinition = $attributes[0];

    if (str_starts_with($typeDefinition, 'BIGINT') || str_starts_with($typeDefinition, 'INT')) {
      $type = 'int';
    } elseif (str_starts_with($typeDefinition, 'VARCHAR') || str_starts_with($typeDefinition, 'TEXT')) {
      $type = 'string';
    } elseif (str_starts_with($typeDefinition, 'BOOLEAN') || str_starts_with($typeDefinition, 'TINYINT')) {
      $type = 'bool';
    } elseif (str_starts_with($typeDefinition, 'TIMESTAMP') || str_starts_with($typeDefinition, 'DATETIME')) {
      $type = 'DateTime';
    } else if (str_starts_with($typeDefinition, 'DECIMAL') || str_starts_with($typeDefinition, 'FLOAT') || str_starts_with($typeDefinition, 'DOUBLE')) {
      $type = 'float';
    }

    // Initialize property
    $this->data[$columnName] = null;

  }

  private function fetchForeignKey(string $modelClass, $fkValue)
  {
    if (is_null($fkValue)) {
      return null;
    }

    $db = Database::getInstance();
    $model = new $modelClass();
    $tableName = $model->getTableName();
    $primaryKey = $model->getPrimaryKey();

    $stmt = $db->getDb()->prepare("SELECT * FROM $tableName WHERE $primaryKey = :id");
    $stmt->execute([':id' => $fkValue]);

    return $stmt->fetchObject($modelClass);
  }

  public function createTable(Database $db): void
  {
    if ($this->isCreateOnly && count($this->getColumns()) > 0) {
      $columns = $this->getColumns();
      $tableName = $this->getTableName();

      // Construct the column definitions
      $columnDefinitions = [];
      foreach ($columns as $columnName => $attributes) {
        $columnDefinitions[] = "$columnName " . implode(' ', $attributes);
      }

      // Create the table SQL
      $sql = "CREATE TABLE IF NOT EXISTS $tableName (" . implode(', ', $columnDefinitions);

      // Add primary key
      $primaryKey = $this->getPrimaryKey();
      $sql .= ", PRIMARY KEY ($primaryKey)";

      // Add unique keys
      foreach ($this->getUniqueKeys() as $uniqueKey) {
        $sql .= ", UNIQUE (" . implode(', ', $uniqueKey) . ")";
      }

      // Close the SQL statement
      $sql .= ") ENGINE=InnoDB;";

      // Execute the table creation
      $db->getDb()->exec($sql);
    }
  }

  public function createForeignConstraints(Database $db): void
  {
    if ($this->isCreateOnly && count(array_keys($this->getForeignConstraints())) > 0) {
      $tableName = $this->getTableName();
      // Add foreign key constraints
      foreach ($this->getForeignConstraints() as $fkColumn => $fkDetails) {
        [$modelClass, $onUpdate, $onDelete] = $fkDetails;
        if (class_exists($modelClass)) {
          $reflection = new ReflectionClass($modelClass);
          if ($reflection->isSubclassOf(Model::class)) {
            $fkModel = new $modelClass();
            $referencedColumn = $fkModel->getPrimaryKey();
            $referencedTable = $fkModel->getTableName();
            $sql = "ALTER TABLE $tableName ADD CONSTRAINT fk_{$tableName}_{$fkColumn}
                    FOREIGN KEY ($fkColumn) REFERENCES $referencedTable($referencedColumn)
                    ON UPDATE $onUpdate
                    ON DELETE $onDelete;";
            try {
              $db->getDb()->exec($sql);
            } catch (PDOException $e) {}
          }
        }
      }
    }
  }

  /**
   * @inheritDoc
   */
  public function create(bool $includePrimaryKeyValue = false): string|false
  {
    if (!$this->isCreateOnly) {
      $db = Database::getInstance();

      $columns = $includePrimaryKeyValue ? array_keys($this->getColumns()) : array_filter(array_keys($this->getColumns()), fn($col) => $col !== $this->getPrimaryKey());
      $colNames = implode(",", $columns);
      $colNameParams = implode(",", array_map(fn ($key) => ":" . $key, $columns));

      $stmt = $db->getDb()->prepare(
        "INSERT INTO {$this->getTableName()} ($colNames) VALUES($colNameParams)"
      );

      // Bind parameters
      foreach ($this->getColumns() as $colName => $args) {
        $paramName = ":" . $colName;
        $value = $this->data[$colName];
        if (str_starts_with($args[0], "BIGINT") || str_starts_with($args[0], "INT")) {
          $stmt->bindValue($paramName, $value, PDO::PARAM_INT);
        } else if (str_starts_with($args[0], "TINYINT") || str_starts_with($args[0], "BOOLEAN")) {
          $stmt->bindValue($paramName, $value, PDO::PARAM_BOOL);
        } else if (str_starts_with($args[0], "BLOB") || str_starts_with($args[0], "TINYBLOB") || str_starts_with($args[0], "MEDIUMBLOB") || str_starts_with($args[0], "LONGBLOB")) {
          $stmt->bindValue($paramName, $value, PDO::PARAM_LOB);
        } else if (str_starts_with($args[0], "CHAR")) {
          $stmt->bindValue($paramName, $value, PDO::PARAM_STR_CHAR);
        } else {
          $stmt->bindValue($paramName, $value);
        }
      }

      // Execute statement
      if (!$stmt->execute()) {
        return false;
      }

      // Retrieve the last inserted ID
      $id = $db->getDb()->lastInsertId();
      if (!$id) {
        return false;
      }
      // Set the $id to the primary key of the model
      return $id;
    }
    return false;
  }

  /**
   * @inheritDoc
   */
  public function update(): bool
  {
    if (!$this->isCreateOnly) {
      $db = Database::getInstance();
      $primaryKey = $this->getPrimaryKey();
      $primaryKeyValue = $this->getPrimaryKeyValue();
      $primaryKeyPDOType = $this->getPrimaryKeyPDOType();
      $columns = array_keys($this->getColumns());
      $setClause = implode(", ", array_map(fn ($col) => "$col = :$col", $columns));

      $sql = "UPDATE {$this->getTableName()} SET $setClause WHERE $primaryKey = :$primaryKey";
      $stmt = $db->getDb()->prepare($sql);

      // Bind parameters
      foreach ($this->getColumns() as $colName => $args) {
        $paramName = ":" . $colName;
        $value = $this->data[$colName];
        if (str_starts_with($args[0], "BIGINT") || str_starts_with($args[0], "INT")) {
          $stmt->bindValue($paramName, $value, PDO::PARAM_INT);
        } else if (str_starts_with($args[0], "TINYINT") || str_starts_with($args[0], "BOOLEAN")) {
          $stmt->bindValue($paramName, $value, PDO::PARAM_BOOL);
        } else if (str_starts_with($args[0], "BLOB") || str_starts_with($args[0], "TINYBLOB") || str_starts_with($args[0], "MEDIUMBLOB") || str_starts_with($args[0], "LONGBLOB")) {
          $stmt->bindValue($paramName, $value, PDO::PARAM_LOB);
        } else if (str_starts_with($args[0], "CHAR")) {
          $stmt->bindValue($paramName, $value, PDO::PARAM_STR_CHAR);
        } else {
          $stmt->bindValue($paramName, $value);
        }
      }

      // Bind primary key value
      $stmt->bindValue(":$primaryKey", $primaryKeyValue, $primaryKeyPDOType);

      $result = $stmt->execute();
      return $result;
    }
    return false;
  }

  /**
   * @inheritDoc
   */
  public function delete(): bool {
    if (!$this->isCreateOnly) {
      $db = Database::getInstance();
      $primaryKey = $this->getPrimaryKey();
      $primaryKeyValue = $this->getPrimaryKeyValue();
      $primaryKeyPDOType = $this->getPrimaryKeyPDOType();
      if ($primaryKeyValue !== null) {
        $sql = "DELETE FROM {$this->getTableName()} WHERE $primaryKey = :$primaryKey";
        $stmt = $db->getDb()->prepare($sql);
        $stmt->bindValue(":$primaryKey", $primaryKeyValue, $primaryKeyPDOType);
        $result = $stmt->execute();
        return $result;
      }
    }
    return false;
  }
  /**
   * @inheritDoc
   */
  public function getPrimaryKey(): string
  {
    return array_key_first($this->getColumns()) ?? '';
  }
  /**
   * @inheritDoc
   */
  public function getPrimaryKeyValue(): mixed
  {
    if (!$this->isCreateOnly && $this->getPrimaryKey() !== '') {
      return $this->data[$this->getPrimaryKey()];
    }
    return null;
  }

  /**
   * @inheritDoc
   */
  public function getPrimaryKeyPDOType(): int
  {
    if (!$this->isCreateOnly && $this->getPrimaryKey() !== '') {
      if (str_starts_with($this->getColumns()[$this->getPrimaryKey()], 'BIGINT') || str_starts_with($this->getColumns()[$this->getPrimaryKey()], 'INT')) {
        return PDO::PARAM_INT;
      }
      return PDO::PARAM_STR;
    }
    return PDO::PARAM_NULL;
  }
  /**
   * @inheritDoc
   */
  public function getColumns(): array
  {
    return [
      // 'id' => ['BIGINT', 'NOT NULL', 'AUTO_INCREMENT'],
      // 'fullname' => ['VARCHAR(255)', 'NOT NULL'],
      // 'parent' => ['BIGINT'],
      // 'age' => ['INT', 'NOT NULL'],
      // 'price' => ['DECIMAL(10,2)', 'NOT NULL'],
      // 'percentage' => ['FLOAT', 'NOT NULL'],
      // 'created_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP'],
      // 'updated_at' => ['TIMESTAMP', 'NOT NULL', 'DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT'],
    ];
  }

  /**
   * @inheritDoc
   */
  public function getForeignConstraints(): array
  {
    return [
    //   'parent' /* foreign key column name */ => [
    //     static::class, /* Model class name */
    //     'CASCADE' /* ON UPDATE */,
    //     'SET NULL' /* ON DELETE */
    //   ]
    ];
  }

  /**
   * @inheritDoc
   */
  public function getTableName(): string
  {
    return strtolower(basename(str_replace('\\', '/', static::class)));
  }

  /**
   * @inheritDoc
   */
  public function getUniqueKeys(): array
  {
    return [
      // ['fullname', 'parent', 'age'],
    ];
  }
  /**
   * @inheritDoc
   */
  public function get(string $columnName): mixed {
    if (!$this->isCreateOnly && $this->getPrimaryKey() !== '' && array_key_exists($columnName, $this->data)) {
      return $this->data[$columnName];
    }
    return null;
  }
}

