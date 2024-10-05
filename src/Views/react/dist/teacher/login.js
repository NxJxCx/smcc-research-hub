export default import(pathname("/jsx/imports")).then((async({React:e,Sweetalert2:t,getAsyncImport:a})=>{const{default:l}=await a("/jsx/global/smcclogo");return function(){const[a,o]=e.useState(""),[r,n]=e.useState(""),[s,c]=e.useState(!1),i=e.useCallback((e=>{e.preventDefault(),c(!0),fetch(pathname("/api/login"),{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8"},body:JSON.stringify({account:"personnel",username:a,password:r})}).then((e=>e.json())).then((({error:e,success:a})=>{e?(t.fire({icon:"error",title:e,toast:!0,showConfirmButton:!1,position:"top",timer:3e3}),console.log(e)):a&&window.location.replace(pathname("/"))})).catch((e=>{t.fire({icon:"error",title:"Error",text:"Failed to login. Please try again.",toast:!0,showConfirmButton:!1,position:"top",timer:3e3}),console.log(e)})).finally((()=>{n(""),c(!1)}))}),[a,r]);return e.createElement("div",{className:"w-full pt-16 relative"},e.createElement("button",{type:"button",onClick:()=>window.location.replace(pathname("/")),className:"absolute top-0 left-0 ml-4 mt-4 text-sky-500 hover:text-sky-3 bg-white drop-shadow-lg pl-2 pr-3 py-1 rounded flex items-center"},e.createElement("span",{className:"material-symbols-outlined"},"arrow_left")," Home"),e.createElement("div",{className:"p-4"},e.createElement("form",{onSubmit:i,className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},e.createElement(l,{className:"w-[100px] aspect-square mx-auto"}),e.createElement("div",{className:"text-[24px] font-[700] text-center"},"Teacher Login"),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("input",{type:"text",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Employee ID",value:a,onChange:e=>o(e.target.value)})),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("input",{type:"password",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Password",value:r,onChange:e=>n(e.target.value)})),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("button",{type:"submit",disabled:s,className:"bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-[22px] w-full disabled:bg-gray-300"},s?e.createElement("span",{className:"animate-pulse"},"Loading..."):e.createElement(e.Fragment,null,"Login")))),e.createElement("div",{className:"mt-8 text-center font-bold"},"Login with your Employee ID")))}}));