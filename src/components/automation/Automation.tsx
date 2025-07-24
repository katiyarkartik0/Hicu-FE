// import { deleteAutomationById } from "@/services/automation";
import { instagramService } from "@/services/instagram";
import React, { useEffect, useState } from "react";

interface AutomationCardProps {
  id?: string;
  src: string;
  name: string;
  action: string;
  mediaId: string;
}

interface AutomationDetails {
  id?: string;
  media_url?: string;
  // Add more fields if your API returns more
}

const AutomationCard: React.FC<AutomationCardProps> = ({
  id,
  action,
  mediaId,
}) => {
  const [automationDetails, setAutomationDetails] = useState<AutomationDetails>(
    {}
  );

  useEffect(() => {
    instagramService.fetchPostByMediaId(mediaId)
      .then((response) => response.json())
      .then((data) => setAutomationDetails(data));
  }, [mediaId]);

  function deleteAutomation(id: any) {
    // deleteAutomationById(id);
  }
console.log(automationDetails)
  return (
    <div className="w-64 rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {automationDetails.media_url ? (
        <img
          src={automationDetails.media_url}
          alt="Automation Media"
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">
          No Image
        </div>
      )}
      <div className="px-4 pt-2">
        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
          {"comment"}
        </span>
      </div>
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {automationDetails.id || "Loading..."}
        </h2>
      </div>
      <button onClick={() => deleteAutomation(id)}>Delete</button>
    </div>
  );
};

export default AutomationCard;
