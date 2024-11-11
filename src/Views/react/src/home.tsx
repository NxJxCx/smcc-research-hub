

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
    const [isLoading, setIsLoading] = React.useState(true);
    const [announcements, setAnnouncements] = React.useState([]);
    const [ticking, setTicking] = React.useState(false);
  
    React.useEffect(() => {
      fetchAnnouncements()
        .then((data) => { setAnnouncements(data); setIsLoading(false); })
        .catch(console.log);
    }, []);

    React.useEffect(() => {
      setTimeout(() => setTicking(!ticking), 1000);
    }, [ticking])

    const checkExpired = React.useCallback((date: any) => {
      const now = Date.now();
      const expirationDate = new Date(date);
      return now > expirationDate.getTime();
    }, [ticking])

    if (isLoading) {
      return <div className="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 border-solid rounded-full animate-spin"></div>
    }

    return <>
    {announcements.map((announcement: {type: "video"|"text", url?: string, message?: string, title: string, expires: string, id?: string|number}, i: number) => (
      <React.Fragment key={"announcement_" + i + announcement?.id}>
        {announcement.type === "video" && !checkExpired(announcement.expires) && (
          <div className="w-[500px] md:w-[700px] lg:w-[1000px] min-w-[500px] bg-gray-100 border-l-2 border-blue-500 rounded">
            <div className="text-xl py-3 px-4 border-b  text-blue-500 font-semibold"><h2>{announcement.title}</h2></div>
            <div className="w-full h-full px-[10%] py-[5%] aspect-video">
              <VideoPlayer url={announcement.url || ""} />
            </div>
          </div>
        )}
        {announcement.type === "text" && !checkExpired(announcement.expires) && (
          <div className="w-[500px] md:w-[700px] lg:w-[1000px] min-w-[500px] bg-gray-100 border-l-2 border-blue-500 rounded">
            <div className="text-xl py-3 px-4  border-b text-blue-500 font-semibold"><h2>{announcement.title}</h2></div>
            <div className="text-center p-3 text-slate-900 my-3">
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