import{React as e,ReactPDF as t}from"/jsx/imports";export default function a({src:a}){const[o,r]=e.useState(0),[s,l]=e.useState(1),n=e.useCallback((({numPages:e})=>{r(e)}),[a]);return e.useEffect((()=>()=>{r(0),l(1)}),[a]),e.createElement("div",{className:"w-full max-h-fit overflow-hidden bg-gray-300/50 pb-4"},e.createElement("div",{className:"flex justify-center items-center gap-1"},e.createElement("button",{type:"button",onClick:()=>l(1),className:"p-1 aspect-square rounded-l hover:bg-sky-100"},e.createElement("span",{className:"material-symbols-outlined"},"keyboard_double_arrow_left")),e.createElement("button",{type:"button",onClick:()=>l((e=>Math.max(1,e-1))),className:"p-1 aspect-square rounded-l hover:bg-sky-100"},e.createElement("span",{className:"material-symbols-outlined"},"chevron_left")),e.createElement("div",{className:"font-[600]"},"Page ",s," of ",o),e.createElement("button",{type:"button",onClick:()=>l((e=>Math.min(o,e+1))),className:"p-1 aspect-square rounded-r hover:bg-sky-100"},e.createElement("span",{className:"material-symbols-outlined"},"chevron_right")),e.createElement("button",{type:"button",onClick:()=>l(o),className:"p-1 aspect-square rounded-l hover:bg-sky-100"},e.createElement("span",{className:"material-symbols-outlined"},"keyboard_double_arrow_right"))),e.createElement(t.Document,{file:a,onLoadSuccess:n,onLoadError:e=>console.log("ERROR:",e)},e.createElement(t.Page,{className:"max-w-fit mx-auto overflow-x-auto overflow-y-hidden border drop-shadow-lg",renderTextLayer:!1,renderAnnotationLayer:!1,canvasBackground:"#fff",pageNumber:s})))}