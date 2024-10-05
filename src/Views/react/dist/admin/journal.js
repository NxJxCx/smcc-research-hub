export default import(pathname("/jsx/imports")).then((async({React:e,Sweetalert2:t,getAsyncImport:n})=>{const{CellAlign:o,TableCellType:a,TableColumn:l}=await import(pathname("/jsx/types")),{default:i}=await n("/jsx/admin/addjournal"),{default:r}=await n("/jsx/global/modal"),{default:s}=await n("/jsx/global/pdfviewer"),{Table:c,TableRowAction:u}=await n("/jsx/admin/table"),m=[{label:"#",key:"id",sortable:!0,filterable:!0,cellType:a.Number,align:o.Center},{label:"Thumbnail",key:"thumbnail",sortable:!1,cellType:a.Custom,align:o.Center},{label:"Date Created",key:"created_at",sortable:!0,cellType:a.Date,align:o.Center},{label:"Title",key:"title",sortable:!0,cellType:a.String,align:o.Center},{label:"Month",key:"month",sortable:!0,cellType:a.String,align:o.Center},{label:"Year",key:"year",sortable:!0,cellType:a.Number,align:o.Center},{label:"Published Date",key:"published_date",sortable:!0,cellType:a.Date,align:o.Center},{label:"Volume",key:"volume",sortable:!0,cellType:a.Number,align:o.Center},{label:"No.",key:"number",sortable:!0,cellType:a.Number,align:o.Center},{label:"Status",key:"is_public",sortable:!0,cellType:a.Custom,align:o.Center},{label:"Theses",key:"theses",sortable:!0,cellType:a.Number,align:o.Center},{label:"Action",key:"action",sortable:!1,cellType:a.Custom,align:o.Center}];return function(){const[n,o]=e.useState(!1),[a,l]=e.useState(""),[d,h]=e.useState(""),[p,f]=e.useState(""),[b,w]=e.useState(null),[y,C]=e.useState([]),g=e.useCallback((e=>{t.fire({title:"Edit Thumbnail",text:"Enter the new thumbnail URL:",input:"file",inputValue:e.thumbnail,showCancelButton:!0,confirmButtonText:"Save",cancelButtonText:"Cancel",showLoaderOnConfirm:!0,preConfirm:n=>new Promise(((t,o)=>{if(n&&n.size>3145728)o("Thumbnail File size exceeds the maximum limit of 3MB.");else{const a=new URLSearchParams(new URL(e.thumbnail,window.location.origin).search),l=new FormData;l.append("id",e.id),l.append("filename",a.get("filename")||""),console.log(n.type),l.append("thumbnail",new Blob([n],{type:n.type}),n.name);const i=new URL(pathname("/api/thumbnail/edit"),window.location.origin),r=new XMLHttpRequest;r.open("POST",i,!0),r.onload=()=>{if(201===r.status){const e=JSON.parse(r.responseText);e.error?o(e.error):t("Journal Document uploaded successfully.")}else o(JSON.parse(r.responseText)?.error||"Failed to upload")},r.onerror=e=>{o(JSON.parse(r.responseText)?.error||"Error Uploading")},r.send(l)}})).then((e=>e)).catch((e=>{t.showValidationMessage(e.message)}))}).then((({isConfirmed:e,value:n})=>{e&&(t.fire({icon:"success",title:"Thumbnail Updated",text:n,toast:!0,showConfirmButton:!1,position:"center",timer:2e3}),setTimeout((()=>T()),500))}))}),[]),x=(e.useCallback((e=>{h(e.title),f("Author/s: "+e.author+" ("+e.year+")"),l(new URL(pathname(`/read${e.url}`),window.location.origin).toString())}),[]),e.useCallback((e=>{w(e)}),[])),T=async()=>{try{const n=await fetch(pathname("/api/journal/all")),{success:o,error:a}=await n.json();if(a)console.log(a);else if(o)return C(o.map((n=>({id:n.id,created_at:n.created_at,title:n.title,month:n.month,year:n.year,volume:n.volume,number:n.number,published_date:n.published_date,thumbnail:{value:n.thumbnail,content:e.createElement(e.Fragment,null,e.createElement("button",{type:"button",onClick:()=>g(n),className:"relative w-[70px] h-[90px] after:absolute after:left-0 after:top-0 after:w-[70px] after:h-[90px] hover:after:bg-white/40 hover:after:content-center hover:after:content-['edit'] hover:after:drop-shadow-lg hover:after:text-black"},e.createElement("img",{src:new URL(n.thumbnail,window?.location?.origin).toString(),alt:"thumbnail",className:"w-full h-full object-contain"})))},theses:n.theses?.length||0,is_public:{value:n.is_public?"Yes":"No",content:n.is_public?e.createElement("button",{type:"button",className:"bg-white px-3 py-2 text-green-700 font-bold rounded-2xl leading-[14.63px] text-[12px]",onClick:()=>{t.fire({icon:"question",title:"Do you want to hide this journal to the public?",confirmButtonText:"Yes, Hide Journal",confirmButtonColor:"#3085d6",showDenyButton:!0,denyButtonText:"No, Cancel",denyButtonColor:"#d33",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const e=new URL(pathname("/api/journal/publish"),window.location.origin),o=await fetch(e,{method:"POST",body:JSON.stringify({id:n.id,is_public:!1}),headers:{"Content-Type":"application/json",Accept:"application/json"}});if(!o.ok){const{error:e}=await o.json();return t.showValidationMessage("Failed: "+e)}return o.json()}catch(e){t.showValidationMessage("Failed: "+e)}},allowOutsideClick:()=>!t.isLoading()}).then((e=>{e.isConfirmed&&(e.value?.error?t.fire({icon:"error",title:"Error",text:"Failed to make journal hidden: "+e.value.error,timer:3e3,toast:!0,position:"center"}):(t.fire({icon:"success",title:"Journal Hidden Successfully",timer:3e3,toast:!0,position:"center"}),T()))}))}},"Public"):e.createElement("button",{type:"button",className:"bg-white px-3 py-2 text-red-500 rounded-2xl font-[500] leading-[14.63px] text-[12px]",onClick:()=>{t.fire({icon:"question",title:"Do you want to display this journal publicly?",confirmButtonText:"Yes, Display Journal publicly",confirmButtonColor:"#3085d6",showDenyButton:!0,denyButtonText:"No, Cancel",denyButtonColor:"#d33",showLoaderOnConfirm:!0,preConfirm:async()=>{try{const e=new URL(pathname("/api/journal/publish"),window.location.origin),o=await fetch(e,{method:"POST",body:JSON.stringify({id:n.id,is_public:!0}),headers:{"Content-Type":"application/json",Accept:"application/json"}});if(!o.ok){const{error:e}=await o.json();return t.showValidationMessage("Failed: "+e)}return o.json()}catch(e){t.showValidationMessage("Failed: "+e)}},allowOutsideClick:()=>!t.isLoading()}).then((e=>{e.isConfirmed&&(e.value?.error?t.fire({icon:"error",title:"Error",text:"Failed to make journal public: "+e.value.error,timer:3e3,toast:!0,position:"center"}):(t.fire({icon:"success",title:"Journal Publicly Displayed Successfully",timer:3e3,toast:!0,position:"center"}),T()))}))}},"Hidden")},action:e.createElement(u,{id:n.id,onView:e=>{e===n.id&&x(n)},onDelete:e=>{t.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete journal!"}).then((({isConfirmed:n})=>{n&&fetch(pathname(`/api/journal/delete?id=${e}`),{method:"DELETE"}).then((e=>e.json())).then((({success:e,error:n})=>{e?(T(),t.fire({icon:"success",title:"Deleted!",text:"Journal has been deleted successfully.",timer:3e3})):(console.log(n),t.fire({icon:"error",title:"Error",text:"Failed to delete thesis: "+n,confirmButtonText:"Try Again"}))})).catch((e=>{console.log(e),t.fire({icon:"error",title:"Error",text:"Failed to delete journal",timer:3e3})}))}))}})})))),o}catch(e){console.log(e),t.fire({icon:"error",title:"Error",text:"Failed to fetch journal list",confirmButtonText:"Try Again",showCancelButton:!0}).then((({isConfirmed:e})=>{e&&setTimeout((()=>T()),50)}))}return[]};e.useEffect((()=>{a||(h(""),f(""))}),[a]),e.useEffect((()=>{T().catch()}),[]);const E=e.useCallback((async()=>{let e={};try{const t=new URL(pathname("/api/journal/theses/available"),window.location.origin),n=await fetch(t),{success:o,error:a}=await n.json();if(a)throw new Error(a);o&&(e=o.reduce(((e,t)=>(e[t.id]=`${t.title} (${t.year})`,e)),{}))}catch(e){console.log(e)}t.fire({text:`Add thesis to ${b.title}, ${b.month} (${b.year})`,input:"select",inputOptions:e,inputPlaceholder:"Select Thesis",confirmButtonText:"Confirm",confirmButtonColor:"#3085d6",showCancelButton:!0,cancelButtonColor:"#d33",showLoaderOnConfirm:!0,preConfirm:async e=>new Promise((async(t,n)=>{if(e)try{const n=new URL(pathname("/api/journal/add/thesis"),window.location.origin),o=await fetch(n,{method:"POST",body:JSON.stringify({journal_id:b.id,thesis_id:e}),headers:{"Content-Type":"application/json",Accept:"application/json"}}),{success:a,error:l}=await o.json();if(l)throw new Error(l);a&&t(a)}catch(e){n(e.message)}else n("Please select a thesis")})).then((e=>e)).catch((e=>t.showValidationMessage(e)))}).then((async({isConfirmed:e,value:n})=>{if(e){const e=b.id;t.fire({icon:"success",title:n,timer:1500});const o=(await T()).find((t=>t.id==e));w(o)}}))}),[b]);return e.createElement("div",{className:"w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 min-w-fit"},e.createElement("h1",{className:"text-white text-2xl my-2"},"Journal List"),e.createElement(c,{columns:m,items:y},e.createElement("div",{className:"px-4"},e.createElement("button",{type:"button",onClick:()=>T(),className:"hover:text-yellow-500",title:"Refresh List"},e.createElement("span",{className:"material-symbols-outlined"},"refresh"))),e.createElement("div",{className:"px-4"},e.createElement("button",{type:"button",onClick:()=>o(!0),className:"hover:text-yellow-500",title:"Add Journal"},e.createElement("span",{className:"material-symbols-outlined"},"add"))),e.createElement(i,{open:n,onClose:()=>o(!1),onSuccess:()=>T(),className:"absolute right-3 top-full mt-4 shadow-lg"})),e.createElement(r,{open:!!b,onClose:()=>w(null),content:e.createElement("div",{className:"p-4"},e.createElement("h1",{className:"flex justify-between"},e.createElement("h1",{className:"font-bold text-xl"},"Theses List:")," ",e.createElement("button",{type:"button",title:"Add Thesis to list",onClick:E,className:"rounded-full bg-blue-800 text-white px-4 py-2 flex items-center justify-center text-sm"},e.createElement("span",{className:"material-symbols-outlined"},"add")," Add Thesis")),(!b?.theses||0===b?.theses?.length)&&e.createElement("div",null,e.createElement("p",null,"No theses added to this journal.")),e.createElement("ul",{className:"list-decimal ml-4 indent-4"},b?.theses?.length>0&&b?.theses?.map((n=>e.createElement("li",{key:n.id},e.createElement("button",{type:"button",title:n.title,className:"underline",onClick:()=>{h(n.title),f("Author/s: "+n.author+" ("+n.year+")"),l(new URL(pathname(`/read${n.url}`),window.location.origin).toString())}},n.title," (",n.year,")"),e.createElement("button",{type:"button",title:"Remove",className:"text-red-500 text-sm ml-3",onClick:()=>{t.fire({icon:"warning",title:"Are you sure to remove thesis to journal?",showCancelButton:!0,confirmButtonColor:"#3085d6"}).then((({isConfirmed:e})=>{if(e){const e=new URL(pathname("/api/journal/remove/thesis"),window.location.origin);e.searchParams.append("journal_id",b.id),e.searchParams.append("thesis_id",n.id),fetch(e,{method:"DELETE"}).then((e=>e.json())).then((async({success:e,error:n})=>{if(e){const e=b.id;t.fire({icon:"success",title:"Removed!",text:"Thesis has been removed successfully.",timer:3e3});const n=(await T()).find((t=>t.id==e));w(n)}else console.log(n),t.fire({icon:"error",title:"Error",text:"Failed to remove thesis: "+n,confirmButtonText:"Try Again"})})).catch((e=>{}))}}))}},e.createElement("span",{className:"text-sm material-symbols-outlined"},"cancel"))))))),header:`${b?.title}, ${b?.month} (${b?.year})`,showCancelButton:!1,showConfirmButton:!1,showFooter:!1}),e.createElement(r,{open:!!a,onClose:()=>l(null),content:e.createElement(s,{src:a}),header:d,showCancelButton:!1,showConfirmButton:!1,footer:p}))}}));