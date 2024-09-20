import { MainContext } from "/jsx/context";
import clsx from "/jsx/global/clsx";
import { Departments } from "/jsx/global/enums";
import Modal from "/jsx/global/modal";
import PdfViewer from "/jsx/global/pdfviewer";
import { React, Sweetalert2 } from "/jsx/imports";
import SearchHeaderInput from "/jsx/main/search";

function ThumbnailThesis({
  id,
  title,
  abstract,
  author,
  course,
  year,
  favorite,
  url,
  onViewPdf,
  onRefresh,
}: {
  id: string|number;
  title: string;
  abstract: string;
  author: string;
  course: string;
  year: number;
  favorite: boolean;
  url: string;
  onViewPdf?: (uri: string, title: string, author: string) => void;
  onRefresh?: () => void,
}) {
  const { authenticated, authData } = React.useContext(MainContext)

  const handleFavoriteClick = React.useCallback((e: any) => {
    e.preventDefault()
    e.stopPropagation()
    const url = new URL('/api/thesis/markfavorite', window.location.origin);
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
            text: 'Failed to mark thesis as favorite: '+ error,
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
  }, [id, authData])

  const handleView = React.useCallback(() => {
    const uri = new URL(`/read${url}&id=${id}`, window.location.origin).toString()
    onViewPdf && onViewPdf(uri, title, author + ' (' + year + ')')
  }, [url, onViewPdf, id])

  return (<>
    <div onClick={handleView} className="text-center relative cursor-pointer border rounded-lg p-4 w-[400px]">
      {authenticated && (
        <button type="button" onClick={handleFavoriteClick} className="absolute right-2 top-3 z-20 hover:text-yellow-500">
          {favorite && <span className="material-symbols-outlined text-green-700">bookmark_star</span>}
          {!favorite && <span className="material-symbols-outlined">bookmark</span>}
        </button>
      )}
      <div className="h-[75px] pt-4 px-4 font-bold leading-tight">
        {title}
      </div>
      <div className="h-[150px] mb-2 text-justify px-4 leading-tight indent-8">
        {abstract.substring(0, Math.min(320, abstract.length))}...
      </div>
      <div className="pt-4 px-2 leading-tight text-gray-700 italic">
        {author} ({year})
      </div>
      <div className="pb-2 px-2 text-sm italic leading-tight text-gray-600">
        {course}
      </div>
    </div>
  </>)
}

export default function Thesis() {
  const { authenticated, authData } = React.useContext(MainContext)
  const [search, setSearch] = React.useState<string>((new URLSearchParams((new URL(window.location.href)).search)).get('search') || '')
  const searchParams = React.useMemo(() => new URLSearchParams((new URL(window.location.href)).search), []);
  const onSearch = React.useCallback((s: string) => {
    setSearch(s)
    searchParams.set('search', s)
    window.history.pushState({}, '', `?${searchParams.toString()}`)
  }, [])

  const [data, setData] = React.useState<any[]>([])

  const [selectedDepartment, setSelectedDepartment] = React.useState<Departments>(Departments.CCIS);

  const displayData = React.useMemo(() => data.filter((item: any) => item.department === selectedDepartment && (!search || item.title.includes(search)) || item.abstract.includes(search) || item.author.includes(search) || item.year.toString().includes(search)), [data, selectedDepartment, search])

  const [page, setPage] = React.useState<number>(1)
  const totalPages = React.useMemo(() => Math.ceil(displayData.length / 20), [displayData])

  const finalDisplay = React.useMemo(() => displayData.length === 0 ? undefined : displayData?.slice((page - 1) * 20, page * 20), [page, displayData, totalPages])

  const nextPage = React.useCallback(() => setPage((prev: number) => Math.min(totalPages, Math.max(totalPages === 0 ? 0 : 1, prev + 1))), [totalPages])
  const prevPage = React.useCallback(() => setPage((prev: number) => Math.min(totalPages, Math.max(totalPages === 0 ? 0 : 1, prev - 1))), [totalPages])

  const fetchData = async () => {
    const url = new URL('/api/thesis/public/all', window.location.origin);
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
        success.sort((a: any, b: any) => (new Date(a.created_at)).getTime() > (new Date(b.created_at)).getTime() ? -1 : 1);
        setData(success);
      }
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    fetchData().catch()
  }, [])

  const [pdfUrl, setPdfUrl] = React.useState()
  const [pdfTitle, setPdfTitle] = React.useState()
  const [pdfAuthor, setPdfAuthor] = React.useState()

  const handleViewPdf = React.useCallback((uri: string, title: string, author: string) => {
    setPdfTitle(title);
    setPdfUrl(uri);
    setPdfAuthor(author);
  }, [])

  return (<>
    <div className="flex py-4 px-8 mt-4">
      <div className="flex-grow mt-3">
        <h1 className="text-2xl font-bold text-center">Theses/Capstone</h1>
        <div className="flex flex-wrap p-4 gap-4">
          { !!selectedDepartment && finalDisplay?.map((item: any) => (
            <ThumbnailThesis
              key={item.id}
              id={item.id}
              title={item.title}
              abstract={item.abstract}
              author={item.author}
              course={item.course}
              year={item.year}
              favorite={item.favorite}
              url={item.url}
              onViewPdf={handleViewPdf}
              onRefresh={fetchData}
            />
          )) || (
            <div className="lg:col-span-2 xl:col-span-3 mx-auto">
              <div className="h-[200px] mb-2">
                <div className="border-2 border-gray-300 rounded-lg p-4">
                  <div className="text-gray-500">No theses found.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="min-w-[326px] max-w-[326px] h-[600px] flex flex-col">
        <div className="min-h-[400px] flex-grow">
          <div className="font-bold text-xl mb-4 w-full">
            Categories
          </div>
          {Object.entries(Departments).map(([key, value]) => (
            <button
              key={key}
              type="button"
              className={clsx(`flex items-center px-4 py-2 text-left`, selectedDepartment === value ? "bg-gray-200 font-bold" : "hover:bg-gray-300")}
              onClick={() => setSelectedDepartment(value)}
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
        <div className="flex-shrink text-slate-700 font-[600] mx-auto">
          <button type="button" className="p-1 hover:text-yellow-700" onClick={() => setPage(totalPages === 0 ? 0 : 1)}>{"<<"}</button>
          <button type="button" className="p-1 hover:text-yellow-700" onClick={prevPage}>{"<"} Prev</button>
          <button type="button" className="p-1 hover:text-yellow-700" onClick={nextPage}>Next {">"}</button>
          <button type="button" className="p-1 hover:text-yellow-700" onClick={() => setPage(totalPages)}>{">>"}</button>
        </div>
      </div>
    </div>
    <Modal open={!!pdfUrl} onClose={() => { setPdfUrl(undefined); setPdfTitle(undefined); setPdfAuthor(undefined); }} content={authenticated ? <PdfViewer src={pdfUrl} /> : <div className="w-full text-center min-h-[150px] pt-16">Please <a href="/login" className="text-sky-700 underline">login</a> to view thesis.</div>} header={pdfTitle} showCancelButton={false} showConfirmButton={false} footer={pdfAuthor} />
  </>)
}