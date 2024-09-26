import AddJournalForm from "/jsx/admin/addjournal";
import { CellAlign, Table, TableCellType, TableColumn, TableRow, TableRowAction } from "/jsx/admin/table";
import Modal from "/jsx/global/modal";
import PdfViewer from "/jsx/global/pdfviewer";
import { React, Sweetalert2 } from "/jsx/imports";


const columns: TableColumn[] = [
  { label: "#", key: "id", sortable: true, filterable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Thumbnail", key: "thumbnail", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "Date Created", key: "created_at", sortable: true, cellType: TableCellType.Date, align: CellAlign.Center },
  { label: "Title", key: "title", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Author", key: "author", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Year", key: "year", sortable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Publisher", key: "publisher", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Published Date", key: "published_date", sortable: true, cellType: TableCellType.Date, align: CellAlign.Center },
  { label: "Volume", key: "volume", sortable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "No.", key: "number", sortable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Reads", key: "reads", sortable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Status", key: "is_public", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "Action", key: "action", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];


export default function JournalPage() {
  const [openAddJournalForm, setShowAddJournalForm] = React.useState(false)
  const [pdfUrl, setPdfUrl] = React.useState("")
  const [pdfTitle, setPdfTitle] = React.useState("")
  const [pdfAuthor, setPdfAuthor] = React.useState("")
  const [tableData, setTableData] = React.useState<TableRow[]>([])
  const [thumbnail, setThumbnail] = React.useState('');

  const handleEditThumbnail = React.useCallback((data: any) => {
    Sweetalert2.fire({
      title: 'Edit Thumbnail',
      text: 'Enter the new thumbnail URL:',
      input: 'file',
      inputValue: data.thumbnail,
      showCancelButton: true,
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel',
      showLoaderOnConfirm: true,
      preConfirm: (file: File) => {
        return new Promise((resolve, reject) => {
          if (file && file.size > 3 * 1024 * 1024) { // limit to 3MB
            reject('Thumbnail File size exceeds the maximum limit of 3MB.');
          } else {
            const searchParam = (new URLSearchParams((new URL(data.thumbnail, window.location.origin)).search))
            const formData = new FormData();
            formData.append('id', data.id);
            formData.append('filename', searchParam.get('filename') || '');
            console.log(file.type);
            formData.append('thumbnail', new Blob([file], { type: file.type }), file.name);
            const url = new URL('/api/thumbnail/edit', window.location.origin);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.onload = () => {
              if (xhr.status === 201) {
                const response = JSON.parse(xhr.responseText);
                if (response.error) {
                  reject(response.error);
                } else {
                  resolve('Journal Document uploaded successfully.')
                }
              } else {
                reject(JSON.parse(xhr.responseText)?.error || 'Failed to upload');
              }
            };
            xhr.onerror = (e) => {
              reject(JSON.parse(xhr.responseText)?.error || 'Error Uploading');
            };
            xhr.send(formData);
          }
        })
          .then(msg => msg)
          .catch(err => {
            Sweetalert2.showValidationMessage(err.message);
          });
      }
    })
    .then(({ isConfirmed, value }: any) => {
      if (isConfirmed) {
        Sweetalert2.fire({
          icon: 'success',
          title: 'Thumbnail Updated',
          text: value,
          toast: true,
          showConfirmButton: false,
          position: 'center',
          timer: 2000,
        })
        setTimeout(() => fetchList(), 500);
      }
    });
  }, []);

  const fetchList = () => {
    fetch('/api/journal/all')
    .then(response => response.json())
    .then(({ success, error }) => {
      if (error) {
        console.log(error);
      } else {
        setTableData(success.map((data: any) => ({
            id: data.id,
            created_at: data.created_at,
            title: data.title,
            author: data.author,
            year: data.year,
            volume: data.volume,
            number: data.number,
            publisher: data.publisher,
            published_date: data.published_date,
            thumbnail: {
              value: data.thumbnail,
              content: (<>
                <button type="button" onClick={() => handleEditThumbnail(data)} className="relative w-[70px] h-[90px] after:absolute after:left-0 after:top-0 after:w-[70px] after:h-[90px] hover:after:bg-white/40 hover:after:content-center hover:after:content-['edit'] hover:after:drop-shadow-lg hover:after:text-black">
                  <img src={(new URL(data.thumbnail, window?.location?.origin)).toString()} alt="thumbnail" className="w-full h-full object-contain" />
                </button>
              </>)
            },
            reads: data.reads || 0,
            is_public: {
              value: !data.is_public ? 'No' : 'Yes',
              content: !data.is_public
                ? (
                  <button
                    type="button"
                    className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]"
                    onClick={() => {
                      Sweetalert2.fire({
                        icon: 'question',
                        title: 'Do you want to display this journal publicly?',
                        confirmButtonText: 'Yes, Display Journal publicly',
                        confirmButtonColor: '#3085d6',
                        showDenyButton: true,
                        denyButtonText: 'No, Cancel',
                        denyButtonColor: '#d33',
                        showLoaderOnConfirm: true,
                        preConfirm: async () => {
                          try {
                            const publishUrl = new URL('/api/journal/publish', window.location.origin);
                            const response = await fetch(publishUrl, {
                              method: 'POST',
                              body: JSON.stringify({ id: data.id, is_public: true }),
                              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                            })
                            if (!response.ok) {
                              const { error } = await response.json()
                              return Sweetalert2.showValidationMessage('Failed: ' + error);
                            }
                            return response.json();
                          } catch (error) {
                            Sweetalert2.showValidationMessage('Failed: ' + error);
                          }
                        },
                        allowOutsideClick: () => !Sweetalert2.isLoading()
                      }).then((result: any) => {
                        if (result.isConfirmed) {
                          if (result.value?.error) {
                            Sweetalert2.fire({
                              icon: 'error',
                              title: 'Error',
                              text: 'Failed to make journal public: ' + result.value.error,
                              timer: 3000,
                              toast: true,
                              position: 'center'
                            })
                          } else {
                            Sweetalert2.fire({
                              icon: 'success',
                              title: 'Journal Publicly Displayed Successfully',
                              timer: 3000,
                              toast: true,
                              position: 'center'
                            });
                            fetchList();
                          }
                        }
                      })
                    }}
                  >
                    Hidden
                  </button>
                ) : (
                <button
                  type="button"
                  className="bg-white px-3 py-2 text-green-700 font-bold rounded-2xl leading-[14.63px] text-[12px]"
                  onClick={() => {
                    Sweetalert2.fire({
                      icon: 'question',
                      title: 'Do you want to hide this journal to the public?',
                      confirmButtonText: 'Yes, Hide Journal',
                      confirmButtonColor: '#3085d6',
                      showDenyButton: true,
                      denyButtonText: 'No, Cancel',
                      denyButtonColor: '#d33',
                      showLoaderOnConfirm: true,
                      preConfirm: async () => {
                        try {
                          const publishUrl = new URL('/api/journal/publish', window.location.origin);
                          const response = await fetch(publishUrl, {
                            method: 'POST',
                            body: JSON.stringify({ id: data.id, is_public: false }),
                            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                          })
                          if (!response.ok) {
                            const { error } = await response.json()
                            return Sweetalert2.showValidationMessage('Failed: ' + error);
                          }
                          return response.json();
                        } catch (error) {
                          Sweetalert2.showValidationMessage('Failed: ' + error);
                        }
                      },
                      allowOutsideClick: () => !Sweetalert2.isLoading()
                    }).then((result: any) => {
                      if (result.isConfirmed) {
                        if (result.value?.error) {
                          Sweetalert2.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to make journal hidden: ' + result.value.error,
                            timer: 3000,
                            toast: true,
                            position: 'center'
                          })
                        } else {
                          Sweetalert2.fire({
                            icon: 'success',
                            title: 'Journal Hidden Successfully',
                            timer: 3000,
                            toast: true,
                            position: 'center'
                          });
                          fetchList();
                        }
                      }
                    })
                  }}
                >
                  Public
                </button>
              )
            },
            action: (
              <TableRowAction
                id={data.id}
                onView={(id) => {
                  if (id === data.id) {
                    // Open the view journal modal
                    setPdfTitle(data.title);
                    setPdfAuthor("Author/s: " + data.author + " (" + data.year + ")");
                    setPdfUrl(new URL(`/read${data.url}`, window.location.origin).toString());
                  }
                }}
                onDelete={(id) => {
                  Sweetalert2.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete journal!'
                  }).then(({ isConfirmed }: any) => {
                    if (isConfirmed) {
                      fetch(`/api/journal/delete?id=${id}`, { method: 'DELETE' })
                      .then(response => response.json())
                      .then(({ success, error }) => {
                        if (!success) {
                          console.log(error);
                          Sweetalert2.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Failed to delete thesis: ' + error,
                            confirmButtonText: 'Try Again',
                          });
                        } else {
                          fetchList();
                          Sweetalert2.fire({
                            icon:'success',
                            title: 'Deleted!',
                            text: 'Journal has been deleted successfully.',
                            timer: 3000
                          });
                        }
                      })
                      .catch((er) => {
                        console.log(er);
                        Sweetalert2.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Failed to delete journal',
                          timer: 3000
                        });
                      })
                    }
                  })
                }}
              />
            ),
          }
        )))
      }
    })
    .catch((e) => {
      console.log(e);
      Sweetalert2.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch journal list',
        confirmButtonText: 'Try Again',
        showCancelButton: true,
      }).then(({ isConfirmed }: any) => {
        if (isConfirmed) {
          setTimeout(() => fetchList(), 50);
        }
      })
    })
  };

  React.useEffect(() => {
    if (!pdfUrl) {
      setPdfTitle("");
      setPdfAuthor("");
    }
  }, [pdfUrl])

  React.useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className="w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 min-w-fit">
      <h1 className="text-white text-2xl my-2">Journal List</h1>
      <Table columns={columns} items={tableData}>
        {/* Additional Toolbar Button */}
        <div className="px-4">
          {/* Refresh Button */}
          <button type="button" onClick={() => fetchList()} className="hover:text-yellow-500" title="Refresh List"><span className="material-symbols-outlined">refresh</span></button>
        </div>
        <div className="px-4">
          <button type="button" onClick={() => setShowAddJournalForm(true)} className="hover:text-yellow-500" title="Add Journal"><span className="material-symbols-outlined">add</span></button>
        </div>
        <AddJournalForm open={openAddJournalForm} onClose={() => setShowAddJournalForm(false)} onSuccess={() => fetchList()} className="absolute right-3 top-full mt-4 shadow-lg" />
      </Table>
      <Modal open={!!pdfUrl} onClose={() => setPdfUrl(null)} content={<PdfViewer src={pdfUrl} />} header={pdfTitle} showCancelButton={false} showConfirmButton={false} footer={pdfAuthor} />
    </div>
  )
}