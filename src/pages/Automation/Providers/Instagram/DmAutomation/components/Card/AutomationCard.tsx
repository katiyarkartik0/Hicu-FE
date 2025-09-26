import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { igCommentAutomationService } from "@/services/igCommentAutomation";
import { ExternalLink, ToggleLeft, ToggleRight } from "lucide-react";

export type AutomationCardProps = {
  id: number;
  name: string;
  createdAt: string;
  isActive: boolean;
};

const AutomationCard = ({
  id: automationId,
  name,
  createdAt,
  isActive: initialIsActive,
}: AutomationCardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isActive, setIsActive] = useState(initialIsActive);

  // Toggle mutation
  // const toggleMutation = useMutation({
  //   mutationFn: (active: boolean) =>
  //     active
  //       ? igCommentAutomationService.activateAutomation(automationId)
  //       : igCommentAutomationService.deactivateAutomation(automationId),
  //   onSuccess: () => {
  //     setIsActive((prev) => !prev);
  //     queryClient.invalidateQueries({ queryKey: ["automations", mediaId] });
  //   },
  //   onError: (err) => {
  //     console.error("Failed to toggle automation", err);
  //   },
  // });

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 w-64 h-36 flex flex-col justify-between relative">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-xs text-gray-400">{createdAt}</p>

      {/* Toggle Icons */}
      <div className="absolute top-3 right-3 cursor-pointer" onClick={(e) => {
        e.stopPropagation();
        // toggleMutation.mutate(!isActive);
      }}>
        {isActive ? (
          <ToggleRight className="w-6 h-6 text-green-500" />
        ) : (
          <ToggleLeft className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {/* Build Automation Button */}
      <ExternalLink
        onClick={(e) => {
          e.stopPropagation();
          navigate(`./buildAutomation/${automationId}`);
        }}
        className="absolute bottom-3 right-3 w-5 h-5 text-blue-500 cursor-pointer"
      />
    </div>
  );
};

export default AutomationCard;
