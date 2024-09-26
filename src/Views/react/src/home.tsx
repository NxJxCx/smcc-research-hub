import {
  React,
  ReactDOM,
  ReactPlayerYoutube, // ReactPlayer,
} from '/jsx/imports';

function VideoPlayer({ url }: { url: string }) {
  return <ReactPlayerYoutube url={url} width="100%" height="100%" controls />
  // return <ReactPlayer url={url} width="100%" height="100%" controls /> if you want to use videos from local or from other platforms
}
async function fetchVideo() {
  const url = new URL('/api/home/video', window.location.origin);
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
  }, [])

  return <VideoPlayer url={videoUrl} />
}

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("home-video-container"))
root.render(<Video />)