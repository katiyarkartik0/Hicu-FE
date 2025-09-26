import { IgReactFlowNode } from "@/type/interfaces/igReactFlow";
import { Handle, NodeProps, Position } from "@xyflow/react";

interface DecisionProps extends NodeProps {
  data: {
    label: string;
    description?: string;
  };
  style?: React.CSSProperties;
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
}

export default function Decision({ id, data, style }: DecisionProps) {
  // Default size (same as default node)
  const mergedStyle: React.CSSProperties = {
    width: 150,
    height: 36,
    ...style, // allow override from React Flow / DB
  };

  return (
    <div
      style={mergedStyle}
      className="bg-white shadow-md rounded-lg border border-gray-300 text-center relative flex flex-col justify-center"
    >
      {/* Label */}
      <div className="px-2">
        <span className="font-medium text-gray-800 text-sm">{data.label}</span>
      </div>

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        id={`${id}-bottom`}
        className="w-3 h-3 bg-green-500 border-2 border-white rounded-full"
      />
    </div>
  );
}
