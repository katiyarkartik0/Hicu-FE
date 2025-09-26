import React, { useCallback, useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Split } from "lucide-react";
import type { IgReactFlowNode } from "@/type/interfaces/igReactFlow";

interface DecisionProps extends NodeProps {
  data: {
    label: string;
    description?: string;
    conditionalEdgesToNodes: { condition: string; route: string }[];
  };
  style?: React.CSSProperties;
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
}

export default function Policy({ id, data, style, setNodes }: DecisionProps) {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;
    handleAddChild(id, input.trim());
    setInput("");
  };

  const handleAddChild = useCallback(
    (parentId: string, label: string) => {
      setNodes((prev) => {
        const newId = `child-${prev.length + 1}`;

        // Count children of this parent
        const childCount = prev.filter((n) => n.parentId === parentId).length;

        const childSlot = 190;
        const padding = 40;

        const newConditionalEdge = {
          condition: label,
          route: newId,
        };

        return prev
          .map((n) => {
            if (n.id === parentId) {
              const baseWidth =
                typeof n.style?.width === "number" ? n.style.width : 400;

              const newWidth = Math.max(
                baseWidth,
                (childCount + 1) * childSlot + padding
              );
              const existingEdges = n.data.conditionalEdgesToNodes ?? [];

              return {
                ...n,
                style: {
                  ...n.style,
                  width: newWidth,
                },
                data: {
                  ...n.data,
                  conditionalEdgesToNodes: [
                    ...existingEdges,
                    newConditionalEdge,
                  ],
                },
              };
            }
            return n;
          })
          .concat({
            id: newId,
            type: "route",
            data: { label, description: "", hasConditionalEdges: false },
            parentId,
            extent: "parent",
            position: {
              x: 40 + childCount * childSlot,
              y: 120,
            },
            style: {
              width: childSlot - 20,
              height: 50,
            },
          });
      });
    },
    [id, setNodes]
  );

  return (
    <div
      // style={style}
      className="flex h-44 flex-col items-center p-3 rounded-xl border shadow-sm bg-gray-50 hover:bg-gray-100 transition text-center min-w-[16rem]"
    >
      {/* Top handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-indigo-500"
      />

      {/* Icon */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <Split className="w-6 h-6 text-indigo-500" />
      </div>

      {/* Label */}
      <span className="font-medium">{data.label || "Decision"}</span>

      {/* Description / Input */}
      <div className="mt-2 flex w-full gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Condition..."
          className="flex-1 px-2 py-1 rounded border text-sm"
        />
        <button
          onClick={handleAdd}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-2 py-1 rounded text-sm"
        >
          Add
        </button>
      </div>

      {/* Bottom handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-indigo-500"
      />
    </div>
  );
}
