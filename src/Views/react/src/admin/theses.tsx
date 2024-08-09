import AddThesisForm from "/jsx/admin/addthesis";
import { CellAlign, Table, TableCellType, TableColumn, TableRow, TableRowAction } from "/jsx/admin/table";
import Modal from "/jsx/global/modal";
import PdfViewer from "/jsx/global/pdfviewer";
import { React, Sweetalert2 } from "/jsx/imports";


const columns: TableColumn[] = [
  { label: "#", key: "id", sortable: true, filterable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Date Created", key: "created_at", sortable: true, cellType: TableCellType.Date, align: CellAlign.Center },
  { label: "Title", key: "title", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Author", key: "author", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Year", key: "year", sortable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Department", key: "department", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Course", key: "course", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Published", key: "published", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "Action", key: "action", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];


function ThesesPage() {
  const [openAddThesisForm, setShowAddThesisForm] = React.useState(false)
  const [pdfUrl, setPdfUrl] = React.useState("")
  const [pdfTitle, setPdfTitle] = React.useState("")
  const [pdfAuthor, setPdfAuthor] = React.useState("")
  const [tableData, setTableData] = React.useState<TableRow[]>([])

  const fetchList = () => {
    fetch('/api/thesis/all')
    .then(response => response.json())
    .then(({ success, error }) => {
      if (error) {
        console.log(error);
      } else {
        console.log(success);
        setTableData(success.map((data: any) => {
          return {
            id: data.id,
            created_at: data.created_at,
            title: data.title,
            author: data.author,
            year: data.year,
            department: data.department,
            course: data.course,
            published: {
              value: !data.published_id ? 1 : (new Date(data.fk_published_id.created_at)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
              content: !data.published_id
                ? <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Unpublished</button>
                : <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>{(new Date(data.fk_published_id.created_at)).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</button>
            },
            action: <TableRowAction id={data.id} onView={(id) => {
              if (id === data.id) {
                // Open the view thesis modal
                setPdfTitle(data.title);
                setPdfAuthor("Author/s: " + data.author + " (" + data.year + ")");
                setPdfUrl(new URL(`/read${data.url}`, window.location.origin).toString());
              }
            }} onDelete={(id) => {
              Sweetalert2.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete thesis!'
              }).then(({ isConfirmed }: any) => {
                if (isConfirmed) {
                  fetch(`/api/thesis/delete?id=${id}`, { method: 'DELETE' })
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
                        text: 'Thesis has been deleted successfully.',
                        timer: 3000
                      });
                    }
                  })
                  .catch((er) => {
                    console.log(er);
                    Sweetalert2.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Failed to delete thesis',
                      timer: 3000
                    });
                  })
                }
              })
            }} />,
          }
        }))
      }
    })
    .catch((e) => {
      console.log(e);
      Sweetalert2.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch thesis list',
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
    <div className="w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 ">
      <h1 className="text-white text-2xl my-2">Thesis/Capstone List</h1>
      <Table columns={columns} items={tableData}>
        {/* Additional Toolbar Button */}
        <div className="px-4">
          {/* Refresh Button */}
          <button type="button" onClick={() => fetchList()} className="hover:text-yellow-500" title="Refresh List"><span className="material-symbols-outlined">refresh</span></button>
        </div>
        <div className="px-4">
          <button type="button" onClick={() => setShowAddThesisForm(true)} className="hover:text-yellow-500" title="Add Thesis"><span className="material-symbols-outlined">add</span></button>
        </div>
        <AddThesisForm open={openAddThesisForm} onClose={() => setShowAddThesisForm(false)} onSuccess={() => fetchList()} className="absolute right-3 top-full mt-4 shadow-lg" />
      </Table>
      <Modal open={!!pdfUrl} onClose={() => setPdfUrl(null)} content={<PdfViewer src={pdfUrl} />} header={pdfTitle} showCancelButton={false} showConfirmButton={false} footer={pdfAuthor} />
    </div>
  )
}

export default ThesesPage