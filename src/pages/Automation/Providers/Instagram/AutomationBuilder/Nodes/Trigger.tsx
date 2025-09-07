import { Handle, Position } from "@xyflow/react";
import React from "react";

interface TriggerProps {
  id: string;
  data: {
    label: string;
  };
}

export default function Trigger({ id, data }: TriggerProps) {
  return (
    <div className="bg-green-500 text-white font-semibold px-4 py-2 rounded-xl shadow-md border border-green-600">
      {/* Node Label */}
      <div className="text-center">{data.label}</div>

      {/* Outgoing connection */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-white !border-2 !border-green-600"
      />
    </div>
  );
}
