export default import(pathname("/jsx/imports")).then((async({React:e,Sweetalert2:a,getAsyncImport:t})=>{const{CellAlign:l,Departments:n,TableCellType:r,TableColumn:o}=await import(pathname("/jsx/types")),{default:{Input:c,Select:s}}=await t("/jsx/global/input"),{default:i}=await t("/jsx/global/modal"),{Table:m,TableRowAction:u}=await t("/jsx/admin/table"),d=[{label:"Teacher ID",key:"personnel_id",sortable:!0,filterable:!0,cellType:r.Number,align:l.Center},{label:"Full Name",key:"full_name",sortable:!0,cellType:r.String,align:l.Center},{label:"Email Address",key:"email",sortable:!0,cellType:r.String,align:l.Center},{label:"Department",key:"department",sortable:!0,cellType:r.String,align:l.Center},{label:"Date Registered",key:"created_at",sortable:!0,cellType:r.Date,align:l.Center},{label:"Action",key:"action",sortable:!1,cellType:r.Custom,align:l.Center}];function p({formData:a,onChange:t}){return e.createElement("div",{className:"p-8"},e.createElement(c,{label:"Employee ID",borderColor:"border-black",className:"mb-2",labelColor:"black",name:"personnel_id",placeholder:"Employee ID",value:a.username,onChange:e=>t({...a,username:e.target.value}),required:!0}),e.createElement(c,{label:"Full Name",borderColor:"border-black",className:"mb-2",labelColor:"black",name:"full_name",placeholder:"Full Name",value:a.full_name,onChange:e=>t({...a,full_name:e.target.value}),required:!0}),e.createElement(c,{type:"email",label:"Email Address",borderColor:"border-black",className:"mb-2",labelColor:"black",name:"email",placeholder:"Email Address",value:a.email,onChange:e=>t({...a,email:e.target.value}),required:!0}),e.createElement(s,{labelColor:"black",items:Object.entries(n).map((([e,a])=>({label:a,value:a}))),label:"Department",name:"department",placeholder:"Department",value:a.department,onChange:e=>t({...a,department:e.target.value}),required:!0}))}function b({formData:a,onChange:t}){return e.createElement("div",{className:"p-8"},e.createElement(c,{disabled:!0,label:"Employee ID",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_personnel_id",placeholder:"Employee ID",value:a.username,onChange:e=>t({...a,username:e.target.value})}),e.createElement(c,{label:"Full Name",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_full_name",placeholder:"Full Name",value:a.full_name,onChange:e=>t({...a,full_name:e.target.value}),required:!0}),e.createElement(c,{type:"email",label:"Email Address",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_email",placeholder:"Email Address",value:a.email,onChange:e=>t({...a,email:e.target.value}),required:!0}),e.createElement(s,{labelColor:"black",items:Object.entries(n).map((([e,a])=>({label:a,value:a}))),label:"Department",name:"edit_department",placeholder:"Department",value:a.department,onChange:e=>t({...a,department:e.target.value}),required:!0}),e.createElement(c,{type:"password",label:"Password",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_password",placeholder:"Password (Leave blank if not change)",value:a.password,onChange:e=>t({...a,password:e.target.value})}))}return function(){const[t,l]=e.useState([]),[r,o]=e.useState({account:"personnel",username:"",full_name:"",email:"",password:"",department:n.CCIS}),c=e.useCallback((()=>{o({account:"personnel",username:"",full_name:"",email:"",password:"",department:n.CCIS})}),[]),[s,h]=e.useState(!1),C=e.useCallback((e=>{o({account:"personnel",username:e.personnel_id,full_name:e.full_name,email:e.email,password:"",department:e.department}),h(!0)}),[]),f=()=>{fetch(pathname("/api/teacher/all")).then((e=>e.json())).then((({success:t,error:n})=>{n?console.log(n):l(t.map((t=>({id:t.personnel_id,personnel_id:t.personnel_id,created_at:t.created_at,full_name:t.full_name,email:t.email,department:t.department,action:e.createElement(u,{id:t.personnel_id,onEdit:e=>{e===t.personnel_id&&C(t)},onDelete:e=>{a.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete teacher account!"}).then((({isConfirmed:t})=>{t&&fetch(pathname(`/api/teacher/delete?id=${e}`),{method:"DELETE"}).then((e=>e.json())).then((({success:e,error:t})=>{e?(f(),a.fire({icon:"success",title:"Deleted!",text:"Teacher account has been deleted successfully.",timer:3e3})):(console.log(t),a.fire({icon:"error",title:"Error",text:"Failed to delete teacher account: "+t,confirmButtonText:"Try Again"}))})).catch((e=>{console.log(e),a.fire({icon:"error",title:"Error",text:"Failed to delete teacher account",timer:3e3})}))}))}})}))))})).catch((e=>{console.log(e),a.fire({icon:"error",title:"Error",text:"Failed to fetch teacher list",confirmButtonText:"Try Again",showCancelButton:!0}).then((({isConfirmed:e})=>{e&&setTimeout((()=>f()),50)}))}))};e.useEffect((()=>{f()}),[]);const g=e.useCallback((async e=>{try{const t=await fetch(pathname("/api/update"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),l=await t.json();l.success?(e(),c(),a.fire({icon:"success",title:"Success",text:"Teacher account has been updated successfully.",timer:3e3}),setTimeout((()=>f()),100)):a.fire({icon:"error",title:"Failed",text:l.error})}catch(t){console.log(t),a.fire({icon:"error",title:"Error",text:"Failed to update teacher account",confirmButtonText:"Try Again",showCancelButton:!0}).then((({isConfirmed:a})=>{a&&setTimeout((()=>g(e)),100)}))}}),[r]),[y,E]=e.useState(!1),T=e.useCallback((async e=>{try{const t=await fetch(pathname("/api/signup"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...r,password:r.full_name.replace(" ","").trim().substring(0,3).toLowerCase()+r.username})}),l=await t.json();l.success?(e(),c(),a.fire({icon:"success",title:"Success",text:"Teacher account has been added successfully.",timer:3e3}),setTimeout((()=>f()),100)):a.fire({icon:"error",title:"Failed",text:l.error})}catch(t){console.log(t),a.fire({icon:"error",title:"Error",text:"Failed to add teacher account",confirmButtonText:"Try Again",showCancelButton:!0}).then((({isConfirmed:a})=>{a&&setTimeout((()=>T(e)),100)}))}}),[r]);return e.createElement(e.Fragment,null,e.createElement("div",{className:"w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 min-w-fit"},e.createElement("h1",{className:"text-white text-2xl my-2"},"Teacher List"),e.createElement(m,{columns:d,items:t},e.createElement("div",{className:"px-4"},e.createElement("button",{type:"button",onClick:()=>f(),className:"hover:text-yellow-500",title:"Refresh List"},e.createElement("span",{className:"material-symbols-outlined"},"refresh"))),e.createElement("div",{className:"px-4"},e.createElement("button",{type:"button",onClick:()=>E(!0),className:"hover:text-yellow-500",title:"Add Teacher Account"},e.createElement("span",{className:"material-symbols-outlined"},"add"))))),e.createElement(i,{open:y,header:"Add Teacher Account",content:e.createElement(p,{formData:r,onChange:o}),onConfirm:T,onCancel:c,onClose:()=>E(!1)}),e.createElement(i,{open:s,header:"Edit Teacher Account",content:e.createElement(b,{formData:r,onChange:o}),onConfirm:g,onCancel:c,onClose:()=>h(!1)}))}}));