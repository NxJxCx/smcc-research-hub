import{React as e,ReactQrScanner as t}from"/jsx/imports";function a({pause:a=!1,format:r="qr_code",onResult:n=(...e)=>{},regExFormat:l=[],children:s,...o}){const[u,c]=e.useState([]),m=e.useCallback((()=>c([])),[]);e.useEffect((()=>{(0===l.length||l.length>0&&u.length===l.length&&l.every(((e,t)=>e.test(u[t]))))&&(n(...u),setTimeout((()=>m()),1e3))}),[u,m]);const g=e.useCallback((e=>e?.[0]?.format===r&&c(e?.[0]?.rawValue.split("\r\n"))),[]);return e.createElement("div",{...o},e.createElement("div",{className:"mx-auto max-w-[350px] aspect-square p-4 rounded-lg "+(u.length>0?"bg-green-300":"bg-gray-300")},e.createElement(t,{onScan:g,paused:a})),s)}export default a;