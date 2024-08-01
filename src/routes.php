<?php

declare(strict_types=1);

namespace Smcc\ResearchHub;

use Smcc\ResearchHub\Controllers\ApiController;
use Smcc\ResearchHub\Controllers\ViewController;
use Smcc\ResearchHub\Router\Router;

/* STATIC FOLDERS */
Router::STATIC('/jsx', implode(DIRECTORY_SEPARATOR, [VIEW_PATH, 'jsx']), 'js');

/* GET METHOD */
Router::GET('/', ViewController::class, 'index');
Router::GET('/login', ViewController::class, 'studentLogin');
Router::GET('/admin/login', ViewController::class, 'adminLogin');
Router::GET('/teacher/login', ViewController::class, 'personnelLogin');
Router::GET('/api/test', ApiController::class, 'test'); // test api route


/* POST METHOD */

/* PUT METHOD */

/* PATCH METHOD */

/* DELETE METHOD */

/* ERROR PAGES */
Router::NOTFOUND(ViewController::class, 'notFound');
Router::ERROR(ViewController::class, 'error');
