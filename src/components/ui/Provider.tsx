import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ProviderProps {
  to: string;
  icon: ReactNode;
  label: string;
  reloadDocument?: boolean;
}

function Provider({
  to,
  icon: Icon,
  label,
  reloadDocument = false,
}: ProviderProps) {
  return (
    <Link
      reloadDocument={reloadDocument}
      to={to}
      className={`flex items-center px-4 py-2 rounded-[8px] transition text-grey-2c hover:bg-grey-ef hover:text-grey-18 active:bg-grey-ef active:text-grey-18 overflow-hidden`}
    >
      <div className="flex items-center gap-2 px-1 py-1 rounded-md">
        {Icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
}

export default Provider;
