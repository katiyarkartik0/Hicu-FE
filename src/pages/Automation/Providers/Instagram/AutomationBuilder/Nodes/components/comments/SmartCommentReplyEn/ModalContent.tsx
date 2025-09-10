import { Node } from "@xyflow/react";
import Tabs from "./tabs";
import PromptTab from "./tabs/PromptTab";
import VectorTab from "./tabs/VectorTab";
import { useState } from "react";

interface ModalContentProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  id: string; // 👈 add id
}

const ModalContent: React.FC<ModalContentProps> = ({
  setIsModalOpen,
  setNodes,
  id,
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
        />
      )}
    </div>
  );
};

export default ModalContent;
