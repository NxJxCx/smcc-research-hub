import{Scanner as e}from"@yudiel/react-qr-scanner";import t from"react";function r({pause:r=!1,format:a="qr_code",onResult:n=(...e)=>{},regExFormat:l=[],children:c,...o}){const[s,u]=t.useState([]);t.useEffect((()=>{(0===l.length||l.length>0&&s.length===l.length&&l.every(((e,t)=>e.test(s[t]))))&&n(...s)}),[s]);const m=t.useCallback((e=>e?.[0]?.format===a&&u(e?.[0]?.rawValue.split("\r\n"))),[]);return t.createElement("div",{...o},t.createElement("div",{className:"mx-auto max-w-[350px] aspect-square p-4 rounded-lg "+(s.length>0?"bg-green-300":"bg-gray-300")},t.createElement(e,{onScan:m,paused:r})),c)}export default r;