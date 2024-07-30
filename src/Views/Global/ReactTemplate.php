<?php

declare(strict_types=1);

namespace Smcc\ResearchHub\Views\Global;

class ReactTemplate
{
  static public function render(string $reactAppPath, array $data)
  {
?>
    <body>
      <div id="root"></div>
      <script type="importmap">
        {
          "imports": {
            "react": "https://esm.sh/react@18.3.1",
            "react-dom": "https://esm.sh/react-dom@18.3.1/client",
            "confetti": "https://esm.sh/canvas-confetti@1.9.3",
            "myapp": "/react/<?php echo $reactAppPath; ?>"
          }
        }
      </script>
      <script type="module">
        var PAGE_DATA = JSON.parse(`<?php echo json_encode($data);?>`); 
      </script>
      <script type="module" src="/react/main"></script>
    </body>
<?php
  }
}
