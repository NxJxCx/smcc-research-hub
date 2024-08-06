<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Global;

class ReactTemplate
{
  static public function render(string $reactAppPath, array $data)
  {
?>

    <body>
      <main
        id="root"
        class="relative w-full min-h-screen"
        data-react-app="<?php echo htmlspecialchars(implode('/', ['/jsx', $reactAppPath])); ?>"
        data-page-data="<?php echo htmlspecialchars(json_encode($data)); ?>"
      ></main>
      <?php Footer::default(); ?>
      <script type="module" src="/jsx/main"></script>
    </body>
  <?php
  }

  static public function renderWithNav(string $reactAppPath, array $data)
  {
  ?>

    <body>
      <?php Header::default(); ?>
      <main
        id="root"
        class="relative w-full min-h-screen"
        data-react-app="<?php echo htmlspecialchars(implode('/', ['/jsx', $reactAppPath])); ?>"
        data-page-data="<?php echo htmlspecialchars(json_encode($data)); ?>"
      ></main>
      <?php Footer::default(); ?>
      <script type="module" src="/jsx/global/header"></script>
      <script type="module" src="/jsx/main"></script>
    </body>
<?php
  }

  static public function renderWithSidebar(string $reactAppPath, array $data, array $sidebarListData)
  {
  ?>

    <body>
      <div class="container-fluid relative flex max-h-screen overflow-hidden w-full">
        <aside id="sidebar-nav" data-sidebar-list="<?php echo htmlspecialchars(json_encode($sidebarListData)); ?>">
        </aside>
        <main class="relative max-h-screen overflow-y-auto flex-grow">
          <?php Header::admin(); ?>
          <div
            id="root"
            class="w-full min-h-screen"
            data-react-app="<?php echo htmlspecialchars(implode('/', ['/jsx', $reactAppPath])); ?>"
            data-page-data="<?php echo htmlspecialchars(json_encode($data)); ?>"
          ></div>
          <?php Footer::default(); ?>
        </main>
      </div>
      <script type="module" src="/jsx/admin/sidebar"></script>
      <script type="module" src="/jsx/admin/header"></script>
      <script type="module" src="/jsx/main"></script>
    </body>
<?php
  }
}
