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
<?php Header::default(); ?>
    <main class="relative w-full mt-[96px]">
      <?php if (is_callable($method)) { $method($data); }?>
    </main>
  </div>
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
}
