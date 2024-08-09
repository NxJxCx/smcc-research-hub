<?php

declare(strict_types=1);

namespace Smcc\ResearchHub;

use Smcc\ResearchHub\Controllers\ApiController;
use Smcc\ResearchHub\Controllers\FileController;
use Smcc\ResearchHub\Controllers\NotificationController;
use Smcc\ResearchHub\Controllers\ViewController;
use Smcc\ResearchHub\Router\Router;
use Smcc\ResearchHub\Router\Session;

// initialize session_id for session tracking
Session::index();

/* STATIC FOLDERS */
Router::STATIC('/jsx', REACT_DIST_PATH, 'js');

/* GET METHOD */
Router::GET('/', [ViewController::class, 'index']);
Router::GET('/login', [ViewController::class, 'studentLogin']);
Router::GET('/admin/login', [ViewController::class, 'adminLogin']);
Router::GET('/teacher/login', [ViewController::class, 'personnelLogin']);
Router::GET('/signup', [ViewController::class, 'studentSignup']);
Router::GET('/admin', [ViewController::class, 'redirectAdmin']);
Router::GET('/admin/dashboard', [ViewController::class, 'adminDashboard']);
Router::GET('/admin/theses', [ViewController::class, 'adminThesisList']);
Router::GET('/admin/journal', [ViewController::class, 'adminJournalList']);
Router::GET('/admin/departments', [ViewController::class, 'adminDepartmentList']);
Router::GET('/admin/recent', [ViewController::class, 'adminRecentThesisDeployed']);
Router::GET('/admin/announcements', [ViewController::class, 'adminAnnouncements']);
Router::GET('/admin/downloads', [ViewController::class, 'adminDownloads']);
Router::GET('/admin/students', [ViewController::class, 'adminStudentList']);
Router::GET('/admin/teachers', [ViewController::class, 'adminTeacherAccounts']);
Router::GET('/teacher/login', [ViewController::class, 'teacherLogin']);
Router::GET('/read/thesis', [FileController::class, 'viewPdfFile']);
Router::GET('/read/journal', [FileController::class, 'viewPdfFile']);
Router::GET('/download/thesis', [FileController::class, 'downloadPdfFile']);
Router::GET('/download/journal', [FileController::class, 'downloadPdfFile']);
Router::GET('/logs', [ViewController::class, 'logs']);
Router::GET('/logs/test', function() {
?>
<body>
  <script>
    (function() {
    console.log('API test route hit');
    const eventSource = new EventSource('/api/stream/logs');
    eventSource.onmessage = (event) => {
      console.log('Received log:', event.data);
    };
    eventSource.onerror = (event, msg) => {
      console.error('Error:', event);
      console.log("MESSAGE:", msg);
    };
    eventSource.onopen = () => {
      console.log("event has open")
    }
    eventSource.onclose = () => {
      console.log("event has close")
    }
  })();
  </script>
</body>
<?php
});

/* API GET METHOD */
Router::GET('/api/test', [ApiController::class, 'test']); // test api route
Router::GET('/api/student', [ApiController::class, 'studentInfo']);
Router::GET('/api/thesis/all', [ApiController::class, 'thesisList']);
Router::GET('/api/journal/all', [ApiController::class, 'journalList']);
Router::GET('/api/dashboard/statistics', [ApiController::class, 'dashboardStatistics']);
Router::GET('/api/stream/logs', [NotificationController::class, 'logs']);

/* POST METHOD */
Router::POST('/logout', [ApiController::class, 'logout']);
Router::POST('/api/login', [ApiController::class, 'login']);
Router::POST('/api/signup', [ApiController::class, 'signup']);
Router::POST('/api/upload/pdf', [FileController::class, 'uploadPdf']);
Router::POST('/api/upload/images', [FileController::class, 'uploadImages']);

/* PUT METHOD */

/* PATCH METHOD */

/* DELETE METHOD */
Router::DELETE('/api/thesis/delete', [ApiController::class, 'deleteThesis']);
Router::DELETE('/api/journal/delete', [ApiController::class, 'deleteJournal']);

/* ERROR PAGES */
Router::NOTFOUND([ViewController::class, 'notFound']);
Router::ERROR([ViewController::class, 'error']);
