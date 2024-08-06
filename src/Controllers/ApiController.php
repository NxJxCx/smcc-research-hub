<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use PDO;
use Smcc\ResearchHub\Logger\Logger;
use Smcc\ResearchHub\Models\Admin;
use Smcc\ResearchHub\Models\AdminLogs;
use Smcc\ResearchHub\Models\Database;
use Smcc\ResearchHub\Models\Personnel;
use Smcc\ResearchHub\Models\PersonnelLogs;
use Smcc\ResearchHub\Models\Student;
use Smcc\ResearchHub\Models\StudentLogs;
use Smcc\ResearchHub\Router\Response;
use Smcc\ResearchHub\Router\Router;
use Smcc\ResearchHub\Router\Session as RouterSession;

class ApiController extends Controller
{

  public function index(string $uri, array $query, array $body)
  {
  }

  public function studentInfo(string $uri, array $query, array $body)
  {
    try {
      switch ($query['q']) {
        case 'exist':
          $db = Database::getInstance();
          $studentId = $query['id'];
          $student = $db->fetchOne(Student::class, ['student_id' => $studentId]);
          Response::json(['exists' => $student ? true : false]);
          return;
        case 'profile':
          $db = Database::getInstance();
          $studentId = $query['id'];
          $student = $db->fetchOne(Student::class, ['student_id' => $studentId]);
          $student = $student? $student->toArray() : [];
          Response::json(['data' => $student]);
          return;
      }
      Response::json(['error' => 'Bad Request'], 400);
    } catch (\Throwable $e) {
      Response::json(['error' => $e->getMessage()]);
    }
  }

  public function signup(string $uri, array $query, array $body)
  {
    try {
      // Check if inputs are provided
      if (!isset($body['account']) || !isset($body['username']) || !isset($body['full_name']) || !isset($body['password']) || !isset($body['email'])) {
        Response::json(['error' => 'Missing required inputs. ' . json_encode($body)], 400);
        return;
      }

      // Validate account type (admin, personnel, student)
      if (!in_array($body['account'], ['admin', 'personnel', 'student'])) {
        Response::json(['error' => 'Invalid account type.'], 400);
        return;
      }

      $accountType = $body['account'];
      // Validate and sanitize inputs here
      $data = match ($accountType) {
        'admin' => [
          'admin_user' => $body['username'],
          'full_name' => $body['full_name'],
          'email' => $body['email'],
          'password' => password_hash($body['password'], PASSWORD_DEFAULT),
        ],
        'personnel' => [
          'personnel_id' => $body['username'],
          'full_name' => $body['full_name'],
          'email' => $body['email'],
          'password' => password_hash($body['password'], PASSWORD_DEFAULT),
        ],
        'student' => [
          'student_id' => $body['username'],
          'full_name' => $body['full_name'],
          'email' => $body['email'],
          'password' => password_hash($body['password'], PASSWORD_DEFAULT),
          'department' => $body['department'],
          'course' => $body['course'],
          'year' => intval($body['year']),
        ],
      };
      switch ($accountType) {
        case 'admin':
          $model = new Admin($data);
          $id = $model->create();
          (new AdminLogs(['admin_id' => $id, 'activity' => "Admin ID: {$id}, username: {$model->admin_user}, fullname: {$model->full_name} has newly been registered"]))->create();
          break;
        case 'personnel':
          $model = new Personnel($data);
          $id = $model->create(true);
          (new PersonnelLogs(['personnel_id' => $id, 'activity' => "Personnel ID: {$id}, fullname: {$model->full_name} has newly been registered"]))->create();
          break;
        case 'student':
          $id_pattern = "/^20\\d{7}$/";
          $name_pattern = "/^[A-ZÑ]+(?: [A-ZÑ]+)*?(?: [A-ZÑ]\\. )?(?:[A-ZÑ]+(?: [A-ZÑ]+)*)?(?: (?:III|IV|V|VI|VII|VIII|IX|X))?$/";
          if (!preg_match($id_pattern, $data['student_id']) || !preg_match($name_pattern, $data['full_name'])) {
            Response::json(['success' => false, 'error' => 'Invalid student ID format.']);
            return;
          }
          $model = new Student($data);
          try {
            $id = $model->create(true);
            Logger::write_debug("ID Registered is: {$id}");
            (new StudentLogs(['student_id' => $id, 'activity' => "Student ID: {$id}, fullname: {$body['full_name']} has newly been registered"]))->create();
          } catch (\PDOException $e) {
            Response::json(['success' => false, 'error' => $e->getMessage()]);
            return;
          }
        break;
      }
      Logger::write_info("Account registered: accountType={$accountType}, databaseId={$id}, full_name={$body['full_name']}");
      Response::json(['success' => true]);
    } catch (\Throwable $e) {
      $b = json_encode($body);
      Logger::write_error("BODY: $b");
      Response::json(['error' => $e->getMessage()], 500);
    }
    Response::json(['error' => 'Invalid Request'], 500);
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
        Response::json(['error' => 'Missing required inputs. ' . json_encode($body)], 400);
        return;
      }

