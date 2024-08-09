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
        addLinkElement("https://fonts.googleapis.com/css?family=Nunito:400,700");
        root.render(React.createElement("div", { className: "relative h-full" },
            React.createElement("div", { className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[560px] w-full leading-[1.1] px-[15px] pt-[110px] md:pl-[160px] md:pt-0 md:pr-0" },
                React.createElement("div", { className: "absolute left-0 top-0 inline-block w-[110px] h-[110px] md:w-[140px] md:h-[140px] bg-[url('/images/emoji.png')] bg-cover" }),
                React.createElement("h1", { className: "font-[Nunito] text-[65px] font-[700] mt-0 mb-[10px] text-[#151723] uppercase" }, "404"),
                React.createElement("h2", { className: "font-[Nunito] text-[21px] font-[400] m-0 uppercase text-[#151723]" }, "Oops! Page Not Be Found"),
                React.createElement("p", { className: "font-[Nunito] font-[400] text-[#999fa5]" }, "Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable"),
                React.createElement("a", { href: "/", className: "font-[Nunito] text-[#388dbc] rounded-[40px] font-[700] inline-block" }, "Back to homepage"))));
    }
}
render();
