import e from"/jsx/global/clsx";import t from"/jsx/global/smcclogo";import{React as a,ReactDOM as s}from"/jsx/imports";const l=document.getElementById("sidebar-toggle-btn"),r=document.getElementById("sidebar-nav"),n=s.createRoot(r);if(r){r.className="",r.classList.add(..."flex-shrink max-w-[250px] max-h-screen bg-[#262e36]".split(" "));const s=JSON.parse(r.dataset.sidebarList);n.render(a.createElement((function({defaultShow:s=!0,sidebarList:l,toggleBtn:r}){const n=a.useMemo((()=>window.location.pathname),[]),[o,i]=a.useState(s);return a.useEffect((()=>{r.addEventListener("click",(()=>i((e=>!e))))}),[r]),a.useEffect((()=>{localStorage.setItem("sidebarShow",o?"true":"false")}),[o]),a.createElement("nav",{className:e("text-slate-50 bg-[#262e36] max-w-[250px] h-full relative",o?"w-[250px]":"w-0 *:hidden","transition-[width] duration-200 ease-in-out")},a.createElement("div",{className:"w-full max-h-[60px] h-[60px] flex items-center justify-center bg-[#21282f]"},a.createElement("div",{className:"flex flex-nowrap h-full w-fit items-center justify-start"},a.createElement(t,{className:"aspect-square h-full py-2"}),a.createElement("h1",{className:"pr-3 font-[600]"},"RESEARCH HUB"))),a.createElement("ul",{className:"list-none p-0 bg-[#191f26] py-4 w-full"},l.map((({label:e,url:t})=>a.createElement("li",{key:e},a.createElement("a",{href:t,className:"flex p-4 text-sm font-medium hover:bg-sky-300 hover:text-black transition-colors duration-200 ease-in-out"+(t===n?" bg-yellow-300 text-black":" text-white")},e))))))}),{sidebarList:s,toggleBtn:l}))}