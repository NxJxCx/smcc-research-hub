<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Controllers;

use Smcc\ResearchHub\Logger\Logger;
use Smcc\ResearchHub\Models\AdminLogs;
use Smcc\ResearchHub\Models\Journal;
use Smcc\ResearchHub\Models\JournalPersonnelReads;
use Smcc\ResearchHub\Models\JournalReads;
use Smcc\ResearchHub\Models\Thesis;
use Smcc\ResearchHub\Models\ThesisPersonnelReads;
use Smcc\ResearchHub\Models\ThesisReads;
use Smcc\ResearchHub\Router\File;
use Smcc\ResearchHub\Router\Request;
use Smcc\ResearchHub\Router\Response;
use Smcc\ResearchHub\Router\Session;
use Smcc\ResearchHub\Router\StatusCode;

class FileController extends Controller
{

  public function uploadPdf(Request $request): Response
  {
    if (Session::isAuthenticated() && Session::getUserAccountType() === 'admin') {
      $doc = $request->getBodyParam('document');
      $docTitle = $request->getBodyParam('title');
      $docAuthor = $request->getBodyParam('author');
      $docDepartment = $request->getBodyParam('department');
      $docCourse = $request->getBodyParam('course');
      $docAbstract = $request->getBodyParam('abstract');
      $docPublisher = $request->getBodyParam('publisher');
      $docPublishedDate = $request->getBodyParam('published_date');
      $docYear = $request->getBodyParam('year');
      $file = $request->getFiles("pdf");
      if (!in_array($doc, ["thesis", "journal"])) {
        return Response::json(['error' => 'Invalid document type. Must be thesis or journal.'], StatusCode::BAD_REQUEST);
      }
      if (!$docTitle || !$docAuthor || !$docYear || !$docDepartment || !$docCourse || !$docAbstract) {
        return Response::json(['error' => 'All fields are required.'], StatusCode::BAD_REQUEST);
      }
      if ($file instanceof File) {
        if ($file->getError() !== UPLOAD_ERR_OK) {
          return Response::json(['error' => "Error uploading file. Error Code ".$file->getError()], StatusCode::INTERNAL_SERVER_ERROR);
        }
        if ($file->getType() !== 'application/pdf') {
          return Response::json(['error' => 'Invalid file type. Only PDF files are allowed.'], StatusCode::BAD_REQUEST);
        } else {
          try {
            $newFilename = uniqid("thesis_");
            $file->moveTo(implode(DIRECTORY_SEPARATOR, [UPLOADS_PATH, $doc]), $newFilename);
            $fileUrl = "/$doc?filename=$newFilename";
            if ($doc === 'thesis') {
              $thesis = new Thesis([
                "title" => $docTitle,
                "author" => $docAuthor,
                "year" => $docYear,
                "department" => $docDepartment,
                "course" => $docCourse,
                "abstract" => $docAbstract,
                "url" => $fileUrl,
              ]);
              $fid = $thesis->create();
            } else if ($doc === 'journal') {
              $journal = new Journal([
                "title" => $docTitle,
                "author" => $docAuthor,
                "year" => $docYear,
                "department" => $docDepartment,
                "course" => $docCourse,
                "url" => $fileUrl,
                "abstract" => $docAbstract,
                "publisher" => $docPublisher,
                "published_date" => $docPublishedDate,
              ]);
              $fid = $journal->create();
            }
            $doc = ucfirst($doc);
            (new AdminLogs(["admin_id" => Session::getUserId(), "activity" => "Uploaded $doc ID $fid: $docTitle by $docAuthor year $docYear url $fileUrl"]))->create();
            return Response::json(['success' => isset($fid)], StatusCode::CREATED);
          } catch (\PDOException $e) {
            // SQL error handling
            $doc = ucfirst($doc);
            return Response::json(['error' => $e->getCode() === "23000" ? "$doc title already exists. Please enter another title." : $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
          } catch (\Throwable $e) {
            // upload error handling
            return Response::json(['error' => $e->getMessage()], StatusCode::INTERNAL_SERVER_ERROR);
          }
        }
      } else {
        return Response::json(['error' => 'Only one file is allowed at a time.'], StatusCode::BAD_REQUEST);
      }
    }
    return Response::json(['error' => 'You must be authenticated as an admin to upload files.'], StatusCode::UNAUTHORIZED);
  }

  public function uploadImages(Request $request): Response
  {
    $files = $request->getFiles("photo");
    $filesSaved = [];
    $count = 0;
    $total = count($files);
    $errors = [];
    foreach ($files as $file) {
      if (!in_array($file['type'], ['image/jpeg', 'image/png'])) {
        $errors[] = [$file['name'], 'Invalid file type. Only JPEG or PNG images are allowed.'];
        continue;
      }
      if ($file['size'] > MAX_IMAGE_SIZE) {
        $errors[] = [$file['name'], 'File size is too large. Maximum allowed size is '. (MAX_IMAGE_SIZE / 1024 / 1024).'MB'];
        continue;
      }
      $count++;
      $newFilename = uniqid("photo_") . ".". pathinfo($file['name'], PATHINFO_EXTENSION);
      move_uploaded_file($file['tmp_name'], implode(DIRECTORY_SEPARATOR, [UPLOADS_PATH, 'public', 'photo', $newFilename]));
      $filesSaved[] = "/public/photo/$newFilename";
    }
    return Response::json(["total" => $total, "uploaded" => $count, "failed" => (int)($total - $count), "files" => $filesSaved, "errors" => $errors], StatusCode::CREATED);
  }

  public function viewPdfFile(Request $request): Response
  {
    if (!Session::isAuthenticated()) {
      return Response::json(['error' => 'Unauthorized'], StatusCode::UNAUTHORIZED);
    }
    $uri = $request->getUri();
    $parts = explode('/', $uri);
    $docType = strtolower(end($parts));
    $filenameNoExt = $request->getQueryParam('filename');
    if (!$filenameNoExt) {
      return Response::json(['error' => 'Filename not provided'], StatusCode::BAD_REQUEST);
    }
    $filename = "$filenameNoExt.pdf";
    $filePath = implode(DIRECTORY_SEPARATOR, [UPLOADS_PATH, $docType, $filename]);
    if (!file_exists($filePath) || !is_readable($filePath)) {
      return Response::json(['error' => 'File not found'], StatusCode::NOT_FOUND);
    }
    if (Session::getUserAccountType() === 'student') {
      // Append Read
      $id = $request->getQueryParam('id');
      if ($id) {
        try {
          $readDocument = in_array('thesis', $parts)
            ? new ThesisReads([
              'thesis_id' => $id,
              'student_id' => Session::getUserId(),
            ])
            : (in_array('journal', $parts)
              ? new JournalReads([
                'journal_id' => $id,
                'student_id' => Session::getUserId(),
              ])
              : null);
          if ($readDocument) {
            $readDocument->create();
          }
        } catch (\Throwable $e) {
          Logger::write_error($e->getMessage());
        }
      }
    } else if (Session::getUserAccountType() === 'personnel') {
      // Append Read
      $id = $request->getQueryParam('id');
      if ($id) {
        try {
          $readDocument = in_array('thesis', $parts)
            ? new ThesisPersonnelReads([
              'thesis_id' => $id,
              'personnel_id' => Session::getUserId(),
            ])
            : (in_array('journal', $parts)
              ? new JournalPersonnelReads([
                'journal_id' => $id,
                'personnel_id' => Session::getUserId(),
              ])
              : null);
          if ($readDocument) {
            $readDocument->create();
          }
        } catch (\Throwable $e) {
          Logger::write_error($e->getMessage());
        }
      }
    }
    return Response::file($filePath, StatusCode::OK, ["Content-Disposition" => "inline; filename=\"$filename\""]);
  }

  public function downloadPdfFile(Request $request): Response
  {
    if (!Session::isAuthenticated()) {
      return Response::json(['error' => 'Unauthorized'], StatusCode::UNAUTHORIZED);
    }
    $uri = $request->getUri();
    $parts = explode('/', $uri);
    $docType = strtolower(end($parts));
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
