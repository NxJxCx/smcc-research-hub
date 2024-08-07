// @ts-nocheck
import { Scanner as ReactQrScanner } from "https://esm.sh/@yudiel/react-qr-scanner@2.0.4";
import confetti from "https://esm.sh/canvas-confetti@1.9.3";
import ReactDOM from "https://esm.sh/react-dom@18.3.1/client";
import * as ReactPDF from "https://esm.sh/react-pdf@9.1.0";
import ReactPlayer from "https://esm.sh/react-player@2.16.0";
import ReactPlayerYoutube from "https://esm.sh/react-player@2.16.0/youtube";
import React from "https://esm.sh/react@18.3.1";
import Sweetalert2 from "https://esm.sh/sweetalert2@11.12.4";

ReactPDF.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export {
  confetti, React,
  ReactDOM, ReactPDF, ReactPlayer,
  ReactPlayerYoutube,
  ReactQrScanner, Sweetalert2
};

const imports = {
  React,
  ReactDOM,
  confetti,
  ReactPlayer,
  ReactPlayerYoutube,
  ReactQrScanner,
  Sweetalert2,
  ReactPDF
}
export default imports