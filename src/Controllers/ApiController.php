<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use PDO;
use Smcc\ResearchHub\Models\Database;
use Smcc\ResearchHub\Router\Response;

class ApiController extends Controller
{

  public function index(string $uri, array $query, array $body)
  {
    
  }

  public function test(string $uri, array $query, array $body)
  {
    // Shows all table names exists in the database
    $db = Database::getInstance();
    $q = $db->getDb()->query("SHOW TABLES;");
    $tables = $q->fetchAll(PDO::FETCH_ASSOC);
    Response::json([
      "tables" => array_map(fn($item) => $item["Tables_in_researchhub"], $tables, []),
      "tt" => $tables,
      "count" => count($tables)
    ]);
  }
}
