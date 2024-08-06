import{React as e,Sweetalert2 as t}from"/jsx/imports";function a(){const[a,o]=e.useState(""),[l,r]=e.useState(""),[n,s]=e.useState(!1),c=e.useCallback((e=>{e.preventDefault(),s(!0),fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8"},body:JSON.stringify({account:"personnel",username:a,password:l})}).then((e=>e.json())).then((({error:e,success:a})=>{e?(t.fire({icon:"error",title:e,toast:!0,showConfirmButton:!1,position:"top",timer:3e3}),console.log(e)):a&&window.location.replace("/")})).catch((e=>{t.fire({icon:"error",title:"Error",text:"Failed to login. Please try again.",toast:!0,showConfirmButton:!1,position:"top",timer:3e3}),console.log(e)})).finally((()=>{r(""),s(!1)}))}),[a,l]),i=e.useMemo((()=>e.createElement("img",{src:"/images/SMCC-logo.svg",alt:"SMCC Logo",className:"w-[100px] aspect-square mx-auto"})),[]);return e.createElement("div",{className:"w-full pt-16"},e.createElement("div",{className:"p-4"},e.createElement("form",{onSubmit:c,className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},i,e.createElement("div",{className:"text-[24px] font-[700] text-center"},"Teacher Login"),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("input",{type:"text",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Employee ID",value:a,onChange:e=>o(e.target.value)})),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("input",{type:"password",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Password",value:l,onChange:e=>r(e.target.value)})),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("button",{type:"submit",disabled:n,className:"bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-[22px] w-full disabled:bg-gray-300"},n?e.createElement("span",{className:"animate-pulse"},"Loading..."):e.createElement(e.Fragment,null,"Login")))),e.createElement("div",{className:"mt-8 text-center font-bold"},"Login with your Employee ID")))}export default a;