      // Validate account type (admin, personnel, student)
      if (!in_array($body['account'], ['admin', 'personnel', 'student'])) {
        Response::json(['error' => 'Invalid account type.'], 400);
        return;
      }

      $db = Database::getInstance();
      // Validate and sanitize inputs here
      $account = $body['account'];
      $username = $body['username'];
      $password = $body['password'];

      $condition = ['student_id' => $username];
      $modelClass = Student::class;
      switch ($account) {
        case 'admin':
          $condition = ['admin_user' => $username];
          $modelClass = Admin::class;
          break;
        case 'personnel':
          $condition = ['personnel_id' => $username];
          $modelClass = Personnel::class;
          break;
      }
      $user = $db->fetchOne($modelClass, $condition);

      // Check if password matches
      if ($user && password_verify($password, $user->password)) {
        $userId = match ($account) {
          'admin' => $user->id,
          'personnel' => $user->personnel_id,
          'student' => $user->student_id,
        };
        Logger::write_debug("User found: account={$account}, id={$userId}, full_name={$user->full_name}");
        // Create JWT token and update session data
        if ($userId) {
          Logger::write_debug("User authenticated: account={$account}, id={$userId}");
          RouterSession::create($account, $userId, $user->full_name);
          Logger::write_debug("User done: account={$account}, id={$userId}");
          $clientIp = RouterSession::getClientIpAddress();
          switch ($account) {
            case 'admin':
              (new AdminLogs(['admin_id' => $userId, 'activity' => "Logged in at {$clientIp}"]))->create();
              break;
            case 'personnel':
              (new PersonnelLogs(['personnel_id' => $userId, 'activity' => "Logged in at {$clientIp}"]))->create();
              break;
            case 'student':
              (new StudentLogs(['student_id' => $userId, 'activity' => "Logged in at {$clientIp}"]))->create();
              break;
          }

          Logger::write_debug("User logged in: account={$account}, id={$userId}, full_name={$user->full_name}");
          Response::json(['success' => true]);
          return;
        }
      }
      Response::json(['success' => false, 'error' => 'Invalid username or password.']);
    } catch (\Throwable $e) {
      Response::json(['error' => $e->getMessage()], 500);
    }
    Response::json(['error' => 'Bad Request'], 400);
  }

  public function logout(string $uri, array $query, array $body)
  {
    // Check if authenticated users before logging out
    if (!RouterSession::isAuthenticated()) {
      Logger::write_info("Attempted to log out without being authenticated. IP: {RouterSession::getClientIpAddress()}");
      Response::json(['success' => false, 'error' => 'Not authenticated.'], 401);
      return;
    }

    RouterSession::logout();
    Router::redirect('/');
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
