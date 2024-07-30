<?php

declare(strict_types=1);

namespace Smcc\ResearchHub;

use Smcc\ResearchHub\Controllers\ApiController;
use Smcc\ResearchHub\Controllers\ViewController;
use Smcc\ResearchHub\Router\Router;

/* STATIC FOLDERS */
Router::STATIC("/assets/", implode(DIRECTORY_SEPARATOR, [APP_PATH, 'src', 'Views', 'static']));
Router::STATIC('/react/', implode(DIRECTORY_SEPARATOR, [APP_PATH, 'src', 'Views', 'react']), "jsx");

/* GET METHOD */
Router::GET('/', ViewController::class, 'index');
Router::GET('/admin/login', ViewController::class, 'adminLogin');
Router::GET('/teacher/login', ViewController::class, 'personnelLogin');
Router::GET('/student/login', ViewController::class, 'studentLogin');
Router::GET('/api/test', ApiController::class, 'test'); // test api route


/* POST METHOD */

/* PUT METHOD */

/* PATCH METHOD */

/* DELETE METHOD */

/* ERROR PAGES */
Router::NOTFOUND(ViewController::class, 'notFound');
Router::ERROR(ViewController::class, 'error');
