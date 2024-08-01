import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import ReactPlayer from 'react-player';

function VideoPlayer({ url }: { url: string }) {
  return React.createElement(
    ReactPlayer,
    {
      url,
      controls: true,
      width: "100%",
      height: "100%"
    }
  )
}

function Video() {
  return React.createElement(
    VideoPlayer,
    { url: "https://youtu.be/b0eKjsx_V78" }
  )
}

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("home-video-container"))
root.render(React.createElement(Video))