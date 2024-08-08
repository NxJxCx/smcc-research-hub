import { React, Sweetalert2 } from "/jsx/imports";

interface DashboardStatistics {
  theses: number,
  journals: number,
  publishedTheses: number,
  publishedJournals: number,
  students: number,
  teachers: number,
  weeklyThesisReads: number,
  weeklyJournalReads: number,
}

function DashboardPage() {
  const [statistics, setStatistics] = React.useState<DashboardStatistics>({
    theses: 0,
    journals: 0,
    publishedTheses: 0,
    publishedJournals: 0,
    students: 0,
    teachers: 0,
    weeklyThesisReads: 0,
    weeklyJournalReads: 0,
  });

  const fetchData = React.useCallback(() => {
    fetch('/api/dashboard/statistics')
    .then(response => response.json())
    .then(({ error, success }) => {
      if (error) {
        console.log(error);
        Sweetalert2.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch dashboard statistics: ' + error,
          toast: true,
          showConfirmButton: false,
          position: 'center',
          timer: 3000,
        })
      } else {
        setStatistics(success);
      }
    })
    .catch(error => {
      console.log(error);
      Sweetalert2.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch dashboard statistics: ' + error,
        toast: true,
        showConfirmButton: false,
        position: 'center',
        timer: 3000,
      })
    })
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 text-white">
      <div className="w-full pb-8 pt-4 px-6 divide-y divide-gray-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  justify-evenly gap-2 min-w-[120px]">
          <div className="h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded">
            <div className="flex flex-nowrap justify-between pb-2 items-center">
              <p className="font-[600] text-[20px]">{statistics.theses}</p>
              <span className="material-symbols-outlined">list</span>
            </div>
            <div className="flex flex-nowrap justify-between pt-2">
              <p className="font-[400] text-[18px]">Theses</p>
            </div>
          </div>
          <div className="h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded">
            <div className="flex flex-nowrap justify-between pb-2 items-center">
              <p className="font-[600] text-[20px]">{statistics.journals}</p>
              <span className="material-symbols-outlined">list</span>
            </div>
            <div className="flex flex-nowrap justify-between pt-2">
              <p className="font-[400] text-[18px]">Journals</p>
            </div>
          </div>
          <div className="h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded">
            <div className="flex flex-nowrap justify-between pb-2 items-center">
              <p className="font-[600] text-[20px]">{statistics.publishedTheses}</p>
              <span className="material-symbols-outlined">list</span>
            </div>
            <div className="flex flex-nowrap justify-between pt-2">
              <p className="font-[400] text-[18px]">Published Theses</p>
            </div>
          </div>
          <div className="h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded">
            <div className="flex flex-nowrap justify-between pb-2 items-center">
              <p className="font-[600] text-[20px]">{statistics.publishedJournals}</p>
              <span className="material-symbols-outlined">list</span>
            </div>
            <div className="flex flex-nowrap justify-between pt-2">
              <p className="font-[400] text-[18px]">Published Journals</p>
            </div>
          </div>
          <div className="h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded">
            <div className="flex flex-nowrap justify-between pb-2 items-center">
              <p className="font-[600] text-[20px]">{statistics.students}</p>
              <span className="material-symbols-outlined">list</span>
            </div>
            <div className="flex flex-nowrap justify-between pt-2">
              <p className="font-[400] text-[18px]">Students Registered</p>
            </div>
          </div>
          <div className="h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded">
            <div className="flex flex-nowrap justify-between pb-2 items-center">
              <p className="font-[600] text-[20px]">{statistics.teachers}</p>
              <span className="material-symbols-outlined">list</span>
            </div>
            <div className="flex flex-nowrap justify-between pt-2">
              <p className="font-[400] text-[18px]">Teachers Registered</p>
            </div>
          </div>
          <div className="h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded">
            <div className="flex flex-nowrap justify-between pb-2 items-center">
              <p className="font-[600] text-[20px]">{statistics.weeklyThesisReads}</p>
              <span className="material-symbols-outlined">list</span>
            </div>
            <div className="flex flex-nowrap justify-between pt-2">
              <p className="font-[400] text-[18px]">Weekly Thesis Reads</p>
            </div>
          </div>
          <div className="h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded">
            <div className="flex flex-nowrap justify-between pb-2 items-center">
              <p className="font-[600] text-[20px]">{statistics.weeklyJournalReads}</p>
              <span className="material-symbols-outlined">list</span>
            </div>
            <div className="flex flex-nowrap justify-between pt-2">
              <p className="font-[400] text-[18px]">Weekly Journal Reads</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 px-4">
          -- Suggest Some Widgets here --
        </div>
      </div>
    </div>
  )
}

export default DashboardPage