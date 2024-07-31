<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Global;

class DefaultTemplate
{
  static public function render(callable $method, ?array $data = [], ?string $mjsFileName = null)
  {
?>
<body>
  <?php if (is_callable($method)) { $method($data); }?>
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.3.1",
        "react-dom": "https://esm.sh/react-dom@18.3.1/client",
        "confetti": "https://esm.sh/canvas-confetti@1.9.3",
        "react-player": "https://esm.sh/react-player@2.16.0"
      }
    }
  </script>
  <script type="module">
    var PAGE_DATA = JSON.parse(`<?php echo json_encode($data);?>`); 
  </script>
  <?php if (!empty($mjsFileName)) { ?>
    <script type="module" src="/assets/mjs/<?php echo $mjsFileName; ?>.mjs"></script>
  <?php } ?>
</body>
<?php
  }

  static public function renderWithNav(callable $method, ?array $data = [], ?string $mjsFileName = null)
  {
?>
<body>
  <div id="root" class="overflow-auto relative h-screen w-screen">
    <header class="font-[Quicksand] fixed top-0 left-0 h-[96px] *:h-full flex justify-between items-center p-2 shadow">
      <h1 class="font-[700] text-[32px] leading-[35.2px] text-[#2487CE] flex-grow pl-8 flex items-center">
        <a href="/" class="hover:opacity-80 hover:drop-shadow-lg cursor-pointer">Research Hub</a>
      </h1>
      <nav class="flex flex-row justify-between gap-x-8 text-center items-center px-10 *:h-full whitespace-nowrap">
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
        <div class="relative flex items-center justify-center mx-4">
          <p class="text-sm">Mark Daryll Namoca</p>
        </div>
      </nav>
    </header>
    <main class="relative w-full">
      <?php if (is_callable($method)) { $method($data); }?>
    </main>
  </div>
  <script type="importmap">
    {
      "imports": {
        "react": "https://esm.sh/react@18.3.1",
        "react-dom": "https://esm.sh/react-dom@18.3.1/client",
        "confetti": "https://esm.sh/canvas-confetti@1.9.3"
      }
    }
  </script>
  <script type="module">
    var PAGE_DATA = JSON.parse(`<?php echo json_encode($data);?>`); 
  </script>
  <?php if (!empty($mjsFileName)) { ?>
  <script type="module" src="/assets/mjs/<?php echo $mjsFileName; ?>.mjs"></script>
  <?php } ?>
</body>
<?php
  }
}
