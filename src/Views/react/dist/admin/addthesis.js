import e from"/jsx/global/clsx";import{Departments as t}from"/jsx/global/enums";import{Input as a,Select as l}from"/jsx/global/input";import r from"/jsx/global/modal";import n from"/jsx/global/pdfviewer";import{React as o,Sweetalert2 as s}from"/jsx/imports";export default function i({open:i,defaultOpen:m,className:c="",onClose:d=()=>{},onSuccess:u=()=>{}}){const[p,f]=o.useState(void 0===i?m||!1:i),[x,b]=o.useState(""),[h,g]=o.useState(""),[w,E]=o.useState((new Date).getFullYear().toString()),[v,y]=o.useState(""),[N,C]=o.useState(),[S,k]=o.useState(),[F,j]=o.useState(!1),[B,D]=o.useState(0),[M,T]=o.useState(null),O=o.useMemo((()=>Array.from({length:(new Date).getFullYear()-2e3},((e,t)=>(new Date).getFullYear()-t)).map((e=>({label:e.toString(),value:e.toString()})))),[]),P=o.useMemo((()=>Object.keys(t).map((e=>({label:t[e],value:t[e]}))))),z=o.useMemo((()=>B>0&&B<100),[B]);o.useEffect((()=>{void 0!==i&&(f(i),i||d&&d())}),[i]);const L=o.useCallback((()=>{void 0===i&&f(!1),d&&d()}),[i,d]),R=o.useCallback((()=>{N&&j(!0)}),[N]);o.useEffect((()=>{if(N){const e=new Blob([N],{type:N.type}),t=URL.createObjectURL(e);return k(t),()=>{URL.revokeObjectURL(t),k(null)}}}),[N]);const U=o.useCallback((e=>{if(e.preventDefault(),!N)return void s.fire({icon:"warning",text:"Please upload Thesis Document in PDF format.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"});const t=new FormData;t.append("document","thesis"),t.append("title",x),t.append("author",h),t.append("year",w),t.append("department",v),t.append("pdf",new Blob([N],{type:"application/pdf"}),N.name);const a=new XMLHttpRequest;T(a),a.open("POST","/api/upload/pdf",!0),a.upload.onprogress=e=>{if(e.lengthComputable){const t=e.loaded/e.total*100;D(t)}},a.onload=()=>{if(201===a.status){const e=JSON.parse(a.responseText);e.error?s.fire({icon:"error",title:"Failed to upload PDF file",text:e.error,toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}):(s.fire({icon:"success",title:"Success",text:"Thesis Document uploaded successfully.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),C(null),b(""),g(""),E((new Date).getFullYear().toString()),D(0),u&&u())}else s.fire({icon:"error",title:"Failed to upload PDF file",text:JSON.parse(a.responseText)?.error,toast:!0,timer:2e3,showConfirmButton:!1,position:"center"})},a.onerror=e=>{s.fire({icon:"error",title:"Failed to upload PDF file",text:JSON.parse(a.responseText)?.error,toast:!0,timer:2e3,showConfirmButton:!1,position:"center"})},a.send(t)}),[N,x,h,w,u]),q=()=>{M&&(M.abort(),D(0),T(null),s.fire({icon:"info",title:"Upload Cancelled",text:"The file upload has been cancelled.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}))};return o.createElement(o.Fragment,null,o.createElement("div",{className:e("max-w-[500px] min-w-[400px] bg-[#252e38] pt-4 px-4 rounded-lg border border-[#45515F] z-20",p?"block":"hidden",c)},o.createElement("form",{onSubmit:U},o.createElement("div",{className:"flex flex-wrap justify-center items-center gap-3"},o.createElement(a,{className:"max-w-[180px] text-black",label:"Thesis Title",name:"title",value:x,onChange:e=>b(e.target.value),disabled:z,required:!0}),o.createElement(a,{className:"max-w-[180px] text-black",label:"Author/s",name:"author",value:h,onChange:e=>g(e.target.value),disabled:z,required:!0}),o.createElement(l,{className:"max-w-[180px] text-black",items:O,label:"Year",name:"year",value:w,onChange:e=>E(e.target.value),disabled:z,required:!0}),o.createElement(l,{className:"max-w-[180px] text-black",items:P,label:"Department",name:"department",value:v,onChange:e=>y(e.target.value),disabled:z,required:!0})),o.createElement("div",{className:"flex items-center justify-center w-full px-4 mt-4"},o.createElement("label",{htmlFor:"dropzone-file",className:e("flex flex-col items-center justify-center w-full h-32 border border-gray-500 border-dashed rounded-lg cursor-pointer",N?"hidden":"")},o.createElement("div",{className:"flex flex-col items-center justify-center"},o.createElement("svg",{className:"w-8 h-8 mb-4 text-gray-500","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 16"},o.createElement("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"})),o.createElement("p",{className:"mb-2 text-sm text-white"},o.createElement("span",{className:"font-semibold"},"Click to upload")," or drag and drop"),o.createElement("p",{className:"text-xs text-gray-500"},"PDF (MAX 10MB)")),o.createElement("input",{id:"dropzone-file",type:"file",name:"pdf",className:"hidden",accept:".pdf",value:"",onChange:e=>{const t=e.target.files?.[0];t&&t.size>31457280?(s.fire({icon:"warning",text:"File size exceeds the maximum limit of 10MB.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),e.target.value=""):C(t)}})),!!N&&o.createElement("div",{className:"border border-gray-500 border-dashed p-4 rounded-lg w-full h-32 flex items-center justify-center"},o.createElement("div",{className:"flex justify-between border border-white p-3 rounded gap-x-3 items-center"},o.createElement("span",{className:"text-white material-symbols-outlined"},"upload_file"),o.createElement("button",{type:"button",onClick:R},o.createElement("span",{className:"text-md text-white"},N.name)),o.createElement("div",null,o.createElement("span",{className:"text-md text-gray-500"},(N.size/1024/1024).toFixed(2)," MB")),o.createElement("div",null,o.createElement("button",{type:"button",onClick:()=>C(null),disabled:z,className:"disabled:text-gray-500 disabled:hover:text-gray-500  disabled:cursor-not-allowed hover:text-red-600 text-red-400",title:"Remove"},o.createElement("span",{className:"material-symbols-outlined"},"cancel")))))),B>0&&o.createElement("div",{className:"w-full px-4 mt-4"},o.createElement("div",{className:"w-full bg-gray-200 rounded-full h-2.5"},o.createElement("div",{className:"bg-blue-600 h-2.5 rounded-full",style:{width:`${B}%`}})),o.createElement("p",{className:"text-white text-center mt-2"},B.toFixed(2),"%"),o.createElement("button",{type:"button",onClick:q,className:"bg-red-500 rounded-2xl px-4 py-1 text-white shadow-lg mt-2"},"Cancel Upload")),o.createElement("div",{className:"w-full py-2 flex justify-between items-center mt-2 px-4"},o.createElement("button",{type:"submit",disabled:z,className:"bg-sky-500 rounded-2xl px-4 py-1 text-white shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400"},z?"Submitting...":"Submit"),o.createElement("button",{type:"reset",onClick:()=>{z?(q(),L()):L()},className:"bg-[#333D49] rounded-2xl px-4 py-1 text-white"},"Cancel")))),o.createElement(r,{open:F,content:o.createElement(n,{src:S}),onClose:()=>j(!1),showCancelButton:!1,showConfirmButton:!1,header:`Thesis File Preview (${N?.name})`}))}