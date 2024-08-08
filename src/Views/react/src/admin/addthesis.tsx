import clsx from "/jsx/global/clsx"
import { Input, Select } from "/jsx/global/input"
import Modal from "/jsx/global/modal"
import PdfViewer from "/jsx/global/pdfviewer"
import { React, Sweetalert2 } from "/jsx/imports"

export default function AddThesisForm({ open, defaultOpen, className = "", onClose = () => {} }: { open?: boolean, defaultOpen?: boolean, className?: string, onClose?: () => void }) {
  const [show, setShow] = React.useState(open === undefined ? defaultOpen || false : open);
  const [thesisTitle, setThesisTitle] = React.useState('')
  const [thesisAuthor, setThesisAuthor] = React.useState('')
  const [thesisYear, setThesisYear] = React.useState((new Date()).getFullYear().toString())
  const [pdf, setPdf] = React.useState<File|null|undefined>()
  const [pdfUrl, setPdfUrl] = React.useState<string|null|undefined>()
  const [showModal, setShowModal] = React.useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = React.useState<number>(0)
  const [xhr, setXhr] = React.useState<XMLHttpRequest|null>(null)
  const yearsList = React.useMemo(() => Array.from({ length: (new Date()).getFullYear() - 2000 }, (_, i) => (new Date()).getFullYear() - i).map((y) => ({ label: y.toString(), value: y.toString() })), [])
  const isFormDisabled = React.useMemo(() => uploadProgress > 0 && uploadProgress < 100, [uploadProgress]);

  React.useEffect(() => {
    if (open !== undefined) {
      setShow(open);
      if (!open) {
        onClose && onClose();
      }
    }
  }, [open]);

  const onCloseModal = React.useCallback(() => {
    if (open === undefined) {
      setShow(false);
    }
    onClose && onClose();
  }, [open, onClose]);

  const openViewPdf = React.useCallback(() => {
    if (pdf) {
      setShowModal(true)
    }
  }, [pdf])

  React.useEffect(() => {
    if (!!pdf) {
      const blob = new Blob([pdf], { type: pdf.type })
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
      return () => {
        URL.revokeObjectURL(url)
        setPdfUrl(null)
      }
    }
  }, [pdf])

  const onSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!pdf) {
      Sweetalert2.fire({
        icon: 'warning',
        text: 'Please upload Thesis Document in PDF format.',
        toast: true,
        timer: 2000,
        showConfirmButton: false,
        position: 'center',
      })
      return;
    }
    const formData = new FormData();
    formData.append('document', 'thesis');
    formData.append('title', thesisTitle);
    formData.append('author', thesisAuthor);
    formData.append('year', thesisYear);
    formData.append('pdf', new Blob([pdf], { type: "application/pdf" }), pdf.name);

    const xhr = new XMLHttpRequest();
    setXhr(xhr);
    xhr.open('POST', '/api/upload/pdf', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 201) {
        const response = JSON.parse(xhr.responseText);
        if (response.error) {
          Sweetalert2.fire({
            icon: 'error',
            title: 'Failed to upload PDF file',
            text: response.error,
            toast: true,
            timer: 2000,
            showConfirmButton: false,
            position: 'center',
          })
        } else {
          Sweetalert2.fire({
            icon:'success',
            title: 'Success',
            text: 'Thesis Document uploaded successfully.',
            toast: true,
            timer: 2000,
            showConfirmButton: false,
            position: 'center',
          })
          setPdf(null)
          setThesisTitle('')
          setThesisAuthor('')
          setThesisYear((new Date()).getFullYear().toString())
          setUploadProgress(0);
        }
      } else {
        Sweetalert2.fire({
          icon: 'error',
          title: 'Failed to upload PDF file',
          text: JSON.parse(xhr.responseText)?.error,
          toast: true,
          timer: 2000,
          showConfirmButton: false,
          position: 'center',
        })
      }
    };

    xhr.onerror = (e) => {
      Sweetalert2.fire({
        icon: 'error',
        title: 'Failed to upload PDF file',
        text: JSON.parse(xhr.responseText)?.error,
        toast: true,
        timer: 2000,
        showConfirmButton: false,
        position: 'center',
      })
    };

    xhr.send(formData);
  }, [pdf, thesisTitle, thesisAuthor, thesisYear])

  const onCancelUpload = () => {
    if (xhr) {
      xhr.abort();
      setUploadProgress(0);
      setXhr(null);
      Sweetalert2.fire({
        icon: 'info',
        title: 'Upload Cancelled',
        text: 'The file upload has been cancelled.',
        toast: true,
        timer: 2000,
        showConfirmButton: false,
        position: 'center',
      });
    }
  };

  return (<>
    <div className={
      clsx(
        "max-w-[500px] min-w-[400px] bg-[#252e38] pt-4 px-4 rounded-lg border border-[#45515F] z-20",
        show ? "block" : "hidden",
        className
      )
    }>
      <form onSubmit={onSubmit}>
        <div className="flex flex-wrap justify-center items-center gap-3">
          <Input className="max-w-[180px] text-black" label="Thesis Title" name="title" value={thesisTitle} onChange={(e: any) => setThesisTitle(e.target.value)} disabled={isFormDisabled} required />
          <Input className="max-w-[180px] text-black" label="Author/s" name="author" value={thesisAuthor} onChange={(e: any) => setThesisAuthor(e.target.value)} disabled={isFormDisabled} required />
          <Select className="max-w-[180px] text-black" items={yearsList} label="Year" name="year" value={thesisYear} onChange={(e: any) => setThesisYear(e.target.value)} disabled={isFormDisabled} required />
        </div>
        <div className="flex items-center justify-center w-full px-4 mt-4">
          <label htmlFor="dropzone-file" className={
            clsx(
              "flex flex-col items-center justify-center w-full h-32 border border-gray-500 border-dashed rounded-lg cursor-pointer",
              !pdf ? "" : "hidden"
            )}
          >
            <div className="flex flex-col items-center justify-center">
              <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">PDF (MAX 10MB)</p>
            </div>
            <input id="dropzone-file" type="file" name="pdf" className="hidden" accept=".pdf" value={""} onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.size > 30 * 1024 * 1024) { // limit to 30MB
                Sweetalert2.fire({
                  icon: 'warning',
                  text: 'File size exceeds the maximum limit of 10MB.',
                  toast: true,
                  timer: 2000,
                  showConfirmButton: false,
                  position: 'center',
                });
                e.target.value = "";
              } else {
                setPdf(file);
              }
            }} />
          </label>
          { !!pdf && (
            <div className={"border border-gray-500 border-dashed p-4 rounded-lg w-full h-32 flex items-center justify-center"}>
              <div className="flex justify-between border border-white p-3 rounded gap-x-3 items-center">
                <span className="text-white material-symbols-outlined">upload_file</span>
                <button type="button" onClick={openViewPdf}>
                  <span className="text-md text-white">{pdf.name}</span>
                </button>
                <div>
                  <span className="text-md text-gray-500">{(pdf.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div>
                  <button type="button" onClick={() => setPdf(null)} disabled={isFormDisabled}  className="disabled:text-gray-500 disabled:hover:text-gray-500  disabled:cursor-not-allowed hover:text-red-600 text-red-400" title="Remove"><span className="material-symbols-outlined">cancel</span></button>
                </div>
              </div>
            </div>
          )}
        </div>
        {uploadProgress > 0 && (
          <div className="w-full px-4 mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${uploadProgress}%`
                }}
              ></div>
            </div>
            <p className="text-white text-center mt-2">{uploadProgress.toFixed(2)}%</p>
            <button type="button" onClick={onCancelUpload} className="bg-red-500 rounded-2xl px-4 py-1 text-white shadow-lg mt-2">Cancel Upload</button>
          </div>
        )}
        <div className="w-full py-2 flex justify-between items-center mt-2 px-4">
          <button type="submit" disabled={isFormDisabled} className="bg-sky-500 rounded-2xl px-4 py-1 text-white shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400">{isFormDisabled ? "Submitting..." : "Submit"}</button>
          <button type="reset" onClick={() => { if (isFormDisabled) { onCancelUpload(); onCloseModal(); } else onCloseModal(); }} className="bg-[#333D49] rounded-2xl px-4 py-1 text-white">Cancel</button>
        </div>
      </form>
    </div>
    <Modal open={showModal} content={<PdfViewer src={pdfUrl} />} onClose={() => setShowModal(false)} showCancelButton={false} showConfirmButton={false} header={`Thesis File Preview (${pdf?.name})`} />
  </>)
}