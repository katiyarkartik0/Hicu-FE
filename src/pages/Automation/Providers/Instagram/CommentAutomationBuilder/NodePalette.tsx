import React from "react";
import { nodeDefinitions } from "./nodes";
import type { NodeType } from "./nodes";
import { XYPosition } from "@xyflow/react";
import type { IgReactFlowNode } from "@/type/interfaces/igReactFlow";

const generatePosition = (): XYPosition => ({
  x: Math.random() * 400,
  y: Math.random() * 400,
});

const createNode = (def: (typeof nodeDefinitions)[number], type: NodeType) => ({
  id: `${type}-${Date.now()}`,
  type,
  position: generatePosition(),
  data: {
    label: def.label,
    description: def.description,
    hasConditionalEdges: def.hasConditionalEdges,
  },
});

interface NodePaletteProps {
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
}

export const NodePalette: React.FC<NodePaletteProps> = ({ setNodes }) => {
  const handleAddNode = (type: NodeType) => {
    const def = nodeDefinitions.find((nd) => nd.type === type);
    if (!def) return;
    setNodes((prev) => [...prev, createNode(def, type)]);
  };
  return (
    <div className="w-64 bg-white shadow-lg rounded-2xl border flex flex-col max-h-[calc(90vh-40px)]">
      {/* Header stays fixed */}
      <h2 className="text-lg font-semibold text-gray-700 p-4 border-b">
        Node Palette
      </h2>

      {/* Scrollable area */}
      <div className="overflow-y-auto p-4 space-y-3">
        {nodeDefinitions.map((def) => {
          return (
            <button
              key={def.type}
              onClick={() => handleAddNode(def.type)}
              className={`flex flex-col items-center p-3 rounded-xl border shadow-sm transition text-center w-full bg-gray-50 hover:bg-gray-100 cursor-pointer`}
            >
              {/* Icons horizontally aligned */}
              <div className="flex items-center justify-center gap-2 mb-2">
                {def.icons.map((Icon, i) => (
                  <Icon key={i} className="w-6 h-6 text-indigo-500" />
                ))}
              </div>

              {/* Label */}
              <span className="font-medium">{def.label}</span>

              {/* Description */}
              <p className="text-xs text-gray-500 mt-1">{def.description}</p>

              <span className="mt-2 text-xs text-gray-500">+ Add</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
