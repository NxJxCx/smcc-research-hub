import { React, ReactDOM } from "/jsx/imports";

interface NavItems {
  label: string,
  url: string,
  icon: string,
}

function SidebarNav({ sidebarList, toggleBtn }: { sidebarList: NavItems[], toggleBtn: HTMLButtonElement }) {
  const pathname = React.useMemo(() => window.location.pathname, []);
  const [show, setShow] = React.useState<boolean>(true);

  React.useEffect(() => {
    toggleBtn.addEventListener("click", () => setShow((prev: boolean) => !prev));
  }, [toggleBtn]);

  const clsx = React.useCallback((...args: string[]) => {
    return args.join(" ");
  }, [])

  return (
    <nav className={
      clsx(
        "text-slate-50 bg-[#262e36] max-w-[250px] h-full relative",
        show ? "w-[250px]" : "w-0 *:hidden",
        "transition-[width] duration-200 ease-in-out",
      )
    }>
      <div className="w-full max-h-[60px] h-[60px] flex items-center justify-center bg-[#21282f]">
        <div className="flex flex-nowrap h-full w-fit items-center justify-start">
          <img src="/images/SMCC-logo.svg" alt="SMCC Logo" className="aspect-square h-full py-2" />
          <h1 className="pr-3 font-[600]">RESEARCH HUB</h1>
        </div>
      </div>
      <ul className="list-none p-0 bg-[#191f26] py-4 w-full">
        { sidebarList.map(({ label, url }) => (
            <li key={label}>
              <a
                href={url}
                className={
                  "flex p-4 text-sm font-medium hover:bg-sky-300 hover:text-black transition-colors duration-200 ease-in-out"
                  + (url === pathname ? " bg-yellow-300 text-black" : " text-white")
                }
              >
                {label}
              </a>
            </li>
          )
        )}
      </ul>
    </nav>
  )
}

const toggleBtn = document.getElementById("sidebar-toggle-btn") as HTMLButtonElement;
const containerRoot = document.getElementById("sidebar-nav");
if (containerRoot) {
  containerRoot.classList.add(...("flex-shrink max-w-[250px] max-h-screen".split(" ")));
  const sidebarlist = JSON.parse(containerRoot.dataset.sidebarList as string);
  const root = ReactDOM.createRoot(containerRoot);
  root.render(<SidebarNav sidebarList={sidebarlist} toggleBtn={toggleBtn} />);
}