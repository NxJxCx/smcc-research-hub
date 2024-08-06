import { React, ReactDOM } from "/jsx/imports";

interface NavItems {
  label: string,
  url: string
}

function SearchInput({ search, setSearch }: { search: string, setSearch: React.Dispatch<React.SetStateAction<string>> }) {
  return (
    <div className="flex flex-row justify-start items-center w-full h-[50px] rounded-full bg-white border border-sky-300 focus-within:border-sky-600 focus-within:border-4">
      <label htmlFor="search" className="material-symbols-outlined h-full flex items-center justify-center min-w-[50px] pl-4">search</label>
      <input type="search" id="search" name="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-full p-4 outline-none bg-transparent" />
    </div>
  )
}

function ResponsiveHeader({ navList, authAvatarList }: { navList: NavItems[], authAvatarList: any[] }) {
  const [show, setShow] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>('');
  const navRef = React.useRef<HTMLDivElement|null>(null);
  const ulRef = React.useRef<HTMLUListElement|null>(null);
  const toggleShow = React.useCallback(() => setShow(!show), [show]);

  const pathname = React.useMemo(() => window.location.pathname, []);

  React.useEffect(() => {
    if (!search) {
      console.log("Not searching. Clearing search input.");
    } else {
      console.log("Searching for: " + search);
    }
  }, [search]);

  React.useEffect(() => {
    if (show) {
      navRef.current?.classList.remove("-z-10");
      navRef.current?.classList.remove("scale-y-0");
      navRef.current?.classList.add("z-10");
      navRef.current?.classList.add("scale-y-full");
    } else {
      navRef.current?.classList.remove("z-10");
      navRef.current?.classList.remove("scale-y-full");
      navRef.current?.classList.add("scale-y-0");
      navRef.current?.classList.add("-z-10");
    }
  }, [show]);

  React.useEffect(() => {
    console.log(ulRef.current.children.length);
    if (ulRef.current && ulRef.current.children.length === navList.length) {
      (ulRef.current as HTMLElement).prepend(authAvatarList[0]);
      (ulRef.current as HTMLElement).append(authAvatarList[1]);
    }
  }, [authAvatarList, ulRef]);

  return (<>
    <div ref={navRef} className="flex absolute bg-white top-full right-0 border w-full h-fit px-10 pb-6 pt-4 scale-y-0 -z-10 flex-col justify-start items-start gap-y-4 transition-transform duration-500 delay-10 ease-in-out origin-top shadow-lg">
      <SearchInput search={search} setSearch={setSearch} />
      <ul className="flex flex-col gap-2 w-full h-full font-[500]" ref={ulRef}>
        {
          navList.map((item) => (
            <li key={item.label}>
              <a href={item.url} className="indent-4">
                <div className={
                  `hover:text-sky-500 transition duration-300 w-full
                  ${(item.url === "/" && pathname === "/") || pathname.startsWith(item.url)
                  ? "text-black border-l-4 border-sky-300 font-700"
                  : "text-gray-500 w-full"}`
                }>
                  {item.label}
                </div>
              </a>
            </li>
          ))
        }
      </ul>
    </div>
    <button type="button" onClick={toggleShow} className="w-[50px] h-[50px] aspect-square hover:text-sky-500" >
      <span className="material-symbols-outlined">menu</span>
    </button>
  </>)
}


// dropdown avatar
const avatarBtn = document.getElementById("profile-avatar-dropdown-btn");
const avatarDropdown = document.getElementById("profile-avatar-dropdown");
if (avatarBtn && avatarDropdown) {
  avatarBtn.addEventListener("click", () => {
    if (avatarDropdown.classList.contains("hidden")) {
      avatarDropdown.classList.remove("hidden");
      setTimeout(() => {
        avatarDropdown.classList.remove("scale-y-0");
      }, 10)
    } else {
      avatarDropdown.classList.add("scale-y-0");
      setTimeout(() => {
        avatarDropdown.classList.add("hidden");
      }, 200)
    }
  });
}

const containerRoot = document.getElementById("responsive-nav-small");
if (containerRoot) {
  containerRoot.classList.add("block", "xl:hidden", "p-4", "flex-shrink");
  const authAvatars = [...containerRoot.children];
  const navList = JSON.parse(containerRoot.dataset.navlist as string);
  const root = ReactDOM.createRoot(containerRoot);
  root.render(<ResponsiveHeader navList={navList} authAvatarList={authAvatars} />);
}