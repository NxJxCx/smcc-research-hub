<?php

namespace Smcc\ResearchHub\Views\Global;

class Header {
  public static function default() {
?>
    <header class="font-[Quicksand] sticky top-0 left-0 h-[96px] w-full bg-white z-50">
      <div class="relative w-full h-full *:h-full flex justify-between items-center p-2 shadow">
        <h1 class="font-[700] text-[32px] leading-[35.2px] text-[#2487CE] flex-grow pl-2 md:pl-4 lg:pl-8 xl:pl-16 flex items-center">
          <a href="/" class="hover:opacity-80 hover:drop-shadow-lg cursor-pointer flex flex-start items-center gap-x-2">
            <image src="/images/SMCC-logo.svg" class="w-fit max-w-[70px] aspect-square" />
            Research Hub
          </a>
        </h1>
        <nav class="hidden xl:flex flex-row justify-between gap-x-8 text-center items-center px-10 *:h-full whitespace-nowrap">
          <?php
            // read file json file and display menu items
            $menuItems = file_get_contents(implode(DIRECTORY_SEPARATOR, [VIEW_PATH, 'Global', 'menu.json']));
            $menuItems = json_decode($menuItems, true);
            foreach ($menuItems as $menuItem) {
          ?>
            <a
              href="<?php echo $menuItem['url']; ?>"
              class="flex items-center justify-center font-[400] text-[16px] leading-[24px] tracking-[0.5px] <?php
                if ($_SERVER['REQUEST_URI'] === $menuItem['url'] || str_starts_with($_SERVER['REQUEST_URI'], $menuItem['url'])) {
                  echo "text-[#2487CE] hover:text-gray-500 border-b-[2px] border-[#2487CE] hover:border-gray-500";
                } else {
                  echo "text-black hover:text-gray-500";
                }
              ?>"
              >
              <?php echo $menuItem['label']; ?>
            </a>
            <?php } ?>
          <button>
            <span class="material-symbols-outlined">
              search
            </span>
          </button>
        </nav>
        <nav id="responsive-nav-small" data-navlist="<?php echo htmlspecialchars(json_encode($menuItems)); ?>">
        </nav>
        <div class="relative flex items-center justify-end mx-4 gap-x-4 whitespace-nowrap flex-grow">
          <p class="text-sm"><a href="/signup">Sign Up</a></p>
          <p class="text-sm"><a href="/login">Login</a></p>
        </div>
      </div>
    </header>
<?php
  }
}