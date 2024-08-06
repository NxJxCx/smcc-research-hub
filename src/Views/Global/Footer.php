<?php

namespace Smcc\ResearchHub\Views\Global;

class Footer {
  public static function default() {
?>
  <footer class="font-[Roboto] font-[400] text-[16px] leading-[22.4px] w-full min-h-[100px] max-w-full mb-4 md:mb-0 grid grid-cols-1 md:grid-cols-2 gap-y-2 items-center justify-end">
    <div class="flex text-center items-center justify-center">
      &copy; 2024 Saint Michael College of Caraga
    </div>
    <ul class="flex flex-wrap md:flex-nowrap max-w-full justify-center gap-x-4 gap-y-2 md:justify-between md:gap-2 items-center px-8 md:max-w-[700px]">
      <li>
        <a href="#">Terms</a>
      </li>
      <li>
        <a href="#">Privacy</a>
      </li>
      <li>
        <a href="#">Support</a>
      </li>
      <li>
        <a href="#">About</a>
      </li>
      <li>
        <a href="#">Resources</a>
      </li>
      <li>
        <a href="#">Contact</a>
      </li>
      <li>
        <a href="/admin/login">Admin</a>
      </li>
      <li>
        <a href="/teacher/login">Teacher</a>
      </li>
    </div>
  </footer>
<?php
  }
}