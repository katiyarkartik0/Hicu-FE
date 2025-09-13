import React, { useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Send } from "lucide-react";
import Modal from "@/components/ui/Modal";
import ModalContent from "./ModalContent";
import type { IgReactFlowNode } from "@/type/interfaces/igReactFlow";

interface DmProps extends NodeProps {
  data: {
    label: string;
    description: string;
    prototypeResponse?: string;
  };
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
}

const Dm: React.FC<DmProps> = ({ data, setNodes, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      onClick={() => setIsModalOpen(true)}
      className="flex flex-col items-center p-3 rounded-xl border shadow-sm bg-gray-50 hover:bg-gray-100 transition text-center w-64"
    >
      <Modal onClose={() => setIsModalOpen(false)} isOpen={isModalOpen}>
        <ModalContent
          setNodes={setNodes}
          setIsModalOpen={setIsModalOpen}
          id={id}
        />
      </Modal>
      {/* Top handle */}

      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500"
      />

      {/* Icon */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <Send className="w-6 h-6 text-blue-600" />
      </div>

      {/* Label */}
      <span className="font-medium">{data.label || "DM"}</span>

      {/* Description */}
      <p className="text-xs text-gray-500 mt-1">{data.description}</p>

      {/* Bottom handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

export default Dm;
