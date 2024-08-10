import e from"/jsx/global/clsx";import{React as t}from"/jsx/imports";const r=t.createContext({activeTabKey:""});export function Tab({tabKey:e,children:l}){const{activeTabKey:a}=t.useContext(r);return a===e&&t.createElement(t.Fragment,null,l)}export function Tabs({tabs:l=[],children:a,...n}){const[o,c]=t.useState(l?.[0].key||"");return t.createElement(r.Provider,{value:{activeTabKey:o}},t.createElement("div",{...n},t.createElement("div",{className:"sm:hidden"},t.createElement("select",{onChange:e=>c(e.target.value),title:"Tabs",className:"border text-sm rounded-t-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"},l.map((({label:e,key:r})=>t.createElement("option",{key:r,value:r},e))))),t.createElement("ul",{className:"hidden text-sm font-medium text-center rounded-t-lg shadow sm:flex divide-gray-700 text-gray-400 w-full"},l.map((({label:r,key:a},n)=>t.createElement("li",{className:"w-full focus-within:z-10"},t.createElement("button",{type:"button",onClick:()=>c(a),className:e("inline-block w-full p-4 border-r focus:ring-4 focus:ring-blue-300 focus:outline-none border-gray-700",0===n?"rounded-tl-lg border-r":n===l.length-1?"rounded-tr-lg":"border-r",o===a?"bg-sky-600 text-white active":"bg-gray-800 hover:text-white hover:bg-sky-700/50")},r))))),t.createElement("div",{className:"p-6 text-medium text-gray-400 bg-gray-800 rounded-b-lg w-full"},a)))}