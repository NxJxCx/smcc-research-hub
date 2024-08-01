// @ts-ignore
import { Scanner as QrScanner, type BarcodeFormat } from "@yudiel/react-qr-scanner";
import React from "react";

function Scanner({ pause = false, format = 'qr_code', onResult = (...props: string[]) => {}, regExFormat = [] }: { pause?: boolean, format?: BarcodeFormat, onResult?: (...props: string[]) => void, regExFormat?: RegExp[], }) {
  const [scannedData, setScannedData] = React.useState([])

  React.useEffect(() => {
    if (regExFormat.length === 0 || (regExFormat.length > 0 && scannedData.length === regExFormat.length && regExFormat.every((regex, index) => regex.test(scannedData[index])))) {
      onResult(...scannedData)
    }
  }, [scannedData])

  const handleScan = React.useCallback((result: any) => result?.[0]?.format === format && setScannedData(result?.[0]?.rawValue.split('\r\n')), [])

  return (
    <div className="relative mt-[100px]">
      <div  className="mx-auto w-[400px] h-[400px] aspect-square bg-gray-300 p-4 rounded" >
        <QrScanner onScan={handleScan} paused={pause} />
      </div>
    </div>
  )
}

export default Scanner