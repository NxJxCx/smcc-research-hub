import{Scanner as e}from"@yudiel/react-qr-scanner";import t from"react";function a(){const[a,n]=t.useState([]),[r,l]=t.useState(""),[c,s]=t.useState(""),[o,u]=t.useState(!0);t.useEffect((()=>{2===a.length&&/^[a-zA-Z\w]+/.test(a[0])&&/20\d{7}$/.test(a[1])&&(console.log(`Student Name: ${a[0]}`),console.log(`Student ID: ${a[1]}`),l(a[0]),s(a[1]))}),[a]);const m=t.useCallback((e=>"qr_code"===e?.[0]?.format&&n(e?.[0]?.rawValue.split("\r\n"))),[]),d=t.useCallback((()=>u(!o)),[o]);return t.createElement("div",{className:"relative mt-[100px]"},t.createElement("div",{className:"mx-auto w-[400px] h-[400px] aspect-square bg-gray-300 p-4 rounded"},t.createElement(e,{onScan:m,paused:o})),t.createElement("div",{className:"mt-4"},t.createElement("p",{className:"bg-black text-white p-8"},"Student Name: ",r,t.createElement("br",null),"Student ID: ",c,t.createElement("br",null),"Scan a QR code containing your student's name and ID, separated by a newline character.",t.createElement("br",null),t.createElement("button",{type:"button",className:"mt-4 p-2 text-white border border-white rounded",onClick:()=>d()},o?"Scan":"Close"))))}export default a;