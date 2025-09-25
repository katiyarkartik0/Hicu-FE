import Tabs from "./tabs";
import PromptTab from "./tabs/PromptTab";
import VectorTab from "./tabs/VectorTab";
import { useState } from "react";
import type { IgReactFlowNode } from "@/type/interfaces/igReactFlow";

interface ModalContentProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
  id: string; // 👈 add id
  data: {
    aiPrompt?: string;
    description: string;
    hasConditionalEdges: boolean;
    prototypeResponse?: string;
    label: string;
  };
}

const ModalContent: React.FC<ModalContentProps> = ({
  setIsModalOpen,
  setNodes,
  id,
  data,
}) => {
  const [activeTab, setActiveTab] = useState<"vector" | "prompt">("vector");

  return (
    <div className="flex flex-col gap-4 p-4">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "vector" ? (
        <VectorTab />
      ) : (
        <PromptTab
          setIsModalOpen={setIsModalOpen}
          setNodes={setNodes}
          id={id}
          data={data}
        />
      )}
    </div>
  );
};

export default ModalContent;
