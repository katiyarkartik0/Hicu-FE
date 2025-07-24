import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface DropdownOption {
  label: string;
  value: string | number;
  icon?: any;
  onClick?: () => void;
}

interface DropdownProps {
  options: DropdownOption[];
  defaultOption?: DropdownOption | null;
  placeholder?: string;
}

export default function Dropdown({
  options,
  defaultOption,
  placeholder = "Select an option",
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DropdownOption | null>(
    defaultOption || null
  );
  useEffect(() => {
    if (defaultOption) {
      setSelected(defaultOption);
    }

  }, [defaultOption]);
  const handleSelect = (option: DropdownOption) => {
    setSelected(option);
    setOpen(false);
    option.onClick?.();
  };
  return (
    <div className="relative w-full">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center px-4 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 shadow-sm focus:outline-none"
      >
        {selected?.label || placeholder}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`w-full flex gap-2 text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition`}
            >
              {option.icon} {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
