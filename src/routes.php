<?php

declare(strict_types=1);

namespace Smcc\ResearchHub;

use Smcc\ResearchHub\Controllers\ApiController;
use Smcc\ResearchHub\Controllers\ViewController;
use Smcc\ResearchHub\Router\Router;
use Smcc\ResearchHub\Router\Session;

// initialize session_id for session tracking
Session::index();

/* STATIC FOLDERS */
Router::STATIC('/jsx', REACT_DIST_PATH, 'js');

/* GET METHOD */
Router::GET('/', ViewController::class, 'index');
Router::GET('/login', ViewController::class, 'studentLogin');
Router::GET('/admin/login', ViewController::class, 'adminLogin');
Router::GET('/teacher/login', ViewController::class, 'personnelLogin');
Router::GET('/signup', ViewController::class, 'studentSignup');
Router::GET('/admin/dashboard', ViewController::class, 'adminDashboard');
/* API GET METHOD */
Router::GET('/api/test', ApiController::class, 'test'); // test api route
Router::GET('/api/student', ApiController::class, 'studentInfo');

/* POST METHOD */
Router::POST('/logout', ApiController::class, 'logout');
Router::POST('/api/login', ApiController::class, 'login');
Router::POST('/api/signup', ApiController::class, 'signup');

/* PUT METHOD */

/* PATCH METHOD */

/* DELETE METHOD */

/* ERROR PAGES */
Router::NOTFOUND(ViewController::class, 'notFound');
Router::ERROR(ViewController::class, 'error');
