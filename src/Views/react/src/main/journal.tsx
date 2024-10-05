

export default import(pathname("/jsx/imports")).then(async ({ React, clsx, Sweetalert2, getAsyncImport }) => {
  const { default: { MainContext } } = await getAsyncImport("/jsx/context");
  const { default: Modal } = await getAsyncImport("/jsx/global/modal");
  const { default: PdfViewer } = await getAsyncImport("/jsx/global/pdfviewer");
  const { default: SearchHeaderInput } = await getAsyncImport("/jsx/main/search");

  function ThumbnailJournal({
    id,
    title,
    month,
    year,
    volume,
    number,
    publishedDate,
    thumbnail,
    onRefresh,
    onSelect,
  }: {
    id: string | number;
    title: string;
    month: string;
    year: number;
    volume: number;
    number: number;
    publishedDate: string;
    thumbnail: string;
    onRefresh?: () => void,
    onSelect?: (id: string | number) => void;
  }) {
    const { authData } = React.useContext(MainContext)

    // const handleFavoriteClick = React.useCallback((e: any) => {
    //   e.preventDefault()
    //   e.stopPropagation()
    //   const url = new URL(pathname('/api/journal/markfavorite'), window.location.origin);
    //   const body = JSON.stringify({ id, [authData?.account]: authData?.id })
    //   fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json; charset=UTF-8',
    //       'Accept': 'application/json; charset=UTF-8',
    //     },
    //     body,
    //   })
    //     .then(response => response.json())
    //     .then(({ success, error }) => {
    //       if (error) {
    //         Sweetalert2.fire({
    //           icon: 'error',
    //           title: 'Error',
    //           text: 'Failed to mark journal as favorite: ' + error,
    //           toast: true,
    //           showConfirmButton: false,
    //           position: 'center',
    //           timer: 3000,
    //         })
    //       } else if (!success) {
    //         Sweetalert2.fire({
    //           icon: 'error',
    //           title: 'Error',
    //           text: 'Failed to mark journal as favorite',
    //           toast: true,
    //           showConfirmButton: false,
    //           position: 'center',
    //           timer: 3000,
    //         })
    //       } else {
    //         onRefresh && onRefresh()
    //       }
    //     })
    //     .catch(console.log)
    // }, [id, authData])

    // const handleView = React.useCallback(() => {
    //   const uri = new URL(pathname(`/read${url}&id=${id}`), window.location.origin).toString()
    //   onViewPdf && onViewPdf(uri, title, author + ' (' + year + ') Vol. ' + volume + ' No. ' + number)
    // }, [url, onViewPdf, id])

    return (<>
      <div onClick={() => onSelect && onSelect(id)} className="text-center relative cursor-pointer border rounded-lg p-4 w-[70mm] hover:bg-gray-200">
        <div className="flex flex-col">
          <div className="min-w-[60mm] max-w-[60mm] min-h-[70mm] max-h-[70mm] rounded border shadow">
            <img src={pathname(thumbnail)} alt="Thumbnail" className="object-contain h-full" />
          </div>
          <div className="px-4 mt-4">
            <div className="pt-2 px-4 font-bold leading-tight">
              {title}, {month}
            </div>
            <div className="pb-2 px-2 italic leading-tight">
              Vol. {volume} No. {number} ({year})
            </div>
            <div className="pb-2 px-2 leading-tight text-gray-700 italic text-center text-sm">
              Published Date: {(new Date(publishedDate)).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </>)
  }

  function SelectedJournalPage({
    journal,
    theses = [],
    search,
    onViewPdf,
    onBack,
    onRefresh,
  }: Readonly<{
    journal: any,
    theses: any[],
    search: string,
    onViewPdf: (thesis: any) => void,
    onBack: () => void,
    onRefresh?: () => void,
  }>) {
    const { authenticated, authData } = React.useContext(MainContext);

    const selectedTheses = React.useMemo(() => theses?.filter((item: any) => (
      (!search || item.title?.toString()?.toLowerCase()?.includes(search.toLowerCase())) || item.abstract?.toString()?.toLowerCase()?.includes(search.toLowerCase()) || item.author?.toString().toLowerCase()?.includes(search.toLowerCase()) || item.year?.toString()?.toLowerCase()?.includes(search.toLowerCase()))
    ) || [], [theses, search])

    console.log(selectedTheses)
    const handleFavoriteClick = React.useCallback((e: any, id: string) => {
      e.preventDefault()
      e.stopPropagation()
      const url = new URL(pathname('/api/thesis/markfavorite'), window.location.origin);
      const body = JSON.stringify({ id, [authData?.account]: authData?.id })
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Accept': 'application/json; charset=UTF-8',
        },
        body,
      })
        .then(response => response.json())
        .then(({ success, error }) => {
          if (error) {
            Sweetalert2.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to mark thesis as favorite: ' + error,
              toast: true,
              showConfirmButton: false,
              position: 'center',
              timer: 3000,
            })
          } else if (!success) {
            Sweetalert2.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to mark thesis as favorite',
              toast: true,
              showConfirmButton: false,
              position: 'center',
              timer: 3000,
            })
          } else {
            onRefresh && onRefresh()
          }
        })
        .catch(console.log)
    }, [authData])

    return (
      <div className="w-full font-[Roboto] relative">
        <button type="button" onClick={onBack} className="flex items-center justify-start">
          <span className="material-symbols-outlined">
            chevron_left
          </span>
          <span className="underline">Back</span>
        </button>
        <div className="flex flex-col gap-y-4 lg:gap-y-0 lg:flex-row py-16">
          <div className="lg:w-1/2">
            <div className="min-w-[60mm] max-w-[60mm] min-h-[70mm] max-h-[70mm] rounded border shadow mx-auto">
              <img src={pathname(journal?.thumbnail)} alt="Thumbnail" className="object-contain h-full" />
            </div>
          </div>
          <div className="text-center min-w-[60mm]">
            <h2 className="font-bold text-lg">{journal?.title}, {journal?.month}</h2>
            <div className="font-[400] text-sm text-gray-600">Vol. {journal?.volume} No. {journal?.number} ({journal?.year})</div>
            <div className="font-bold text-sm text-gray-600 mt-3">Published Date</div>
            <div className="text-sm text-gray-600">{(new Date(journal?.published_date)).toLocaleDateString()}</div>
            <div className="text-sm text-gray-600 mt-3">{theses.length} Theses</div>
          </div>
        </div>
        <div className="min-h-[400px] px-2">
          <div className="border-t">
            <div className="-translate-y-[55%] ml-4 bg-white w-fit">Thesis</div>
          </div>
          <div className="mt-2 max-h-[380px] h-full overflow-y-auto w-full px-8">
            {selectedTheses.length === 0 ? <span className="py-8">No Theses found in {!search ? 'this journal' : 'your search'}.</span> : (
              <div className="flex flex-wrap leading-tight gap-4">
                {selectedTheses.map((thesis: any) => (
                  <div key={thesis?.id} onClick={() => onViewPdf(thesis)} className="relative hover:bg-gray-200 hover:shadow w-1/2 p-2 cursor-pointer rounded">
                    {authenticated && authData?.account !== 'admin' && (
                      <button type="button" onClick={(e: any) => handleFavoriteClick(e, thesis?.id)} className="absolute right-2 top-3 z-20 hover:text-yellow-500">
                        {thesis?.favorite && <span className="material-symbols-outlined text-green-700">bookmark_star</span>}
                        {!thesis?.favorite && <span className="material-symbols-outlined">bookmark</span>}
                      </button>
                    )}
                    <div className="font-bold">{thesis?.title}</div>
                    <div className="text-sm font-[400] text-gray-600">{thesis?.author} ({thesis?.year})</div>
                    <div className="leading-tight">
                      <div className="material-symbols-outlined aspect-square text-sm mr-1 font-bold">visibility</div>
                      <div className="inline pb-1 font-[500]">{thesis?.totalViews}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return function Thesis() {
    const { authenticated, authData } = React.useContext(MainContext)
    const [search, setSearch] = React.useState((new URLSearchParams((new URL(window.location.href)).search)).get('search') || '')
    const searchParams = React.useMemo(() => new URLSearchParams((new URL(window.location.href)).search), []);
    const onSearch = React.useCallback((s: string) => {
      setSearch(s)
      searchParams.set('search', s)
      window.history.pushState({}, '', `?${searchParams.toString()}`)
    }, [])

    const [data, setData] = React.useState([])

    const [selected, setSelected] = React.useState(null)

    const yearList = React.useMemo(() => data.reduce((init: any[], value: any) => init.includes(value.year) ? init : [...init, value.year].toSorted((a: any, b: any) => b - a), []), [data])

    const [selectedYear, setSelectedYear] = React.useState((new Date()).getFullYear());

    const displayData = React.useMemo(() => !selected ? data.filter((item: any) => item.year.toString() === selectedYear.toString() && ((!search || item.title?.toString()?.toLowerCase()?.includes(search.toLowerCase())) || item.volume?.toString()?.toLowerCase()?.includes(search.toLowerCase()) || item.number?.toString()?.toLowerCase()?.includes(search.toLowerCase()) || item.month?.toLowerCase()?.includes(search.toLowerCase()) || item.year?.toString()?.toLowerCase()?.includes(search.toLowerCase()) || `${item.title?.toString()?.toLowerCase()}, ${item.month?.toString()?.toLowerCase()}`.includes(search.toLowerCase()))) : [], [data, selectedYear, search, selected])

    const [page, setPage] = React.useState(1)
    const totalPages = React.useMemo(() => Math.ceil(displayData.length / 20), [displayData])

    const finalDisplay = React.useMemo(() => displayData.length === 0 ? undefined : displayData?.slice((page - 1) * 20, page * 20), [page, displayData, totalPages])

    const nextPage = React.useCallback(() => setPage((prev: number) => Math.min(totalPages, Math.max(totalPages === 0 ? 0 : 1, prev + 1))), [totalPages])
    const prevPage = React.useCallback(() => setPage((prev: number) => Math.min(totalPages, Math.max(totalPages === 0 ? 0 : 1, prev - 1))), [totalPages])

    const fetchData = async () => {
      const url = new URL(pathname('/api/journal/public/all'), window.location.origin);
      url.searchParams.set(authData?.account, authData?.id);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const { success, error } = await response.json();
        if (error) {
          throw new Error(`HTTP error: ${error.message}`);
        } else if (success) {
          success.sort((a: any, b: any) => (new Date(a.created_at)).getTime() > (new Date(b.created_at)).getTime() ? -1 : (new Date(a.created_at)).getTime() == (new Date(b.created_at)).getTime() ? 0 : 1);
          setData(success);
          return success;
        }
      } catch (e) {
        console.log(e)
      }
      return [];
    }

    React.useEffect(() => {
      fetchData().catch()
    }, [])

    const [pdfUrl, setPdfUrl] = React.useState()
    const [pdfTitle, setPdfTitle] = React.useState()
    const [pdfAuthor, setPdfAuthor] = React.useState()

    const handleViewPdf = React.useCallback((thesis: any) => {
      const title = thesis?.title;
      const author = thesis?.author;
      const uri = new URL(`read${thesis?.url}`, window.location.origin).toString();
      setPdfTitle(title);
      setPdfAuthor(author);
      setPdfUrl(uri);
    }, [])

    const onSelect = React.useCallback((id: string | number) => {
      setSearch('');
      setSelected(data.find((item: any) => item.id == id))
    }, [data]);

    const handleRefresh = React.useCallback(async () => {
      if (selected) {
        const sel = selected.id;
        const data: any[] = await fetchData();
        const selectedData = data?.find(item => item.id === sel)
        setSelected(selectedData);
      }
    }, [selected])

    return (<>
      <div className="flex py-4 px-8 mt-4">
        <div className="flex-grow mt-3">
          <h1 className="text-2xl font-bold text-center">Journals</h1>
          {!selected && (
            <div className="flex flex-wrap p-4 gap-4">
              {!!selectedYear && (finalDisplay?.map((item: any) => (
                <ThumbnailJournal
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  volume={item.volume}
                  number={item.number}
                  month={item.month}
                  thumbnail={item.thumbnail}
                  year={item.year}
                  publishedDate={item.published_date}
                  onRefresh={fetchData}
                  onSelect={onSelect}
                />
              )) || (
                  <div className="lg:col-span-2 xl:col-span-3 mx-auto">
                    <div className="h-[200px] mb-2">
                      <div className="border-2 border-gray-300 rounded-lg p-4">
                        <div className="text-gray-500">No journal found.</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {!!selected && !!selectedYear && (
            <SelectedJournalPage
              journal={selected}
              theses={selected.theses}
              onViewPdf={handleViewPdf}
              search={search}
              onBack={() => setSelected(null)}
              onRefresh={handleRefresh}
            />
          )}
        </div>
        <div className="min-w-[326px] max-w-[326px] h-[600px] flex flex-col">
          <div className="min-h-[400px] flex-grow">
            <div className="font-bold text-xl mb-4 w-full">
              Year
            </div>
            {yearList.map((value: any, key: number) => (
              <button
                key={key}
                type="button"
                className={clsx(`flex items-center px-4 py-2 text-left`, selectedYear.toString() === value.toString() ? "bg-gray-200 font-bold" : "hover:bg-gray-300")}
                onClick={() => setSelectedYear(Number.parseInt(value))}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="flex-shrink text-slate-700 font-[600] w-full mb-3">
            <SearchHeaderInput search={search} onSearch={onSearch} />
          </div>
          <div className="text-slate-700 font-[600] max-w-full overflow-x-auto overflow-y-hidden">
            <div className="flex">
              {Array.from({ length: totalPages }).map((_, i: number) => (
                <button
                  key={i}
                  type="button"
                  className={clsx(`flex items-center px-4 py-2 text-left`, page === i + 1 ? "bg-gray-200 font-bold" : "hover:bg-gray-300")}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          {!selected ? (
            <div className="flex-shrink text-slate-700 font-[600] mx-auto">
              <button type="button" className="p-1 hover:text-yellow-700" onClick={() => setPage(totalPages === 0 ? 0 : 1)}>{"<<"}</button>
              <button type="button" className="p-1 hover:text-yellow-700" onClick={prevPage}>{"<"} Prev</button>
              <button type="button" className="p-1 hover:text-yellow-700" onClick={nextPage}>Next {">"}</button>
              <button type="button" className="p-1 hover:text-yellow-700" onClick={() => setPage(totalPages)}>{">>"}</button>
            </div>
          ) : (<div className="flex-shrink text-slate-700 font-[600] mx-auto"><div className="p-4">&nbsp;</div></div>)}
        </div>
      </div>
      <Modal open={!!selected && !!pdfUrl} onClose={() => { setPdfUrl(undefined); setPdfTitle(undefined); setPdfAuthor(undefined); }} content={authenticated ? <PdfViewer src={pdfUrl} /> : <div className="w-full text-center min-h-[150px] pt-16">Please <a href={pathname("/login")} className="text-sky-700 underline">login</a> to view journal/thesis.</div>} header={pdfTitle} showCancelButton={false} showConfirmButton={false} footer={pdfAuthor} />
    </>)
  }
});