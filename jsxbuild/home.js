import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import ReactPlayer from 'react-player/youtube'; // youtube videos only
// import ReactPlayer from 'react-player'; // local site source example: <ReactPlayer url="/videos/b0eKjsx_V78.mp4" /> where url is equal to https://localhost/videos/b0eKjsx_V78.mp4
function VideoPlayer({ url }) {
    return React.createElement(ReactPlayer, { url: url, width: "100%", height: "100%", controls: true });
}
function Video() {
    return React.createElement(VideoPlayer, { url: "https://youtu.be/b0eKjsx_V78" });
}
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("home-video-container"));
root.render(React.createElement(Video, null));
