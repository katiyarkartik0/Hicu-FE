import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

interface DecisionProps extends NodeProps {
  data: {
    label: string;
  };
  style?: React.CSSProperties;
  handleAddChild: (parentId: string, label: string) => void;
}

export default function Decision({
  id,
  data,
  style,
  handleAddChild,
}: DecisionProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    handleAddChild(id, input.trim()); // delegate child creation to parent
    setInput("");
  };

  return (
    <div
      style={style} // ✅ allow dynamic width/height
      className="bg-yellow-200 border-2 border-yellow-400 rounded-xl p-3 shadow-md h-52"
    >
      {/* Incoming connection */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-yellow-600"
      />

      {/* Title */}
      <div className="font-semibold text-yellow-800 mb-2 text-center">
        {data.label || "Decision"}
      </div>

      {/* Input + Button */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Condition..."
          className="flex-1 px-2 py-1 rounded border text-sm"
        />
        <button
          onClick={handleAdd}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
        >
          Add
        </button>
      </div>

      {/* Outgoing connections */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-yellow-600"
      />
    </div>
  );
}
