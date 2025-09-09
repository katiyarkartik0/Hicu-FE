import React from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Brain } from "lucide-react";

interface SmartCommentReplyProps extends NodeProps {
  data: {
    label: string;
    description: string;
  };
}

const SmartCommentReply: React.FC<SmartCommentReplyProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center p-3 rounded-xl border shadow-sm bg-gray-50 hover:bg-gray-100 transition text-center w-64">
      {/* Top handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-indigo-500"
      />

      {/* Icons horizontally aligned */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <Brain className="w-6 h-6 text-indigo-500" />
      </div>

      {/* Label */}
      <span className="font-medium">{data.label}</span>

      {/* Description */}
      <p className="text-xs text-gray-500 mt-1">{data.description}</p>

      {/* Bottom handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-indigo-500"
      />
    </div>
  );
};

export default SmartCommentReply;
