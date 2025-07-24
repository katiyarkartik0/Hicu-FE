import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { useQuery } from "@tanstack/react-query";
import { prospectsService } from "@/services/prospects";
import { useNumericParam } from "@/hooks/react-router";
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

type Prospect = {
  id: number;
  userId: string;
  username?: string;
  accountId: number;
  details: JSONValue;
};

export const Prospects: React.FC = () => {
  const brandId = useNumericParam("brandId");

  const { data: prospects, isPending } = useQuery({
    queryKey: ["prospects", brandId] as const,
    enabled: !!brandId,
    queryFn: ({ queryKey }) => {
      const [, brandId] = queryKey;
      return prospectsService.fetchAllProspect(brandId!);
    },
  });

  if (isPending)
    return (
      <div className="text-white p-4 animate-pulse">Loading prospects...</div>
    );
  if (prospects.length === 0)
    return <div className="text-yellow-400 p-4">No prospects found.</div>;

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {prospects.map((prospect: Prospect) => (
        <Card key={prospect.id} prospect={prospect} />
      ))}
    </div>
  );
};
