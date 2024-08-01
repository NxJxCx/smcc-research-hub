// @ts-ignore
import { Scanner as QrScanner } from "@yudiel/react-qr-scanner";
import React from "react";

function Scanner() {
  const [scannedData, setScannedData] = React.useState([])
  const [studentName, setStudentName] = React.useState('')
  const [studentID, setStudentID] = React.useState('')
  const [pause, setPause] = React.useState(true)

  React.useEffect(() => {
    if (scannedData.length === 2 && /^[a-zA-Z\w]+/.test(scannedData[0]) && /20\d{7}$/.test(scannedData[1])) {
      console.log(`Student Name: ${scannedData[0]}`)
      console.log(`Student ID: ${scannedData[1]}`)
      setStudentName(scannedData[0])
      setStudentID(scannedData[1])
    }
  }, [scannedData])

  const handleScan = React.useCallback((result: any) => result?.[0]?.format === 'qr_code' && setScannedData(result?.[0]?.rawValue.split('\r\n')), [])
  const togglePause = React.useCallback(() => setPause(!pause), [pause])
  return (
    <div className="relative mt-[100px]">
      <div  className="mx-auto w-[400px] h-[400px] aspect-square bg-gray-300 p-4 rounded" >
        <QrScanner onScan={handleScan} paused={pause} />
      </div>
      <div className="mt-4">
        <p className="bg-black text-white p-8">
          Student Name: {studentName}
          <br />
          Student ID: {studentID}
          <br />
          Scan a QR code containing your student's name and ID, separated by a newline character.
          <br />
          <button type="button" className="mt-4 p-2 text-white border border-white rounded" onClick={() => togglePause()}>{pause ? 'Scan' : 'Close'}</button>
        </p>
      </div>
    </div>
  )
}

export default Scanner