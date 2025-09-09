import React from "react";
import { nodeDefinitions } from "./Nodes";
import { XYPosition, Node } from "@xyflow/react";

type NodeType =
  | "trigger"
  | "end"
  | "decision"
  | "dm"
  | "commentReply"
  | "commentReplyAiVectorDb"
  | "commentReplyAi"
  | "commentReplyManual";

interface NodePaletteProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

const nodes = nodeDefinitions;

export const NodePalette: React.FC<NodePaletteProps> = ({ setNodes }) => {
  const handleAddNode = (type: NodeType) => {
    const def = nodeDefinitions.find((nd) => nd.type === type);
    if (!def) return;

    const id = `${type}-${Date.now()}`; // safer unique id
    const position: XYPosition = {
      x: Math.random() * 400,
      y: Math.random() * 400,
    };

    setNodes((prev) => [
      ...prev,
      {
        id,
        type,
        position,
        data: {
          label: def.label,
          description: def.description,
        },
      },
    ]);
  };

  return (
    <div className="w-64 bg-white shadow-lg rounded-2xl border flex flex-col max-h-[calc(80vh-40px)]">
      {/* Header stays fixed */}
      <h2 className="text-lg font-semibold text-gray-700 p-4 border-b">
        Node Palette
      </h2>

      {/* Scrollable area */}
      <div className="overflow-y-auto p-4 space-y-3">
        {nodes.map((node) => {
          return (
            <button
              key={node.type}
              onClick={() => handleAddNode(node.type)}
              className={`flex flex-col items-center p-3 rounded-xl border shadow-sm transition text-center w-full bg-gray-50 hover:bg-gray-100 cursor-pointer`}
            >
              {/* Icons horizontally aligned */}
              <div className="flex items-center justify-center gap-2 mb-2">
                {node.icons.map((Icon, i) => (
                  <Icon key={i} className="w-6 h-6 text-indigo-500" />
                ))}
              </div>

              {/* Label */}
              <span className="font-medium">{node.label}</span>

              {/* Description */}
              <p className="text-xs text-gray-500 mt-1">{node.description}</p>

              <span className="mt-2 text-xs text-gray-500">+ Add</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
