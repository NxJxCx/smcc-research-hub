<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Global;

class ReactTemplate
{
  static public function render(string $reactAppPath, array $data)
  {
?>

    <body>
      <main id="root" class="relative w-full min-h-screen"></main>
      <?php Footer::default(); ?>
      <script type="importmap">
{
  "imports": {
<?php
// retrieve file "imports.json" and generate importmap
$imports = file_get_contents(implode(DIRECTORY_SEPARATOR, [VIEW_PATH, 'Global', 'imports.json']));
$imports = json_decode($imports, true);
foreach ($imports as $alias => $path) {
?>
    "<?php echo $alias; ?>": "<?php echo $path; ?>",
<?php
}
?>
    "myapp": "/jsx/<?php echo $reactAppPath; ?>"
  }
}
      </script>
      <script type="module">
        var PAGE_DATA = JSON.parse(`<?php echo json_encode($data); ?>`);
      </script>
      <script type="module" src="/jsx/main.js"></script>
    </body>
  <?php
  }

  static public function renderWithNav(string $reactAppPath, array $data)
  {
  ?>

    <body>
      <?php Header::default(); ?>
      <main id="root" class="relative w-full min-h-screen"></main>
      <?php Footer::default(); ?>
      <script type="importmap">
{
  "imports": {
<?php
// retrieve file "imports.json" and generate importmap
$imports = file_get_contents(implode(DIRECTORY_SEPARATOR, [VIEW_PATH, 'Global', 'imports.json']));
$imports = json_decode($imports, true);
foreach ($imports as $alias => $path) {
?>
    "<?php echo $alias; ?>": "<?php echo $path; ?>",
<?php
}
?>
    "myapp": "/jsx/<?php echo $reactAppPath; ?>"
  }
}
      </script>
      <script type="module">
        var PAGE_DATA = JSON.parse(`<?php echo json_encode($data); ?>`);
      </script>
      <script type="module" src="/jsx/main.js"></script>
    </body>
<?php
  }
}
