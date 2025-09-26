import { Plus } from "lucide-react";

const CreateAutomationCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-2xl p-4 w-64 h-36 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
    >
      <div className="flex flex-col items-center">
        <div className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2">
          <Plus className="h-6 w-6" />
        </div>
        <p className="text-sm font-medium text-blue-600">Create Automation</p>
      </div>
    </div>
  );
};

export default CreateAutomationCard;
