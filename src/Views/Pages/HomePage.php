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
  <div class="flex flex-col justify-center items-center text-center my-8 font-[Poppins] font-[600] text-[48px] leading-[72px] text-[#16507B]">
    <h1>Where Knowledge Meets</h1>
    <h1>Innovation</h1>
  </div>
  <div class="mx-auto aspect-video max-w-4xl hover:drop-shadow-lg hover:scale-[102%]">
    <div class="w-full h-full relative pt-[2%]">
      <div id="home-video-container" class="w-full h-full px-[10%] py-[5%] aspect-video"></div>
      <div class="absolute left-0 top-0 -z-[10] w-full h-full">
        <image src="<?= Router::getPathname('/images/desktop.svg') ?>" class="w-full h-full" />
      </div>
    </div>
  </div>
  <div class="flex flex-col justify-center items-center my-10">
    <a href="/thesis">
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