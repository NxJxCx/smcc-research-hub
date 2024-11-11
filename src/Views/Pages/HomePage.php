<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Pages;

use Smcc\ResearchHub\Router\Router;
use Smcc\ResearchHub\Views\Global\Template;
use Smcc\ResearchHub\Views\Global\View;

class HomePage extends View
{
  public function render(): void
  {
    Template::defaultWithNav(
      $this->getTitle(),
      function () {
?>
  <div class="flex flex-col justify-center items-center my-10 gap-y-8" id="home-announcement-container">
    <div class="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 border-solid rounded-full animate-spin"></div>
  </div>
  <div class="flex flex-col justify-center items-center text-center my-8 font-[Poppins] font-[600] text-[48px] leading-[72px] text-[#16507B]">
    <h1>Where Knowledge Meets</h1>
    <h1>Innovation</h1>
  </div>
  <div class="flex flex-col justify-center items-center my-10">
    <a href="<?= Router::getPathname("/thesis") ?>">
      <button type="button" class="mx-auto hover:drop-shadow-lg hover:scale-110 font-[Poppins] font-[400] text-center text-[22px] leading-[33px] w-[220px] h-[48px] bg-[#2487CE] rounded-[5px] text-white">
          Explore
      </button>
    </a>
  </div>
  <div class="mt-[200px]">
    &nbsp;
  </div>
<?php
      },
      $this->getData(),
      $this->getReactAppPath()
    );
  }
}