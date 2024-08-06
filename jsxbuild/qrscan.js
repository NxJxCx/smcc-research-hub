import { React, ReactQrScanner } from "/jsx/imports";
function Scanner({ pause = false, format = 'qr_code', onResult = (...result) => { }, regExFormat = [], children, ...props }) {
    const [scannedData, setScannedData] = React.useState([]);
    const reset = React.useCallback(() => setScannedData([]), []);
    React.useEffect(() => {
        if (regExFormat.length === 0 || (regExFormat.length > 0 && scannedData.length === regExFormat.length && regExFormat.every((regex, index) => regex.test(scannedData[index])))) {
            onResult(...scannedData);
            setTimeout(() => reset(), 1000);
        }
    }, [scannedData, reset]);
    const handleScan = React.useCallback((result) => result?.[0]?.format === format && setScannedData(result?.[0]?.rawValue.split('\r\n')), []);
    return (React.createElement("div", { ...props },
        React.createElement("div", { className: "mx-auto max-w-[350px] aspect-square p-4 rounded-lg " + (scannedData.length > 0 ? 'bg-green-300' : 'bg-gray-300') },
            React.createElement(ReactQrScanner, { onScan: handleScan, paused: pause })),
        children));
}
export default Scanner;
