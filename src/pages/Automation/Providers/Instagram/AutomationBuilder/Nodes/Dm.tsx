import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

interface DmProps extends NodeProps {
  data: {
    label: string;
  };
}

export default function Dm({ id, data }: DmProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    alert(`DM from ${id}: ${message}`);
    setMessage("");
  };

  return (
    <div className="bg-blue-200 border-2 border-blue-400 rounded-xl p-3 shadow-md w-64">
      {/* Incoming connection */}
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-600"
      />

      {/* Title */}
      <div className="font-semibold text-blue-800 mb-2 text-center">
        {data.label || "DM"}
      </div>

      {/* Input + Button */}
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-2 py-1 rounded border text-sm"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
        >
          Send
        </button>
      </div>

      {/* Outgoing connection */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-600"
      />
    </div>
  );
}
