<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use Smcc\ResearchHub\Router\Router;
use Smcc\ResearchHub\Router\Session;
use Smcc\ResearchHub\Views\Errors\ErrorPage;
use Smcc\ResearchHub\Views\Pages\Admin\AdminPages;
use Smcc\ResearchHub\Views\Pages\Admin\LoginPage as AdminLoginPage;
use Smcc\ResearchHub\Views\Pages\HomePage;
use Smcc\ResearchHub\Views\Pages\LogsPage;
use Smcc\ResearchHub\Views\Pages\Student\LoginPage;
use Smcc\ResearchHub\Views\Pages\Student\SignupPage;
use Smcc\ResearchHub\Views\Pages\Teacher\LoginPage as TeacherLoginPage;

class ViewController extends Controller
{

  public function index()
  {
    HomePage::view("Home");
  }

  public function adminLogin()
  {
    if (Session::isAuthenticated()) {
      if (Session::getUserAccountType() === "admin") {
        Router::redirect("/admin/dashboard");
      }
      Router::redirect("/");
    }
    AdminLoginPage::view("Admin Login");
  }

  public function studentLogin()
  {
    if (Session::isAuthenticated()) {
      Router::redirect("/");
    }
    LoginPage::view("Student Login");
  }

  public function teacherLogin()
  {
    if (Session::isAuthenticated()) {
      Router::redirect("/");
    }
    TeacherLoginPage::view("Teacher Login");
  }

  public function studentSignup()
  {
    if (Session::isAuthenticated()) {
      Router::redirect("/");
    }
    SignupPage::view("Student Registration");
  }

  public function redirectAdmin()
  {
    if (Session::isAuthenticated() && Session::getUserAccountType() === "admin") {
      Router::redirect("/admin/dashboard");
    } else {
      Router::redirect("/admin/login");
    }
  }

  public function adminDashboard()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    AdminPages::view("Admin Dashboard", 'admin/dashboard');
  }

  public function adminThesisList()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    AdminPages::view("Thesis List - Admin", 'admin/theses');
  }

  public function adminJournalList()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    AdminPages::view("Journal List - Admin", 'admin/journal');
  }

  public function adminDepartmentList()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    AdminPages::view("Department List - Admin", 'admin/departments');
  }

  public function adminRecentThesisDeployed()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    AdminPages::view("Recently Published - Admin", 'admin/recent');
  }

  public function adminAnnouncements()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    AdminPages::view("Announcements - Admin", 'admin/announcements');
  }

  public function adminDownloads()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    AdminPages::view("Downloads - Admin", 'admin/downloads');
  }

  public function adminStudentList()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    AdminPages::view("Student List - Admin", 'admin/students');
  }

  public function adminTeacherAccounts()
  {
    if (!Session::isAuthenticated() || Session::getUserAccountType() !== "admin") {
      Router::redirect("/admin/login");
    }
    AdminPages::view("Teacher Accounts - Admin", 'admin/teachers');
  }

  public function notFound()
  {
    ErrorPage::notFound("Page not found - {$this->head_title}");
  }
  public function error($message)
  {
    ErrorPage::internalServerError("Error 500 - {$this->head_title}", $message);
  }

  public function favicon()
  {
    readfile(implode(DIRECTORY_SEPARATOR, [ASSETS_PATH,  'favicon.ico']));
    exit;
  }

  public function logs()
  {
    LogsPage::view("Logs");
  }
}
