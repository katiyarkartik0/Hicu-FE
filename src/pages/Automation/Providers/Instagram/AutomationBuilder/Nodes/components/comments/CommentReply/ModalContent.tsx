import type { IgReactFlowNode } from "@/type/interfaces/igReactFlow";
import { useState } from "react";

interface ModalContentProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
  id: string;
  prototypeResponse?: string;
}

function ModalContent({
  setNodes,
  setIsModalOpen,
  id,
  prototypeResponse: savedPrototypeResponse = "",
}: ModalContentProps) {
  const [prototypeResponse, setPrototypeResponse] = useState(
    savedPrototypeResponse
  );

  const handleSave = () => {
    setNodes((nds: IgReactFlowNode[]) =>
      nds.map((node: IgReactFlowNode) =>
        node.id === id
          ? { ...node, data: { ...node.data, prototypeResponse } }
          : node
      )
    );

    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Prototype Response
      </h2>

      <p className="text-xs text-gray-500">
        You can use{" "}
        <code className="bg-gray-100 px-1 rounded">{`{{commenterUsername}}`}</code>{" "}
        in your response to dynamically insert the commenter's username.
      </p>

      <input
        type="text"
        value={prototypeResponse}
        onChange={(e) => setPrototypeResponse(e.target.value)}
        placeholder="Type your response here..."
        className="border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        onClick={handleSave}
        className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 transition"
      >
        Save Response
      </button>
    </div>
  );
}

export default ModalContent;
