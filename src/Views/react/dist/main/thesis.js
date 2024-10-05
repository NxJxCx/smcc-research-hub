export default import(pathname("/jsx/imports")).then((async({React:e,clsx:t,Sweetalert2:a,getAsyncImport:o})=>{const{Departments:n}=await import(pathname("/jsx/types")),{default:r}=await o("/jsx/context"),{default:s}=await o("/jsx/global/modal"),{default:l}=await o("/jsx/global/pdfviewer"),{default:i}=await o("/jsx/main/search");function c({id:t,title:o,abstract:n,author:s,course:l,year:i,favorite:c,url:m,totalViews:u=0,onViewPdf:d,onRefresh:h}){const{authenticated:p,authData:x}=e.useContext(r),f=e.useCallback((e=>{e.preventDefault(),e.stopPropagation();const o=new URL(pathname("/api/thesis/markfavorite"),window.location.origin),n=JSON.stringify({id:t,[x?.account]:x?.id});fetch(o,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8"},body:n}).then((e=>e.json())).then((({success:e,error:t})=>{t?a.fire({icon:"error",title:"Error",text:"Failed to mark thesis as favorite: "+t,toast:!0,showConfirmButton:!1,position:"center",timer:3e3}):e?h&&h():a.fire({icon:"error",title:"Error",text:"Failed to mark thesis as favorite",toast:!0,showConfirmButton:!1,position:"center",timer:3e3})})).catch(console.log)}),[t,x]),w=e.useCallback((()=>{const e=new URL(pathname(`/read${m}&id=${t}`),window.location.origin).toString();d&&d(e,o,s+" ("+i+")")}),[m,d,t]);return e.createElement(e.Fragment,null,e.createElement("div",{onClick:w,className:"text-center relative cursor-pointer border rounded-lg p-4 w-[400px]"},p&&"admin"!==x?.account&&e.createElement("button",{type:"button",onClick:f,className:"absolute right-2 top-3 z-20 hover:text-yellow-500"},c&&e.createElement("span",{className:"material-symbols-outlined text-green-700"},"bookmark_star"),!c&&e.createElement("span",{className:"material-symbols-outlined"},"bookmark")),e.createElement("div",{className:"h-[75px] pt-4 px-4 font-bold leading-tight"},o),e.createElement("div",{className:"h-[150px] mb-2 text-justify px-4 leading-tight indent-8"},n.substring(0,Math.min(320,n.length)),"..."),e.createElement("div",{className:"pt-4 px-2 leading-tight text-gray-700 italic"},s," (",i,")"),e.createElement("div",{className:"pb-2 px-2 text-sm italic leading-tight text-gray-600"},l),e.createElement("div",{className:"pb-2 px-2 text-sm italic leading-tight text-gray-600 text-right"},e.createElement("div",{className:"material-symbols-outlined aspect-square text-sm mr-1 font-bold"},"visibility"),e.createElement("div",{className:"inline pb-1 font-[500]"},u))))}return function(){const{authenticated:a,authData:o}=e.useContext(r),[m,u]=e.useState(new URLSearchParams(new URL(window.location.href).search).get("search")||""),d=e.useMemo((()=>new URLSearchParams(new URL(window.location.href).search)),[]),h=e.useCallback((e=>{u(e),d.set("search",e),window.history.pushState({},"",`?${d.toString()}`)}),[]),[p,x]=e.useState([]),[f,w]=e.useState(n.CCIS),g=e.useMemo((()=>p.filter((e=>e.department?.toString().toLowerCase()===f.toString().toLowerCase()&&(!m||e.title.toLowerCase().includes(m)||e.abstract.toLowerCase().includes(m)||e.author.toLowerCase().includes(m)||e.year.toString().includes(m))))),[p,f,m]),[b,v]=e.useState(1),y=e.useMemo((()=>Math.ceil(g.length/20)),[g]),E=e.useMemo((()=>0===g.length?void 0:g?.slice(20*(b-1),20*b)),[b,g,y]),N=e.useCallback((()=>v((e=>Math.min(y,Math.max(0===y?0:1,e+1))))),[y]),C=e.useCallback((()=>v((e=>Math.min(y,Math.max(0===y?0:1,e-1))))),[y]),k=async()=>{const e=new URL(pathname("/api/thesis/public/all"),window.location.origin);e.searchParams.set(o?.account,o?.id);try{const t=await fetch(e);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const{success:a,error:o}=await t.json();if(o)throw new Error(`HTTP error: ${o.message}`);a&&(a.sort(((e,t)=>new Date(e.created_at).getTime()>new Date(t.created_at).getTime()?-1:new Date(e.created_at).getTime()==new Date(t.created_at).getTime()?0:1)),x(a))}catch(e){console.log(e)}};e.useEffect((()=>{k().catch()}),[]);const[S,T]=e.useState(),[j,L]=e.useState(),[P,M]=e.useState(),R=e.useCallback(((e,t,a)=>{L(t),T(e),M(a)}),[]);return e.createElement(e.Fragment,null,e.createElement("div",{className:"flex py-4 px-8 mt-4"},e.createElement("div",{className:"flex-grow mt-3"},e.createElement("h1",{className:"text-2xl font-bold text-center"},"Theses/Capstone"),e.createElement("div",{className:"flex flex-wrap p-4 gap-4"},!!f&&E?.map((t=>e.createElement(c,{key:t.id,id:t.id,title:t.title,abstract:t.abstract,author:t.author,course:t.course,year:t.year,favorite:t.favorite,url:t.url,totalViews:t.totalViews,onViewPdf:R,onRefresh:k})))||e.createElement("div",{className:"lg:col-span-2 xl:col-span-3 mx-auto"},e.createElement("div",{className:"h-[200px] mb-2"},e.createElement("div",{className:"border-2 border-gray-300 rounded-lg p-4"},e.createElement("div",{className:"text-gray-500"},"No theses found.")))))),e.createElement("div",{className:"min-w-[326px] max-w-[326px] h-[600px] flex flex-col"},e.createElement("div",{className:"min-h-[400px] flex-grow"},e.createElement("div",{className:"font-bold text-xl mb-4 w-full"},"Categories"),Object.entries(n).map((([a,o])=>e.createElement("button",{key:a,type:"button",className:t("flex items-center px-4 py-2 text-left",f===o?"bg-gray-200 font-bold":"hover:bg-gray-300"),onClick:()=>w(o)},o)))),e.createElement("div",{className:"flex-shrink text-slate-700 font-[600] w-full mb-3"},e.createElement(i,{search:m,onSearch:h})),e.createElement("div",{className:"text-slate-700 font-[600] max-w-full overflow-x-auto overflow-y-hidden"},e.createElement("div",{className:"flex"},Array.from({length:y}).map(((a,o)=>e.createElement("button",{key:o,type:"button",className:t("flex items-center px-4 py-2 text-left",b===o+1?"bg-gray-200 font-bold":"hover:bg-gray-300"),onClick:()=>v(o+1)},o+1))))),e.createElement("div",{className:"flex-shrink text-slate-700 font-[600] mx-auto"},e.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:()=>v(0===y?0:1)},"<<"),e.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:C},"<"," Prev"),e.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:N},"Next ",">"),e.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:()=>v(y)},">>")))),e.createElement(s,{open:!!S,onClose:()=>{T(void 0),L(void 0),M(void 0)},content:a?e.createElement(l,{src:S}):e.createElement("div",{className:"w-full text-center min-h-[150px] pt-16"},"Please ",e.createElement("a",{href:pathname("/login"),className:"text-sky-700 underline"},"login")," to view thesis."),header:j,showCancelButton:!1,showConfirmButton:!1,footer:P}))}}));