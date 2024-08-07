import{Courses as e,Departments as t,IDRegExFormat as r,Year as a}from"/jsx/global/enums";import{React as l,Sweetalert2 as o}from"/jsx/imports";import s from"/jsx/qrscan";function n(){const n=l.useMemo((()=>new URLSearchParams(window.location.search)),[window.location.search]),{student_id:i,full_name:c}=l.useMemo((()=>({student_id:n.get("student_id"),full_name:n.get("full_name")})),[n]),d=l.useMemo((()=>!r.studentId.test(i)||!r.studentName.test(c)),[i,c]),[u,m]=l.useState(!1),[p,f]=l.useState(""),[g,x]=l.useState(""),[h,b]=l.useState(""),[y,E]=l.useState(""),[v,w]=l.useState(""),[N,C]=l.useState(""),[S,j]=l.useState(!1),[k,q]=l.useState({password:""}),R=l.useMemo((()=>d||!p||!g||!y||!v||!N),[d,p,g,y,v,N]),_=l.useCallback((()=>{x(""),b("")}),[]),B=l.useCallback(((e,t)=>{t&&(m(!0),fetch(`/api/student?q=exist&id=${t}`).then((e=>e.json())).then((({error:r,exists:a})=>{r?o.fire({icon:"error",title:"Error",text:"Failed to check student existence: "+r,toast:!0,showConfirmButton:!1,position:"center",timer:3e3}):a?o.fire({icon:"error",title:"Error",text:"Student ID is already registered",timer:2e3,toast:!0,position:"center",showConfirmButton:!1}).then((()=>{o.fire({icon:"question",text:"Do you want to login instead?",showCancelButton:!0,confirmButtonText:"Yes",cancelButtonText:"No"}).then((({isConfirmed:e})=>{e&&window.location.replace(`/login?student_id=${t}`)}))})):window.location.replace(`/signup?student_id=${t}&full_name=${e}`)})).catch((e=>{o.fire({icon:"error",title:"Error",text:"Failed to retrieve student information:"+e.message,toast:!0,showConfirmButton:!1,position:"center",timer:3e3})})).finally((()=>setTimeout((()=>m(!1)),1e3))))}),[]),D=l.useCallback((e=>{if(e.preventDefault(),j(!0),g!==h)return q({password:"Passwords do not match"}),o.fire({icon:"error",title:"Error",text:"Passwords do not match",toast:!0,showConfirmButton:!1,position:"center",timer:3e3}),void j(!1);fetch("/api/signup",{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8"},body:JSON.stringify({account:"student",username:i,full_name:c,email:p,department:y,course:v,year:N,password:g})}).then((e=>e.json())).then((({error:e,success:t})=>{e?(o.fire({icon:"error",title:"Error",text:e,toast:!0,showConfirmButton:!1,position:"center",timer:3e3}),console.log(e)):t&&(_(),o.fire({icon:"success",title:"Registration Successful",text:"You have been registered successfully. Please login.",toast:!0,showConfirmButton:!1,position:"center",timer:2e3}).then((()=>{window.location.href="/login"})))})).catch((e=>{o.fire({icon:"error",title:"Error",text:"Failed to login. Please try again."}),console.log(e)})).finally((()=>{x(""),j(!1)}))}),[i,p,v,N,g,h]),F=l.useMemo((()=>l.createElement("img",{src:"/images/SMCC-logo.svg",alt:"SMCC Logo",className:"w-[100px] aspect-square mx-auto"})),[]);return d?l.createElement("div",{className:"w-full pt-16"},l.createElement("div",{className:"p-4"},l.createElement("div",{className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},F,l.createElement("div",{className:"text-[24px] font-[700] text-center"},"Student Registration"),l.createElement(s,{className:"mt-4",onResult:B,pause:u||!d,regExFormat:[r.studentName,r.studentId]})),l.createElement("div",{className:"mt-8 text-center font-bold"},"Scan your Student ID QR Code to Register",l.createElement("br",null),"Already registered? ",l.createElement("a",{href:"/login",className:"text-sky-500 hover:text-sky-300 hover:underline mt-2"},"Login")))):l.createElement("div",{className:"w-full pt-2"},l.createElement("div",{className:"p-4"},l.createElement("form",{onSubmit:D,className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},F,l.createElement("div",{className:"text-[24px] font-[700] text-center"},"Student Registration"),l.createElement("div",{className:"flex justify-center px-4"},l.createElement("input",{type:"text",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Student ID",value:i,disabled:!0,required:!0})),l.createElement("div",{className:"flex justify-center px-4"},l.createElement("input",{type:"text",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Full Name",value:c,disabled:!0,required:!0})),l.createElement("div",{className:"flex justify-center px-4"},l.createElement("input",{type:"email",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Email Address",value:p,onChange:e=>f(e.target.value),required:!0})),l.createElement("div",{className:"flex justify-center px-4"},l.createElement("select",{value:y,onChange:e=>E(e.target.value),title:"Department",className:"p-4 w-full border-2 border-gray-300 rounded-lg bg-sky-50",required:!0},l.createElement("option",{value:""},"-- Select Department --"),Object.entries(t).map((([e,t])=>l.createElement("option",{key:e,value:t},t))))),l.createElement("div",{className:"flex justify-center px-4"},l.createElement("select",{value:v,onChange:e=>w(e.target.value),title:"Course",className:"p-4 w-full border-2 border-gray-300 rounded-lg bg-sky-50",required:!0},l.createElement("option",{value:""},"-- Select Course --"),Object.entries(e).map((([e,t])=>l.createElement("option",{key:e,value:t},t))))),l.createElement("div",{className:"flex justify-center px-4"},l.createElement("select",{value:N,onChange:e=>C(e.target.value),title:"Year",className:"p-4 w-full border-2 border-gray-300 rounded-lg bg-sky-50",required:!0},l.createElement("option",{value:""},"-- Select Year --"),Object.entries(a).map((([e,t])=>l.createElement("option",{key:e,value:t},"1"===t?"1st Year":"2"===t?"2nd Year":"3"===t?"3rd Year":"4th Year"))))),l.createElement("div",{className:"flex justify-center px-4"},l.createElement("input",{type:"password",className:"p-4 w-full border-2 border-gray-300 rounded-lg"+(k.password?" border-red-500":""),placeholder:"Password",value:g,onChange:e=>{x(e.target.value),q({password:""})},required:!0})),l.createElement("div",{className:"flex justify-center px-4"},l.createElement("input",{type:"password",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Repeat Password",value:h,onChange:e=>{b(e.target.value),q({password:""})},required:!0})),l.createElement("div",{className:"flex justify-center px-4"},l.createElement("button",{type:"submit",disabled:S||R,className:"bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-[22px] w-full disabled:bg-gray-300"},S?l.createElement("span",{className:"animate-pulse"},"Loading..."):l.createElement(l.Fragment,null,"Register")))),l.createElement("div",{className:"mt-8 text-center font-bold"},"Complete your registration with the details above",l.createElement("br",null),l.createElement("a",{href:"/signup",className:"text-sky-500 hover:text-sky-300 hover:underline mt-2"},"or Scan QR Code again if is not your Student ID"))))}export default n;