// @ts-nocheck
import { Scanner as ReactQrScanner } from "https://esm.sh/@yudiel/react-qr-scanner@2.0.4";
import confetti from "https://esm.sh/canvas-confetti@1.9.3";
import ReactDOM from "https://esm.sh/react-dom@18.3.1/client";
import ReactPlayer from "https://esm.sh/react-player@2.16.0";
import ReactPlayerYoutube from "https://esm.sh/react-player@2.16.0/youtube";
import React from "https://esm.sh/react@18.3.1";
import Sweetalert2 from "https://esm.sh/sweetalert2@11.12.4";

export {
  confetti, React,
  ReactDOM,
  ReactPlayer,
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
  Sweetalert2
}
export default imports