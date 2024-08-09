import Loading from "/jsx/global/loading";
import { React, ReactDOM } from "/jsx/imports";
const rootDOM = document.getElementById('root');
const jsxAppPath = rootDOM?.dataset.reactApp;
const pageData = rootDOM?.dataset.pageData;
const root = ReactDOM.createRoot(rootDOM);
function addLinkElement(href) {
    const link = document.createElement('link');
    link.href = href;
    link.rel = "stylesheet";
    document.head.appendChild(link);
}
root.render(React.createElement(Loading, { className: "h-[calc(100vh-160px)] w-full flex items-center justify-center p-0 m-0" }));
async function render() {
    try {
        console.log("react app", jsxAppPath);
        const App = (await import(jsxAppPath))?.default;
        root.render(React.createElement(App, null));
    }
    catch (error) {
        ["https://fonts.googleapis.com/css?family=Nunito:400,700", "/css/style.css"].forEach(addLinkElement);
        await new Promise(resolve => setTimeout(resolve, 1000));
        root.render(React.createElement("div", { id: "notfound" },
            React.createElement("div", { className: "notfound" },
                React.createElement("div", { className: "notfound-404" }),
                React.createElement("h1", null, "404"),
                React.createElement("h2", null, "Oops! Page Not Be Found"),
                React.createElement("p", null, "Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable"),
                React.createElement("a", { href: "/" }, "Back to homepage"))));
    }
}
render();
