<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Router;

use Smcc\ResearchHub\Config\Logger;
use Smcc\ResearchHub\Models\Database;
use Smcc\ResearchHub\Models\Session as SessionModel;

class Session
{
  public static function index(): void
  {
    if (!Cookies::has('session_id')) {
      Cookies::set('session_id', bin2hex(random_bytes(16)), 60 * 60 * 8);
      // Initialize session data to database
      $session = new SessionModel(['session_id' => Cookies::get('session_id')]);
      $id = $session->create();
      Logger::write_info("New session created: session_id={$id}");
    }
  }

  public static function getSession(): ?array
  {
    return self::isAuthenticated() ? $_SESSION['auth'] : null;
  }

  public static function isAuthenticated(): bool
  {
    // Check cookies for session_id and validate it with the database
    $session_cookie = Cookies::get('session_id');
    if (!$session_cookie) {
      unset($_SESSION['auth']);
      return false;
    }
    // Validate session_id in the database
    $db = Database::getInstance();
    $session = $db->fetchOne(SessionModel::class, ['session_id' => $session_cookie]);

    if ($session && $session->getToken() !== null) {
      // decode JWT token to get user id and expiration time
      $payload = JWT::decode($session->getToken());
      if ($payload && $payload['id'] === $session->getSessionId() && $payload['exp'] > time()) {
        $_SESSION['auth'] = json_encode($payload['data']);
        return true;
      }
    }
    unset($_SESSION['auth']);
    return false;
  }

  public static function create(string $account, int $id, string $full_name): void
  {
    $db = Database::getInstance();
    $token = JWT::encode([
      'account' => $account,
      'id' => $id,
      'full_name' => $full_name
    ]);

    $cookie_session = Cookies::get('session_id');
    if (!$cookie_session) {
      $session_id = bin2hex(random_bytes(16));
      Cookies::set('session_id', $session_id, 60 * 60 * 8);
    }
    $session = $db->fetchOne(SessionModel::class, ['session_id' => $session_id]);
    if (!$session) {
      $session = new SessionModel(['session_id' => $session_id, 'token' => $token]);
      $session->create();
    } else {
      $session->token = $token;
      $session->update();
    }
    $_SESSION['auth'] = json_encode(['account' => $account, 'id' => $id, 'full_name' => $full_name]);
    Logger::write_info("User authenticated: account={$account}, id={$id}, full_name={$full_name}");
  }

  public static function logout(): void
  {
    $session_cookie = Cookies::get('session_id');
    if ($session_cookie) {
      $db = Database::getInstance();
      $session = $db->fetchOne(SessionModel::class, ['session_id' => $session_cookie]);
      $session->delete();
      Cookies::delete('session_id');
    }
    unset($_SESSION['auth']);
    Logger::write_info("User logged out");
  }
}
