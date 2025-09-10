import { Handle, Position } from "@xyflow/react";
import React from "react";
import { Play } from "lucide-react"; // ✅ optional trigger icon

interface TriggerProps {
  id: string;
  data: {
    label: string;
  };
}

export default function Trigger({ id, data }: TriggerProps) {
  return (
    <div className="flex flex-col items-center p-3 rounded-xl border shadow-sm bg-green-50 hover:bg-green-100 transition text-center w-56">
      {/* Top icon */}
      <div className="flex items-center justify-center mb-2">
        <Play className="w-6 h-6 text-green-600" />
      </div>

      {/* Label */}
      <div className="font-medium text-green-700">{data.label}</div>

      {/* Outgoing handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-600"
      />
    </div>
  );
}
