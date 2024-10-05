export default import(pathname("/jsx/imports")).then((async({React:e,Sweetalert2:t,getAsyncImport:o})=>{const{CellAlign:i,TableCellType:n,TableColumn:l}=await import(pathname("/jsx/types")),{default:a}=await o("/jsx/admin/addthesis"),{default:s}=await o("/jsx/global/modal"),{default:r}=await o("/jsx/global/pdfviewer"),{Table:c,TableRowAction:u}=await o("/jsx/admin/table"),d=[{label:"#",key:"id",sortable:!0,filterable:!0,cellType:n.Number,align:i.Center},{label:"Date Created",key:"created_at",sortable:!0,cellType:n.Date,align:i.Center},{label:"Title",key:"title",sortable:!0,cellType:n.String,align:i.Center},{label:"Author",key:"author",sortable:!0,cellType:n.String,align:i.Center},{label:"Year",key:"year",sortable:!0,cellType:n.Number,align:i.Center},{label:"Department",key:"department",sortable:!0,cellType:n.String,align:i.Center},{label:"Course",key:"course",sortable:!0,cellType:n.String,align:i.Center},{label:"Reads",key:"reads",sortable:!0,cellType:n.Number,align:i.Center},{label:"Status",key:"is_public",sortable:!0,cellType:n.Custom,align:i.Center},{label:"Action",key:"action",sortable:!1,cellType:n.Custom,align:i.Center}];return function(){const[o,i]=e.useState(!1),[n,l]=e.useState(""),[h,m]=e.useState(""),[p,y]=e.useState(""),[b,f]=e.useState([]),w=()=>{fetch(pathname("/api/thesis/all")).then((e=>e.json())).then((({success:o,error:i})=>{i?console.log(i):f(o.map((o=>({id:o.id,created_at:o.created_at,title:o.title,author:o.author,year:o.year,department:o.department,course:o.course,reads:o.reads||0,is_public:{value:o.is_public?"Yes":"No",content:o.is_public?e.createElement("button",{type:"button",className:"bg-white px-3 py-2 text-green-700 font-bold rounded-2xl leading-[14.63px] text-[12px]",onClick:()=>{t.fire({icon:"question",title:"Do you want to hide this thesis to the public?",confirmButtonText:"Yes, Hide Thesis",confirmButtonColor:"#3085d6",showDenyButton:!0,denyButtonText:"No, Cancel",denyButtonColor:"#d33",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const e=new URL(pathname("/api/thesis/publish"),window.location.origin),i=await fetch(e,{method:"POST",body:JSON.stringify({id:o.id,is_public:!1}),headers:{"Content-Type":"application/json",Accept:"application/json"}});if(!i.ok){const{error:e}=await i.json();return t.showValidationMessage("Failed: "+e)}return i.json()}catch(e){t.showValidationMessage("Failed: "+e)}},allowOutsideClick:()=>!t.isLoading()}).then((e=>{e.isConfirmed&&(e.value?.error?t.fire({icon:"error",title:"Error",text:"Failed to make thesis hidden: "+e.value.error,timer:3e3,toast:!0,position:"center"}):(t.fire({icon:"success",title:"Thesis Hidden Successfully",timer:3e3,toast:!0,position:"center"}),w()))}))}},"Public"):e.createElement("button",{type:"button",className:"bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]",onClick:()=>{t.fire({icon:"question",title:"Do you want to display this thesis publicly?",confirmButtonText:"Yes, Display Thesis publicly",confirmButtonColor:"#3085d6",showDenyButton:!0,denyButtonText:"No, Cancel",denyButtonColor:"#d33",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const e=new URL(pathname("/api/thesis/publish"),window.location.origin),i=await fetch(e,{method:"POST",body:JSON.stringify({id:o.id,is_public:!0}),headers:{"Content-Type":"application/json",Accept:"application/json"}});if(!i.ok){const{error:e}=await i.json();return t.showValidationMessage("Failed: "+e)}return i.json()}catch(e){t.showValidationMessage("Failed: "+e)}},allowOutsideClick:()=>!t.isLoading()}).then((e=>{e.isConfirmed&&(e.value?.error?t.fire({icon:"error",title:"Error",text:"Failed to make thesis public: "+e.value.error,timer:3e3,toast:!0,position:"center"}):(t.fire({icon:"success",title:"Thesis Publicly Displayed Successfully",timer:3e3,toast:!0,position:"center"}),w()))}))}},"Hidden")},action:e.createElement(u,{id:o.id,onView:e=>{e===o.id&&(m(o.title),y("Author/s: "+o.author+" ("+o.year+")"),l(new URL(pathname(`/read${o.url}`),window.location.origin).toString()))},onDelete:e=>{t.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete thesis!"}).then((({isConfirmed:o})=>{o&&fetch(pathname(`/api/thesis/delete?id=${e}`),{method:"DELETE"}).then((e=>e.json())).then((({success:e,error:o})=>{e?(w(),t.fire({icon:"success",title:"Deleted!",text:"Thesis has been deleted successfully.",timer:3e3})):(console.log(o),t.fire({icon:"error",title:"Error",text:"Failed to delete thesis: "+o,confirmButtonText:"Try Again"}))})).catch((e=>{console.log(e),t.fire({icon:"error",title:"Error",text:"Failed to delete thesis",timer:3e3})}))}))}})}))))})).catch((e=>{console.log(e),t.fire({icon:"error",title:"Error",text:"Failed to fetch thesis list",confirmButtonText:"Try Again",showCancelButton:!0}).then((({isConfirmed:e})=>{e&&setTimeout((()=>w()),50)}))}))};return e.useEffect((()=>{n||(m(""),y(""))}),[n]),e.useEffect((()=>{w()}),[]),e.createElement("div",{className:"w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 min-w-fit"},e.createElement("h1",{className:"text-white text-2xl my-2"},"Thesis/Capstone List"),e.createElement(c,{columns:d,items:b},e.createElement("div",{className:"px-4"},e.createElement("button",{type:"button",onClick:()=>w(),className:"hover:text-yellow-500",title:"Refresh List"},e.createElement("span",{className:"material-symbols-outlined"},"refresh"))),e.createElement("div",{className:"px-4"},e.createElement("button",{type:"button",onClick:()=>i(!0),className:"hover:text-yellow-500",title:"Add Thesis"},e.createElement("span",{className:"material-symbols-outlined"},"add"))),e.createElement(a,{open:o,onClose:()=>i(!1),onSuccess:()=>w(),className:"absolute right-3 top-full mt-4 shadow-lg"})),e.createElement(s,{open:!!n,onClose:()=>l(null),content:e.createElement(r,{src:n}),header:h,showCancelButton:!1,showConfirmButton:!1,footer:p}))}}));