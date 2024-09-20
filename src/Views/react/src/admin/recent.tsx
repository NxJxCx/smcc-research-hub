import { CellAlign, SortOrder, Table, TableCellType, TableColumn, TableRow, TableRowAction } from "/jsx/admin/table";
import { Tab, Tabs } from "/jsx/admin/tabs";
import Modal from "/jsx/global/modal";
import PdfViewer from "/jsx/global/pdfviewer";
import { React, Sweetalert2 } from "/jsx/imports";


const columns: TableColumn[] = [
  { label: "#", key: "id", sortable: true, filterable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Published Date", key: "created_at", sortable: true, cellType: TableCellType.Date, align: CellAlign.Center },
  { label: "Title", key: "title", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Abstract", key: "abstract", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Author", key: "author", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Year", key: "year", sortable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Department", key: "department", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Course", key: "course", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Action", key: "action", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];

export default function RecentPage() {
  const [pdfUrl, setPdfUrl] = React.useState("")
  const [pdfTitle, setPdfTitle] = React.useState("")
  const [pdfAuthor, setPdfAuthor] = React.useState("")
  const [thesisData, setThesisData] = React.useState<TableRow[]>([])
  const [journalData, setJournalData] = React.useState<TableRow[]>([])

  const fetchThesisList = () => {
    fetch('/api/thesis/published/all')
      .then(response => response.json())
      .then(({ success, error }) => {
        if (error) {
          console.log(error);
        } else {
          setThesisData(success.map((data: any) => ({
            id: data.id,
            created_at: data.created_at,
            title: data.fk_thesis_id?.title,
            abstract: data.abstract,
            author: data.fk_thesis_id?.author,
            year: data.fk_thesis_id?.year,
            department: data.fk_thesis_id?.department,
            course: data.fk_thesis_id?.course,
            action: (
              <TableRowAction
                id={data.thesis_id}
                onView={(id) => {
                  if (id === data.thesis_id) {
                    // Open the view thesis modal
                    setPdfTitle(data.fk_thesis_id?.title);
                    setPdfAuthor("Author/s: " + data.fk_thesis_id?.author + " (" + data.fk_thesis_id?.year + ")");
                    setPdfUrl(new URL(`/read${data.fk_thesis_id?.url}`, window.location.origin).toString());
                  }
                }}
              />
            )
          })))
        }
      })
      .catch((e) => {
        console.log(e);
        Sweetalert2.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch published thesis list',
          confirmButtonText: 'Try Again',
          showCancelButton: true,
        }).then(({ isConfirmed }: any) => {
          if (isConfirmed) {
            setTimeout(() => fetchThesisList(), 50);
          }
        })
      })
  };

  const fetchJournalList = () => {
    fetch('/api/journal/published/all')
    .then(response => response.json())
    .then(({ success, error }) => {
      if (error) {
        console.log(error);
      } else {
        setJournalData(success.map((data: any) => ({
          id: data.id,
          created_at: data.created_at,
          title: data.fk_journal_id?.title,
          abstract: data.abstract,
          author: data.fk_journal_id?.author,
          year: data.fk_journal_id?.year,
          department: data.fk_journal_id?.department,
          course: data.fk_journal_id?.course,
          action: (
            <TableRowAction
              id={data.journal_id}
              onView={(id) => {
                if (id === data.journal_id) {
                  // Open the view journal modal
                  setPdfTitle(data.fk_journal_id?.title);
                  setPdfAuthor("Author/s: " + data.fk_journal_id?.author + " (" + data.fk_journal_id?.year + ")");
                  setPdfUrl(new URL(`/read${data.fk_journal_id?.url}`, window.location.origin).toString());
                }
              }}
            />
          )
        })))
      }
    })
    .catch((e) => {
      console.log(e);
      Sweetalert2.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch published journal list',
        confirmButtonText: 'Try Again',
        showCancelButton: true,
      }).then(({ isConfirmed }: any) => {
        if (isConfirmed) {
          setTimeout(() => fetchJournalList(), 50);
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
    fetchThesisList();
    fetchJournalList();
  }, [])

  return (
    <div className="w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 min-w-fit">
      <Tabs
        tabs={[{ label: "Published Thesis", key: "thesis" }, { label: "Published Journal", key: "journal" }]}
      >
        <Tab tabKey="thesis">
          <h1 className="text-white text-2xl my-2">Published Thesis</h1>
          <Table columns={columns} items={thesisData} defaultSortColumn="created_at" defaultSortOrder={SortOrder.Descending}>
            {/* Additional Toolbar Button */}
            <div className="px-4">
              {/* Refresh Button */}
              <button type="button" onClick={() => fetchThesisList()} className="hover:text-yellow-500" title="Refresh List"><span className="material-symbols-outlined">refresh</span></button>
            </div>
          </Table>
        </Tab>
        <Tab tabKey="journal">
          <h1 className="text-white text-2xl my-2">Published Journal</h1>
          <Table columns={columns} items={journalData} defaultSortColumn="created_at" defaultSortOrder={SortOrder.Descending}>
            {/* Additional Toolbar Button */}
            <div className="px-4">
              {/* Refresh Button */}
              <button type="button" onClick={() => fetchThesisList()} className="hover:text-yellow-500" title="Refresh List"><span className="material-symbols-outlined">refresh</span></button>
            </div>
          </Table>
        </Tab>
      </Tabs>
      <Modal open={!!pdfUrl} onClose={() => setPdfUrl(null)} content={<PdfViewer src={pdfUrl} />} header={pdfTitle} showCancelButton={false} showConfirmButton={false} footer={pdfAuthor} />
    </div>
  )
}
