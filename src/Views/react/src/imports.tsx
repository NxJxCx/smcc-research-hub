// @ts-nocheck
import { Scanner as ReactQrScanner } from "https://esm.sh/@yudiel/react-qr-scanner@2.0.4";
import confetti from "https://esm.sh/canvas-confetti@1.9.3";
import clsx from "https://esm.sh/clsx@2.1.1";
import ReactDOM from "https://esm.sh/react-dom@18.3.1/client";
import ReactDOMServer from "https://esm.sh/react-dom@18.3.1/server";
import * as ReactPDF from "https://esm.sh/react-pdf@9.1.0";
import ReactPlayer from "https://esm.sh/react-player@2.16.0";
import ReactPlayerYoutube from "https://esm.sh/react-player@2.16.0/youtube";
import React from "https://esm.sh/react@18.3.1";
import Sweetalert2 from "https://esm.sh/sweetalert2@11.12.4";

async function getAsyncImport(path: string): Promise<any>
{
  const allImports = await import(pathname(path));
  return Object.entries(allImports).reduce(async (init, [key, value]) => ({ ...init, [key]: await value }), {})
}

ReactPDF.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export {
  clsx, confetti, getAsyncImport, React,
  ReactDOM, ReactDOMServer, ReactPDF, ReactPlayer,
  ReactPlayerYoutube,
  ReactQrScanner, Sweetalert2
};

const imports = {
  React,
  ReactDOM,
  ReactDOMServer,
  confetti,
  ReactPlayer,
  ReactPlayerYoutube,
  ReactQrScanner,
  Sweetalert2,
  ReactPDF,
  getAsyncImport,
  clsx
}
export default imports