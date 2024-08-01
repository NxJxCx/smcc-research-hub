<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use PDO;
use Smcc\ResearchHub\Models\Admin;
use Smcc\ResearchHub\Models\Database;
use Smcc\ResearchHub\Models\Personnel;
use Smcc\ResearchHub\Models\Student;
use Smcc\ResearchHub\Router\Response;
use Smcc\ResearchHub\Router\Session as RouterSession;

class ApiController extends Controller
{

  public function index(string $uri, array $query, array $body)
  {
    
  }

  public function studentInfo(string $uri, array $query, array $body)
  {
    switch ($query['q']) {
      case 'exist':
        $db = Database::getInstance();
        $studentId = $query['id'];
        $student = $db->findOne('student', ['student_id' => $studentId], Student::class);
        Response::json(['exists' => $student ? true : false]);
        return;
    }
    Response::json(['exists' => false]);
  }

  public function login(string $uri, array $query, array $body)
  {
    try {
      // check authenticated users before logging in
      if (RouterSession::isAuthenticated()) {
        Response::json(['success' => false, 'error' => 'Already authenticated.']);
        return;
      }

      // Check if inputs are provided
      if (!isset($body['account']) || !isset($body['username']) || !isset($body['password'])) {
        Response::json(['success' => false, 'error' => 'Missing required inputs. '.json_encode($body) ], 400);
        return;
      }

      // Validate account type (admin, personnel, student)
      if (!in_array($body['account'], ['admin', 'personnel', 'student'])) {
        Response::json(['success' => false, 'error' => 'Invalid account type.'], 400);
        return;
      }

      $db = Database::getInstance();
      // Validate and sanitize inputs here
      $account = $body['account'];
      $username = $body['username'];
      $password = $body['password'];

      $condition = ['student_id' => $username];
      $class = Student::class;
      switch ($account) {
        case 'admin':
          $condition = ['admin_user' => $username];
          $class = Admin::class;
          break;
        case 'personnel':
          $condition = ['personnel_id' => $username];
          $class = Personnel::class;
          break;
      }
      $user = $db->findOne($account, $condition, $class);

      // Check if password matches
      if ($user && password_verify($password, $user->getPassword())) {
        switch ($account) {
          case 'admin':
            $userId = $user->getId();
            break;
          case 'personnel':
            $userId = $user->getPersonnelId();
            break;
          case 'student':
            $userId = $user->getStudentId();
            break;
        }
        // Create JWT token and update session data
        if (isset($userId)) {
          RouterSession::create($account, $userId, $user->getFullName());
          Response::json(['success' => true]);
          return;
        }
      }
      Response::json(['success' => false, 'error' => 'Invalid username or password.']);
    } catch (\Throwable $e) {
      Response::json(['success'=> false, 'error' => $e->getMessage()], 500);
    }
  }

  public function logout(string $uri, array $query, array $body)
  {
    // Check if authenticated users before logging out
    if (!RouterSession::isAuthenticated()) {
      Response::json(['success' => false, 'error' => 'Not authenticated.'], 401);
      return;
    }

    RouterSession::logout();

    Response::json(['success' => true]);
  }

  public function test(string $uri, array $query, array $body)
  {
    // Shows all table names exists in the database
    $db = Database::getInstance();
    $q = $db->getDb()->query("SHOW TABLES;");
    $tables = $q->fetchAll(PDO::FETCH_ASSOC);
    Response::json([
      "tables" => array_map(fn ($item) => $item["Tables_in_" . MYSQL_DATABASE], $tables, []),
      "count" => count($tables)
    ]);
  }
}
