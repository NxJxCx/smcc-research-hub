export default import(pathname("/jsx/imports")).then((async({React:e,Sweetalert2:t,getAsyncImport:a})=>{const{IDRegExFormat:n}=await import(pathname("/jsx/global/enums")),{default:l}=await a("/jsx/global/smcclogo"),{default:o}=await a("/jsx/qrscan");return function(){const a=e.useMemo((()=>new URLSearchParams(window.location.search)),[window.location.search]),{student_id:r}=e.useMemo((()=>({student_id:a.get("student_id"),full_name:a.get("full_name")})),[a]),[s,c]=e.useState(!1),[i,m]=e.useState(!1),[u,d]=e.useState(r),[p,x]=e.useState(""),[h,f]=e.useState(!1),g=e.useCallback(((e,a)=>{a&&(m(!0),fetch(pathname(`/api/student?q=exist&id=${a}`)).then((e=>e.json())).then((({error:n,exists:l})=>{n?t.fire({icon:"error",title:"Error",text:"Failed to check student existence: "+n}):l?(d(a),c(!1)):window.location.href=pathname(`/signup?student_id=${a}&full_name=${e}`)})).catch((e=>{t.fire({icon:"error",title:"Error",text:"Failed to retrieve student information:"+e.message,toast:!0,showConfirmButton:!1,position:"top",timer:3e3})})).finally((()=>setTimeout((()=>m(!1)),1e3))))}),[]),w=e.useCallback((e=>{e.preventDefault(),f(!0),fetch(pathname("/api/login"),{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8"},body:JSON.stringify({account:"student",username:u,password:p})}).then((e=>e.json())).then((({error:e,success:a})=>{e?(t.fire({icon:"error",title:e,toast:!0,showConfirmButton:!1,position:"top",timer:3e3}),console.log(e)):a&&window.location.replace(pathname("/"))})).catch((e=>{t.fire({icon:"error",title:"Error",text:"Failed to login. Please try again.",toast:!0,showConfirmButton:!1,position:"top",timer:3e3}),console.log(e)})).finally((()=>{x(""),f(!1)}))}),[u,p]);return s?e.createElement("div",{className:"w-full pt-16 relative"},e.createElement("button",{type:"button",onClick:()=>window.location.replace(pathname("/")),className:"absolute top-0 left-0 ml-4 mt-4 text-sky-500 hover:text-sky-3 bg-white drop-shadow-lg pl-2 pr-3 py-1 rounded flex items-center"},e.createElement("span",{className:"material-symbols-outlined"},"arrow_left")," Home"),e.createElement("div",{className:"p-4"},e.createElement("div",{className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},e.createElement(l,{className:"w-[100px] aspect-square mx-auto"}),e.createElement("div",{className:"text-[24px] font-[700] text-center"},"Student Login"),e.createElement(o,{className:"mt-4",onResult:g,pause:i||!s,regExFormat:[n.studentName,n.studentId]})),e.createElement("div",{className:"mt-8 text-center font-bold"},"Scan your Student ID QR Code",e.createElement("br",null),e.createElement("button",{type:"button",className:"text-sky-500 hover:text-sky-300 hover:underline mt-2",onClick:()=>c(!1)},"or Login with your Student ID")))):e.createElement("div",{className:"w-full pt-16 relative"},e.createElement("button",{type:"button",onClick:()=>window.location.replace(pathname("/")),className:"absolute top-0 left-0 ml-4 mt-4 text-sky-500 hover:text-sky-3 bg-white drop-shadow-lg pl-2 pr-3 py-1 rounded flex items-center"},e.createElement("span",{className:"material-symbols-outlined"},"arrow_left")," Home"),e.createElement("div",{className:"p-4"},e.createElement("form",{onSubmit:w,className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},e.createElement(l,{className:"w-[100px] aspect-square mx-auto"}),e.createElement("div",{className:"text-[24px] font-[700] text-center"},"Student Login"),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("input",{type:"text",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Student ID",value:u,onChange:e=>d(e.target.value)})),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("input",{type:"password",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Password",value:p,onChange:e=>x(e.target.value)})),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("button",{type:"submit",disabled:h,className:"bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-[22px] w-full disabled:bg-gray-300"},h?e.createElement("span",{className:"animate-pulse"},"Loading..."):e.createElement(e.Fragment,null,"Login"))),e.createElement("div",null,e.createElement("a",{href:pathname("/signup"),className:"text-sky-500 hover:text-sky-300 hover:underline pl-4"},"No Account? Register Now!"))),e.createElement("div",{className:"mt-8 text-center font-bold"},"Login with your Student ID",e.createElement("br",null),e.createElement("button",{type:"button",className:"text-sky-500 hover:text-sky-300 hover:underline mt-2",onClick:()=>c(!0)},"or Scan your Student ID QR Code"))))}}));