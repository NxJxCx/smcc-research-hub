import(pathname("/jsx/imports")).then((({React:e,ReactDOM:t,ReactPlayerYoutube:n})=>{function r({url:t}){return e.createElement(n,{url:t,width:"100%",height:"100%",controls:!0})}t.createRoot(document.getElementById("home-announcement-container")).render(e.createElement((function(){const[t,n]=e.useState(!0),[a,l]=e.useState([]),[o,c]=e.useState(!1);e.useEffect((()=>{(async function(){const e=new URL(pathname("/api/home/announcements"),window.location.origin),t=await fetch(e),{success:n,error:r}=await t.json();if(r)throw new Error(r);return n||[]})().then((e=>{l(e),n(!1)})).catch(console.log)}),[]),e.useEffect((()=>{setTimeout((()=>c(!o)),1e3)}),[o]);const m=e.useCallback((e=>Date.now()>new Date(e).getTime()),[o]);return t?e.createElement("div",{className:"w-16 h-16 border-4 border-t-4 border-gray-300 border-t-blue-500 border-solid rounded-full animate-spin"}):e.createElement(e.Fragment,null,a.map(((t,n)=>e.createElement(e.Fragment,{key:"announcement_"+n+t?.id},"video"===t.type&&!m(t.expires)&&e.createElement("div",{className:"w-[500px] md:w-[700px] lg:w-[1000px] min-w-[500px] bg-gray-100 border-l-2 border-blue-500 rounded"},e.createElement("div",{className:"text-xl py-3 px-4 border-b  text-blue-500 font-semibold"},e.createElement("h2",null,t.title)),e.createElement("div",{className:"w-full h-full px-[10%] py-[5%] aspect-video"},e.createElement(r,{url:t.url||""}))),"text"===t.type&&!m(t.expires)&&e.createElement("div",{className:"w-[500px] md:w-[700px] lg:w-[1000px] min-w-[500px] bg-gray-100 border-l-2 border-blue-500 rounded"},e.createElement("div",{className:"text-xl py-3 px-4  border-b text-blue-500 font-semibold"},e.createElement("h2",null,t.title)),e.createElement("div",{className:"text-center p-3 text-slate-900 my-3"},t.message?.split("\n").map((t=>e.createElement(e.Fragment,null,t,e.createElement("br",null))||""))))))))}),null))}));