<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use Smcc\ResearchHub\Logger\Logger;
use Smcc\ResearchHub\Models\Admin;
use Smcc\ResearchHub\Models\AdminLogs;
use Smcc\ResearchHub\Models\Database;
use Smcc\ResearchHub\Models\Journal;
use Smcc\ResearchHub\Models\Personnel;
use Smcc\ResearchHub\Models\PersonnelLogs;
use Smcc\ResearchHub\Models\Student;
use Smcc\ResearchHub\Models\StudentLogs;
use Smcc\ResearchHub\Models\Thesis;
use Smcc\ResearchHub\Router\Request;
use Smcc\ResearchHub\Router\Response;
use Smcc\ResearchHub\Router\Session as RouterSession;
use Smcc\ResearchHub\Router\StatusCode;

class ApiController extends Controller
{

  public function studentInfo(Request $request): Response
  {
    $q = $request->getQueryParam("q");
    try {
      switch ($q) {
        case 'exist':
          $db = Database::getInstance();
          $studentId = $request->getQueryParam('id');
          $student = $db->fetchOne(Student::class, ['student_id' => $studentId]);
          return Response::json(['exists' => $student ? true : false]);
        case 'profile':
          $db = Database::getInstance();
          $studentId = $request->getQueryParam('id');
          $student = $db->fetchOne(Student::class, ['student_id' => $studentId]);
          $student = $student ? $student->toArray() : [];
          return Response::json(['data' => $student]);
      }
      return Response::json(['error' => 'Bad Request'], StatusCode::BAD_REQUEST);
    } catch (\Throwable $e) {
      return Response::json(['error' => $e->getMessage()]);
    }
  }

