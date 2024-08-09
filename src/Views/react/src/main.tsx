import Loading from "/jsx/global/loading";
import { React, ReactDOM } from "/jsx/imports";

const rootDOM = document.getElementById('root');
const jsxAppPath = rootDOM?.dataset.reactApp;
const pageData = rootDOM?.dataset.pageData;
const root = ReactDOM.createRoot(rootDOM);

function addLinkElement(href: string) {
  const link = document.createElement('link');
  link.href = href;
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

root.render(<Loading className="h-[calc(100vh-160px)] w-full flex items-center justify-center p-0 m-0" />);
async function render() {
  try {
    console.log("react app", jsxAppPath);
    const App = (await import(jsxAppPath as string))?.default;
    root.render(<App />);
  } catch (error) {
    ["https://fonts.googleapis.com/css?family=Nunito:400,700", "/css/style.css"].forEach(addLinkElement);
    await new Promise(resolve => setTimeout(resolve, 1000));
    root.render(
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404"></div>
          <h1>404</h1>
          <h2>Oops! Page Not Be Found</h2>
          <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
          <a href="/">Back to homepage</a>
        </div>
      </div>
    )
  }
}
render()