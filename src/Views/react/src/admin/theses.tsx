import AddThesisForm from "/jsx/admin/addthesis";
import { CellAlign, SortOrder, Table, TableCellType, TableColumn, TableRow, TableRowAction } from "/jsx/admin/table";
import { React } from "/jsx/imports";


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
  const [showEntries, setShowEntries] = React.useState(10)
  const [sortColumn, setSortColumn] = React.useState("")
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(SortOrder.Ascending)
  const [tableData, setTableData] = React.useState<TableRow[]>([
    {
      id: 1, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 2, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 3, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 4, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 5, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 6, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 7, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 8, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 9, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 10, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 11, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 12, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 13, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 14, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 15, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 16, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 17, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 18, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 19, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 20, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 21, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 22, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 23, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 24, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 25, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 26, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 27, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 28, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 29, created_at: "2023-01-01", title: "Thesis Title 1", author: "Author 1", year: 2024,
      status: {
        value: 3,
        content: <button type="button" className="bg-white px-3 py-2 text-green-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]" disabled>Deployed</button>
      },
      action: <TableRowAction id={1} />,
    },
    {
      id: 30, created_at: "2023-02-01", title: "Thesis Title 2", author: "Author 2", year: 2025,status: {
        value: 2,
        content: <button type="button" className="bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]">Deploy</button>
      },
      action: <TableRowAction id={1} />,
    },
  ])

  React.useEffect(() => {

  }, [])
  return (
    <div className="w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 ">
      <Table columns={columns} items={tableData}>
        {/* Additional Toolbar Button */}
        <div className="px-4">
          <button type="button" onClick={() => setShowAddThesisForm(true)} className="hover:text-yellow-500"><span className="material-symbols-outlined">add</span></button>
        </div>
        <AddThesisForm open={openAddThesisForm} onClose={() => setShowAddThesisForm(false)} className="absolute right-3 top-full mt-4 shadow-lg" />
      </Table>
    </div>
  )
}

export default AdminLogin