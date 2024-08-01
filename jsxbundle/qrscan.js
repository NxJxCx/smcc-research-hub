// @ts-ignore
import { Scanner as QrScanner } from "@yudiel/react-qr-scanner";
import React from "react";
function Scanner() {
    const [scannedData, setScannedData] = React.useState([]);
    const [studentName, setStudentName] = React.useState('');
    const [studentID, setStudentID] = React.useState('');
    const [pause, setPause] = React.useState(true);
    React.useEffect(() => {
        if (scannedData.length === 2 && /^[a-zA-Z\w]+/.test(scannedData[0]) && /20\d{7}$/.test(scannedData[1])) {
            console.log(`Student Name: ${scannedData[0]}`);
            console.log(`Student ID: ${scannedData[1]}`);
            setStudentName(scannedData[0]);
            setStudentID(scannedData[1]);
        }
    }, [scannedData]);
    const handleScan = React.useCallback((result) => result?.[0]?.format === 'qr_code' && setScannedData(result?.[0]?.rawValue.split('\r\n')), []);
    const togglePause = React.useCallback(() => setPause(!pause), [pause]);
    return (React.createElement("div", { className: "relative mt-[100px]" },
        React.createElement("div", { className: "mx-auto w-[400px] h-[400px] aspect-square bg-gray-300 p-4 rounded" },
            React.createElement(QrScanner, { onScan: handleScan, paused: pause })),
        React.createElement("div", { className: "mt-4" },
            React.createElement("p", { className: "bg-black text-white p-8" },
                "Student Name: ",
                studentName,
                React.createElement("br", null),
                "Student ID: ",
                studentID,
                React.createElement("br", null),
                "Scan a QR code containing your student's name and ID, separated by a newline character.",
                React.createElement("br", null),
                React.createElement("button", { type: "button", className: "mt-4 p-2 text-white border border-white rounded", onClick: () => togglePause() }, pause ? 'Scan' : 'Close')))));
}
export default Scanner;
