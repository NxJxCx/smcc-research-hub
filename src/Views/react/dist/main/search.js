export default import(pathname("/jsx/imports")).then((({React:e})=>function({search:t,onSearch:a}){return e.createElement("div",null,e.createElement("input",{type:"search",placeholder:"Search",value:t,onChange:e=>a(e.target.value),className:"py-2 px-4 rounded border font-[600] text-gray-800 bg-white w-full"}),e.createElement("span",{className:"material-symbols-outlined absolute top-1/2 -translate-y-[12px] right-0 text-white h-full mr-2"},"search"))}));