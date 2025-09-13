import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { MessageCircle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import ModalContent from "./ModalContent";
import { IgReactFlowNode } from "@/type/interfaces/igReactFlow";

interface CommentReplyProps extends NodeProps {
  data: {
    label: string;
    description: string;
    prototypeResponse?: string;
  };
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
}

const CommentReply: React.FC<CommentReplyProps> = ({ data, id, setNodes }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <ModalContent
          setNodes={setNodes}
          setIsModalOpen={setIsModalOpen}
          id={id}
        />
      </Modal>

      <div
        onClick={() => setIsModalOpen(true)}
        className="flex flex-col items-center p-3 rounded-xl border shadow-sm bg-gray-50 hover:bg-gray-100 transition text-center w-64 cursor-pointer"
      >
        <Handle
          type="target"
          position={Position.Top}
          className="w-3 h-3 bg-indigo-500"
        />
        <div className="flex items-center justify-center gap-2 mb-2">
          <MessageCircle className="w-6 h-6 text-indigo-500" />
        </div>
        <span className="font-medium">{data.label}</span>
        <p className="text-xs text-gray-500 mt-1">{data.description}</p>
        <Handle
          type="source"
          position={Position.Bottom}
          className="w-3 h-3 bg-indigo-500"
        />
      </div>
    </>
  );
};

export default CommentReply;
