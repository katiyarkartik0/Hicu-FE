import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";

interface CommentReplyProps extends NodeProps {
  data: {
    label: string;
    context?: string; // optional preloaded context
    usePinecone?: boolean; // whether to enrich with Pinecone
    onSaveContext?: (id: string, context: string, usePinecone: boolean) => void; // callback to save context
  };
}

export default function CommentReply({ id, data }: CommentReplyProps) {
  const [context, setContext] = useState(data.context || "");
  const [usePinecone, setUsePinecone] = useState<boolean>(data.usePinecone || false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleSave = () => {
    if (!context.trim()) return;
    if (data.onSaveContext) {
      data.onSaveContext(id, context.trim(), usePinecone);
    }
    setIsEditing(false);
    alert(
      `Context saved for node ${id}:\n${context.trim()}\n\nPinecone Access: ${
        usePinecone ? "Enabled ✅" : "Disabled ❌"
      }`
    );
  };

  return (
    <div className="bg-green-100 border-2 border-green-400 rounded-xl p-3 shadow-md w-80">
      {/* Incoming handle */}
      <Handle type="target" position={Position.Top} className="!bg-green-600" />

      {/* Title */}
      <div className="font-semibold text-green-800 mb-2 text-center">
        {data.label || "Comment → LLM Reply"}
      </div>

      {/* Prompt / Context */}
      {isEditing ? (
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Enter context for LLM response..."
          rows={3}
          className="w-full px-2 py-1 rounded border text-sm resize-none"
        />
      ) : (
        <div className="bg-white border rounded p-2 text-sm text-gray-800 min-h-[60px]">
          {context || <span className="text-gray-400">No context set</span>}
        </div>
      )}

      {/* Pinecone Checkbox */}
      <div className="flex items-center gap-2 mt-3">
        <input
          type="checkbox"
          checked={usePinecone}
          onChange={(e) => setUsePinecone(e.target.checked)}
          id={`pinecone-${id}`}
          className="h-4 w-4 text-green-600 border-green-400 rounded"
          disabled={!isEditing}
        />
        <label htmlFor={`pinecone-${id}`} className="text-sm text-green-700">
          Enrich with Pinecone DB
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end mt-3 gap-2">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>
        )}
      </div>

      {/* Outgoing handle */}
      <Handle type="source" position={Position.Bottom} className="!bg-green-600" />
    </div>
  );
}
