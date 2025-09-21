import type { IgReactFlowNode } from "@/type/interfaces/igReactFlow";
import { useState } from "react";

interface PromptTabProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
  id: string; // 👈 node id
  data: {
    aiPrompt?: string;
    description: string;
    hasConditionalEdges: boolean;
    prototypeResponse?: string;
    label: string;
  };
}

const PromptTab: React.FC<PromptTabProps> = ({
  setIsModalOpen,
  setNodes,
  id,
  data,
}) => {
  const [aiPrompt, setAiPrompt] = useState(data.aiPrompt);
  const savePrompt = () => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                aiPrompt, // 👈 embed aiPrompt in node's data
              },
            }
          : node
      )
    );
    console.log("AI Prompt Saved:", aiPrompt);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">Set AI Prompt</h2>
      <textarea
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        placeholder="Enter AI prompt for generating responses..."
        className="border rounded-lg p-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <div className="text-xs text-gray-500 space-y-1">
        <ul className="list-disc list-inside">
          <li>
            Use{" "}
            <code className="bg-gray-100 px-1 rounded">
              {"{{commenterUsername}}"}
            </code>{" "}
            to refer to the commenter's username.
          </li>
          <li>
            Use{" "}
            <code className="bg-gray-100 px-1 rounded">
              {"{{commentText}}"}
            </code>{" "}
            to refer to the comment text.
          </li>
          <li>
            Use{" "}
            <code className="bg-gray-100 px-1 rounded">{"{{results}}"}</code> to
            access the vector search results.
          </li>
          <li>
            Use <code className="bg-gray-100 px-1 rounded">{"{{leads}}"}</code>{" "}
            to access the user's personal info.
          </li>
          <li>
            Use{" "}
            <code className="bg-gray-100 px-1 rounded">{`{{conversationHistory}}`}</code>{" "}
            to dynamically refer to the history of conversation in DMs with the
            commenter.
          </li>
        </ul>
      </div>
      <button
        onClick={savePrompt}
        className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 transition self-end"
      >
        Save Prompt
      </button>
    </div>
  );
};

export default PromptTab;
