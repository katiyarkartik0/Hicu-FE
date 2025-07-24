import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface ListBoxItem {
  icon: React.ReactNode;
  label: string;
  element: React.ReactNode;
}

interface ListBoxProps {
  items: ListBoxItem[];
  defaultIndex?: number;
  alignRight?: boolean;
  defaultItem?: ListBoxItem;
}

const ListBox: React.FC<ListBoxProps> = ({
  items,
  alignRight = false,
  defaultItem,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ListBoxItem | null>(
    defaultItem || null
  );

  useEffect(() => {
    if (defaultItem) {
      setSelected(defaultItem);
    }
  }, [defaultItem]);

  const handleSelect = (item: ListBoxItem) => {
    setSelected(item);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center border border-gray-300 rounded-md bg-white text-sm text-gray-700 shadow-sm px-4 py-2"
      >
        {selected?.icon}
        {selected?.label || "Select"}
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {open && (
        <div
          className={`absolute z-10 mt-2 min-w-full bg-white border border-gray-200 rounded-md shadow-lg ${
            alignRight ? "right-0" : "left-0"
          }`}
        >
          {items.map((item, index) => (
            <div
              onClick={() => handleSelect(item)}
              key={index}
              className="px-4 py-2 hover:bg-gray-100 transition text-sm cursor-pointer"
            >
              {item.element}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListBox;
