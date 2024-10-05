"use strict";
import(pathname("/jsx/imports")).then(({ React, ReactDOM, ReactPlayerYoutube }) => {
    function VideoPlayer({ url }) {
        return React.createElement(ReactPlayerYoutube, { url: url, width: "100%", height: "100%", controls: true });
        // return <ReactPlayer url={url} width="100%" height="100%" controls /> if you want to use videos from local or from other platforms
    }
    async function fetchVideo() {
        const url = new URL(pathname('/api/home/video'), window.location.origin);
        const response = await fetch(url);
        const { success, error } = await response.json();
        if (error) {
            throw new Error(error);
        }
        return success;
    }
    function Video() {
        const [videoUrl, setVideoUrl] = React.useState('');
        React.useEffect(() => {
            fetchVideo().then(setVideoUrl)
                .catch(console.log);
        }, []);
        return React.createElement(VideoPlayer, { url: videoUrl });
    }
    // @ts-ignore
    const root = ReactDOM.createRoot(document.getElementById("home-video-container"));
    root.render(React.createElement(Video, null));
});
