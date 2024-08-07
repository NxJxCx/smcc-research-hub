import clsx from "/jsx/global/clsx";
import { React } from "/jsx/imports";

export function Input({ label, name, type = "text", placeholder = "", className = "", ...props }: { label: string, name: string, placeholder?: string, className?: string, type?: React.HTMLInputTypeAttribute } & React.InputHTMLAttributes<HTMLInputElement> ) {
  return (
    <div className={
      clsx(
        "flex flex-col justify-start w-full",
        className,
      )
    }>
      <label htmlFor={name} className="text-[12px] font-[400] text-white font-['Century Gothic'] px-2">{label}</label>
      <input className="px-2 py-1 w-full rounded" type={type} id={name} name={name} placeholder={placeholder} {...props} />
    </div>
  )
}

export interface SelectItem {
  label: string,
  value: string,
  disabled?: boolean
}

export function Select({ label, name, items, className = "",  ...props }: { label: string, name: string, items: SelectItem[], className?: string } & React.InputHTMLAttributes<HTMLInputElement> ) {
  return (
    <div className={
      clsx(
        "flex flex-col justify-start w-full",
        className,
      )
    }>
      <label htmlFor={name} className="text-[12px] font-[400] text-white font-['Century Gothic'] px-2">{label}</label>
      <select className="px-2 py-1 w-full rounded" id={name} name={name} {...props}>
        {items.map((item: SelectItem) => (
          <option key={item.value} value={item.value} disabled={item.disabled}>{item.label}</option>
        ))}
      </select>
    </div>
  )
}