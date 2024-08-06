import e from"/jsx/global/avatar";import{React as t,ReactDOM as a}from"/jsx/imports";function l({search:e,setSearch:a}){return t.createElement("div",{className:"flex flex-row justify-start items-center w-full h-[50px] rounded-full bg-white border border-sky-300 focus-within:border-sky-600 focus-within:border-4"},t.createElement("label",{htmlFor:"search",className:"material-symbols-outlined h-full flex items-center justify-center min-w-[50px] pl-4"},"search"),t.createElement("input",{type:"search",id:"search",name:"search",placeholder:"Search",value:e,onChange:e=>a(e.target.value),className:"w-full h-full p-4 outline-none bg-transparent"}))}e();const r=document.getElementById("responsive-nav-small");if(r){r.classList.add("block","xl:hidden","p-4","flex-shrink");const e=[...r.children],s=JSON.parse(r.dataset.navlist);a.createRoot(r).render(t.createElement((function({navList:e,authAvatarList:a}){const[r,s]=t.useState(!1),[n,c]=t.useState(""),o=t.useRef(null),i=t.useRef(null),u=t.useCallback((()=>s(!r)),[r]),m=t.useMemo((()=>JSON.parse(document.getElementById("root").dataset.pageData)),[]),d=t.useMemo((()=>window.location.pathname),[]);return t.useEffect((()=>{n?console.log("Searching for: "+n):console.log("Not searching. Clearing search input.")}),[n]),t.useEffect((()=>{r?(o.current?.classList.remove("-z-10"),o.current?.classList.remove("scale-y-0"),o.current?.classList.add("z-10"),o.current?.classList.add("scale-y-full")):(o.current?.classList.remove("z-10"),o.current?.classList.remove("scale-y-full"),o.current?.classList.add("scale-y-0"),o.current?.classList.add("-z-10"))}),[r]),t.useEffect((()=>{i.current&&i.current.children.length===e.length&&(i.current.prepend(a[0]),i.current.append(a[1]))}),[a,i]),t.createElement(t.Fragment,null,t.createElement("div",{ref:o,className:"flex absolute bg-white top-full right-0 border w-full h-fit px-10 pb-6 pt-4 scale-y-0 -z-10 flex-col justify-start items-start gap-y-4 transition-transform duration-500 delay-10 ease-in-out origin-top shadow-lg"},t.createElement(l,{search:n,setSearch:c}),t.createElement("ul",{className:"flex flex-col gap-2 w-full h-full font-[500]",ref:i},t.createElement("li",null,m.authenticated?t.createElement("div",{className:"px-4 py-3 text-sm text-gray-900"},t.createElement("div",null,m.auth_data.full_name),t.createElement("div",{className:"font-medium truncate capitalize"},m.auth_data.account)):t.createElement("div",{className:"px-4 flex flex-col gap-2"},t.createElement("a",{href:"/login",className:"text-sky-600 hover:text-sky-300"},"Login"))),e.map((e=>t.createElement("li",{key:e.label},t.createElement("a",{href:e.url,className:"indent-4"},t.createElement("div",{className:"hover:text-sky-500 transition duration-300 w-full\n                  "+("/"===e.url&&"/"===d||d.startsWith(e.url)?"text-black border-l-4 border-sky-300 font-700":"text-gray-500 w-full")},e.label))))),t.createElement("li",null,m.authenticated?t.createElement("form",{action:"/logout",method:"post"},t.createElement("a",{href:"/settings",className:"block px-4 py-2 hover:bg-gray-200"},"Settings"),t.createElement("button",{type:"submit",className:"block px-4 pt-2 text-red-400 hover:text-red-700 w-full text-start"},"Sign out")):t.createElement("div",{className:"px-4 flex flex-col gap-2"},t.createElement("a",{href:"/signup",className:"text-yellow-600 hover:text-sky-300"},"Sign Up"))))),t.createElement("button",{type:"button",onClick:u,className:"w-[50px] h-[50px] aspect-square hover:text-sky-500"},t.createElement("span",{className:"material-symbols-outlined"},"menu")))}),{navList:s,authAvatarList:e}))}