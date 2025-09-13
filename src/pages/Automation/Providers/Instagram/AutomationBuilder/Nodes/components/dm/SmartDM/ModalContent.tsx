import type { IgReactFlowNode } from "@/type/interfaces/igReactFlow";
import { useState } from "react";

interface ModalContentProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
  id: string;
  aiPrompt?: string;
}

function ModalContent({
  setIsModalOpen,
  setNodes,
  id,
  aiPrompt: savedAiPrompt = "",
}: ModalContentProps) {
  const [aiPrompt, setAiPrompt] = useState(savedAiPrompt);

  const handleSave = () => {
    setNodes((nds: IgReactFlowNode[]) =>
      nds.map((node: IgReactFlowNode) =>
        node.id === id ? { ...node, data: { ...node.data, aiPrompt } } : node
      )
    );
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold text-gray-800">Set AI Prompt</h2>
      <p className="text-xs text-gray-500">You can use:</p>
      <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
        <li>
          <code className="bg-gray-100 px-1 rounded">{`{{conversationHistory}}`}</code>{" "}
          to dynamically refer to the history of conversation in DMs with the
          commenter.
        </li>
        <li>
          <code className="bg-gray-100 px-1 rounded">{`{{commenterUsername}}`}</code>{" "}
          to insert the commenter's username.
        </li>
        <li>
          <code className="bg-gray-100 px-1 rounded">{`{{commentText}}`}</code>{" "}
          to insert the actual comment text.
        </li>
      </ul>

      <textarea
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
        placeholder="Enter AI prompt here..."
        className="border rounded-lg p-2 text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleSave}
        className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 transition"
      >
        Save Prompt
      </button>
    </div>
  );
}

export default ModalContent;
