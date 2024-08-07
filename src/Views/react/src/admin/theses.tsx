import AddThesisForm from "./addthesis";
import SMCCLogo from "/jsx/global/smcclogo";
import { React } from "/jsx/imports";

SMCCLogo

function AdminLogin() {
  const [openAddThesisForm, setShowAddThesisForm] = React.useState(false)
  const [showEntries, setShowEntries] = React.useState(10)
  return (
  <div className="w-full h-full bg-[#37414e] p-4">
    <div className="flex flex-row justify-between items-center gap-x-2 text-white relative bg-[#323B46] p-4">
      <div className="flex flex-row flex-nowrap w-fit max-w-fit gap-x-2 flex-shrink">
        <p>Show</p>
        <select className="bg-[#141432] rounded-[8px] p-1 text-[12px]" value={showEntries} onChange={(e) => setShowEntries(Number.parseInt(e.target.value))} title="Show Entries">
          {
            [10, 25, 50, 100].map((option) => (
              <option key={option} value={option}>{option}</option>
            ))
          }
        </select>
        <p>entries</p>
      </div>
      <div className="flex-grow">
        <div className="relative">
          <label className="text-white absolute left-1 top-0 h-full aspect-square flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">search</span></label>
          <input type="search" placeholder="Search..." className="text-white outline-none border border-white pl-10 pr-2 py-1.5 rounded placeholder:text-white/50 bg-[#323B46] w-full h-full" />
        </div>
      </div>
      <div className="px-4">
        <button type="button" onClick={() => setShowAddThesisForm(true)} className="hover:text-yellow-500"><span className="material-symbols-outlined">add</span></button>
      </div>
      <AddThesisForm open={openAddThesisForm} onClose={() => setShowAddThesisForm(false)} className="absolute right-3 top-full mt-4 shadow-lg" />
    </div>
    <div>
      {/* TODO: Table here */}
    </div>
  </div>
  )
}

export default AdminLogin