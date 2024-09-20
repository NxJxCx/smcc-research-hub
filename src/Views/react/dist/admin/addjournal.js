import e from"/jsx/global/clsx";import{Courses as t,DepartmentCourses as a,Departments as l}from"/jsx/global/enums";import{Input as r,Select as n,TextArea as o}from"/jsx/global/input";import s from"/jsx/global/modal";import i from"/jsx/global/pdfviewer";import{React as m,Sweetalert2 as c}from"/jsx/imports";export default function d({open:d,defaultOpen:u,className:p="",onClose:b=()=>{},onSuccess:x=()=>{}}){const[f,g]=m.useState(void 0===d?u||!1:d),[h,w]=m.useState(""),[v,E]=m.useState(""),[y,C]=m.useState((new Date).getFullYear().toString()),[N,S]=m.useState(l.CCIS),[k,F]=m.useState(t.BSIT),[j,D]=m.useState(""),[B,M]=m.useState(""),[P,q]=m.useState(""),[O,J]=m.useState(),[T,z]=m.useState(),[L,R]=m.useState(!1),[U,A]=m.useState(0),[Y,_]=m.useState(null),I=m.useMemo((()=>Array.from({length:(new Date).getFullYear()-2e3},((e,t)=>(new Date).getFullYear()-t)).map((e=>({label:e.toString(),value:e.toString()})))),[]),X=m.useMemo((()=>Object.keys(a).map((e=>({label:e,value:e}))))),$=m.useMemo((()=>a[N].map((e=>({label:e,value:e}))))),H=m.useMemo((()=>0!==U),[U]);m.useEffect((()=>{void 0!==d&&(g(d),d||b&&b())}),[d]);const V=m.useCallback((()=>{void 0===d&&g(!1),b&&b()}),[d,b]),G=m.useCallback((()=>{O&&R(!0)}),[O]);m.useEffect((()=>{if(O){const e=new Blob([O],{type:O.type}),t=URL.createObjectURL(e);return z(t),()=>{URL.revokeObjectURL(t),z(null)}}}),[O]);const K=m.useCallback((e=>{if(e.preventDefault(),!O)return void c.fire({icon:"warning",text:"Please upload Journal Document in PDF format.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"});const t=new FormData;t.append("document","journal"),t.append("title",h),t.append("author",v),t.append("year",y),t.append("department",N),t.append("course",k),t.append("abstract",j),t.append("publisher",B),t.append("published_date",P),t.append("pdf",new Blob([O],{type:"application/pdf"}),O.name),console.log(Object.fromEntries(t));const a=new XMLHttpRequest;_(a),a.open("POST","/api/upload/pdf",!0),a.upload.onprogress=e=>{if(e.lengthComputable){const t=e.loaded/e.total*100;A(t)}},a.onload=()=>{if(201===a.status){const e=JSON.parse(a.responseText);e.error?(c.fire({icon:"error",title:"Failed to upload PDF file",text:e.error,toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),A(0)):(c.fire({icon:"success",title:"Success",text:"Journal Document uploaded successfully.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),J(null),w(""),E(""),C((new Date).getFullYear().toString()),x&&x(),A(0),V())}else c.fire({icon:"error",title:"Failed to upload PDF file",text:JSON.parse(a.responseText)?.error,toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),A(0)},a.onerror=e=>{c.fire({icon:"error",title:"Failed to upload PDF file",text:JSON.parse(a.responseText)?.error,toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),A(0)},a.send(t)}),[O,h,v,y,x]),Q=()=>{Y&&(Y.abort(),A(0),_(null),c.fire({icon:"info",title:"Upload Cancelled",text:"The file upload has been cancelled.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}))};return m.createElement(m.Fragment,null,m.createElement("div",{className:e("max-w-[500px] min-w-[400px] bg-[#252e38] pt-4 px-4 rounded-lg border border-[#45515F] z-20",f?"block":"hidden",p)},m.createElement("form",{onSubmit:K},m.createElement("div",{className:"flex flex-wrap justify-center items-center gap-3"},m.createElement(r,{className:"max-w-[180px] text-black",label:"Journal Title",name:"title",value:h,onChange:e=>w(e.target.value),disabled:H,required:!0}),m.createElement(r,{className:"max-w-[180px] text-black",label:"Author/s",name:"author",value:v,onChange:e=>E(e.target.value),disabled:H,required:!0}),m.createElement(n,{className:"max-w-[180px] text-black",items:I,label:"Year",name:"year",value:y,onChange:e=>C(e.target.value),disabled:H,required:!0}),m.createElement(n,{className:"max-w-[180px] text-black",items:[{label:"-- Select Department --",value:""},...X],label:"Department",name:"department",value:N,onChange:e=>{S(e.target.value),F("")},disabled:H,required:!0}),m.createElement(n,{className:"max-w-[370px] text-black",items:[{label:"-- Select Course --",value:""},...$],label:"Course",name:"course",value:k,onChange:e=>F(e.target.value),disabled:H,required:!0}),m.createElement(o,{className:"max-w-[370px] text-black",label:"Abstract",rows:3,name:"abstract",value:j,onChange:e=>D(e.target.value),disabled:H,required:!0}),m.createElement(r,{className:"max-w-[180px] text-black",label:"Publisher",name:"publisher",value:B,onChange:e=>M(e.target.value),disabled:H,required:!0}),m.createElement(r,{type:"date",className:"max-w-[180px] text-black",label:"Published Date",name:"published_date",value:P,onChange:e=>q(e.target.value),disabled:H,required:!0})),m.createElement("div",{className:"flex items-center justify-center w-full px-4 mt-4"},m.createElement("label",{htmlFor:"dropzone-file",className:e("flex flex-col items-center justify-center w-full h-32 border border-gray-500 border-dashed rounded-lg cursor-pointer",O?"hidden":"")},m.createElement("div",{className:"flex flex-col items-center justify-center"},m.createElement("svg",{className:"w-8 h-8 mb-4 text-gray-500","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 16"},m.createElement("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"})),m.createElement("p",{className:"mb-2 text-sm text-white"},m.createElement("span",{className:"font-semibold"},"Click to upload")," or drag and drop"),m.createElement("p",{className:"text-xs text-gray-500"},"PDF (MAX 10MB)")),m.createElement("input",{id:"dropzone-file",type:"file",name:"pdf",className:"hidden",accept:".pdf",value:"",onChange:e=>{const t=e.target.files?.[0];t&&t.size>31457280?(c.fire({icon:"warning",text:"File size exceeds the maximum limit of 30MB.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),e.target.value=""):J(t)}})),!!O&&m.createElement("div",{className:"border border-gray-500 border-dashed p-4 rounded-lg w-full h-32 flex items-center justify-center"},m.createElement("div",{className:"flex justify-between border border-white p-3 rounded gap-x-3 items-center"},m.createElement("span",{className:"text-white material-symbols-outlined"},"upload_file"),m.createElement("button",{type:"button",onClick:G},m.createElement("span",{className:"text-md text-white"},O.name)),m.createElement("div",null,m.createElement("span",{className:"text-md text-gray-500"},(O.size/1024/1024).toFixed(2)," MB")),m.createElement("div",null,m.createElement("button",{type:"button",onClick:()=>J(null),disabled:H,className:"disabled:text-gray-500 disabled:hover:text-gray-500  disabled:cursor-not-allowed hover:text-red-600 text-red-400",title:"Remove"},m.createElement("span",{className:"material-symbols-outlined"},"cancel")))))),U>0&&m.createElement("div",{className:"w-full px-4 mt-4"},m.createElement("div",{className:"w-full bg-gray-200 rounded-full h-2.5"},m.createElement("div",{className:"bg-blue-600 h-2.5 rounded-full",style:{width:`${U}%`}})),m.createElement("p",{className:"text-white text-center mt-2"},U.toFixed(2),"%"),m.createElement("button",{type:"button",onClick:Q,className:"bg-red-500 rounded-2xl px-4 py-1 text-white shadow-lg mt-2"},"Cancel Upload")),m.createElement("div",{className:"w-full py-2 flex justify-between items-center mt-2 px-4"},m.createElement("button",{type:"submit",disabled:H,className:"bg-sky-500 rounded-2xl px-4 py-1 text-white shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400"},H?"Submitting...":"Submit"),m.createElement("button",{type:"reset",onClick:()=>{H?(Q(),V()):V()},className:"bg-[#333D49] rounded-2xl px-4 py-1 text-white"},"Cancel")))),m.createElement(s,{open:L,content:m.createElement(i,{src:T}),onClose:()=>R(!1),showCancelButton:!1,showConfirmButton:!1,header:`Journal File Preview (${O?.name})`}))}