<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Pages;

use Smcc\ResearchHub\Views\Global\Template;
use Smcc\ResearchHub\Views\Global\View;

class Error400Page extends View
{
  public function render(): void
  {
    Template::default(
      $this->getTitle(),
      function () {
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
      },
      $this->getData()
    );
  }
}