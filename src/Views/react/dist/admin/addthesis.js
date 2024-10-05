export default import(pathname("/jsx/imports")).then((async({React:e,Sweetalert2:t,clsx:a,getAsyncImport:l})=>{const{Courses:r,Departments:n,DepartmentCourses:s}=await import(pathname("/jsx/types")),{default:{Input:o,Select:i,TextArea:c}}=await l("/jsx/global/input"),{default:m}=await l("/jsx/global/modal"),{default:d}=await l("/jsx/global/pdfviewer");return function({open:l,defaultOpen:u,className:p="",onClose:b=()=>{},onSuccess:x=()=>{}}){const[f,h]=e.useState(void 0===l?u||!1:l),[w,g]=e.useState(""),[v,y]=e.useState(""),[E,C]=e.useState((new Date).getFullYear().toString()),[N,S]=e.useState(n.CCIS),[k,F]=e.useState(r.BSIT),[D,B]=e.useState(""),[j,T]=e.useState(),[M,O]=e.useState(),[P,q]=e.useState(!1),[A,R]=e.useState(0),[z,I]=e.useState(null),L=e.useMemo((()=>Array.from({length:(new Date).getFullYear()-2e3},((e,t)=>(new Date).getFullYear()-t)).map((e=>({label:e.toString(),value:e.toString()})))),[]),U=e.useMemo((()=>Object.keys(s).map((e=>({label:e,value:e}))))),Y=e.useMemo((()=>s[N].map((e=>({label:e,value:e}))))),J=e.useMemo((()=>0!==A),[A]);e.useEffect((()=>{void 0!==l&&(h(l),l||b&&b())}),[l]);const X=e.useCallback((()=>{void 0===l&&h(!1),b&&b()}),[l,b]),$=e.useCallback((()=>{j&&q(!0)}),[j]);e.useEffect((()=>{if(j){const e=new Blob([j],{type:j.type}),t=URL.createObjectURL(e);return O(t),()=>{URL.revokeObjectURL(t),O(null)}}}),[j]);const H=e.useCallback((e=>{if(e.preventDefault(),!j)return void t.fire({icon:"warning",text:"Please upload Thesis Document in PDF format.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"});const a=new FormData;a.append("document","thesis"),a.append("title",w),a.append("author",v),a.append("year",E),a.append("department",N),a.append("course",k),a.append("abstract",D),a.append("pdf",new Blob([j],{type:"application/pdf"}),j.name);const l=new XMLHttpRequest;I(l),l.open("POST",pathname("/api/upload/pdf"),!0),l.upload.onprogress=e=>{if(e.lengthComputable){const t=e.loaded/e.total*100;R(t)}},l.onload=()=>{if(201===l.status){const e=JSON.parse(l.responseText);e.error?(t.fire({icon:"error",title:"Failed to upload PDF file",text:e.error,toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),R(0)):(t.fire({icon:"success",title:"Success",text:"Thesis Document uploaded successfully.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),T(null),g(""),y(""),C((new Date).getFullYear().toString()),S(n.CCIS),F(r.BSIT),B(""),x&&x(),R(0),X())}else t.fire({icon:"error",title:"Failed to upload PDF file",text:JSON.parse(l.responseText)?.error,toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),R(0)},l.onerror=e=>{t.fire({icon:"error",title:"Failed to upload PDF file",text:JSON.parse(l.responseText)?.error,toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),R(0)},l.send(a)}),[j,w,v,E,k,N,D,x]),V=()=>{z&&(z.abort(),R(0),I(null),t.fire({icon:"info",title:"Upload Cancelled",text:"The file upload has been cancelled.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}))};return e.createElement(e.Fragment,null,e.createElement("div",{className:a("max-w-[500px] min-w-[400px] bg-[#252e38] pt-4 px-4 rounded-lg border border-[#45515F] z-20",f?"block":"hidden",p)},e.createElement("form",{onSubmit:H},e.createElement("div",{className:"flex flex-wrap justify-center items-center gap-3"},e.createElement(o,{className:"max-w-[180px] text-black",label:"Thesis Title",name:"title",value:w,onChange:e=>g(e.target.value),disabled:J,required:!0}),e.createElement(o,{className:"max-w-[180px] text-black",label:"Author/s",name:"author",value:v,onChange:e=>y(e.target.value),disabled:J,required:!0}),e.createElement(i,{className:"max-w-[180px] text-black",items:L,label:"Year",name:"year",value:E,onChange:e=>C(e.target.value),disabled:J,required:!0}),e.createElement(i,{className:"max-w-[180px] text-black",items:[{label:"-- Select Department --",value:""},...U],label:"Department",name:"department",value:N,onChange:e=>{S(e.target.value),F("")},disabled:J,required:!0}),e.createElement(i,{className:"max-w-[370px] text-black",items:[{label:"-- Select Course --",value:""},...Y],label:"Course",name:"course",value:k,onChange:e=>F(e.target.value),disabled:J,required:!0}),e.createElement(c,{className:"max-w-[370px] text-black",label:"Abstract",rows:3,name:"abstract",value:D,onChange:e=>B(e.target.value),disabled:J,required:!0})),e.createElement("div",{className:"flex items-center justify-center w-full px-4 mt-4"},e.createElement("label",{htmlFor:"dropzone-file",className:a("flex flex-col items-center justify-center w-full h-32 border border-gray-500 border-dashed rounded-lg cursor-pointer",j?"hidden":"")},e.createElement("div",{className:"flex flex-col items-center justify-center"},e.createElement("svg",{className:"w-8 h-8 mb-4 text-gray-500","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 16"},e.createElement("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"})),e.createElement("p",{className:"mb-2 text-sm text-white"},e.createElement("span",{className:"font-semibold"},"Click to upload")," or drag and drop"),e.createElement("p",{className:"text-xs text-gray-500"},"PDF (MAX 10MB)")),e.createElement("input",{id:"dropzone-file",type:"file",name:"pdf",className:"hidden",accept:".pdf",value:"",onChange:e=>{const a=e.target.files?.[0];a&&a.size>31457280?(t.fire({icon:"warning",text:"File size exceeds the maximum limit of 30MB.",toast:!0,timer:2e3,showConfirmButton:!1,position:"center"}),e.target.value=""):T(a)}})),!!j&&e.createElement("div",{className:"border border-gray-500 border-dashed p-4 rounded-lg w-full h-32 flex items-center justify-center"},e.createElement("div",{className:"flex justify-between border border-white p-3 rounded gap-x-3 items-center"},e.createElement("span",{className:"text-white material-symbols-outlined"},"upload_file"),e.createElement("button",{type:"button",onClick:$},e.createElement("span",{className:"text-md text-white"},j.name)),e.createElement("div",null,e.createElement("span",{className:"text-md text-gray-500"},(j.size/1024/1024).toFixed(2)," MB")),e.createElement("div",null,e.createElement("button",{type:"button",onClick:()=>T(null),disabled:J,className:"disabled:text-gray-500 disabled:hover:text-gray-500  disabled:cursor-not-allowed hover:text-red-600 text-red-400",title:"Remove"},e.createElement("span",{className:"material-symbols-outlined"},"cancel")))))),A>0&&e.createElement("div",{className:"w-full px-4 mt-4"},e.createElement("div",{className:"w-full bg-gray-200 rounded-full h-2.5"},e.createElement("div",{className:"bg-blue-600 h-2.5 rounded-full",style:{width:`${A}%`}})),e.createElement("p",{className:"text-white text-center mt-2"},A.toFixed(2),"%"),e.createElement("button",{type:"button",onClick:V,className:"bg-red-500 rounded-2xl px-4 py-1 text-white shadow-lg mt-2"},"Cancel Upload")),e.createElement("div",{className:"w-full py-2 flex justify-between items-center mt-2 px-4"},e.createElement("button",{type:"submit",disabled:J,className:"bg-sky-500 rounded-2xl px-4 py-1 text-white shadow-lg disabled:cursor-not-allowed disabled:bg-gray-400"},J?"Submitting...":"Submit"),e.createElement("button",{type:"reset",onClick:()=>{J?(V(),X()):X()},className:"bg-[#333D49] rounded-2xl px-4 py-1 text-white"},"Cancel")))),e.createElement(m,{open:P,content:e.createElement(d,{src:M}),onClose:()=>q(!1),showCancelButton:!1,showConfirmButton:!1,header:`Thesis File Preview (${j?.name})`}))}}));