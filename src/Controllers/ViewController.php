<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use Smcc\ResearchHub\Router\Router;
use Smcc\ResearchHub\Router\Session;
use Smcc\ResearchHub\Views\Global\View;
use Smcc\ResearchHub\Views\Pages\Admin\AdminPages;
use Smcc\ResearchHub\Views\Pages\Admin\ReactPages;
use Smcc\ResearchHub\Views\Pages\Error400Page;
use Smcc\ResearchHub\Views\Pages\Error500Page;
use Smcc\ResearchHub\Views\Pages\HomePage;
use Smcc\ResearchHub\Views\Pages\UserPages;

class ViewController extends Controller
{

  public function home(): View
  {
    $authData = Session::isAuthenticated() ? [
      'account' => Session::getUserAccountType(),
      'full_name' => Session::getUserFullName(),
      'id' => Session::getUserId(),
    ] : [];
    $data = ['authenticated' => Session::isAuthenticated(), 'authData' => $authData];
    return HomePage::view("Home", $data, "/jsx/home");
  }

  public function adminLogin(): View
  {
    if (Session::isAuthenticated()) {
      if (Session::getUserAccountType() === "admin") {
        Router::redirect("/admin/dashboard");
      }
      Router::redirect("/");
    }
    return ReactPages::view("Admin Login", [], '/jsx/admin/login');
  }

  public function studentLogin(): View
  {
    if (Session::isAuthenticated()) {
      Router::redirect("/");
    }
    return ReactPages::view("Student Login", [], '/jsx/student/login');
  }

  public function teacherLogin(): View
  {
    if (Session::isAuthenticated()) {
      Router::redirect("/");
    }
    return ReactPages::view("Teacher Login", [], '/jsx/teacher/login');
  }

  public function studentSignup(): View
  {
    if (Session::isAuthenticated()) {
      Router::redirect("/");
    }
    $data = ['authenticated' => Session::isAuthenticated()];
    return ReactPages::view("Student Registration", $data, '/jsx/student/signup');
  }

  public function redirectAdmin(): void
  {
    if (Session::isAuthenticated() && Session::getUserAccountType() === "admin") {
      Router::redirect("/admin/dashboard");
    }
    Router::redirect("/admin/login");
  }

  public function adminDashboard(): View
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    return AdminPages::view("Admin Dashboard", [], '/jsx/admin/dashboard');
  }

  public function adminThesisList()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    return AdminPages::view("Thesis List - Admin", [], '/jsx/admin/theses');
  }

  public function adminJournalList(): View
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    return AdminPages::view("Journal List - Admin", [], '/jsx/admin/journal');
  }

  public function adminDepartmentList(): View
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    return AdminPages::view("Department List - Admin", [], '/jsx/admin/departments');
  }

  public function adminRecentThesisDeployed(): View
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    return AdminPages::view("Recently Published - Admin", [], '/jsx/admin/recent');
  }

  public function adminAnnouncements(): View
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    return AdminPages::view("Announcements - Admin", [], '/jsx/admin/announcements');
  }

  public function adminDownloads()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    return AdminPages::view("Downloads - Admin", [], '/jsx/admin/downloads');
  }

  public function adminStudentList()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    return AdminPages::view("Student List - Admin", [], '/jsx/admin/students');
  }

  public function adminTeacherAccounts()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    return AdminPages::view("Teacher Accounts - Admin", [], '/jsx/admin/teachers');
  }

  public function thesis(): View
  {
    $authData = Session::isAuthenticated() ? [
      'account' => Session::getUserAccountType(),
      'full_name' => Session::getUserFullName(),
      'id' => Session::getUserId(),
    ] : [];
    $data = ['authenticated' => Session::isAuthenticated(), 'authData' => $authData];
    return UserPages::view("Thesis/Capstone", $data, '/jsx/main/thesis');
  }

  public function notFound(): View
  {
    return Error400Page::view("Page not found - {$this->head_title}");
  }
  public function error($message): View
  {
    return Error500Page::view("Error 500 - {$this->head_title}", ["message" => $message]);
  }

  public function favicon(): void
  {
    readfile(implode(DIRECTORY_SEPARATOR, [ASSETS_PATH,  'favicon.ico']));
    exit;
  }

  public function logs()
  {
    return ReactPages::view("Logs", [], "/jsx/logs");
  }
}
