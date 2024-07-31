<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Pages;

use Smcc\ResearchHub\Views\Global\DefaultTemplate;
use Smcc\ResearchHub\Views\Global\HeadTemplate;

class HomePage
{
  static public function view(string $title)
  {
    HeadTemplate::default($title);
    // check session here
    $session = $_SESSION['user'] ?? null;
    DefaultTemplate::renderWithNav([HomePage::class, 'render'], ['session' => $session], 'home');
  }
  static public function render(array $data = [])
  {
    // Render home page here
?>
  <div class="flex flex-col justify-center items-center min-h-[300px] font-[Poppins] font-[600] text-[48px] leading-[72px] mb-2 text-[#16507B]">
    <h1>Where Knowledge Meets</h1>
    <h1>Innovation</h1>
  </div>
  <div class="flex flex-col justify-center items-center">
    <a href="#">
      <button type="button" class="mx-auto hover:drop-shadow-lg hover:scale-110 font-[Poppins] font-[400] text-center text-[22px] leading-[33px] w-[220px] h-[48px] bg-[#2487CE] rounded-[5px] text-white">
          Explore
      </button>
    </a>
  </div>
  <div class="mx-auto mt-16 aspect-video">
    <div class="w-full h-full relative pt-[2%]">
      <div id="home-video-container" class="w-full h-full px-[10%] py-[5%] aspect-video"></div>
      <div class="absolute left-0 top-0 -z-[10] w-full h-full">
        <image src="/assets/images/desktop.svg" class="w-full h-full" />
      </div>
    </div>
  </div>
  <div class="mt-[200px]">
    &nbsp;
  </div>
<?php
  }
}