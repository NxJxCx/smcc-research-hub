async function fetchVideo() {
  const url = new URL(pathname('/api/home/video'), window.location.origin);
  const response = await fetch(url);
  const { success, error } = await response.json();
  if (error) {
    throw new Error(error);
  }
  return success;
}

export default import(pathname("/jsx/imports")).then(({ React, Sweetalert2 }) => {
  return function HomepageManagementPage() {
    const [edit, setEdit] = React.useState(false);
    const [videoUrl, setVideoUrl] = React.useState('');

    const handleSubmit = React.useCallback(() => {
      if (edit) {
        const url = new URL(pathname('/api/home/video/edit'), window.location.origin);
        const body = JSON.stringify({ videoUrl });
        fetch(url,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body,
        })
          .then(response => response.json())
          .then(({ success, error }) => {
            if (error) {
              Sweetalert2.fire({
                icon: 'error',
                title: error,
                toast: true,
                showConfirmButton: false,
                position: 'center',
                timer: 2000,
              });
            } else if (success) {
              setEdit(false);
              Sweetalert2.fire({
                icon: 'success',
                title: 'Video URL changed successfully',
                toast: true,
                showConfirmButton: false,
                position: 'center',
                timer: 2000,
              });
              setVideoUrl(success);
            }
          })
          .catch((e) => {
            console.log(e);
            Sweetalert2.fire({
              icon: 'error',
              title: 'Failed to update homepage video URL',
              toast: true,
              showConfirmButton: false,
              position: 'center',
              timer: 2000,
            });
          });
        }
    }, [edit, videoUrl])

    React.useEffect(() => {
      fetchVideo()
        .then(setVideoUrl)
        .catch(console.log);
    }, [])

    return (
      <div className="w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 min-w-fit">
        <h1 className="text-white text-2xl my-2">Manage Homepage</h1>
        <div className="min-w-96 mt-4 max-w-[500px]">
          <label htmlFor="videoUrl" className="text-xl font-[500] text-white pb-4">Homepage Video URL:</label>
          <div className="flex">
            {!edit && <div className="border-2 border-black p-2 rounded-md w-full bg-gray-300">{videoUrl}</div>}
            {edit && <input type="text" id="videoUrl" className="border-2 border-black p-2 rounded-md w-full" placeholder="https://youtube.com/xxxxx" value={videoUrl} onChange={(e: any) => setVideoUrl(e.target.value)} />}
            <button type={'button'} onClick={() => !edit ? setEdit(true) : handleSubmit()} className="ml-4 bg-white/20 shadow rounded-lg aspect-square w-10 h-10">
              {!edit && <span className="material-symbols-outlined text-white">edit</span>}
              {edit && <span className="material-symbols-outlined text-green-500">check</span>}
            </button>
          </div>
        </div>
      </div>
    )
  }
});