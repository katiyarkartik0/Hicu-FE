import React from "react";
import { useMutation } from "@tanstack/react-query";

import { useNumericParam } from "@/hooks/react-router";

import { instagramService } from "@/services/instagram";

import queryClient from "@/api/queryClient";
import Profile from "./Profile";
import Posts from "./Posts";

const Page: React.FC = () => {
  const brandId = useNumericParam("brandId");
  if (!brandId) {
    return "";
  }

  const syncProfile = useMutation({
    mutationFn: instagramService.syncProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["brand", brandId],
      });
    },
  });

  const syncPosts = useMutation({
    mutationFn: instagramService.syncPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", brandId],
      });
    },
  });

  const handleSyncProfile = async () => {
    await syncProfile.mutateAsync(brandId);
  };

  const hanldeSyncPosts = async () => {
    await syncPosts.mutateAsync(brandId);
  };

  return (
    <>
      <div className="flex space-x-2 mt-4 md:mt-0">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          onClick={handleSyncProfile}
        >
          <span>Sync Profile</span>
        </button>

        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2"
          onClick={hanldeSyncPosts}
        >
          <span>Sync Posts</span>
        </button>
      </div>
      <Profile />
      <Posts />
    </>
  );
};

export default Page;
