export default import(pathname("/jsx/imports")).then((({React:e,Sweetalert2:t})=>function(){const[a,s]=e.useState({theses:0,journals:0,publishedTheses:0,publishedJournals:0,students:0,teachers:0,weeklyThesisReads:0,weeklyJournalReads:0,monthlyThesisReads:0,monthlyJournalReads:0,yearlyThesisReads:0,yearlyJournalReads:0}),l=e.useCallback((()=>{fetch(pathname("/api/dashboard/statistics")).then((e=>e.json())).then((({error:e,success:a})=>{e?(console.log(e),t.fire({icon:"error",title:"Error",text:"Failed to fetch dashboard statistics: "+e,toast:!0,showConfirmButton:!1,position:"center",timer:3e3})):s(a)})).catch((e=>{console.log(e),t.fire({icon:"error",title:"Error",text:"Failed to fetch dashboard statistics: "+e,toast:!0,showConfirmButton:!1,position:"center",timer:3e3})}))}),[]);return e.useEffect((()=>{l()}),[]),e.createElement("div",{className:"w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 text-white min-w-fit"},e.createElement("div",{className:"w-full pb-8 pt-4 px-6 divide-y divide-gray-500"},e.createElement("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  justify-evenly gap-2 min-w-[120px]"},e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.theses),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Theses"))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.journals),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Journals"))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.publishedTheses),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Publicly Viewed Theses"))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.publishedJournals),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Publicly Viewed Journals"))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.students),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Students Registered"))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.teachers),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Teachers Registered"))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.weeklyThesisReads),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Weekly Thesis Reads ",e.createElement("span",{className:"text-xs"},"(Mon-Sun)")))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.weeklyJournalReads),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Weekly Journal Reads ",e.createElement("span",{className:"text-xs"},"(Mon-Sun)")))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.monthlyThesisReads),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Monthly Thesis Reads ",e.createElement("span",{className:"text-xs"},"(Mon-Sun)")))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.monthlyJournalReads),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Monthly Journal Reads ",e.createElement("span",{className:"text-xs"},"(Mon-Sun)")))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.yearlyThesisReads),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Yearly Thesis Reads ",e.createElement("span",{className:"text-xs"},"(Mon-Sun)")))),e.createElement("div",{className:"h-[120px] px-8 py-6 bg-[#262E37] w-full divide-y rounded"},e.createElement("div",{className:"flex flex-nowrap justify-between pb-2 items-center"},e.createElement("p",{className:"font-[600] text-[20px]"},a.yearlyJournalReads),e.createElement("span",{className:"material-symbols-outlined"},"list")),e.createElement("div",{className:"flex flex-nowrap justify-between pt-2"},e.createElement("p",{className:"font-[400] text-[18px]"},"Yearly Journal Reads ",e.createElement("span",{className:"text-xs"},"(Mon-Sun)"))))),e.createElement("div",{className:"mt-8 pt-4 px-4"})))}));