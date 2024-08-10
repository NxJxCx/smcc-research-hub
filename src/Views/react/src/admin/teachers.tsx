import { CellAlign, Table, TableCellType, TableColumn, TableRow, TableRowAction } from "/jsx/admin/table";
import { React, Sweetalert2 } from "/jsx/imports";


const columns: TableColumn[] = [
  { label: "Teacher ID", key: "personnel_id", sortable: true, filterable: true, cellType: TableCellType.Number, align: CellAlign.Center },
  { label: "Full Name", key: "full_name", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Email Address", key: "email", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Department", key: "department", sortable: true, cellType: TableCellType.String, align: CellAlign.Center },
  { label: "Date Registered", key: "created_at", sortable: true, cellType: TableCellType.Date, align: CellAlign.Center },
  { label: "Action", key: "action", sortable: false, cellType: TableCellType.Custom, align: CellAlign.Center },
];


function TeachersPage() {
  const [tableData, setTableData] = React.useState<TableRow[]>([])

  const fetchList = () => {
    fetch('/api/teacher/all')
    .then(response => response.json())
    .then(({ success, error }) => {
      if (error) {
        console.log(error);
      } else {
        setTableData(success.map((data: any) => {
          return {
            id: data.personnel_id,
            personnel_id: data.personnel_id,
            created_at: data.created_at,
            full_name: data.full_name,
            email: data.email,
            department: data.department,
            action: <TableRowAction id={data.personnel_id} onEdit={(id) => {
              if (id === data.id) {
                // TODO: Implement edit functionality
              }
            }} onDelete={(id) => {
              Sweetalert2.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete teacher account!'
              }).then(({ isConfirmed }: any) => {
                if (isConfirmed) {
                  fetch(`/api/teacher/delete?id=${id}`, { method: 'DELETE' })
                  .then(response => response.json())
                  .then(({ success, error }) => {
                    if (!success) {
                      console.log(error);
                      Sweetalert2.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to delete teacher account: ' + error,
                        confirmButtonText: 'Try Again',
                      });
                    } else {
                      fetchList();
                      Sweetalert2.fire({
                        icon:'success',
                        title: 'Deleted!',
                        text: 'Teacher account has been deleted successfully.',
                        timer: 3000
                      });
                    }
                  })
                  .catch((er) => {
                    console.log(er);
                    Sweetalert2.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Failed to delete teacher account',
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
        text: 'Failed to fetch teacher list',
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
    fetchList();
  }, [])

  return (
    <div className="w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 ">
      <h1 className="text-white text-2xl my-2">Teacher List</h1>
      <Table columns={columns} items={tableData}>
        {/* Additional Toolbar Button */}
        <div className="px-4">
          {/* Refresh Button */}
          <button type="button" onClick={() => fetchList()} className="hover:text-yellow-500" title="Refresh List"><span className="material-symbols-outlined">refresh</span></button>
        </div>
      </Table>
    </div>
  )
}

export default TeachersPage