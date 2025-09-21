import { useState } from "react";
import type { IgReactFlowNode } from "@/type/interfaces/igReactFlow";

interface ModalContentProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
  id: string;
  data: {
    aiPrompt?: string;
    description: string;
    hasConditionalEdges: boolean;
    label: string;
  };
}
function ModalContent({
  setIsModalOpen,
  setNodes,
  id,
  data,
}: ModalContentProps) {
  const [aiPrompt, setAiPrompt] = useState(data.aiPrompt);
console.log(aiPrompt)
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
      <p className="text-xs text-gray-500">
        You can use <br />
        <code className="bg-gray-100 px-1 rounded">{`{{commenterUsername}}`}</code>{" "}
        and
        <code className="bg-gray-100 px-1 rounded">{`{{commentText}}`}</code>
        <br /> in your prompt to dynamically refer to commenter's username and
        comment text.
      </p>
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