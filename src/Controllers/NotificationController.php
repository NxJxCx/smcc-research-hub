<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use Smcc\ResearchHub\Logger\Logger;
use Smcc\ResearchHub\Models\AdminNotification;
use Smcc\ResearchHub\Models\Database;
use Smcc\ResearchHub\Models\PersonnelNotification;
use Smcc\ResearchHub\Models\StudentNotification;
use Smcc\ResearchHub\Router\Request;
use Smcc\ResearchHub\Router\Response;
use Smcc\ResearchHub\Router\Session as RouterSession;
use Smcc\ResearchHub\Router\StatusCode;

class NotificationController extends Controller
{
    public function getNotificationsStream(Request $request): Response
    {
      if (!RouterSession::isAuthenticated()) {
        return Response::json(['error' => 'Authentication required'], StatusCode::UNAUTHORIZED);
      }
      $accountType = RouterSession::getUserAccountType();
      $userId = RouterSession::getUserId();
      $unreadOnly = $request->getQueryParam('unread') === '1';

      return Response::stream([$this, "streamNotificationCallback"], [
        "accountType" => $accountType,
        "userId" => $userId,
        "unreadOnly" => $unreadOnly,
        "ni" => -1,
      ]);
    }

    private function streamNotificationCallback(callable $write, mixed $argsData, callable $setArgsData): void
    {
      $userId = $argsData['userId'];
      $accountType = $argsData['accountType'];
      $unreadOnly = $argsData['unreadOnly'];
      $ni = $argsData['ni'];
      $data = $this->getMyNotifications($userId, $accountType, $unreadOnly);
      if ($data === null) {
        return; // continue
      }

      if ($ni === -1 && count($data) === 0) {
        $setArgsData("ni", count($data));
        $write($data);
      } else if ($unreadOnly && count($data) !== $ni) {
        $setArgsData("ni", count($data));
        $write($data);
      } else if (!$unreadOnly && count(array_filter($data, fn($v) => !$v['is_read'])) !== $ni) {
        $setArgsData("ni", count(array_filter($data, fn($v) => !$v['is_read'])));
        $write($data);
      }
    }

    public function getNotifications(Request $request): Response
    {
      if (!RouterSession::isAuthenticated()) {
        return Response::json(['error' => 'Authentication required'], StatusCode::UNAUTHORIZED);
      }
      $accountType = RouterSession::getUserAccountType();
      $userId = RouterSession::getUserId();
      $unreadOnly = $request->getQueryParam('unread') === '1';
      $data = $this->getMyNotifications($userId, $accountType, $unreadOnly);
      return Response::json(['notifications' => $data, "length" => count($data)]);
    }

    private function getMyNotifications(string|int $myAccountId, string $myAccountType, bool $unreadOnly): array
    {
      $result = [];
      try {
        $db = Database::getInstance();
        switch($myAccountType) {
          case 'admin': {
            $modelClass = AdminNotification::class;
            $conditions = $unreadOnly ? ["admin_id" => $myAccountId, "is_read" => false] : ["admin_id" => $myAccountId];
            $result = array_map(fn($r) => $r->toArray(), $db->fetchMany($modelClass, $conditions));
          }
          case 'personnel': {
            $modelClass = PersonnelNotification::class;
            $conditions = $unreadOnly ? ["personnel_id" => $myAccountId, "is_read" => false] : ["personnel_id" => $myAccountId];
            $result = array_map(fn($r) => $r->toArray(), $db->fetchMany($modelClass, $conditions));
          }
          case 'student': {
            $modelClass = StudentNotification::class;
            $conditions = $unreadOnly ? ["student_id" => $myAccountId, "is_read" => false] : ["student_id" => $myAccountId];
            $result = array_map(fn($r) => $r->toArray(), $db->fetchMany($modelClass, $conditions));
          }
        };
      } catch (\Throwable $e) {
        Logger::write_error("Error fetching notifications: ". $e->getMessage());
      }

      return $result;
    }

    public function logs(): Response
    {
      $logContents = Logger::read_log_file();
      return Response::json(["data" => $logContents]);
    }
  }