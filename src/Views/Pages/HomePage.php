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
  <div class="mx-auto w-fit">
    <div class="relative max-h-[632px] max-w-[1100px] pt-[41px]">
      <image src="/assets/images/desktop.svg" class="absolute left-0 top-0 w-full h-full" />
      <div className="w-full h-full flex flex-col justify-center items-center">
        
      </div>
    </div>
  </div>
<?php
  }
}