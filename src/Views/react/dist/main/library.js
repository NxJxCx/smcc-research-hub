export default import(pathname("/jsx/imports")).then((async({React:e,getAsyncImport:t})=>{const{default:{MainContext:a}}=await t("/jsx/context"),{default:l}=await t("/jsx/global/modal"),{default:c}=await t("/jsx/global/pdfviewer");return function(){const{authenticated:t,authData:s}=e.useContext(a),[r,o]=e.useState([]),[n,m]=e.useState(1),p=e.useMemo((()=>Math.ceil(r.length/20)),[r]),i=e.useMemo((()=>0===r.length?void 0:r?.slice(20*(n-1),Math.min(20*n))),[n,r,p]),u=e.useCallback((()=>m((e=>Math.min(p,Math.max(0===p?0:1,e+1))))),[p]),x=e.useCallback((()=>m((e=>Math.min(p,Math.max(0===p?0:1,e-1))))),[p]),h=async()=>{const e=new URL(pathname("/api/favorites/all"),window.location.origin);e.searchParams.set(s?.account,s?.id);try{const t=await fetch(e);if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);const{success:a,error:l}=await t.json();if(l)throw new Error(`HTTP error: ${l.message}`);a&&o(a)}catch(e){console.log(e)}};e.useEffect((()=>{h().catch()}),[]);const[d,y]=e.useState(),[E,N]=e.useState(),[b,w]=e.useState(),f=e.useCallback(((e,t,a,l)=>{const c=new URL(pathname(`/read${t}&id=${e}`),window.location.origin).toString();N(a),y(c),w(l),setTimeout((()=>h().catch()),1e3)}),[h]);return e.createElement(e.Fragment,null,e.createElement("div",{className:"py-4 px-8 mt-4"},e.createElement("div",{className:"mt-3"},e.createElement("h1",{className:"text-2xl font-bold text-center mb-3"},"Library"),e.createElement("div",{className:"flex max-w-full overflow-auto"},e.createElement("table",{className:"w-full text-sm text-left rtl:text-right text-gray-500 table-auto"},e.createElement("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50"},e.createElement("tr",null,e.createElement("th",{scope:"col",className:"px-6 py-3"},"Type"),e.createElement("th",{scope:"col",className:"px-6 py-3"},"Title"),e.createElement("th",{scope:"col",className:"px-6 py-3"},"Authors"),e.createElement("th",{scope:"col",className:"px-6 py-3"},"Year"),e.createElement("th",{scope:"col",className:"px-6 py-3"},"Publisher"),e.createElement("th",{scope:"col",className:"px-6 py-3"},"Published Date"),e.createElement("th",{scope:"col",className:"px-6 py-3"},"Volume"),e.createElement("th",{scope:"col",className:"px-6 py-3"},"No."),e.createElement("th",{scope:"col",className:"px-6 py-3"},"Department"),e.createElement("th",{scope:"col",className:"px-6 py-3"},"Course"),e.createElement("th",{scope:"col",className:"px-6 py-3"},"Read"))),e.createElement("tbody",{className:"bg-white border-b"},i?.map((t=>e.createElement("tr",{key:t.id+"_"+t.type,className:"bg-white border-b cursor-pointer hover:bg-sky-100",onClick:()=>f(t.id,t.url,t.title,t.author+" ("+t.year+")")},e.createElement("th",{scope:"row",className:"px-6 py-4"},t.type),e.createElement("td",{className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap"},t.title),e.createElement("td",{className:"px-6 py-4"},t.authors),e.createElement("td",{className:"px-6 py-4"},t.year),e.createElement("td",{className:"px-6 py-4"},t.publisher),e.createElement("td",{className:"px-6 py-4"},t.published_date),e.createElement("td",{className:"px-6 py-4"},t.volume),e.createElement("td",{className:"px-6 py-4"},t.number),e.createElement("td",{className:"px-6 py-4"},t.department),e.createElement("td",{className:"px-6 py-4"},t.course),e.createElement("td",{className:"px-6 py-4 text-center"},t.read," times"))))||e.createElement("tr",null,e.createElement("td",{colSpan:8},e.createElement("div",{className:"h-[200px] mb-2 mx-auto text-center"},e.createElement("div",{className:"rounded-lg p-4"},e.createElement("div",{className:"text-gray-500"},"No favorites."))))))))),e.createElement("div",{className:"flex flex-col"},e.createElement("div",{className:"flex-shrink text-slate-700 font-[600] mx-auto"},e.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:()=>m(0===p?0:1)},"<<"),e.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:x},"<"," Prev"),e.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:u},"Next ",">"),e.createElement("button",{type:"button",className:"p-1 hover:text-yellow-700",onClick:()=>m(p)},">>")))),e.createElement(l,{open:!!d,onClose:()=>{y(void 0),N(void 0),w(void 0)},content:t?e.createElement(c,{src:d}):e.createElement("div",{className:"w-full text-center min-h-[150px] pt-16"},"Please ",e.createElement("a",{href:pathname("/login"),className:"text-sky-700 underline"},"login")," to view."),header:E,showCancelButton:!1,showConfirmButton:!1,footer:b}))}}));