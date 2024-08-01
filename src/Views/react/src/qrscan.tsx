// @ts-ignore
import { Scanner as QrScanner, type BarcodeFormat } from "@yudiel/react-qr-scanner";
import React from "react";

function Scanner({ pause = false, format = 'qr_code', onResult = (...result: string[]) => {}, regExFormat = [], children, ...props }: { pause?: boolean, format?: BarcodeFormat, onResult?: (...props: string[]) => void, regExFormat?: RegExp[], children?: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  const [scannedData, setScannedData] = React.useState([])

  const reset = React.useCallback(() => setScannedData([]), [])

  React.useEffect(() => {
    if (regExFormat.length === 0 || (regExFormat.length > 0 && scannedData.length === regExFormat.length && regExFormat.every((regex, index) => regex.test(scannedData[index])))) {
      onResult(...scannedData)
      reset()
    }
  }, [scannedData])

  const handleScan = React.useCallback((result: any) => result?.[0]?.format === format && setScannedData(result?.[0]?.rawValue.split('\r\n')), [])

  return (
    <div {...props}>
      <div className={"mx-auto max-w-[350px] aspect-square p-4 rounded-lg " + (scannedData.length > 0 ? 'bg-green-300' : 'bg-gray-300')}>
        <QrScanner onScan={handleScan} paused={pause} />
      </div>
      {children}
    </div>
  )
}

export default Scanner