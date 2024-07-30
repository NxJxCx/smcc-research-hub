import React from "react"
import confetti from "confetti"

const App = () => {
  function onMouseMove(e) {
    confetti({
      particleCount: 5,
      origin: {
        x: e.pageX / window.innerWidth,
        y: (e.pageY + 20) / window.innerHeight,
      }
    })
  }

  return React.createElement(
    'div',
    { onMouseMove, className: "font-thin text-[10px] min-h-screen" },
    React.createElement(
      'h1',
      {},
      'Hello React! ⚛️'
    ),
    React.createElement(
      'p',
      {},
      'Building user interfaces.'
    )
  )
}

export default App
