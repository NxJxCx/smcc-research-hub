<?php

declare(strict_types=1);

define('APP_TITLE', $_ENV['APP_TITLE'] ?? 'SMCC Research Hub');

define('MYSQL_HOST', $_ENV['MYSQL_HOST'] ?? 'localhost');
define('MYSQL_PORT', $_ENV['MYSQL_POST'] ?? '3306');
define('MYSQL_DATABASE', $_ENV['MYSQL_DATABASE'] ?? 'researchhub');
define('MYSQL_USER', $_ENV['MYSQL_USER'] ?? 'smcc');
define('MYSQL_PASSWORD', $_ENV['MYSQL_PASSWORD'] ?? 'smccMySql');

define('ASSETS_PATH', implode(DIRECTORY_SEPARATOR, [APP_PATH, 'public']));
define('VIEW_PATH', implode(DIRECTORY_SEPARATOR, [APP_PATH, 'src', 'Views']));
define('REACT_SRC_PATH', implode(DIRECTORY_SEPARATOR, [APP_PATH, 'src', 'Views', 'react', 'src']));
define('REACT_DIST_PATH', implode(DIRECTORY_SEPARATOR, [APP_PATH, 'src', 'Views', 'react', 'dist']));

define('JWT_SECRET_KEY', $_ENV['JWT_SECRET_KEY'] ?? 'researchhub_secret_key');

// set DISPLAY_ERRORS to false if in production environment to hide error messages
define('DISPLAY_ERRORS', $_ENV['DISPLAY_ERRORS'] ?? true);

define('MIMETYPES', [
  '' => 'application/octet-stream',
  '.txt' => 'text/plain; charset=utf-8',
  '.jpg' => 'image/jpeg; charset=utf-8',
  '.png' => 'image/png; charset=utf-8',
  '.gif' => 'image/gif; charset=utf-8',
  '.pdf' => 'application/pdf; charset=utf-8',
  '.css' => 'text/css; charset=utf-8',
  '.ico' => 'image/x-icon; charset=utf-8',
  '.svg' => 'image/svg+xml; charset=utf-8',
  '.html' => 'text/html; charset=utf-8',
  '.php' => 'text/html; charset=utf-8',
  '.js' => 'application/javascript; charset=utf-8',
  '.mjs' => 'application/javascript; charset=utf-8',
  '.ts' => 'application/javascript; charset=utf-8',
  '.tsx' => 'application/javascript; charset=utf-8',
  '.jsx' => 'application/javascript; charset=utf-8',
  '.zip' => 'application/zip; charset=utf-8',
  '.docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.csv' => 'text/csv; charset=utf-8',
  '.odt' => 'application/vnd.oasis.opendocument.text',
  '.ods' => 'application/vnd.oasis.opendocument.spreadsheet',
  '.pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.ppt' => 'application/vnd.ms-powerpoint',
  '.rtf' => 'application/rtf',
  '.eot' => 'application/vnd.ms-fontobject',
  '.ttf' => 'application/x-font-ttf; charset=utf-8',
  '.woff' => 'application/font-woff',
  '.woff2' => 'application/font-woff2',
  '.json' => 'application/json; charset=utf-8',
  '.mp4' => 'video/mp4; charset=utf-8',
  '.mp3' => 'audio/mpeg; charset=utf-8',
  '.wav' => 'audio/wav; charset=utf-8',
  '.avi' => 'video/x-msvideo; charset=utf-8',
  '.mov' => 'video/quicktime; charset=utf-8',
  '.flv' => 'video/x-flv; charset=utf-8',
  '.m4a' => 'audio/mp4; charset=utf-8',
  '.m4v' => 'video/x-m4v; charset=utf-8',
  '.ogv' => 'video/ogg; charset=utf-8',
  '.webm' => 'video/webm; charset=utf-8',
  '.3gp' => 'video/3gpp; charset=utf-8',
  '.mkv' => 'video/x-matroska; charset=utf-8',
  '.wmv' => 'video/x-ms-wmv; charset=utf-8',
  '.asf' => 'video/x-ms-asf; charset=utf-8',
  '.mpg' => 'video/mpeg; charset=utf-8',
  '.m2v' => 'video/mpeg; charset=utf-8',
  '.mng' => 'video/x-mng; charset=utf-8',
  '.mpe' => 'video/mpeg; charset=utf-8',
  '.qt' => 'video/quicktime; charset=utf-8',
  '.lsf' => 'video/x-la-asf',
  '.ls' => 'video/x-la-asf',
  '.ram' => 'audio/x-pn-realaudio',
  '.rm' => 'application/vnd.rn-realmedia',
  '.rpm' => 'audio/x-pn-realaudio-plugin',
  '.ra' => 'audio/x-realaudio',
  '.cda' => 'audio/x-cda',
  '.mid' => 'audio/midi',
  '.kar' => 'audio/midi',
  '.m3u' => 'audio/x-mpegurl; charset=utf-8',
  '.oga' => 'audio/ogg',
  '.spx' => 'audio/ogg',
  '.ogg' => 'audio/ogg',
  '.weba' => 'audio/webm',
  '.flac' => 'audio/flac',
  '.ape' => 'audio/x-ape',
  '.m4b' => 'audio/mp4',
  '.aac' => 'audio/aac; charset=utf-8',
  '.aiff' => 'audio/x-aiff',
  '.aif' => 'audio/x-aiff',
]);
