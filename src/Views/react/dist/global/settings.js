export default import(pathname("/jsx/imports")).then((async({React:e,Sweetalert2:a,getAsyncImport:l})=>{const{Courses:t,Departments:r,Year:n}=await import(pathname("/jsx/types")),{default:o}=await l("/jsx/context"),{default:{Input:s,Select:m}}=await l("/jsx/global/input");function c({formData:a,onChange:l}){return e.createElement("div",{className:"p-8 min-w-96"},e.createElement(s,{disabled:!0,label:"Username",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_admin_user",placeholder:"Username",value:a.username}),e.createElement(s,{label:"Full Name",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_full_name",placeholder:"Full Name",value:a.full_name,onChange:e=>l({...a,full_name:e.target.value}),required:!0}),e.createElement(s,{type:"email",label:"Email Address",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_email",placeholder:"Email Address",value:a.email,onChange:e=>l({...a,email:e.target.value}),required:!0}),e.createElement(s,{type:"password",label:"Password",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_password",placeholder:"Password (Leave blank if not change)",value:a.password,onChange:e=>l({...a,password:e.target.value})}))}function i({formData:a,onChange:l}){return e.createElement("div",{className:"p-8 min-w-96"},e.createElement(s,{disabled:!0,label:"Student ID",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_student_id",placeholder:"Student ID",value:a.username}),e.createElement(s,{disabled:!0,label:"Full Name",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_full_name",placeholder:"Full Name",value:a.full_name}),e.createElement(s,{type:"email",label:"Email Address",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_email",placeholder:"Email Address",value:a.email,onChange:e=>l({...a,email:e.target.value}),required:!0}),e.createElement(m,{labelColor:"black",items:Object.entries(r).map((([e,a])=>({label:a,value:a}))),label:"Department",name:"edit_department",placeholder:"Department",value:a.department,onChange:e=>l({...a,department:e.target.value}),required:!0}),e.createElement(m,{labelColor:"black",items:Object.entries(t).map((([e,a])=>({label:a,value:a}))),label:"Course",name:"edit_course",placeholder:"Course",value:a.course,onChange:e=>l({...a,course:e.target.value}),required:!0}),e.createElement(m,{labelColor:"black",items:Object.entries(n).map((([e,a])=>({label:a,value:a}))),label:"Year",name:"edit_year",placeholder:"Year",value:a.year,onChange:e=>l({...a,year:e.target.value}),required:!0}),e.createElement(s,{type:"password",label:"Password",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_password",placeholder:"Password (Leave blank if not change)",value:a.password,onChange:e=>l({...a,password:e.target.value})}))}function d({formData:a,onChange:l}){return e.createElement("div",{className:"p-8 min-w-96"},e.createElement(s,{disabled:!0,label:"Employee ID",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_personnel_id",placeholder:"Employee ID",value:a.username}),e.createElement(s,{label:"Full Name",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_full_name",placeholder:"Full Name",value:a.full_name,onChange:e=>l({...a,full_name:e.target.value}),required:!0}),e.createElement(s,{type:"email",label:"Email Address",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_email",placeholder:"Email Address",value:a.email,onChange:e=>l({...a,email:e.target.value}),required:!0}),e.createElement(m,{labelColor:"black",items:Object.entries(r).map((([e,a])=>({label:a,value:a}))),label:"Department",name:"edit_department",placeholder:"Department",value:a.department,onChange:e=>l({...a,department:e.target.value}),required:!0}),e.createElement(s,{type:"password",label:"Password",inputClassName:"border-black",className:"mb-2",labelColor:"black",name:"edit_password",placeholder:"Password (Leave blank if not change)",value:a.password,onChange:e=>l({...a,password:e.target.value})}))}return function(){const{authenticated:l,authData:t}=e.useContext(o);if(!l||!t)return window.location.replace(pathname("/")),null;const r=e.useMemo((()=>l?t.account:null),[l,t]);console.log(l,t,r);const[n,s]=e.useState({username:"admin"===r?t?.admin_user||"":"student"===r?t?.student_id||"":"personnel"===r&&t?.personnel_id||"",full_name:t?.full_name||"",email:t?.email||"",password:"",department:t?.department||"",course:t?.course||"",year:t?.year||""}),m=e.useCallback((async e=>{e.preventDefault(),e.stopPropagation();try{const e=await fetch(pathname("/api/update"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...n,username:void 0,account:r})}),l=await e.json();l.success?(close(),a.fire({icon:"success",title:"Success",text:"Updated successfully.",timer:2e3}),setTimeout((()=>window.location.reload()),1e3)):a.fire({icon:"error",title:"Failed",text:l.error})}catch(e){console.log(e),a.fire({icon:"error",title:"Error",text:"Failed to update teacher account",confirmButtonText:"Try Again",showCancelButton:!0}).then((({isConfirmed:a})=>{a&&setTimeout((()=>m(e)),100)}))}}),[n,r]);return e.createElement("div",{className:"min-h-[calc(100vh-200px)] py-4 px-4 lg:px-8"},e.createElement("h1",{className:"text-2xl font-bold mt-8 mb-4"},"Account Settings"),e.createElement("form",{className:"border-t",onSubmit:m},e.createElement("div",{className:"flex max-w-full overflow-auto"},"admin"===r&&e.createElement(c,{formData:n,onChange:s}),"personnel"===r&&e.createElement(d,{formData:n,onChange:s}),"student"===r&&e.createElement(i,{formData:n,onChange:s})),e.createElement("div",{className:"ml-8"},e.createElement("button",{type:"button",className:"text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2",onClick:()=>window.history.back()},"Cancel"),e.createElement("button",{type:"submit",className:"text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"},"Save"))))}}));