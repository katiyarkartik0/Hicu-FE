import Modal from "@/components/ui/Modal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { igCommentAutomationService } from "@/services/igCommentAutomation";
import type { IgCommentAutomation } from "@/type/interfaces/igCommentAutomation";
import { useNumericParam } from "@/hooks/react-router";
import AutomationCard from "./components/Card/AutomationCard";
import CreateAutomationCard from "./components/Card/CreateAutomationCard";
import ModalContent from "./components/ModalContent";

export default function AutomationList() {
  //   const { mediaId } = useParams<{ mediaId: string }>();
  const brandId = useNumericParam("brandId");
  //   if (!brandId || !mediaId) return;
  // Fetch automations for this media
  //   const {
  //     data: historicalAutomations = [],
  //     isLoading,
  //     isError,
  //   } = useQuery<IgCommentAutomation[]>({
  //     queryKey: ["automations", mediaId],
  //     queryFn: () =>
  //       igCommentAutomationService.findAutomationsByMediaId({
  //         mediaId: mediaId!,
  //       }),
  //     enabled: !!mediaId,
  //   });
  if (!brandId) return;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalContent
          brandId={brandId}
          //   mediaId={mediaId!}
          onClose={() => setIsOpen(false)}
        />
      </Modal>

      <div className="p-6 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">
            Historical Automations for this Media
          </h2>

          {/* {isLoading && <p>Loading automations...</p>}
          {isError && (
            <p className="text-red-600">Failed to load automations</p>
          )} */}

          <div className="flex gap-4 flex-wrap">
            {/* {historicalAutomations.map((a) => (
              <AutomationCard
                key={a.id}
                id={a.id}
                isActive={a.isActive}
                name={a.name || "Untitled"}
                // mediaId={a.mediaId}
                createdAt={new Date(a.createdAt).toLocaleDateString()}
              />
            ))} */}
            <CreateAutomationCard onClick={() => setIsOpen(true)} />
          </div>
        </section>
      </div>
    </>
  );
}
