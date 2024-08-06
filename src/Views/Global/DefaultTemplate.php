<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Global;

class DefaultTemplate
{
  static public function render(callable $method, ?array $data = [], ?string $reactFileName = null)
  {
?>
<body>
  <main
    id="root"
    class="relative w-full"
    data-page-data="<?php echo htmlspecialchars(json_encode($data)); ?>"
  >
    <?php if (is_callable($method)) { $method($data); }?>
  </main>
  <?php Footer::default(); ?>
  <?php if (!empty($reactFileName)) { ?>
    <script type="module" src="<?php echo implode("/", ["/jsx", $reactFileName]); ?>"></script>
  <?php } ?>
</body>
<?php
  }

  static public function renderWithNav(callable $method, ?array $data = [], ?string $reactFileName = null)
  {
?>
<body>
  <?php Header::default(); ?>
  <main
    id="root"
    class="relative w-full"
    data-page-data="<?php echo htmlspecialchars(json_encode($data)); ?>"
  >
    <?php if (is_callable($method)) { $method($data); }?>
  </main>
  <?php Footer::default(); ?>
  <script type="module" src="/jsx/global/header"></script>
  <?php if (!empty($reactFileName)) { ?>
  <script type="module" src="<?php echo implode("/", ["/jsx", $reactFileName]); ?>"></script>
  <?php } ?>
</body>
<?php
  }
}
