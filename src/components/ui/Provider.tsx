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
      className={`flex items-center px-4 py-2 rounded-lg transition"text-gray-700 hover:bg-gray-100`}
    >
      <div className="flex items-center gap-2 px-1 py-1 rounded-md ">
        {Icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
    </Link>
  );
}

export default Provider;
