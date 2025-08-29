import { NavLink } from "react-router-dom";
import { FC, ReactNode } from "react";

interface SidebarLinkProps {
  to: string;
  icon: ReactNode;
  label: string;
  reloadDocument?: boolean;
  end?: boolean;
}

const SidebarLink: FC<SidebarLinkProps> = ({
  to,
  icon: Icon,
  label,
  reloadDocument = false,
  end = true,
}) => (
  <NavLink
    reloadDocument={reloadDocument}
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center px-4 py-2 rounded-[8px] transition ${
        isActive
          ? "bg-grey-ef text-grey-18"
          : "text-grey-2c hover:bg-grey-ef hover:text-grey-18 transition"
      }`
    }
  >
    <div className="flex items-center gap-2 px-1 py-1 rounded-md ">
      {Icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
  </NavLink>
);

export default SidebarLink;
