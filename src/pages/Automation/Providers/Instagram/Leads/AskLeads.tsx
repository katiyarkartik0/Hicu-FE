import Loader from "@/components/ui/Loader";
import { useNumericParam } from "@/hooks/react-router";
import { askLeadsService } from "@/services/askLeadsService";
import type { Leads as LeadsAsked } from "@/type/interfaces/leads";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const useLeads = () => {
  return useMutation({
    mutationFn: askLeadsService.createLeadsRequisites,
  });
};

const useUpdateLeads = () => {
  return useMutation({ mutationFn: askLeadsService.updateLeadsRequisites });
};

export const AskLeads: React.FC = () => {
  const brandId = useNumericParam("brandId");
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [maxAttempts, setMaxAttempts] = useState<number>(1);
  const [minGap, setMinGap] = useState<number>(0); // in ms
  const leadsRequisites = useQuery({
    queryKey: ["leadsRequisites", brandId] as const,
    enabled: !!brandId,
    queryFn: ({ queryKey }) => {
      const [, brandId] = queryKey;
      return askLeadsService.getLeadsRequisites({ brandId: brandId! });
    },
  });

  const { mutate, isPending: isSubmitting } = useLeads();
  const { mutate: update, isPending: isUpdatePending } = useUpdateLeads();
  console.log(leadsRequisites);
  useEffect(() => {
    if (leadsRequisites.data) {
      const {
        maxGenerationAttemptsPerProspect,
        minGapBetweenPerGenerationAttempt,
        requirements,
      } = leadsRequisites.data as LeadsAsked;
      setRequirements(requirements.length ? requirements : [""]);
      setMaxAttempts(maxGenerationAttemptsPerProspect);
      setMinGap(minGapBetweenPerGenerationAttempt);
    }
  }, [leadsRequisites.data]);

  const handleRequirementChange = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const removeRequirement = (index: number) => {
    if (requirements.length === 1) return;
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandId) return;

    const leadsAsked = {
      requirements,
      maxGenerationAttemptsPerProspect: maxAttempts,
      minGapBetweenPerGenerationAttempt: minGap,
    };

    const isUpdate = !!leadsRequisites.data;

    const onSuccess = () => {
      alert(`${isUpdate ? "Updated" : "Created"} lead requisites successfully`);
    };

    const onError = () => {
      alert(`Failed to ${isUpdate ? "update" : "submit"} lead requisites`);
    };

    if (isUpdate) {
      update({ brandId, updates: leadsAsked }, { onSuccess, onError });
    } else {
      mutate(
        { leadsAsked, brandId },
        {
          onSuccess: () => {
            setRequirements([""]);
            setMaxAttempts(1);
            setMinGap(0);
            onSuccess();
          },
          onError,
        }
      );
    }
  };

  if (!brandId || leadsRequisites.isPending) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-6 bg-white shadow rounded-xl space-y-6"
    >
      <h2 className="text-xl font-semibold">Create Lead Settings</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Requirements
        </label>
        {requirements.map((req, i) => (
          <div key={i} className="flex gap-2 mt-1">
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={req}
              onChange={(e) => handleRequirementChange(i, e.target.value)}
              placeholder={`Requirement ${i + 1}`}
              required
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={() => removeRequirement(i)}
              className="text-red-500"
              disabled={isSubmitting}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRequirement}
          className="mt-2 text-sm text-blue-600 hover:underline"
          disabled={isSubmitting}
        >
          + Add Requirement
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Max Generation Attempts Per Prospect
        </label>
        <input
          type="number"
          className="mt-1 w-full border rounded-md p-2"
          value={maxAttempts}
          onChange={(e) => setMaxAttempts(Number(e.target.value))}
          min={1}
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Minimum Gap Between Attempts (minutes)
        </label>
        <input
          type="number"
          className="mt-1 w-full border rounded-md p-2"
          value={minGap}
          onChange={(e) => setMinGap(Number(e.target.value))}
          min={0}
          required
          disabled={isSubmitting}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 disabled:opacity-50"
        disabled={isSubmitting || isUpdatePending}
      >
        {isSubmitting || isUpdatePending
          ? "Submitting..."
          : leadsRequisites.data
          ? "Update"
          : "Submit"}
      </button>
    </form>
  );
};
