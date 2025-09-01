import React from "react";
import { useNavigate } from "react-router-dom";

type Prospect = {
  id: number;
  userId: string;
  username?: string; // display name
  accountId: number;
  name?: string; // real/full name if available
};

export const Tile: React.FC<{ prospect: Prospect }> = ({ prospect }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`${prospect.userId}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="flex items-center justify-between w-full px-3 py-2 
                 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
    >
      {/* Avatar (initials if no profile image) */}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-semibold text-gray-600">
        {prospect.username ? prospect.username[0].toUpperCase() : "?"}
      </div>

      {/* User Info */}
      <div className="flex-1 ml-3 overflow-hidden">
        <h2 className="text-sm font-semibold text-gray-900 truncate">
          {prospect.username || "Unknown"}
        </h2>
        {prospect.name && (
          <p className="text-xs text-gray-500 truncate">{prospect.name}</p>
        )}
        <p className="text-[11px] text-gray-400 truncate">
          UID: {prospect.userId} • AID: {prospect.accountId}
        </p>
      </div>

      {/* Right-side action (chevron like Instagram) */}
      <div className="ml-2 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};
