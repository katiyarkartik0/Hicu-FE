import React from "react";
import {
  PlusCircle,
  Split,
  Send,
  Play,
  Database,
  Brain,
  Code2,
} from "lucide-react";

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
  onAddNode: (type: NodeType) => void;
  hasTrigger: boolean;
}

const nodes = [
  {
    type: "trigger" as NodeType,
    label: "__start__",
    icons: [Play],
    description: "Entry point of the flow (only one allowed).",
  },
  {
    type: "end" as NodeType,
    label: "__end__",
    icons: [PlusCircle],
    description: "Exit point of the flow (multiple allowed).",
  },
  {
    type: "decision" as NodeType,
    label: "Decision",
    icons: [Split],
    description: "Branch logic based on conditions.",
  },
  {
    type: "dm" as NodeType,
    label: "Send DM",
    icons: [Send],
    description: "Send a direct message automatically.",
  },
  {
    type: "commentReplyAiVectorDb" as NodeType,
    label: "Smart Comment Reply(enhanced)",
    icons: [Brain, Database],
    description: "Reply intelligently to comments using AI and vector search.",
  },
  {
    type: "commentReplyAi" as NodeType,
    label: "Smart Comment Reply",
    icons: [Brain],
    description: "Reply intelligently to comments using AI.",
  },
  {
    type: "commentReplyManual" as NodeType,
    label: "Comment Reply",
    icons: [Code2],
    description: "Reply to comment manually",
  },
];

export const NodePalette: React.FC<NodePaletteProps> = ({
  onAddNode,
  hasTrigger,
}) => {
  return (
    <div className="w-64 bg-white shadow-lg rounded-2xl border flex flex-col max-h-[calc(100vh-40px)]">
      {/* Header stays fixed */}
      <h2 className="text-lg font-semibold text-gray-700 p-4 border-b">
        Node Palette
      </h2>

      {/* Scrollable area */}
      <div className="overflow-y-auto p-4 space-y-3">
        {nodes.map((node) => {
          const disabled = node.type === "trigger" && hasTrigger;

          return (
            <button
              key={node.type}
              onClick={() => !disabled && onAddNode(node.type)}
              disabled={disabled}
              className={`flex flex-col items-center p-3 rounded-xl border shadow-sm transition text-center w-full ${
                disabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-50 hover:bg-gray-100 cursor-pointer"
              }`}
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

              {!disabled && (
                <span className="mt-2 text-xs text-gray-500">+ Add</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
