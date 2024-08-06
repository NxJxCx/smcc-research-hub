import avatar from "/jsx/global/avatar";

// function SearchInput({ search, setSearch }: { search: string, setSearch: React.Dispatch<React.SetStateAction<string>> }) {
//   return (
//     <div className="flex flex-row justify-start items-center w-full h-[50px] rounded-full bg-white border border-sky-300 focus-within:border-sky-600 focus-within:border-4">
//       <label htmlFor="search" className="material-symbols-outlined h-full flex items-center justify-center min-w-[50px] pl-4">search</label>
//       <input type="search" id="search" name="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full h-full p-4 outline-none bg-transparent" />
//     </div>
//   )
// }


// dropdown avatar
avatar();

// const containerRoot = document.getElementById("responsive-nav-small");
// if (containerRoot) {
//   containerRoot.classList.add("block", "xl:hidden", "p-4", "flex-shrink");
//   const authAvatars = [...containerRoot.children];
//   const navList = JSON.parse(containerRoot.dataset.navlist as string);
//   const root = ReactDOM.createRoot(containerRoot);
//   root.render(<ResponsiveHeader navList={navList} authAvatarList={authAvatars} />);
// }