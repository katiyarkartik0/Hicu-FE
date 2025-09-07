import React from "react";
import { PlusCircle, Split, Send, Play, Reply } from "lucide-react";

type NodeType = "trigger" | "end" | "decision" | "dm" | "commentReply";

interface NodePaletteProps {
  onAddNode: (type: NodeType) => void;
  hasTrigger: boolean; // whether a trigger node already exists in the flow
}

const nodes = [
  {
    type: "trigger" as NodeType,
    label: "__start__",
    icon: Play,
    description: "Entry point of the flow (only one allowed).",
  },
  {
    type: "end" as NodeType,
    label: "__end__",
    icon: PlusCircle,
    description: "Exit point of the flow (multiple allowed).",
  },
  {
    type: "decision" as NodeType,
    label: "Decision",
    icon: Split,
    description: "Branch logic based on conditions.",
  },
  {
    type: "dm" as NodeType,
    label: "send DM",
    icon: Send,
    description: "Send DM.",
  },
  {
    type: "commentReply" as NodeType,
    label: "Reply to Comment",
    icon: Reply,
    description: "Reply to Comment.",
  },
];

export const NodePalette: React.FC<NodePaletteProps> = ({
  onAddNode,
  hasTrigger,
}) => {
  return (
    <div className="w-64 bg-white shadow-lg rounded-2xl p-4 border flex flex-col space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Node Palette</h2>
      <div className="flex flex-col gap-3">
        {nodes.map((node) => {
          const Icon = node.icon;
          const disabled = node.type === "trigger" && hasTrigger;

          return (
            <button
              key={node.type}
              onClick={() => !disabled && onAddNode(node.type)}
              disabled={disabled}
              className={`flex items-center justify-between p-3 rounded-xl border shadow-sm transition ${
                disabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-50 hover:bg-gray-100 cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-indigo-500" />
                <span className="font-medium">{node.label}</span>
              </div>
              {!disabled && (
                <span className="text-xs text-gray-500">+ Add</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
