

import(pathname("/jsx/imports")).then(({ React, ReactDOM, ReactPlayerYoutube }) => {
  function VideoPlayer({ url }: { url: string }) {
    return <ReactPlayerYoutube url={url} width="100%" height="100%" controls />
    // return <ReactPlayer url={url} width="100%" height="100%" controls /> if you want to use videos from local or from other platforms
  }

  async function fetchAnnouncements() {
    const url = new URL(pathname('/api/home/announcements'), window.location.origin);
    const response = await fetch(url);
    const { success, error } = await response.json();
    if (error) {
      throw new Error(error);
    }
    return success || [];
  }

  function Announcements() {
    const [announcements, setAnnouncements] = React.useState([]);

    React.useEffect(() => {
      fetchAnnouncements().then(setAnnouncements)
      .catch(console.log);
    }, []);

    return <>
    {announcements.map((announcement: {type: "video"|"text", url?: string, message?: string, title: string}, i: number) => (
      <React.Fragment key={"announcement_" + i}>
        {announcement.type === "video" && (
          <div className="min-w-[500px] max-w-[500px] bg-white border">
            <div className="text-xl font-bold py-2 px-3 bg-blue-800 text-white"><h2>{announcement.title}</h2></div>
            <div className="w-full h-full px-[10%] py-[5%] aspect-video">
              <VideoPlayer url={announcement.url || ""} />
            </div>
          </div>
        )}
        {announcement.type === "text" && (
          <div className="p-3 bg-gray-100 rounded-lg">
            <div className="text-center">
              {announcement.message?.split("\n").map((v: any) => <>{v}<br /></> || "")}
            </div>
          </div>
        )}
      </React.Fragment>
    ))}
    </>
  }

  // @ts-ignore
  const root = ReactDOM.createRoot(document.getElementById("home-announcement-container"))
  root.render(<Announcements />)
});