import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Send } from "lucide-react";

interface DmProps extends NodeProps {
  data: {
    label: string;
    description: string;
  };
}

const Dm: React.FC<DmProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center p-3 rounded-xl border shadow-sm bg-gray-50 hover:bg-gray-100 transition text-center w-64">
      {/* Top handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />

      {/* Icon */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <Send className="w-6 h-6 text-blue-600" />
      </div>

      {/* Label */}
      <span className="font-medium">{data.label || "DM"}</span>

      {/* Description */}
      <p className="text-xs text-gray-500 mt-1">{data.description}</p>

      {/* Bottom handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

export default Dm;
