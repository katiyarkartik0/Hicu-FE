import React from "react";
import { useQuery } from "@tanstack/react-query";
import { prospectsService } from "@/services/prospects";
import { useNumericParam } from "@/hooks/react-router";
import { Tile } from "@/components/analytics/prospect/Tile";
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export type Prospect = {
  id: number;
  userId: string;
  username?: string;
  accountId: number;
  details: JSONValue;
};

export const Prospects: React.FC = () => {
  const brandId = useNumericParam("brandId");
  if (!brandId) {
    return null;
  }

  const { data: prospects, isPending } = useQuery({
    queryKey: ["prospects", brandId] as const,
    enabled: !!brandId,
    queryFn: ({ queryKey }) => {
      const [, brandId] = queryKey;
      return prospectsService.fetchAllProspects(brandId);
    },
  });

  if (isPending)
    return (
      <div className="text-white p-4 animate-pulse">Loading prospects...</div>
    );
  if (prospects.length === 0)
    return <div className="text-yellow-400 p-4">No prospects found.</div>;

  return (
    <div className="gap-4">
      {prospects.map((p: Prospect) => (
        <Tile key={p.id} prospect={p} />
      ))}
    </div>
  );
};
