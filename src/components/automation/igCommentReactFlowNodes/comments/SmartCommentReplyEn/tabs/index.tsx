interface TabsProps {
  activeTab: "vector" | "prompt";
  setActiveTab: React.Dispatch<React.SetStateAction<"vector" | "prompt">>;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="flex border-b mb-4">
    <button
      className={`px-4 py-2 text-sm font-medium ${
        activeTab === "vector"
          ? "border-b-2 border-indigo-500 text-indigo-600"
          : "text-gray-500"
      }`}
      onClick={() => setActiveTab("vector")}
    >
      Vector DB
    </button>
    <button
      className={`px-4 py-2 text-sm font-medium ${
        activeTab === "prompt"
          ? "border-b-2 border-indigo-500 text-indigo-600"
          : "text-gray-500"
      }`}
      onClick={() => setActiveTab("prompt")}
    >
      AI Prompt
    </button>
  </div>
);

export default Tabs;
