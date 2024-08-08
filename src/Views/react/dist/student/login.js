import{IDRegExFormat as e}from"/jsx/global/enums";import t from"/jsx/global/smcclogo";import{React as a,Sweetalert2 as o}from"/jsx/imports";import l from"/jsx/qrscan";function r(){const r=a.useMemo((()=>new URLSearchParams(window.location.search)),[window.location.search]),{student_id:n}=a.useMemo((()=>({student_id:r.get("student_id"),full_name:r.get("full_name")})),[r]),[s,c]=a.useState(!1),[i,m]=a.useState(!1),[u,d]=a.useState(n),[p,x]=a.useState(""),[f,g]=a.useState(!1),h=a.useCallback(((e,t)=>{t&&(m(!0),fetch(`/api/student?q=exist&id=${t}`).then((e=>e.json())).then((({error:a,exists:l})=>{a?o.fire({icon:"error",title:"Error",text:"Failed to check student existence: "+a}):l?(d(t),c(!1)):window.location.href=`/signup?student_id=${t}&full_name=${e}`})).catch((e=>{o.fire({icon:"error",title:"Error",text:"Failed to retrieve student information:"+e.message,toast:!0,showConfirmButton:!1,position:"center",timer:3e3})})).finally((()=>setTimeout((()=>m(!1)),1e3))))}),[]),b=a.useCallback((e=>{e.preventDefault(),g(!0),fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8"},body:JSON.stringify({account:"student",username:u,password:p})}).then((e=>e.json())).then((({error:e,success:t})=>{e?(o.fire({icon:"error",title:e,toast:!0,showConfirmButton:!1,position:"center",timer:3e3}),console.log(e)):t&&window.location.replace("/")})).catch((e=>{o.fire({icon:"error",title:"Error",text:"Failed to login. Please try again.",toast:!0,showConfirmButton:!1,position:"center",timer:3e3}),console.log(e)})).finally((()=>{x(""),g(!1)}))}),[u,p]);return s?a.createElement("div",{className:"w-full pt-16 relative"},a.createElement("button",{type:"button",onClick:()=>window.location.replace("/"),className:"absolute top-0 left-0 ml-4 mt-4 text-sky-500 hover:text-sky-3 bg-white drop-shadow-lg pl-2 pr-3 py-1 rounded flex items-center"},a.createElement("span",{className:"material-symbols-outlined"},"arrow_left")," Home"),a.createElement("div",{className:"p-4"},a.createElement("div",{className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},a.createElement(t,{className:"w-[100px] aspect-square mx-auto"}),a.createElement("div",{className:"text-[24px] font-[700] text-center"},"Student Login"),a.createElement(l,{className:"mt-4",onResult:h,pause:i||!s,regExFormat:[e.studentName,e.studentId]})),a.createElement("div",{className:"mt-8 text-center font-bold"},"Scan your Student ID QR Code",a.createElement("br",null),a.createElement("button",{type:"button",className:"text-sky-500 hover:text-sky-300 hover:underline mt-2",onClick:()=>c(!1)},"or Login with your Student ID")))):a.createElement("div",{className:"w-full pt-16 relative"},a.createElement("button",{type:"button",onClick:()=>window.location.replace("/"),className:"absolute top-0 left-0 ml-4 mt-4 text-sky-500 hover:text-sky-3 bg-white drop-shadow-lg pl-2 pr-3 py-1 rounded flex items-center"},a.createElement("span",{className:"material-symbols-outlined"},"arrow_left")," Home"),a.createElement("div",{className:"p-4"},a.createElement("form",{onSubmit:b,className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},a.createElement(t,{className:"w-[100px] aspect-square mx-auto"}),a.createElement("div",{className:"text-[24px] font-[700] text-center"},"Student Login"),a.createElement("div",{className:"flex justify-center px-4"},a.createElement("input",{type:"text",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Student ID",value:u,onChange:e=>d(e.target.value)})),a.createElement("div",{className:"flex justify-center px-4"},a.createElement("input",{type:"password",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Password",value:p,onChange:e=>x(e.target.value)})),a.createElement("div",{className:"flex justify-center px-4"},a.createElement("button",{type:"submit",disabled:f,className:"bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-[22px] w-full disabled:bg-gray-300"},f?a.createElement("span",{className:"animate-pulse"},"Loading..."):a.createElement(a.Fragment,null,"Login"))),a.createElement("div",null,a.createElement("a",{href:"/signup",className:"text-sky-500 hover:text-sky-300 hover:underline pl-4"},"No Account? Register Now!"))),a.createElement("div",{className:"mt-8 text-center font-bold"},"Login with your Student ID",a.createElement("br",null),a.createElement("button",{type:"button",className:"text-sky-500 hover:text-sky-300 hover:underline mt-2",onClick:()=>c(!0)},"or Scan your Student ID QR Code"))))}export default r;