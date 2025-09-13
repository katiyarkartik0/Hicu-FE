import { useNavigate } from "react-router-dom";

export type AutomationCardProps = {
  id: number;
  name: string;
  mediaId: string;
  createdAt: string;
};

const AutomationCard = ({
  id: automationId,
  name,
  mediaId,
  createdAt,
}: AutomationCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`./buildAutomation/${automationId}`)}
      className="bg-white shadow-md rounded-2xl p-4 w-64 h-36 flex flex-col justify-between"
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">Media ID: {mediaId}</p>
      <p className="text-xs text-gray-400">{createdAt}</p>
    </div>
  );
};

export default AutomationCard;
