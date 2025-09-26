import { igCommentAutomationService } from "@/services/igCommentAutomation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function ModalContent({
  brandId,
  onClose,
}: {
  brandId: number;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: () =>
  //     igCommentAutomationService.createAutomation({
  //       automation: { name, mediaId },
  //       brandId,
  //     }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["automations", mediaId] });
  //     onClose();
  //   },
  // });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // mutation.mutate();
  };

  return (
    <div className="p-6 w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Create Automation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Automation name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring focus:ring-blue-200 focus:border-blue-500"
          />
        </div>

        {/* Error */}
        {/* {mutation.isError && (
          <p className="text-red-600 text-sm">
            {(mutation.error as any)?.message || "Failed to create automation"}
          </p>
        )} */}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            // disabled={mutation.isPending}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {/* {mutation.isPending ? "Creating..." : "Create"} */}
          </button>
        </div>
      </form>
    </div>
  );
}
export default ModalContent;
