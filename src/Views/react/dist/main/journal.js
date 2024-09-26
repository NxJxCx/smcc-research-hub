import{MainContext as e}from"/jsx/context";import t from"/jsx/global/clsx";import a from"/jsx/global/modal";import l from"/jsx/global/pdfviewer";import{React as o,Sweetalert2 as r}from"/jsx/imports";import n from"/jsx/main/search";function s({id:t,title:a,author:l,year:n,volume:s,number:i,favorite:c,url:m,publisher:u,publishedDate:d,thumbnail:h,totalViews:x=0,onViewPdf:p,onRefresh:f}){const{authenticated:b,authData:g}=o.useContext(e),w=o.useCallback((e=>{e.preventDefault(),e.stopPropagation();const a=new URL("/api/journal/markfavorite",window.location.origin),l=JSON.stringify({id:t,[g?.account]:g?.id});fetch(a,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8",Accept:"application/json; charset=UTF-8"},body:l}).then((e=>e.json())).then((({success:e,error:t})=>{t?r.fire({icon:"error",title:"Error",text:"Failed to mark journal as favorite: "+t,toast:!0,showConfirmButton:!1,position:"center",timer:3e3}):e?f&&f():r.fire({icon:"error",title:"Error",text:"Failed to mark journal as favorite",toast:!0,showConfirmButton:!1,position:"center",timer:3e3})})).catch(console.log)}),[t,g]),v=o.useCallback((()=>{const e=new URL(`/read${m}&id=${t}`,window.location.origin).toString();p&&p(e,a,l+" ("+n+") Vol. "+s+" No. "+i)}),[m,p,t]);return o.createElement(o.Fragment,null,o.createElement("div",{onClick:v,className:"text-center relative cursor-pointer border rounded-lg p-4 w-[500px]"},b&&o.createElement("button",{type:"button",onClick:w,className:"absolute right-2 top-3 z-20 hover:text-yellow-500"},c&&o.createElement("span",{className:"material-symbols-outlined text-green-700"},"bookmark_star"),!c&&o.createElement("span",{className:"material-symbols-outlined"},"bookmark")),o.createElement("div",{className:"flex flex-col md:flex-row"},o.createElement("div",{className:"min-w-[60mm] max-w-[60mm] min-h-[70mm] max-h-[70mm] rounded border shadow"},o.createElement("img",{src:h,alt:"Thumbnail",className:"object-contain h-full"})),o.createElement("div",{className:"px-4 w-[400px]"},o.createElement("div",{className:"py-4 px-4 font-bold leading-tight"},a),o.createElement("div",{className:"pb-2 px-2 italic leading-tight"},"Vol. ",s," No. ",i),o.createElement("div",{className:"pb-2 px-2 leading-tight min-h-[100px] text-sm"},"(",n,")"),o.createElement("div",{className:"px-2 leading-tight text-gray-700 italic text-left text-sm"},"Publisher: ",u),o.createElement("div",{className:"pb-2 px-2 leading-tight text-gray-700 italic text-left text-sm"},"Published Date: ",new Date(d).toLocaleDateString()))),o.createElement("div",{className:"py-2 px-2 text-sm italic leading-tight text-gray-600 text-right absolute right-0 bottom-0"},o.createElement("div",{className:"material-symbols-outlined aspect-square text-sm mr-1 font-bold"},"visibility"),o.createElement("div",{className:"inline pb-1 font-[500]"},x))))}export default function i(){const{authenticated:r,authData:i}=o.useContext(e),[c,m]=o.useState(new URLSearchParams(new URL(window.location.href).search).get("search")||""),u=o.useMemo((()=>new URLSearchParams(new URL(window.location.href).search)),[]),d=o.useCallback((e=>{m(e),u.set("search",e),window.history.pushState({},"",`?${u.toString()}`)}),[]),[h,x]=o.useState([]),p=o.useMemo((()=>h.reduce(((e,t)=>e.includes(t.year)?e:[...e,t.year].toSorted(((e,t)=>t-e))),[])),[h]),[f,b]=o.useState((new Date).getFullYear()),g=o.useMemo((()=>h.filter((e=>e.year===f&&(!c||e.title.includes(c))||e.volume?.toString().includes(c)||e.number?.toString().includes(c)||e.author.includes(c)||e.year.toString().includes(c)))),[h,f,c]),[w,v]=o.useState(1),E=o.useMemo((()=>Math.ceil(g.length/20)),[g]),y=o.useMemo((()=>0===g.length?void 0:g?.slice(20*(w-1),20*w)),[w,g,E]),N=o.useCallback((()=>v((e=>Math.min(E,Math.max(0===E?0:1,e+1))))),[E]),k=o.useCallback((()=>v((e=>Math.min(E,Math.max(0===E?0:1,e-1))))),[E]),C=async()=>{const e=new URL("/api/journal/public/all",window.location.origin);e.searchParams.set(i?.account,i?.id);try{const t=await fetch(e);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const{success:a,error:l}=await t.json();if(l)throw new Error(`HTTP error: ${l.message}`);a&&(a.sort(((e,t)=>new Date(e.created_at).getTime()>new Date(t.created_at).getTime()?-1:new Date(e.created_at).getTime()==new Date(t.created_at).getTime()?0:1)),x(a))}catch(e){console.log(e)}};o.useEffect((()=>{C().catch()}),[]);const[S,j]=o.useState(),[D,P]=o.useState(),[T,M]=o.useState(),R=o.useCallback(((e,t,a)=>{P(t),j(e),M(a)}),[]);return o.createElement(o.Fragment,null,o.createElement("div",{className:"flex py-4 px-8 mt-4"},o.createElement("div",{className:"flex-grow mt-3"},o.createElement("h1",{className:"text-2xl font-bold text-center"},"Journals"),o.createElement("div",{className:"flex flex-wrap p-4 gap-4"},!!f&&y?.map((e=>o.createElement(s,{key:e.id,id:e.id,title:e.title,volume:e.volume,number:e.number,author:e.author,thumbnail:e.thumbnail,year:e.year,favorite:e.favorite,url:e.url,publisher:e.publisher,publishedDate:e.published_date,totalViews:e.totalViews,onViewPdf:R,onRefresh:C})))||o.createElement("div",{className:"lg:col-span-2 xl:col-span-3 mx-auto"},o.createElement("div",{className:"h-[200px] mb-2"},o.createElement("div",{className:"border-2 border-gray-300 rounded-lg p-4"},o.createElement("div",{className:"text-gray-500"},"No journal found.")))))),o.createElement("div",{className:"min-w-[326px] max-w-[326px] h-[600px] flex flex-col"},o.createElement("div",{className:"min-h-[400px] flex-grow"},o.createElement("div",{className:"font-bold text-xl mb-4 w-full"},"Year"),p.map(((e,a)=>o.createElement("button",{key:a,type:"button",className:t("flex items-center px-4 py-2 text-left",f.toString()===e.toString()?"bg-gray-200 font-bold":"hover:bg-gray-300"),onClick:()=>b(Number.parseInt(e))},e)))),o.createElement("div",{className:"flex-shrink text-slate-700 font-[600] w-full mb-3"},o.createElement(n,{search:c,onSearch:d})),o.createElement("div",{className:"text-slate-700 font-[600] max-w-full overflow-x-auto overflow-y-hidden"},o.createElement("div",{className:"flex"},Array.from({length:E}).map(((e,a)=>o.createElement("button",{key:a,type:"button",className:t("flex items-center px-4 py-2 text-left",w===a+1?"bg-gray-200 font-bold":"hover:bg-gray-300"),onClick:()=>v(a+1)},a+1))))),o.createElement("div",{className:"flex-shrink text-slate-700 font-[600] mx-auto"},o.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:()=>v(0===E?0:1)},"<<"),o.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:k},"<"," Prev"),o.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:N},"Next ",">"),o.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:()=>v(E)},">>")))),o.createElement(a,{open:!!S,onClose:()=>{j(void 0),P(void 0),M(void 0)},content:r?o.createElement(l,{src:S}):o.createElement("div",{className:"w-full text-center min-h-[150px] pt-16"},"Please ",o.createElement("a",{href:"/login",className:"text-sky-700 underline"},"login")," to view journal."),header:D,showCancelButton:!1,showConfirmButton:!1,footer:T}))}