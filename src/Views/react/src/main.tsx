import Loading from "/jsx/global/loading";
import { React, ReactDOM } from "/jsx/imports";

const rootDOM = document.getElementById('root');
const jsxAppPath = rootDOM?.dataset.reactApp;
const pageData = rootDOM?.dataset.pageData;
const root = ReactDOM.createRoot(rootDOM);

root.render(<Loading className="min-h-full w-full flex items-center justify-center" />);

import(jsxAppPath as string).then(({ default: App }) => {
  // console.log(`Page data: ${JSON.stringify(pageData)}`);
  root.render(<App />);
});

