<?php

declare(strict_types=1);

define('APP_TITLE', $_ENV['APP_TITLE'] ?? 'SMCC Research Hub');

define('MYSQL_HOST', $_ENV['MYSQL_HOST'] ?? 'localhost');
define('MYSQL_PORT', $_ENV['MYSQL_POST'] ?? '3306');
define('MYSQL_DATABASE', $_ENV['MYSQL_DATABASE'] ?? 'researchhub');
define('MYSQL_USER', $_ENV['MYSQL_USER'] ?? 'smcc');
define('MYSQL_PASSWORD', $_ENV['MYSQL_PASSWORD'] ?? 'smccMySql');

define('VIEW_PATH', implode(DIRECTORY_SEPARATOR, [APP_PATH, 'src', 'Views']));
define('ASSETS_PATH', implode(DIRECTORY_SEPARATOR, [APP_PATH, 'src', 'Views', 'static']));

// set DISPLAY_ERRORS to false if in production environment to hide error messages
define('DISPLAY_ERRORS', $_ENV['DISPLAY_ERRORS'] ?? true);

define('MIMETYPES', [
  '' => 'application/octet-stream',
  '.txt' => 'text/plain',
  '.jpg' => 'image/jpeg',
  '.png' => 'image/png',
  '.gif' => 'image/gif',
  '.pdf' => 'application/pdf',
  '.zip' => 'application/zip',
  '.html' => 'text/html',
  '.php' => 'text/html',
  '.js' => 'application/javascript; charset=utf-8',
  '.mjs' => 'application/javascript; charset=utf-8',
  '.ts' => 'application/javascript; charset=utf-8',
  '.tsx' => 'application/javascript; charset=utf-8',
  '.jsx' => 'application/javascript; charset=utf-8',
  '.docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.csv' => 'text/csv',
  '.odt' => 'application/vnd.oasis.opendocument.text',
  '.ods' => 'application/vnd.oasis.opendocument.spreadsheet',
  '.pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.ppt' => 'application/vnd.ms-powerpoint',
  '.rtf' => 'application/rtf',
  '.css' => 'text/css',
  '.svg' => 'image/svg+xml',
  '.eot' => 'application/vnd.ms-fontobject',
  '.ttf' => 'application/x-font-ttf',
  '.woff' => 'application/font-woff',
  '.woff2' => 'application/font-woff2',
  '.json' => 'application/json',
  '.mp4' => 'video/mp4',
  '.mp3' => 'audio/mpeg',
  '.wav' => 'audio/wav',
  '.avi' => 'video/x-msvideo',
  '.mov' => 'video/quicktime',
  '.flv' => 'video/x-flv',
  '.m4a' => 'audio/mp4',
  '.m4v' => 'video/x-m4v',
  '.ogv' => 'video/ogg',
  '.webm' => 'video/webm',
  '.3gp' => 'video/3gpp',
  '.mkv' => 'video/x-matroska',
  '.wmv' => 'video/x-ms-wmv',
  '.asf' => 'video/x-ms-asf',
  '.mpg' => 'video/mpeg',
  '.m2v' => 'video/mpeg',
  '.mng' => 'video/x-mng',
  '.mpe' => 'video/mpeg',
  '.qt' => 'video/quicktime',
  '.lsf' => 'video/x-la-asf',
  '.ls' => 'video/x-la-asf',
  '.ram' => 'audio/x-pn-realaudio',
  '.rm' => 'application/vnd.rn-realmedia',
  '.rpm' => 'audio/x-pn-realaudio-plugin',
  '.ra' => 'audio/x-realaudio',
  '.cda' => 'audio/x-cda',
  '.mid' => 'audio/midi',
  '.kar' => 'audio/midi',
  '.m3u' => 'audio/x-mpegurl',
  '.oga' => 'audio/ogg',
  '.spx' => 'audio/ogg',
  '.ogg' => 'audio/ogg',
  '.weba' => 'audio/webm',
  '.flac' => 'audio/flac',
  '.ape' => 'audio/x-ape',
  '.m4b' => 'audio/mp4',
  '.aac' => 'audio/aac',
  '.aiff' => 'audio/x-aiff',
  '.aif' => 'audio/x-aiff',
]);
