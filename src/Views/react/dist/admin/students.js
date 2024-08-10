import{CellAlign as e,Table as t,TableCellType as l,TableRowAction as n}from"/jsx/admin/table";import{React as r,Sweetalert2 as a}from"/jsx/imports";const o=[{label:"Student ID",key:"student_id",sortable:!0,filterable:!0,cellType:l.Number,align:e.Center},{label:"Full Name",key:"full_name",sortable:!0,cellType:l.String,align:e.Center},{label:"Email Address",key:"email",sortable:!0,cellType:l.String,align:e.Center},{label:"Department",key:"department",sortable:!0,cellType:l.String,align:e.Center},{label:"Course",key:"course",sortable:!0,cellType:l.String,align:e.Center},{label:"Year",key:"year",sortable:!0,cellType:l.Number,align:e.Center},{label:"Date Registered",key:"created_at",sortable:!0,cellType:l.Date,align:e.Center},{label:"Action",key:"action",sortable:!1,cellType:l.Custom,align:e.Center}];function i(){const[e,l]=r.useState([]),i=()=>{fetch("/api/student/all").then((e=>e.json())).then((({success:e,error:t})=>{t?console.log(t):l(e.map((e=>({student_id:e.student_id,created_at:e.created_at,full_name:e.full_name,email:e.email,year:e.year,department:e.department,course:e.course,action:r.createElement(n,{id:e.student_id,onEdit:t=>{e.student_id},onDelete:e=>{console.log("ON DELETE STUDENT ID:",e),a.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete student account!"}).then((({isConfirmed:t})=>{t&&fetch(`/api/student/delete?id=${e}`,{method:"DELETE"}).then((e=>e.json())).then((({success:e,error:t})=>{e?(i(),a.fire({icon:"success",title:"Deleted!",text:"Student account has been deleted successfully.",timer:3e3})):(console.log(t),a.fire({icon:"error",title:"Error",text:"Failed to delete student account: "+t,confirmButtonText:"Try Again"}))})).catch((e=>{console.log(e),a.fire({icon:"error",title:"Error",text:"Failed to delete student account",timer:3e3})}))}))}})}))))})).catch((e=>{console.log(e),a.fire({icon:"error",title:"Error",text:"Failed to fetch student list",confirmButtonText:"Try Again",showCancelButton:!0}).then((({isConfirmed:e})=>{e&&setTimeout((()=>i()),50)}))}))};return r.useEffect((()=>{i()}),[]),r.createElement("div",{className:"w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 min-w-fit"},r.createElement("h1",{className:"text-white text-2xl my-2"},"Student List"),r.createElement(t,{columns:o,items:e},r.createElement("div",{className:"px-4"},r.createElement("button",{type:"button",onClick:()=>i(),className:"hover:text-yellow-500",title:"Refresh List"},r.createElement("span",{className:"material-symbols-outlined"},"refresh")))))}export default i;