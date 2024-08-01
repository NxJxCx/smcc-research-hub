<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Global;

class DefaultTemplate
{
  static public function render(callable $method, ?array $data = [], ?string $reactFileName = null)
  {
?>
<body>
  <main id="root" class="relative w-full">
    <?php if (is_callable($method)) { $method($data); }?>
  </main>
  <?php Footer::default(); ?>
  <script type="importmap">
{
  "imports": {
<?php
// retrieve file "imports.json" and generate importmap
$imports = file_get_contents(implode(DIRECTORY_SEPARATOR, [VIEW_PATH, 'Global', 'imports.json']));
$imports = json_decode($imports, true);
$__count = count(array_keys($imports));
$__c = 0;
foreach ($imports as $alias => $path) {
  $__c++;
  if ($__c === $__count) { ?>
    "<?php echo $alias; ?>": "<?php echo $path; ?>"
<?php
  } else { ?>
    "<?php echo $alias; ?>": "<?php echo $path; ?>",
<?php
  }
}
?>
  }
}
  </script>
  <script type="module">
    var PAGE_DATA = JSON.parse(`<?php echo json_encode($data);?>`);
  </script>
  <?php if (!empty($reactFileName)) { ?>
    <script type="module" src="/jsx/<?php echo $reactFileName; ?>.min.js"></script>
  <?php } ?>
</body>
<?php
  }

  static public function renderWithNav(callable $method, ?array $data = [], ?string $reactFileName = null)
  {
?>
<body>
  <?php Header::default(); ?>
  <main id="root" class="relative w-full">
    <?php if (is_callable($method)) { $method($data); }?>
  </main>
  <?php Footer::default(); ?>
  <script type="importmap">
{
  "imports": {
<?php
// retrieve file "imports.json" and generate importmap
$imports = file_get_contents(implode(DIRECTORY_SEPARATOR, [VIEW_PATH, 'Global', 'imports.json']));
$imports = json_decode($imports, true);
$__count = count(array_keys($imports));
$__c = 0;
foreach ($imports as $alias => $path) {
  $__c++;
  if ($__c === $__count) { ?>
    "<?php echo $alias; ?>": "<?php echo $path; ?>"
<?php
  } else { ?>
    "<?php echo $alias; ?>": "<?php echo $path; ?>",
<?php
  }
}
?>
  }
}
  </script>
  <script type="module">
    var PAGE_DATA = JSON.parse(`<?php echo json_encode($data);?>`);
  </script>
  <?php if (!empty($reactFileName)) { ?>
  <script type="module" src="/jsx/<?php echo $reactFileName; ?>.min.js"></script>
  <?php } ?>
</body>
<?php
  }
}
