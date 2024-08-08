import PdfViewer from "../global/pdfviewer";
import AddThesisForm from "/jsx/admin/addthesis";
import { CellAlign, SortOrder, Table, TableCellType, TableColumn, TableRow, TableRowAction } from "/jsx/admin/table";
import Modal from "/jsx/global/modal";
import { React, Sweetalert2 } from "/jsx/imports";


const columns: TableColumn[] = [
  { label: "#", key: "id", sortable: true, filterable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Date Created", key: "created_at", sortable: true, cellType: TableCellType.Date, align: CellAlign.Center },
  { label: "Title", key: "title", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Author", key: "author", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Year", key: "year", sortable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Status", key: "status", sortable: true, cellType: TableCellType.Custom, align: CellAlign.Center },
  { label: "Action", key: "action", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];


function AdminLogin() {
  const [openAddThesisForm, setShowAddThesisForm] = React.useState(false)
  const [pdfUrl, setPdfUrl] = React.useState("")
  const [pdfTitle, setPdfTitle] = React.useState("")
  const [pdfAuthor, setPdfAuthor] = React.useState("")
  const [showEntries, setShowEntries] = React.useState(10)
  const [sortColumn, setSortColumn] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(SortOrder.Ascending)
  const [tableData, setTableData] = React.useState<TableRow[]>([])

  const fetchList = () => {
    fetch('/api/thesis/all')
    .then(response => response.json())
    .then(({ success, error }) => {
      if (error) {
        console.log(error);
      } else {
        setTableData(success.map((data: any) => {
          return {
            id: data.id,
            created_at: data.created_at,
            title: data.title,
            author: data.author,
            year: data.year,
            status: {
              value: !data.published ? "Unpublished" : "Published",
              content: !data.published
                ? <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Unpublished</button>
                : <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Published</button>
            },
            action: <TableRowAction id={data.id} onView={(id) => {
              if (id === data.id) {
                // Open the view thesis modal
                setPdfTitle(data.title);
                setPdfAuthor("Author/s: " + data.author + " (" + data.year + ")");
                setPdfUrl(new URL(`/read${data.url}`, window.location.origin).toString());
              }
            }} onDelete={(id) => {}} />,
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
      <Table columns={columns} items={tableData}>
        {/* Additional Toolbar Button */}
        <div className="px-4">
          {/* Refresh Button */}
          <button type="button" onClick={() => fetchList()} className="hover:text-yellow-500"><span className="material-symbols-outlined">refresh</span></button>
        </div>
        <div className="px-4">
          <button type="button" onClick={() => setShowAddThesisForm(true)} className="hover:text-yellow-500"><span className="material-symbols-outlined">add</span></button>
        </div>
        <AddThesisForm open={openAddThesisForm} onClose={() => setShowAddThesisForm(false)} onSuccess={() => fetchList()} className="absolute right-3 top-full mt-4 shadow-lg" />
      </Table>
      <Modal open={!!pdfUrl} onClose={() => setPdfUrl(null)} content={<PdfViewer src={pdfUrl} />} header={pdfTitle} showCancelButton={false} showConfirmButton={false} footer={pdfAuthor} />
    </div>
  )
}

export default AdminLogin