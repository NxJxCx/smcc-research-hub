import e from"/jsx/global/smcclogo";import{React as t,Sweetalert2 as a}from"/jsx/imports";export default function l(){const[l,r]=t.useState(""),[o,n]=t.useState(""),[s,c]=t.useState(!1),i=t.useCallback((e=>{e.preventDefault(),c(!0),fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8"},body:JSON.stringify({account:"admin",username:l,password:o})}).then((e=>e.json())).then((({error:e,success:t})=>{e?(a.fire({icon:"error",title:e,toast:!0,showConfirmButton:!1,position:"center",timer:3e3}),console.log(e)):t&&window.location.replace("/admin/dashboard")})).catch((e=>{a.fire({icon:"error",title:"Error",text:"Failed to login. Please try again.",toast:!0,showConfirmButton:!1,position:"center",timer:3e3}),console.log(e)})).finally((()=>{n(""),c(!1)}))}),[l,o]);return t.createElement("div",{className:"w-full pt-16 relative"},t.createElement("button",{type:"button",onClick:()=>window.location.replace("/"),className:"absolute top-0 left-0 ml-4 mt-4 text-sky-500 hover:text-sky-3 bg-white drop-shadow-lg pl-2 pr-3 py-1 rounded flex items-center"},t.createElement("span",{className:"material-symbols-outlined"},"arrow_left")," Home"),t.createElement("div",{className:"p-4"},t.createElement("form",{onSubmit:i,className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},t.createElement(e,{className:"w-[100px] aspect-square mx-auto"}),t.createElement("div",{className:"text-[24px] font-[700] text-center"},"Admin Login"),t.createElement("div",{className:"flex justify-center px-4"},t.createElement("input",{type:"text",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Username",value:l,onChange:e=>r(e.target.value)})),t.createElement("div",{className:"flex justify-center px-4"},t.createElement("input",{type:"password",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Password",value:o,onChange:e=>n(e.target.value)})),t.createElement("div",{className:"flex justify-center px-4"},t.createElement("button",{type:"submit",disabled:s,className:"bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-[22px] w-full disabled:bg-gray-300"},s?t.createElement("span",{className:"animate-pulse"},"Loading..."):t.createElement(t.Fragment,null,"Login"))),t.createElement("div",null,t.createElement("a",{href:"/login",className:"text-sky-500 hover:text-sky-300 hover:underline pl-4"},"Login as Student?"),t.createElement("a",{href:"/teacher/login",className:"text-sky-500 hover:text-sky-300 hover:underline pl-4"},"Login as Teacher?")))))}