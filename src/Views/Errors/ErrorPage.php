<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Errors;

use Smcc\ResearchHub\Views\Global\HeadTemplate;

class ErrorPage
{
  static public function notFound(string $title = 'Page Not Found')
  {
    HeadTemplate::errors($title);
?>
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404"></div>
        <h1>404</h1>
        <h2>Oops! Page Not Be Found</h2>
        <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
        <a href="/">Back to homepage</a>
      </div>
    </div>
  <?php
  }

  static public function internalServerError(string $title = 'Internal Server Error', string $message = 'An error occurred')
  {
    HeadTemplate::errors($title);
  ?>
    <div id="notfound">
      <div class="notfound">
        <div class="notfound-404 error-500"></div>
        <h1>500</h1>
        <h2>Oops! Something went wrong</h2>
        <p>An error occured. Please try again later.</p>
        <?php if (DISPLAY_ERRORS) { ?>
          <p class="error-message">
            <?php echo $message; ?>
          </p>
        <?php } ?>
        <a href="/">Back to homepage</a>
      </div>
    </div>
<?php
  }
}
