import clsx from "/jsx/global/clsx";
import { React } from "/jsx/imports";


export enum TableCellType {
  Number = "number",
  Date = "date",
  String = "string",
  Custom = "custom",
}

export enum CellAlign {
  Left = "left",
  Center = "center",
  Right = "right",
}

export interface TableColumn {
  label: string,
  key: string,
  cellType?: TableCellType,
  sortable?: boolean,
  filterable?: boolean,
  align?: CellAlign,
}

export enum SortOrder {
  Ascending = "asc",
  Descending = "desc",
}

export type TableCell = string | number | React.ReactNode;

export interface TableRow {
  [key: string]: TableCell,
}


export function TableRowAction({ id, onView = (id: string|number) => {}, onDelete = (id: string|number) => {} }: { id: string|number, onView?: (id: string|number) => void, onDelete?: (id: string|number) => void }) {
  return (
    <div className="grid grid-cols-2 gap-x-1 max-w-[80px] mx-auto items-center">
      <button type="button" className="p-1 text-white hover:text-green-500" title="Preview" onClick={() => onView(id)}>
        <span className="material-symbols-outlined">
          preview
        </span>
      </button>
      <button type="button" className="p-1 text-red-500" title="Delete" onClick={() => onDelete(id)}>
        <span className="material-symbols-outlined">
          delete
        </span>
      </button>
    </div>
  )
}

export type ShowEntries = 5 | 10 | 25 | 50 | 100 | 200 | 500 | 1000

const EntriesList = [5, 10, 25, 50, 100, 200, 500, 1000]

type TableProps = {
  columns: TableColumn[],
  items: TableRow[],
  search?: string,
  onShowEntries?: (entries: number) => void,
  onSortColumn?: (column: string) => void,
  onSortOrder?: (order: SortOrder) => void,
  onSearch?: (search: string) => void,
  children?: React.ReactNode
}

