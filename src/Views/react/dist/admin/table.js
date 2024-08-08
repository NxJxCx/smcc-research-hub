import e from"/jsx/global/clsx";import{React as t}from"/jsx/imports";export var TableCellType;!function(e){e.Number="number",e.Date="date",e.String="string",e.Custom="custom"}(TableCellType||(TableCellType={}));export var CellAlign;!function(e){e.Left="left",e.Center="center",e.Right="right"}(CellAlign||(CellAlign={}));export var SortOrder;!function(e){e.Ascending="asc",e.Descending="desc"}(SortOrder||(SortOrder={}));export function TableRowAction({id:e,onView:l=e=>{},onDelete:a=e=>{}}){return t.createElement("div",{className:"grid grid-cols-2 gap-x-1 max-w-[80px] mx-auto items-center"},t.createElement("button",{type:"button",className:"p-1 text-white hover:text-green-500",title:"Preview",onClick:()=>l(e)},t.createElement("span",{className:"material-symbols-outlined"},"preview")),t.createElement("button",{type:"button",className:"p-1 text-red-500",title:"Delete",onClick:()=>a(e)},t.createElement("span",{className:"material-symbols-outlined"},"delete")))}const l=[5,10,25,50,100,200,500,1e3];export function Table({columns:a,items:r,search:n,children:o,onShowEntries:s=e=>{},onSortColumn:c=e=>{},onSortOrder:i=e=>{},onSearch:m=e=>{},...u}){const[p,b]=t.useState(n||""),[y,d]=t.useState(5),[g,x]=t.useState(a?.[0].sortable?a[0].key:""),[h,f]=t.useState(SortOrder.Ascending),[C,N]=t.useState(r.length>0?1:0),[w,E]=t.useState(!1),T=t.useMemo((()=>r.length>0?Math.ceil(r.length/y):0),[r,y]),S=t.useMemo((()=>{const e=[...r].slice(Math.max(Math.ceil((C-1)*y)),Math.max(y,Math.ceil((C-1)*y)+y)).sort(((e,t)=>{const l=a.find((e=>e.key===g));if(l?.cellType===TableCellType.Number){if(Number(e[g])<Number(t[g]))return h===SortOrder.Ascending?-1:1;if(Number(e[g])>Number(t[g]))return h===SortOrder.Ascending?1:-1}else if(l?.cellType===TableCellType.Date){if(new Date(e[g]).getTime()<new Date(t[g]).getTime())return h===SortOrder.Ascending?-1:1;if(new Date(e[g]).getTime()>new Date(t[g]).getTime())return h===SortOrder.Ascending?1:-1}else if(l?.cellType===TableCellType.Custom&&l.sortable&&e[g].content&&t[g].content){if(e[g].value.toString().localeCompare(t[g].value)<0)return h===SortOrder.Ascending?-1:1;if(e[g].value.toString().localeCompare(t[g].value)>0)return h===SortOrder.Ascending?1:-1}else{if(e[g].toString().localeCompare(t[g])<0)return h===SortOrder.Ascending?-1:1;if(e[g].toString().localeCompare(t[g])>0)return h===SortOrder.Ascending?1:-1}return 0}));return p?e.filter((e=>Object.entries(e).some((([e,t])=>{const l=a.find((t=>t.key===e));return l?.cellType===TableCellType.Number||l?.cellType===TableCellType.String?t.toString().toLowerCase().includes(p.toLowerCase()):l?.cellType===TableCellType.Date?new Date(t).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}).toLowerCase().includes(p.toLowerCase()):l?.cellType===TableCellType.Custom&&l.sortable&&t.content&&t?.value.toString().toLowerCase().includes(p.toLowerCase())||!1})))):e}),[r,p,g,h,a,C,T,y]);t.useEffect((()=>{s&&s(y)}),[y]),t.useEffect((()=>{c&&c(g)}),[g]),t.useEffect((()=>{i&&i(h)}),[h]),t.useEffect((()=>{void 0!==n&&(b(n),m&&m(n))}),[n]);const v=t.useCallback((e=>{b(e),m&&m(e)}),[m]),k=t.useCallback(((e,t)=>{!0===e&&(g===t?h===SortOrder.Ascending?f(SortOrder.Descending):f(SortOrder.Ascending):(x(t),f(SortOrder.Ascending)))}),[h,g]),O=t.useCallback((e=>{e.preventDefault(),e.stopPropagation(),C<T&&C>0||N(T>0?1:0),E(!1)}),[]);return t.createElement("div",{className:"w-full h-full",...u},t.createElement("div",{className:"flex flex-row justify-between items-center gap-x-2 text-white relative bg-[#323B46] p-4"},t.createElement("div",{className:"flex flex-row flex-nowrap w-fit max-w-fit gap-x-2 flex-shrink px-4"},t.createElement("p",null,"Show"),t.createElement("select",{className:"bg-[#141432] rounded-[8px] p-1 text-[12px]",value:y,onChange:e=>d(Number.parseInt(e.target.value)),title:"Show Entries"},l.map((e=>t.createElement("option",{key:"entry_"+e,value:e},e)))),t.createElement("p",null,"entries")),t.createElement("div",{className:"flex flex-nowrap pr-4"},t.createElement("button",{type:"button",onClick:()=>N(T>0?1:0),className:"hover:text-yellow-500"},t.createElement("span",{className:"material-symbols-outlined"},"keyboard_double_arrow_left")),t.createElement("button",{type:"button",onClick:()=>N(Math.max(T>0?1:0,Math.min(T,C-1))),className:"hover:text-yellow-500"},t.createElement("span",{className:"material-symbols-outlined"},"chevron_left")),!w&&t.createElement("button",{type:"button",onClick:()=>E(!0),className:"px-2 text-yellow-300"},"Page ",C," / ",T),w&&t.createElement("div",{className:"px-2 text-yellow-300 flex flex-nowrap items-center"},"Page ",t.createElement("form",{onSubmit:O,className:"flex items-end h-full"},t.createElement("input",{type:"number",name:"page",onChange:e=>{Number(e.target.value)>=C&&Number(e.target.value)<=T&&!Number.isNaN(Number.parseInt(e.target.value))?N(Number.parseInt(e.target.value)):N(0)},className:"max-w-[50px] outline-none text-center rounded bg-white text-black mx-1 hide-spinner placeholder:text-gray-500",min:T>0?1:0,max:T,placeholder:C}),t.createElement("button",{type:"submit",className:"hidden"},"Change"))," / ",T),t.createElement("button",{type:"button",onClick:()=>N(Math.max(T>0?1:0,Math.min(T,C+1))),className:"hover:text-yellow-500"},t.createElement("span",{className:"material-symbols-outlined"},"chevron_right")),t.createElement("button",{type:"button",onClick:()=>N(T),className:"hover:text-yellow-500"},t.createElement("span",{className:"material-symbols-outlined"},"keyboard_double_arrow_right"))),t.createElement("div",{className:"flex-grow"},t.createElement("div",{className:"relative"},t.createElement("label",{className:"text-white absolute left-1 top-0 h-full aspect-square flex items-center justify-center"},t.createElement("span",{className:"material-symbols-outlined text-[18px]"},"search")),t.createElement("input",{type:"search",placeholder:"Search...",value:p,onChange:e=>v(e.target.value),className:"text-white outline-none border border-white pl-10 pr-2 py-1.5 rounded placeholder:text-white/50 bg-[#323B46] w-full h-full"}))),o),t.createElement("div",null,t.createElement("table",{className:"w-full border-collapse bg-[#262E37] font-[Montserrat] font-[500] text-[14px] leading-[17.07px]"},t.createElement("thead",null,t.createElement("tr",{className:"bg-[#323B46] h-[50px]"},a.map((l=>t.createElement("th",{key:l.key,className:e(" text-white text-xs px-6 py-2",l.sortable?"cursor-pointer relative hover:bg-[#454f5c]":""),onClick:()=>k(l.sortable,l.key)},l.label,l.sortable&&t.createElement("div",{className:"absolute right-1 top-0 h-full w-fit flex justify-end items-center"},t.createElement("div",{className:e("material-symbols-outlined h-fit w-full text-[20px]",l.key===g?h===SortOrder.Ascending?"rotate-[180deg]":"":"opacity-20 hover:opacity-50")},"sort"))))))),t.createElement("tbody",null,S.map(((e,l)=>t.createElement("tr",{key:"thesis_rowtable_"+l,className:"h-[65px]"},a.map((l=>t.createElement("td",{key:l.key,className:"text-white text-xs px-4 py-2 "+(l.align===CellAlign.Center?"text-center":l.align===CellAlign.Right?"text-right":"text-left")},l.cellType===TableCellType.Number&&Number.parseFloat(e[l.key]),l.cellType===TableCellType.Date&&new Date(e[l.key]).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"}),l.cellType===TableCellType.Custom&&"object"==typeof e[l.key]&&l.sortable&&!!e[l.key].value&&t.createElement(t.Fragment,null,e[l.key].content),l.cellType===TableCellType.Custom&&"object"==typeof e[l.key]&&!l.sortable&&!!e[l.key].content&&t.createElement(t.Fragment,null,e[l.key].content),l.cellType===TableCellType.Custom&&"object"==typeof e[l.key]&&!l.sortable&&!e[l.key].content&&t.createElement(t.Fragment,null,e[l.key]),l.cellType===TableCellType.String&&"string"==typeof e[l.key]?e[l.key].length>20?e[l.key].slice(0,20)+"...":e[l.key]:"")))))),0===S.length&&t.createElement("tr",{className:"h-[65px]"},t.createElement("td",{className:"text-white text-center",colSpan:a.length},"NO RECORDS"))))))}