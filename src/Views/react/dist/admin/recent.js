import{CellAlign as e,SortOrder as t,Table as l,TableCellType as a,TableRowAction as r}from"/jsx/admin/table";import{Tab as i,Tabs as o}from"/jsx/admin/tabs";import s from"/jsx/global/modal";import n from"/jsx/global/pdfviewer";import{React as c,Sweetalert2 as u}from"/jsx/imports";const d=[{label:"#",key:"id",sortable:!0,filterable:!0,cellType:a.Number,align:e.Center},{label:"Published Date",key:"created_at",sortable:!0,cellType:a.Date,align:e.Center},{label:"Title",key:"title",sortable:!0,cellType:a.String,align:e.Center},{label:"Abstract",key:"abstract",sortable:!0,cellType:a.String,align:e.Center},{label:"Author",key:"author",sortable:!0,cellType:a.String,align:e.Center},{label:"Year",key:"year",sortable:!0,cellType:a.Number,align:e.Center},{label:"Department",key:"department",sortable:!0,cellType:a.String,align:e.Center},{label:"Course",key:"course",sortable:!0,cellType:a.String,align:e.Center},{label:"Action",key:"action",sortable:!1,cellType:a.Custom,align:e.Center}];function m(){const[e,a]=c.useState(""),[m,h]=c.useState(""),[f,b]=c.useState(""),[_,p]=c.useState([]),[y,k]=c.useState([]),g=()=>{fetch("/api/thesis/published/all").then((e=>e.json())).then((({success:e,error:t})=>{t?console.log(t):p(e.map((e=>({id:e.id,created_at:e.created_at,title:e.fk_thesis_id?.title,abstract:e.abstract,author:e.fk_thesis_id?.author,year:e.fk_thesis_id?.year,department:e.fk_thesis_id?.department,course:e.fk_thesis_id?.course,action:c.createElement(r,{id:e.thesis_id,onView:t=>{t===e.thesis_id&&(h(e.fk_thesis_id?.title),b("Author/s: "+e.fk_thesis_id?.author+" ("+e.fk_thesis_id?.year+")"),a(new URL(`/read${e.fk_thesis_id?.url}`,window.location.origin).toString()))}})}))))})).catch((e=>{console.log(e),u.fire({icon:"error",title:"Error",text:"Failed to fetch published thesis list",confirmButtonText:"Try Again",showCancelButton:!0}).then((({isConfirmed:e})=>{e&&setTimeout((()=>g()),50)}))}))},j=()=>{fetch("/api/journal/published/all").then((e=>e.json())).then((({success:e,error:t})=>{t?console.log(t):k(e.map((e=>({id:e.id,created_at:e.created_at,title:e.fk_journal_id?.title,abstract:e.abstract,author:e.fk_journal_id?.author,year:e.fk_journal_id?.year,department:e.fk_journal_id?.department,course:e.fk_journal_id?.course,action:c.createElement(r,{id:e.journal_id,onView:t=>{t===e.journal_id&&(h(e.fk_journal_id?.title),b("Author/s: "+e.fk_journal_id?.author+" ("+e.fk_journal_id?.year+")"),a(new URL(`/read${e.fk_journal_id?.url}`,window.location.origin).toString()))}})}))))})).catch((e=>{console.log(e),u.fire({icon:"error",title:"Error",text:"Failed to fetch published journal list",confirmButtonText:"Try Again",showCancelButton:!0}).then((({isConfirmed:e})=>{e&&setTimeout((()=>j()),50)}))}))};return c.useEffect((()=>{e||(h(""),b(""))}),[e]),c.useEffect((()=>{g(),j()}),[]),c.createElement("div",{className:"w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 min-w-fit"},c.createElement(o,{tabs:[{label:"Published Thesis",key:"thesis"},{label:"Published Journal",key:"journal"}]},c.createElement(i,{tabKey:"thesis"},c.createElement("h1",{className:"text-white text-2xl my-2"},"Published Thesis"),c.createElement(l,{columns:d,items:_,defaultSortColumn:"created_at",defaultSortOrder:t.Descending},c.createElement("div",{className:"px-4"},c.createElement("button",{type:"button",onClick:()=>g(),className:"hover:text-yellow-500",title:"Refresh List"},c.createElement("span",{className:"material-symbols-outlined"},"refresh"))))),c.createElement(i,{tabKey:"journal"},c.createElement("h1",{className:"text-white text-2xl my-2"},"Published Journal"),c.createElement(l,{columns:d,items:y,defaultSortColumn:"created_at",defaultSortOrder:t.Descending},c.createElement("div",{className:"px-4"},c.createElement("button",{type:"button",onClick:()=>g(),className:"hover:text-yellow-500",title:"Refresh List"},c.createElement("span",{className:"material-symbols-outlined"},"refresh")))))),c.createElement(s,{open:!!e,onClose:()=>a(null),content:c.createElement(n,{src:e}),header:m,showCancelButton:!1,showConfirmButton:!1,footer:f}))}export default m;