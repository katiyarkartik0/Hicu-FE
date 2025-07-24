import Button from "@/components/ui/Button";
import { useNumericParam } from "@/hooks/react-router";
import { automationService } from "@/services/automation";
import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import commentAutomationId_1 from "/Users/newtonschool/Desktop/st/nest_app/frontend/public/comment-graph-1.jpeg";

type AutomationItem = { id: number; url: string; available: boolean };

const availableCommentAutomation: AutomationItem[] = [
  {
    id: 1,
    url: commentAutomationId_1,
    available: true,
  },
  {
    id: 2,
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/LampFlowchart.svg/500px-LampFlowchart.svg.png",
    available: false,
  },
  {
    id: 2,
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/LampFlowchart.svg/500px-LampFlowchart.svg.png",
    available: false,
  },
];

const useAutomation = () => {
  return useMutation({
    mutationFn: automationService.createIgCommentAutomation,
  });
};

export default function CommentAutomationForm() {
  const { mediaId } = useParams();
  const brandId = useNumericParam("brandId");

  if (!brandId || !mediaId) {
    return "";
  }

  const [selectedCommentAutomationId, setSelectedCommentAutomationId] =
    useState<number>(1);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const { mutate } = useAutomation();

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth / 1.5;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  function handleClick() {
    if (!brandId || !mediaId) {
      return;
    }
    mutate({
      automation: { mediaId, commentAutomationId: selectedCommentAutomationId },
      brandId,
    });
  }

  return (
    <div className="p-6 space-y-10 max-w-6xl mx-auto">
      {/* Section 1: Comment Carousel */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Comment</h2>

        <div className="relative">
          {/* Left Arrow */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full"
            onClick={() => scroll("left")}
          >
            ◀
          </button>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto space-x-4 scrollbar-hide scroll-smooth px-8"
          >
            {availableCommentAutomation.map((item) => {
              const isSelected = selectedCommentAutomationId === item.id;
              const isDisabled = !item.available;

              return (
                <div
                  key={item.id}
                  className="relative group"
                  style={{ minWidth: "40rem" }}
                >
                  <img
                    src={item.url}
                    alt={`automation-${item.id}`}
                    onClick={() =>
                      item.available && setSelectedCommentAutomationId(item.id)
                    }
                    className={`w-full h-full object-contain rounded cursor-pointer border-4 transition-all duration-200 ${
                      isSelected ? "border-blue-500" : "border-transparent"
                    } ${
                      isDisabled
                        ? "opacity-50 grayscale cursor-not-allowed"
                        : ""
                    }`}
                  />

                  {!item.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-sm font-semibold rounded">
                      Coming Soon
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full"
            onClick={() => scroll("right")}
          >
            ▶
          </button>
        </div>
      </section>

      <Button onClick={handleClick}>Create Automation</Button>
    </div>
  );
}