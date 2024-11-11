export default import(pathname("/jsx/imports")).then((({React:e,Sweetalert2:t,ReactPlayerYoutube:n})=>{async function o(){const e=new URL(pathname("/api/home/announcements"),window.location.origin),t=await fetch(e),{success:n,error:o}=await t.json();if(o)throw new Error(o);return n}function i(e=24){const t="0123456789ABCDEF";let n="";for(let o=0;o<e;++o)n+=t.charAt(Math.floor(16*Math.random()));return n}function a({url:t}){return e.createElement(n,{url:t,width:"100%",height:"100%",controls:!0})}return function(){const[n,r]=e.useState([]),[c,l]=e.useState(!1);e.useEffect((()=>{setTimeout((()=>l(!c)),1e3)}),[c]);const s=e.useCallback((e=>Date.now()>new Date(e).getTime()),[c]);e.useEffect((()=>{o().then(r).catch(console.log)}),[]);const u=e.useCallback((()=>{t.fire({title:"Add New Annoucement",text:"What type of announcement?",input:"select",inputOptions:{text:"Text",video:"Video"},confirmButtonText:"Confirm",confirmButtonColor:"#3085d6",showCancelButton:!0,cancelButtonColor:"#d33",showLoaderOnConfirm:!0}).then((({isConfirmed:e,value:n})=>{if(e){const e=n;"text"===e?t.fire({title:"Enter Title of Announcement",input:"text",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Next",cancelButtonText:"Cancel"}).then((e=>{if(e.isConfirmed&&e.value){const n=e.value;t.fire({title:n,text:"Enter the content of the announcement",input:"textarea",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Next",cancelButtonText:"Cancel"}).then((e=>{if(e.isConfirmed&&e.value){const a=e.value;t.fire({title:"Set Expiration Date",input:"date",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Post Announcement",cancelButtonText:"Cancel"}).then((e=>{if(e.isConfirmed&&e.value){const c=new Date(e.value).toISOString(),l=new URL(pathname("/api/home/announcement/add"),window.location.origin),s=JSON.stringify({id:i(),type:"text",title:n,message:a,expires:c});fetch(l,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:s}).then((e=>e.json())).then((({success:e,error:n})=>{if(n)throw new Error(n);t.fire({icon:"success",title:"New Announcement Posted",text:e,toast:!0,showConfirmButton:!1,position:"center",timer:2e3}),o().then(r).catch(console.log)})).catch((e=>{t.fire({icon:"error",title:"Failed to add new announcement",text:e,toast:!0,showConfirmButton:!1,position:"center",timer:2e3})}))}}))}}))}})):"video"===e&&t.fire({title:"Enter Title of Announcement",input:"text",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Next",cancelButtonText:"Cancel"}).then((e=>{if(e.isConfirmed&&e.value){const n=e.value;t.fire({title:n,text:"Enter the video link announcement",input:"text",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Next",cancelButtonText:"Cancel"}).then((e=>{if(e.isConfirmed&&e.value){const a=e.value;t.fire({title:"Set Expiration Date",input:"date",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Post Announcement",cancelButtonText:"Cancel"}).then((e=>{if(e.isConfirmed&&e.value){const c=new Date(e.value).toISOString(),l=new URL(pathname("/api/home/announcement/add"),window.location.origin),s=JSON.stringify({id:i(),type:"video",title:n,url:a,expires:c});fetch(l,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:s}).then((e=>e.json())).then((({success:e,error:n})=>{if(n)throw new Error(n);t.fire({icon:"success",title:"New Announcement Posted",text:e,toast:!0,showConfirmButton:!1,position:"center",timer:2e3}),o().then(r).catch(console.log)})).catch((e=>{t.fire({icon:"error",title:"Failed to add new announcement",text:e,toast:!0,showConfirmButton:!1,position:"center",timer:2e3})}))}}))}}))}}))}}))}),[]),m=e.useCallback((e=>{"text"===e.type?t.fire({title:"Enter Title of Announcement",input:"text",inputValue:e.title,showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Next",cancelButtonText:"Cancel"}).then((n=>{if(n.isConfirmed&&n.value){const i=n.value;t.fire({title:i,text:"Enter the content of the announcement",input:"textarea",inputValue:e.message,showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Next",cancelButtonText:"Cancel"}).then((n=>{if(n.isConfirmed&&n.value){const a=n.value;t.fire({title:"Set Expiration Date",input:"date",inputValue:new Date(e.expires).getFullYear()+"-"+(new Date(e.expires).getMonth()+1)+"-"+new Date(e.expires).getDate(),showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Post Announcement",cancelButtonText:"Cancel"}).then((n=>{if(n.isConfirmed&&n.value){const c=new Date(n.value).toISOString(),l=new URL(pathname("/api/home/announcement/edit"),window.location.origin),s=JSON.stringify({id:e.id,type:"text",title:i,message:a,expires:c});fetch(l,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:s}).then((e=>e.json())).then((({success:e,error:n})=>{if(n)throw new Error(n);t.fire({icon:"success",title:"Announcement Edited",text:e,toast:!0,showConfirmButton:!1,position:"center",timer:2e3}),o().then(r).catch(console.log)})).catch((e=>{t.fire({icon:"error",title:"Failed to edit announcement",text:e,toast:!0,showConfirmButton:!1,position:"center",timer:2e3})}))}}))}}))}})):"video"===e.type&&t.fire({title:"Enter Title of Announcement",input:"text",inputValue:e.title,showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Next",cancelButtonText:"Cancel"}).then((n=>{if(n.isConfirmed&&n.value){const i=n.value;t.fire({title:i,text:"Enter the video link announcement",input:"text",inputValue:e.url,showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Next",cancelButtonText:"Cancel"}).then((n=>{if(n.isConfirmed&&n.value){const a=n.value;t.fire({title:"Set Expiration Date",input:"date",inputValue:new Date(e.expires).getFullYear()+"-"+(new Date(e.expires).getMonth()+1)+"-"+new Date(e.expires).getDate(),showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Post Announcement",cancelButtonText:"Cancel"}).then((n=>{if(n.isConfirmed&&n.value){const c=new Date(n.value).toISOString(),l=new URL(pathname("/api/home/announcement/add"),window.location.origin),s=JSON.stringify({id:e.id,type:"video",title:i,url:a,expires:c});fetch(l,{method:"POST",headers:{"Content-Type":"application/json; charset=UTF-8"},body:s}).then((e=>e.json())).then((({success:e,error:n})=>{if(n)throw new Error(n);t.fire({icon:"success",title:"Announcement Edited",text:e,toast:!0,showConfirmButton:!1,position:"center",timer:2e3}),o().then(r).catch(console.log)})).catch((e=>{t.fire({icon:"error",title:"Announcement Edited",text:e,toast:!0,showConfirmButton:!1,position:"center",timer:2e3})}))}}))}}))}}))}),[]),h=e.useCallback((e=>{t.fire({title:"Delete Announcement",text:"Are you sure you want to delete this announcement?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete announcement!"}).then((({isConfirmed:n})=>{if(n){const n=new URL(pathname("/api/home/announcement/delete"),window.location.origin),i=JSON.stringify({id:e.id});fetch(n,{method:"DELETE",headers:{"Content-Type":"application/json; charset=UTF-8"},body:i}).then((e=>e.json())).then((({success:e,error:n})=>{if(n)throw new Error(n);t.fire({icon:"success",title:"Announcement Deleted",text:e,toast:!0,showConfirmButton:!1,position:"center",timer:2e3}),o().then(r).catch(console.log)})).catch(console.error)}}))}),[]);return e.createElement("div",{className:"w-full min-h-[calc(100vh-160px)] h-fit bg-[#37414e] p-4 min-w-fit"},e.createElement("h1",{className:"text-white text-2xl my-2"},"Manage Homepage"),e.createElement("div",null,e.createElement("button",{type:"button",className:"bg-white hover:bg-slate-300 px-4 py-2 rounded shadow",onClick:()=>u()},"Add New Announcement")),e.createElement("div",{className:"p-4 tw-flex tw-flex-wrap tw-gap-8"},0===n.length?e.createElement("span",{className:""},"No Announcements"):n.map((t=>e.createElement(e.Fragment,null,"text"===t.type&&e.createElement("div",{key:t.id,className:"w-[500px] md:w-[700px] lg:w-[1000px] min-w-[500px] bg-gray-100 border-l-2 border-blue-500 rounded"},e.createElement("div",{className:"text-xl py-3 px-4  border-b text-blue-500 font-semibold flex justify-between flex-nowrap"},e.createElement("h2",null,t.title),e.createElement("div",{className:"flex flex-nowrap gap-x-2"},e.createElement("button",{type:"button",onClick:()=>h(t),className:"px-2 text-sm bg-red-100 hover:bg-red-200 text-black shadow"},"Delete"),e.createElement("button",{type:"button",onClick:()=>m(t),className:"text-sm bg-yellow-100 hover:bg-yellow-200 text-black shadow"},"Edit"))),e.createElement("div",{className:"text-center p-3 text-slate-900 my-3"},t.message?.split("\n").map((t=>e.createElement(e.Fragment,null,t,e.createElement("br",null))||""))),e.createElement("div",{className:"text-left py-1 text-slate-700 my-3 text-sm italic px-3 border-t"},s(t.expires)?e.createElement("span",{className:"text-red-700 font-bold"},"EXPIRED"):e.createElement(e.Fragment,null,"Expires on ",new Date(t.expires).toLocaleDateString("en-PH",{month:"long",day:"numeric",year:"numeric"})))),"video"===t.type&&e.createElement("div",{key:t.id,className:"w-[500px] md:w-[700px] lg:w-[1000px] min-w-[500px] bg-gray-100 border-l-2 border-blue-500 rounded"},e.createElement("div",{className:"text-xl py-3 px-4 border-b  text-blue-500 font-semibold flex justify-between flex-nowrap"},e.createElement("h2",null,t.title),e.createElement("div",{className:"flex flex-nowrap gap-x-2"},e.createElement("button",{type:"button",onClick:()=>h(t),className:"px-2 text-sm bg-red-100 hover:bg-red-200 text-black shadow"},"Delete"),e.createElement("button",{type:"button",onClick:()=>m(t),className:"text-sm bg-yellow-100 hover:bg-yellow-200 text-black shadow"},"Edit"))),e.createElement("div",{className:"w-full h-full px-[10%] py-[5%] aspect-video"},e.createElement(a,{url:t.url||""})),e.createElement("div",{className:"text-left py-1 text-slate-700 my-3 text-sm italic px-3 border-t"},s(t.expires)?e.createElement("span",{className:"text-red-700 font-bold"},"EXPIRED"):e.createElement(e.Fragment,null,"Expires on ",new Date(t.expires).toLocaleDateString("en-PH",{month:"long",day:"numeric",year:"numeric"})))))))))}}));