  public function signup(Request $request): Response
  {
    $body = $request->getBody();
    try {
      // Check if inputs are provided
      if (!isset($body['account']) || !isset($body['username']) || !isset($body['full_name']) || !isset($body['password']) || !isset($body['email'])) {
        return Response::json(['error' => 'Missing required inputs. ' . json_encode($body)], StatusCode::BAD_REQUEST);
      }

      // Validate account type (admin, personnel, student)
      if (!in_array($body['account'], ['admin', 'personnel', 'student'])) {
        return Response::json(['error' => 'Invalid account type.'], StatusCode::BAD_REQUEST);
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
            return Response::json(['success' => false, 'error' => 'Invalid student ID format.']);
          }
          $model = new Student($data);
          try {
            $id = $model->create(true);
            Logger::write_debug("ID Registered is: {$id}");
            (new StudentLogs(['student_id' => $id, 'activity' => "Student ID: {$id}, fullname: {$body['full_name']} has newly been registered"]))->create();
          } catch (\PDOException $e) {
            return Response::json(['success' => false, 'error' => $e->getMessage()]);
          }
          break;
      }
      Logger::write_info("Account registered: accountType={$accountType}, databaseId={$id}, full_name={$body['full_name']}");
      return Response::json(['success' => true]);
    } catch (\Throwable $e) {
      $b = json_encode($body);
      Logger::write_error("BODY: $b");
      return Response::json(['error' => $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }

  public function login(Request $request): Response
  {
    $body = $request->getBody();
    try {
      // check authenticated users before logging in
      if (RouterSession::isAuthenticated()) {
        return Response::json(['success' => false, 'error' => 'Already authenticated.']);
      }

      // Check if inputs are provided
      if (!isset($body['account']) || !isset($body['username']) || !isset($body['password'])) {
        return Response::json(['error' => 'Missing required inputs. ' . json_encode($body)], StatusCode::BAD_REQUEST);
      }

      // Validate account type (admin, personnel, student)
      if (!in_array($body['account'], ['admin', 'personnel', 'student'])) {
        return Response::json(['error' => 'Invalid account type.'], StatusCode::BAD_REQUEST);
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
          return Response::json(['success' => true]);
        }
      }
      return Response::json(['success' => false, 'error' => 'Invalid username or password.']);
    } catch (\Throwable $e) {
      return Response::json(['error' => $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }

  public function logout(): Response
  {
    // Check if authenticated users before logging out
    if (!RouterSession::isAuthenticated()) {
      Logger::write_info("Attempted to log out without being authenticated. IP: {RouterSession::getClientIpAddress()}");
      return Response::json(['error' => 'Not authenticated.'], StatusCode::UNAUTHORIZED);
    }

    RouterSession::logout();
    return Response::redirect('/');
  }

  public function thesisList(): Response
  {
    if (!RouterSession::isAuthenticated()) {
      return Response::json(['error' => 'Not authenticated.'], StatusCode::UNAUTHORIZED);
    }
    try {
      $db = Database::getInstance();
      $thesis = $db->getAllRows(Thesis::class);
      return Response::json(['success' => array_map(fn($t) => $t->toArray(), $thesis)]);
    } catch (\Throwable $e) {
      return Response::json(['error'=> $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }
  public function journalList(): Response
  {
    if (!RouterSession::isAuthenticated()) {
      return Response::json(['error' => 'Not authenticated.'], StatusCode::UNAUTHORIZED);
    }
    try {
      $db = Database::getInstance();
      $thesis = $db->getAllRows(Journal::class);
      return Response::json(['success' => array_map(fn($t) => $t->toArray(), $thesis)]);
    } catch (\Throwable $e) {
      return Response::json(['error'=> $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }

  public function dashboardStatistics(): Response
  {
    if (!RouterSession::isAuthenticated() || RouterSession::getUserAccountType() !== 'admin') {
      return Response::json(['error' => 'Not authenticated.'], StatusCode::UNAUTHORIZED);
    }
    try {
      $db = Database::getInstance();
      $thesis = Thesis::getRowCount();
      $journal = Journal::getRowCount();
      $student = Student::getRowCount();
      $personnel = Personnel::getRowCount();
      $thesisPublished = count($db->fetchMany(Thesis::class, ['published' => true]));
      $journalPublished = count($db->fetchMany(Journal::class, ['published' => true]));
      $weeklyThesisReads = 0; // TODO: implement weekly reads statistics
      $weeklyJournalReads = 0; // TODO: implement weekly reads statistics
      return Response::json(['success' => [
        "theses" => $thesis,
        "journals" => $journal,
        "publishedTheses" => $thesisPublished,
        "publishedJournals" => $journalPublished,
        "students" => $student,
        "teachers" => $personnel,
        "weeklyThesisReads" => $weeklyThesisReads,
        "weeklyJournalReads" => $weeklyJournalReads,
      ]]);
    } catch (\Throwable $e) {
      return Response::json(['error'=> $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }

  public function deleteThesis(Request $request): Response
  {
    if (!RouterSession::isAuthenticated() || RouterSession::getUserAccountType() !== 'admin') {
      return Response::json(['error' => 'Not authenticated.'], StatusCode::UNAUTHORIZED);
    }
    $id = $request->getQueryParam('id');
    if (!$id) {
      return Response::json(['error' => 'Missing thesis ID.'], StatusCode::BAD_REQUEST);
    }
    try {
      $thesis = Database::getInstance()->fetchOne(Thesis::class, ['id' => $id]);
      // remove the file associated with the thesis
      $queryString = explode("?", $thesis->url)[1];
      $params = [];
      parse_str($queryString, $params);
      if (isset($params['filename'])) {
        $filename = $params['filename'] . ".pdf";
        try {
          // remove the file from the server
          unlink(implode(DIRECTORY_SEPARATOR, [UPLOADS_PATH, "thesis", $filename]));
          Logger::write_info("Deleted thesis file: {$filename}");
        } catch (\Throwable $e) {
          Logger::write_debug("Failed to delete thesis file: {$filename}");
        }
      }
      $thesis->delete();
      return Response::json(['success'=> true]);
    } catch (\PDOException $e) {
      return Response::json(['error' => $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }

  public function deleteJournal(Request $request): Response
  {
    if (!RouterSession::isAuthenticated() || RouterSession::getUserAccountType() !== 'admin') {
      return Response::json(['error' => 'Not authenticated.'], StatusCode::UNAUTHORIZED);
    }
    $id = $request->getQueryParam('id');
    if (!$id) {
      return Response::json(['error' => 'Missing journal ID.'], StatusCode::BAD_REQUEST);
    }
    try {
      $journal = Database::getInstance()->fetchOne(Journal::class, ['id' => $id]);
      // remove the file associated with the journal
      $queryString = explode("?", $journal->url)[1];
      $params = [];
      parse_str($queryString, $params);
      if (isset($params['filename'])) {
        $filename = $params['filename'] . ".pdf";
        try {
          // remove the file from the server
          unlink(implode(DIRECTORY_SEPARATOR, [UPLOADS_PATH, "journal", $filename]));
          Logger::write_info("Deleted journal file: {$filename}");
        } catch (\Throwable $e) {
          Logger::write_debug("Failed to delete journal file: {$filename}");
        }
      }
      $journal->delete();
      return Response::json(['success'=> true]);
    } catch (\PDOException $e) {
      return Response::json(['error' => $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }

  public function allStudents(Request $request)
  {
    if (!RouterSession::isAuthenticated() || !RouterSession::getUserAccountType() === 'admin') {
      return Response::json(['error' => 'Not authenticated.'], StatusCode::UNAUTHORIZED);
    }
    try {
      $db = Database::getInstance();
      $students = $db->getAllRows(Student::class);
      return Response::json(['success' => array_map(fn($s) => $s->toArray(), $students)]);
    } catch (\Throwable $e) {
      return Response::json(['error'=> $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }

  public function allPersonnels(Request $request)
  {
    if (!RouterSession::isAuthenticated() || !RouterSession::getUserAccountType() === 'admin') {
      return Response::json(['error' => 'Not authenticated.'], StatusCode::UNAUTHORIZED);
    }
    try {
      $db = Database::getInstance();
      $personnel = $db->getAllRows(Personnel::class);
      return Response::json(['success' => array_map(fn($s) => $s->toArray(), $personnel)]);
    } catch (\Throwable $e) {
      return Response::json(['error'=> $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }

  public function deleteStudent(Request $request): Response
  {
    if (!RouterSession::isAuthenticated() || RouterSession::getUserAccountType() !== 'admin') {
      return Response::json(['error' => 'Not authenticated.'], StatusCode::UNAUTHORIZED);
    }
    $id = $request->getQueryParam('id');
    if (!$id) {
      return Response::json(['error' => 'Missing Student ID.'], StatusCode::BAD_REQUEST);
    }
    try {
      $student = Database::getInstance()->fetchOne(Student::class, ['student_id' => $id]);
      $student->delete();
      return Response::json(['success'=> true]);
    } catch (\PDOException $e) {
      return Response::json(['error' => $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }

  public function deletePersonnel(Request $request): Response
  {
    if (!RouterSession::isAuthenticated() || RouterSession::getUserAccountType() !== 'admin') {
      return Response::json(['error' => 'Not authenticated.'], StatusCode::UNAUTHORIZED);
    }
    $id = $request->getQueryParam('id');
    if (!$id) {
      return Response::json(['error' => 'Missing Teacher ID.'], StatusCode::BAD_REQUEST);
    }
    try {
      $personnel = Database::getInstance()->fetchOne(Personnel::class, ['personnel_id' => $id]);
      $personnel->delete();
      return Response::json(['success'=> true]);
    } catch (\PDOException $e) {
      return Response::json(['error' => $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
    }
  }
}
