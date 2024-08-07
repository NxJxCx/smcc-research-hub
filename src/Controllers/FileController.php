<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use Smcc\ResearchHub\Router\Request;
use Smcc\ResearchHub\Router\Response;
use Smcc\ResearchHub\Router\Session;
use Smcc\ResearchHub\Router\StatusCode;

class FileController extends Controller
{

  public function uploadPdf(Request $request): Response
  {
    $files = $request->getFiles();
    $body = $request->getBody();
    $doc = $body['document'];
    if (!in_array(["thesis", "journal"], $doc)) {
      return Response::json(['error' => 'Invalid document type. Must be thesis or journal.'], StatusCode::BAD_REQUEST);
    }
    $count = 0;
    $total = count($files);
    $filesSaved = []; // filenames
    $errors = [];
    foreach ($files as $file) {
      // check if $file is pdf
      if ($file['type'] !== 'application/pdf') {
        $errors[] = [$file['name'], 'Invalid file type. Only PDF files are allowed.'];
        continue; // skip non-pdf files
      }
      $count++; // increment uploaded file count
      $newFilenameNoExt = uniqid("thesis_");
      $newFilename = "$newFilenameNoExt.pdf";
      move_uploaded_file($file['tmp_name'], implode(DIRECTORY_SEPARATOR, [UPLOADS_PATH, $doc, $newFilename]));
      $filesSaved[] = "/view/$doc?filename=$newFilenameNoExt";
    }
    return Response::json(['success' => ["total" => $total, "uploaded" => $count, "failed" => (int)($total - $count), "files" => $filesSaved, "errors" => $errors]]);
  }

  public function uploadImages(Request $request): Response
  {
    $files = $request->getFiles();
    $filesSaved = []; // filenames
    $count = 0;
    $total = count($files);
    $errors = [];
    foreach ($files as $file) {
      // check if $file is jpg or png
      if (!in_array($file['type'], ['image/jpeg', 'image/png'])) {
        $errors[] = [$file['name'], 'Invalid file type. Only JPEG or PNG images are allowed.'];
        continue; // skip non-image files
      }
      // check if file size is too large
      if ($file['size'] > MAX_IMAGE_SIZE) {
        $errors[] = [$file['name'], 'File size is too large. Maximum allowed size is '. (MAX_IMAGE_SIZE / 1024 / 1024).'MB'];
        continue; // skip files exceeding size limit
      }
      $count++; // increment uploaded file count
      $newFilename = uniqid("photo_") . ".". pathinfo($file['name'], PATHINFO_EXTENSION);
      move_uploaded_file($file['tmp_name'], implode(DIRECTORY_SEPARATOR, [UPLOADS_PATH, 'public', 'photo', $newFilename]));
      $filesSaved[] = "/public/photo/$newFilename";
    }
    return Response::json(["total" => $total, "uploaded" => $count, "failed" => (int)($total - $count), "files" => $filesSaved, "errors" => $errors]);
  }

  public function viewPdfFile(Request $request): Response
  {
    if (Session::isAuthenticated()) {
      return Response::json(['error' => 'Unauthorized'], StatusCode::UNAUTHORIZED);
    }
    $uri = $request->getUri();
    // get the last splitted part of the URI to get the doc type
    $parts = explode('/', $uri);
    $docType = strtolower(end($parts));
    // get the filename from query parameter named 'filename'
    $filenameNoExt = $request->getQueryParam('filename');
    if (!$filenameNoExt) {
      return Response::json(['error' => 'Filename not provided'], StatusCode::BAD_REQUEST);
    }
    $filename = "$filenameNoExt.pdf";
    $filePath = implode(DIRECTORY_SEPARATOR, [UPLOADS_PATH, $docType, $filename]);
    if (!file_exists($filePath) ||!is_readable($filePath)) {
      return Response::json(['error' => 'File not found'], StatusCode::NOT_FOUND);
    }
    return Response::file($filePath, StatusCode::OK, ["Content-Disposition" => "inline; filename=\"$filename\""]);
  }

  public function downloadPdfFile(Request $request): Response
  {
    if (Session::isAuthenticated()) {
      return Response::json(['error' => 'Unauthorized'], StatusCode::UNAUTHORIZED);
    }
    $uri = $request->getUri();
    // get the last splitted part of the URI to get the doc type
    $parts = explode('/', $uri);
    $docType = strtolower(end($parts));
    // get the filename from query parameter named 'filename'
    $filenameNoExt = $request->getQueryParam('filename');
    if (!$filenameNoExt) {
      return Response::json(['error' => 'Filename not provided'], StatusCode::BAD_REQUEST);
    }
    $filename = "$filenameNoExt.pdf";
    $filePath = implode(DIRECTORY_SEPARATOR, [UPLOADS_PATH, $docType, $filename]);
    if (!file_exists($filePath) ||!is_readable($filePath)) {
      return Response::json(['error' => 'File not found'], StatusCode::NOT_FOUND);
    }
    return Response::file($filePath, StatusCode::OK, ["Content-Disposition" => "attachment; filename=\"$filename\""]);
  }
}