export function Table({ columns, items, search, children, onShowEntries = (entries: number) => {}, onSortColumn = (column: string) => {}, onSortOrder = (order: SortOrder) => {}, onSearch = (search: string) => {}, ...props }: TableProps) {
  const [searchString, setSearch] = React.useState(search || "")
  const [showEntries, setShowEntries] = React.useState<ShowEntries>(5)
  const [sortColumn, setSortColumn] = React.useState(columns?.[0].sortable ? columns[0].key : "")
  const [sortOrder, setSortOrder] = React.useState<SortOrder>(SortOrder.Ascending)
  const [page, setPage] = React.useState(items.length > 0 ? 1 : 0);
  const [editPageNumber, setEditPageNumber] = React.useState(false);
  const totalPages = React.useMemo(() => items.length > 0 ? Math.ceil(items.length / showEntries) : 0, [items, showEntries]);
  const finalItems = React.useMemo(() => {
    const sortedItems = ([...items]
      .slice(Math.max(Math.ceil((page - 1) * showEntries)), Math.max(showEntries, Math.ceil((page - 1) * showEntries) + showEntries))
      .sort((a, b) => {
        const col = columns.find((column) => column.key === sortColumn);
        if (col?.cellType === TableCellType.Number) {
          if (Number(a[sortColumn]) < Number(b[sortColumn])) {
            return sortOrder === SortOrder.Ascending ? -1 : 1;
          } else if (Number(a[sortColumn]) > Number(b[sortColumn])) {
            return sortOrder === SortOrder.Ascending ? 1 : -1;
          }
        } else if (col?.cellType === TableCellType.Date) {
          if ((new Date(a[sortColumn])).getTime() < (new Date(b[sortColumn])).getTime()) {
            return sortOrder === SortOrder.Ascending ? -1 : 1;
          } else if ((new Date(a[sortColumn])).getTime() > (new Date(b[sortColumn])).getTime()) {
            return sortOrder === SortOrder.Ascending ? 1 : -1;
          }
        } else if (col?.cellType === TableCellType.Custom && col.sortable && !!a[sortColumn].content && !!b[sortColumn].content) {
          if (a[sortColumn].value.toString().localeCompare(b[sortColumn].value) < 0) {
            return sortOrder === SortOrder.Ascending ? -1 : 1;
          } else if (a[sortColumn].value.toString().localeCompare(b[sortColumn].value) > 0) {
            return sortOrder === SortOrder.Ascending ? 1 : -1;
          }
        } else {
          if (a[sortColumn].toString().localeCompare(b[sortColumn]) < 0) {
            return sortOrder === SortOrder.Ascending ? -1 : 1;
          } else if (a[sortColumn].toString().localeCompare(b[sortColumn]) > 0) {
            return sortOrder === SortOrder.Ascending ? 1 : -1;
          }
        }
        return 0;
      }));
    if (page === 0 && sortedItems.length > 0) {
      setPage(1);
    }
    if (!!searchString) {
      return sortedItems.filter((item) =>
        Object.entries(item).some(([key, value]) => {
          const col = columns.find((column) => column.key === key);
          if (col?.cellType === TableCellType.Number || col?.cellType === TableCellType.String) {
            return value.toString().toLowerCase().includes(searchString.toLowerCase());
          } else if (col?.cellType === TableCellType.Date) {
            return new Date(value).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }).toLowerCase().includes(searchString.toLowerCase());
          } else if (col?.cellType === TableCellType.Custom && col.sortable && !!value.content) {
            return value?.value.toString().toLowerCase().includes(searchString.toLowerCase()) || false;
          }
          return false;
        })
      );
    }

    return sortedItems;
  }, [items, searchString, sortColumn, sortOrder, columns, page, totalPages, showEntries])

  React.useEffect(() => {
    onShowEntries && onShowEntries(showEntries);
  }, [showEntries]);

  React.useEffect(() => {
    onSortColumn && onSortColumn(sortColumn);
  }, [sortColumn]);

  React.useEffect(() => {
    onSortOrder && onSortOrder(sortOrder);
  }, [sortOrder]);

  React.useEffect(() => {
    if (search !== undefined) {
      setSearch(search);
      onSearch && onSearch(search);
    }
  }, [search]);

  const onSetSearch = React.useCallback((search: string) => {
    setSearch(search);
    onSearch && onSearch(search);
  }, [onSearch]);

  const toggleSort = React.useCallback((sortable: boolean, columnKey: string) => {
    if (sortable === true) {
      if (sortColumn === columnKey) {
        if (sortOrder === SortOrder.Ascending) {
          setSortOrder(SortOrder.Descending);
        } else {
          setSortOrder(SortOrder.Ascending);
        }
      } else {
        setSortColumn(columnKey);
        setSortOrder(SortOrder.Ascending);
      }
    }
  }, [sortOrder, sortColumn])

  const onChangePage = React.useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!(page < totalPages && page > 0)) {
      setPage(totalPages > 0 ? 1 : 0);
    }
    setEditPageNumber(false);
  }, [])

  return (
    <div className="w-full h-full" {...props}>
      <div className="flex flex-row justify-between items-center gap-x-2 text-white relative bg-[#323B46] p-4">
        <div className="flex flex-row flex-nowrap w-fit max-w-fit gap-x-2 flex-shrink px-4">
          <p>Show</p>
          <select className="bg-[#141432] rounded-[8px] p-1 text-[12px]" value={showEntries} onChange={(e) => setShowEntries(Number.parseInt(e.target.value))} title="Show Entries">
            {
              EntriesList.map((option) => (
                <option key={"entry_" + option} value={option}>{option}</option>
              ))
            }
          </select>
          <p>entries</p>
        </div>
        <div className="flex flex-nowrap pr-4">
          <button type="button" onClick={() => setPage(totalPages > 0 ? 1 : 0)} className="hover:text-yellow-500"><span className="material-symbols-outlined">keyboard_double_arrow_left</span></button>
          <button type="button" onClick={() => setPage(Math.max(totalPages > 0 ? 1 : 0, Math.min(totalPages, page - 1)))} className="hover:text-yellow-500"><span className="material-symbols-outlined">chevron_left</span></button>
          {!editPageNumber && <button type="button" onClick={() => setEditPageNumber(true)} className="px-2 text-yellow-300">Page {page} / {totalPages}</button>}
          {editPageNumber && <div className="px-2 text-yellow-300 flex flex-nowrap items-center">Page <form onSubmit={onChangePage} className="flex items-end h-full"><input type="number" name="page" onChange={(e) => { Number(e.target.value) >= page && Number(e.target.value) <= totalPages && !Number.isNaN(Number.parseInt(e.target.value)) ? setPage(Number.parseInt(e.target.value)) : setPage(0) }} className="max-w-[50px] outline-none text-center rounded bg-white text-black mx-1 hide-spinner placeholder:text-gray-500" min={totalPages > 0 ? 1 : 0} max={totalPages} placeholder={page} /><button type="submit" className="hidden">Change</button></form> / {totalPages}</div>}
          <button type="button" onClick={() => setPage(Math.max(totalPages > 0 ? 1 : 0, Math.min(totalPages, page + 1)))} className="hover:text-yellow-500"><span className="material-symbols-outlined">chevron_right</span></button>
          <button type="button" onClick={() => setPage(totalPages)} className="hover:text-yellow-500"><span className="material-symbols-outlined">keyboard_double_arrow_right</span></button>
        </div>
        <div className="flex-grow">
          <div className="relative">
            <label className="text-white absolute left-1 top-0 h-full aspect-square flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">search</span></label>
            <input type="search" placeholder="Search..." value={searchString} onChange={(e) => onSetSearch(e.target.value)} className="text-white outline-none border border-white pl-10 pr-2 py-1.5 rounded placeholder:text-white/50 bg-[#323B46] w-full h-full" />
          </div>
        </div>
        {children}
      </div>
      <div>
        {/* TODO: Table here */}
        <table className="w-full border-collapse bg-[#262E37] font-[Montserrat] font-[500] text-[14px] leading-[17.07px]">
          <thead>
            <tr className="bg-[#323B46] h-[50px]">
              {
                columns.map((column) => (
                  <th key={column.key} className={clsx(" text-white text-xs px-6 py-2", column.sortable ? "cursor-pointer relative hover:bg-[#454f5c]" : "")} onClick={() => toggleSort(column.sortable, column.key)}>
                    {column.label}
                    {column.sortable && <div className="absolute right-1 top-0 h-full w-fit flex justify-end items-center"><div className={clsx("material-symbols-outlined h-fit w-full text-[20px]", column.key === sortColumn ? sortOrder === SortOrder.Ascending ? "rotate-[180deg]" : "" : "opacity-20 hover:opacity-50")}>sort</div></div>}
                  </th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              finalItems.map((row: TableRow, index: number) => (
                <tr key={"rowtable_" + index} className="h-[65px]">
                  {
                    columns.map((column) => (
                      <td key={column.key} className={`text-white text-xs px-4 py-2 ${column.align === CellAlign.Center ? "text-center" : column.align === CellAlign.Right ? "text-right" : "text-left"}`}>
                        {column.cellType === TableCellType.Number && Number.parseFloat(row[column.key])}
                        {column.cellType === TableCellType.Date && new Date(row[column.key]).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                        {column.cellType === TableCellType.Custom && typeof row[column.key] === "object" && column.sortable && !!row[column.key].value && <>{row[column.key].content}</>}
                        {column.cellType === TableCellType.Custom && typeof row[column.key] === "object" && !column.sortable && !!row[column.key].content && <>{row[column.key].content}</>}
                        {column.cellType === TableCellType.Custom && typeof row[column.key] === "object" && !column.sortable && !row[column.key].content && <>{row[column.key]}</>}
                        {column.cellType === TableCellType.String && typeof row[column.key] === "string" && row[column.key].toString()}
                      </td>
                    ))
                  }
                </tr>
              ))
            }
            {
              finalItems.length === 0 && (
                <tr className="h-[65px]">
                  <td className="text-white text-center" colSpan={columns.length}>
                    NO RECORDS
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}