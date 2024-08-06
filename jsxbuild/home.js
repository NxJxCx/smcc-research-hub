import { React, ReactDOM, ReactPlayerYoutube, // ReactPlayer,
 } from '/jsx/imports';
function VideoPlayer({ url }) {
    return React.createElement(ReactPlayerYoutube, { url: url, width: "100%", height: "100%", controls: true });
    // return <ReactPlayer url={url} width="100%" height="100%" controls /> if you want to use videos from local or from other platforms
}
function Video() {
    return React.createElement(VideoPlayer, { url: "https://youtu.be/b0eKjsx_V78" });
}
// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("home-video-container"));
root.render(React.createElement(Video, null));
