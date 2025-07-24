import React from "react";

const NewAutomationCard: React.FC<any> = ({ setShowModal }) => {
  return (
    <div
      className="w-64 h-64 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center text-5xl font-bold text-gray-500 hover:bg-gray-100 hover:border-blue-500 hover:text-blue-500 transition-all duration-200 cursor-pointer shadow-sm"
      onClick={() => setShowModal((prev: any) => !prev)}
    >
      +
    </div>
  );
};

export default NewAutomationCard;
