export default import(pathname("/jsx/imports")).then((async({React:e,ReactDOM:t,clsx:a,getAsyncImport:s})=>{const{NavItems:l}=await import(pathname("/jsx/types")),{default:n}=await s("/jsx/global/smcclogo");const r=document.getElementById("sidebar-toggle-btn"),c=document.getElementById("sidebar-nav"),i=t.createRoot(c);if(c){c.className="",c.classList.add(..."flex-shrink max-w-[250px] max-h-screen bg-[#262e36]".split(" "));const t=JSON.parse(c.dataset.sidebarList);i.render(e.createElement((function({defaultShow:t=!0,sidebarList:s,toggleBtn:l}){const r=e.useMemo((()=>window.location.pathname),[]),[c,i]=e.useState(t);return e.useEffect((()=>{l.addEventListener("click",(()=>i((e=>!e))))}),[l]),e.useEffect((()=>{localStorage.setItem("sidebarShow",c?"true":"false")}),[c]),e.createElement("nav",{className:a("text-slate-50 bg-[#262e36] max-w-[250px] h-full relative",c?"w-[250px]":"w-0 *:hidden","transition-[width] duration-200 ease-in-out")},e.createElement("div",{className:"w-full max-h-[60px] h-[60px] flex items-center justify-center bg-[#21282f]"},e.createElement("a",{href:"/",className:"flex flex-nowrap h-full w-fit items-center justify-start"},e.createElement(n,{className:"aspect-square h-full py-2"}),e.createElement("h1",{className:"pr-3 font-[600]"},"RESEARCH HUB"))),e.createElement("ul",{className:"list-none p-0 bg-[#191f26] py-4 w-full"},s.map((({label:t,url:a})=>e.createElement("li",{key:t},e.createElement("a",{href:a,className:"flex p-4 text-sm font-medium hover:bg-sky-300 hover:text-black transition-colors duration-200 ease-in-out"+(a===r?" bg-yellow-300 text-black":" text-white")},t))))))}),{sidebarList:t,toggleBtn:r}))}}));