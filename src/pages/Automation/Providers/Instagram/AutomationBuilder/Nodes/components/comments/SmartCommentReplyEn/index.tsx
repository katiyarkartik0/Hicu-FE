import React, { useState } from "react";
import { Handle, Position, NodeProps, Node } from "@xyflow/react";
import { Brain, Database } from "lucide-react";
import Modal from "@/components/ui/Modal";
import ModalContent from "./ModalContent";

// Node props with data
interface SmartCommentReplyEnProps extends NodeProps {
  data: {
    label: string;
    description: string;
  };
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

const SmartCommentReplyEn: React.FC<SmartCommentReplyEnProps> = ({
  data,
  id,
  setNodes,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <ModalContent
          setIsModalOpen={setIsModalOpen}
          setNodes={setNodes}
          id={id} // 👈 pass node id
        />
      </Modal>

      <div
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col items-center p-3 rounded-xl border shadow-sm bg-gray-50 hover:bg-gray-100 transition text-center w-64 cursor-pointer"
      >
        {/* Top handle */}
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-indigo-500"
        />

        {/* Icons */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="w-6 h-6 text-indigo-500" />
          <Database className="w-6 h-6 text-indigo-500" />
        </div>

        {/* Label */}
        <span className="font-medium">{data.label}</span>

        {/* Description */}
        <p className="text-xs text-gray-500 mt-1">{data.description}</p>

        {/* Bottom handle */}
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-indigo-500"
        />
      </div>
    </>
  );
};

export default SmartCommentReplyEn;