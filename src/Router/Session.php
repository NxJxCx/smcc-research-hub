<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Router;

use Smcc\ResearchHub\Logger\Logger;
use Smcc\ResearchHub\Models\Database;
use Smcc\ResearchHub\Models\Session as SessionModel;

class Session
{
  public static function index(): void
  {
    if (!Cookies::has('session_id')) {
      Logger::write_debug("No session cookie found");
      $cookieSession = Cookies::set('session_id', bin2hex(random_bytes(16)), 60 * 60 * 8);
      // Initialize session data to database
      $session = new SessionModel(['session_id' => $cookieSession]);
      $session->create();
      Logger::write_info("New session created: session_id={$cookieSession}");
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

  public static function create(string $account, int $id, string $full_name): bool
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
    Logger::write_debug("User auth session created for: account={$account}, id={$id}, full_name={$full_name}");
    return self::isAuthenticated();
  }

  public static function getUserFullName(): ?string
  {
    return self::isAuthenticated() ? json_decode($_SESSION['auth'], true)['full_name'] : null;
  }

  public static function getUserId(): ?string
  {
    return self::isAuthenticated() ? json_decode($_SESSION['auth'], true)['id'] : null;
  }

  public static function getUserAccountType(): ?string
  {
    return self::isAuthenticated() ? json_decode($_SESSION['auth'], true)['account'] : null;
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

  public static function getClientIpAddress()
  {
    // Check for the forwarded IP address from proxies
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        // Check if the IP is from a shared internet
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // Check if the IP is passed from a proxy
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        // Default to the remote address
        $ip = $_SERVER['REMOTE_ADDR'];
    }

    return filter_var($ip, FILTER_VALIDATE_IP);
}
}
