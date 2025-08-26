import React, { useState } from "react";
import { ChevronDown, ChevronRight, Info } from "lucide-react";

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue };

type Prospect = {
  id: number;
  userId: string;
  username?: string;
  accountId: number;
  details: JSONValue;
};

type JSONRendererProps = {
  data: JSONValue;
  level?: number;
};

const JSONRenderer: React.FC<JSONRendererProps> = ({ data, level = 0 }) => {
  const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});

  const toggle = (key: string) => {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (typeof data !== "object" || data === null) {
    return <span className="text-blue-300">{JSON.stringify(data)}</span>;
  }

  if (Array.isArray(data)) {
    return (
      <div className="pl-4 border-l border-gray-600 space-y-1">
        {data.map((item, i) => (
          <JSONRenderer key={i} data={item} level={level + 1} />
        ))}
      </div>
    );
  }

  return (
    <div className="pl-4 border-l border-gray-600">
      {Object.entries(data).map(([key, value]) => {
        const isObject = typeof value === "object" && value !== null;
        const isCollapsed = collapsed[key];

        return (
          <div key={key} className="flex flex-col mb-1">
            <div
              className="flex items-center cursor-pointer group"
              onClick={() => isObject && toggle(key)}
            >
              {isObject ? (
                isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />
              ) : (
                <Info size={16} className="opacity-40" />
              )}
              <span className="ml-1 font-mono text-white">
                <span className="text-purple-400">{key}</span>
                {": "}
                {!isObject && (
                  <span className="text-blue-300">{JSON.stringify(value)}</span>
                )}
              </span>
            </div>
            {isObject && !isCollapsed && (
              <div className="ml-4 mt-1">
                <JSONRenderer data={value} level={level + 1} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const Card: React.FC<{ prospect: Prospect }> = ({ prospect }) => {
  return (
    <div className="p-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white rounded-2xl shadow-2xl border border-gray-700">
      <h2 className="text-xl font-bold mb-2 text-cyan-300">
        {prospect.username}
      </h2>
      <p className="text-sm text-gray-400 mb-2">User ID: {prospect.userId} | Account ID: {prospect.accountId}</p>

      <h3 className="text-green-400 text-lg mb-1">Details</h3>
      <div className="text-sm font-mono bg-gray-800/50 p-4 rounded-xl overflow-x-auto border border-gray-600">
        <JSONRenderer data={prospect.details} />
      </div>
    </div>
  );
};
