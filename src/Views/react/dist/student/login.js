import e from"react";import t from"../qrscan";function a(){const[a,l]=e.useState(!1),[n,r]=e.useState(""),[o,s]=e.useState(""),[c,d]=e.useState(!1),m=e.useCallback(((e,t)=>{t&&fetch(`/api/student?q=exist&id=${t}`).then((e=>e.json())).then((({error:a,exists:l})=>{a?alert("Failed to check student existence: "+a):l?r(t):window.location.href=`/signup?studentId=${t}&full_name=${e}`})).catch((e=>{console.error("Failed to retrieve student information",e),alert("Failed to retrieve student information:"+e.message)}))}),[]),u=e.useCallback((e=>{e.preventDefault(),d(!0),fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8"},body:JSON.stringify({account:"student",username:n,password:o})}).then((e=>e.json())).then((({error:e,success:t})=>{e?(alert(e),console.log(e)):t&&(window.location.href="/")})).catch((e=>{alert("Failed to login. Please try again."),console.log(e)})).finally((()=>{s(""),d(!1)}))}),[n]),i=e.useMemo((()=>e.createElement("img",{src:"/images/SMCC-logo.svg",alt:"SMCC Logo",className:"w-[100px] aspect-square mx-auto"})),[]);return a?e.createElement("div",{className:"w-full pt-32"},e.createElement("div",{className:"p-4"},e.createElement("div",{className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},i,e.createElement("div",{className:"text-[24px] font-[700] text-center"},"Student Login"),e.createElement(t,{className:"mt-4",onResult:m,pause:!a,regExFormat:[/^[A-Z\w]+/,/20\d{7}$/]})),e.createElement("div",{className:"mt-8 text-center font-bold"},"Scan your Student ID QR Code",e.createElement("br",null),e.createElement("button",{type:"button",className:"text-sky-500 hover:text-sky-300 hover:underline mt-2",onClick:()=>l(!1)},"or Login with your Student ID")))):e.createElement("div",{className:"w-full pt-32"},e.createElement("div",{className:"p-4"},e.createElement("form",{onSubmit:u,className:"max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10"},i,e.createElement("div",{className:"text-[24px] font-[700] text-center"},"Student Login"),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("input",{type:"text",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Student ID",value:n,onChange:e=>r(e.target.value),required:!0})),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("input",{type:"password",className:"p-4 w-full border-2 border-gray-300 rounded-lg",placeholder:"Password",value:o,onChange:e=>s(e.target.value),required:!0})),e.createElement("div",{className:"flex justify-center px-4"},e.createElement("button",{type:"submit",disabled:c,className:"bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-[22px] w-full disabled:bg-gray-300"},c?e.createElement("span",{className:"animate-pulse"},"Loading..."):e.createElement(e.Fragment,null,"Login")))),e.createElement("div",{className:"mt-8 text-center font-bold"},"Login with your Student ID",e.createElement("br",null),e.createElement("button",{type:"button",className:"text-sky-500 hover:text-sky-300 hover:underline mt-2",onClick:()=>l(!0)},"or Scan your Student ID QR Code"))))}export default a;