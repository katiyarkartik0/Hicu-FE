import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useNumericParam } from "@/hooks/react-router";

import { automationService } from "@/services/automation";
import { instagramService } from "@/services/instagram";

import Post from "@/components/providers/instagram/Post";
import Loader from "@/components/ui/Loader";

import type {
  IgCommentAutomation,
} from "@/type/interfaces/automation";
import type { MediaItem, UserProfile } from "@/type/interfaces/instagram";

const Page: React.FC = () => {
  const brandId = useNumericParam("brandId");
  if (!brandId) {
    return "";
  }
  const instagram = useQuery({
    queryFn: () => instagramService.getProfileDetails({ brandId }),
    queryKey: ["instgramProfile", brandId],
  });

  const automations = useQuery({
    queryFn: () => automationService.getAllIgCommentAutomations({ brandId }),
    queryKey: ["automations", brandId],
  });

  if (instagram.isPending || automations.isPending) {
    return <Loader />;
  }
  const user: UserProfile = instagram.data;
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
        <img
          src={user.profilePictureUrl}
          alt={`${user.username}'s profile`}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto md:mx-0"
        />
        <div className="mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-2xl font-semibold">@{user.username}</h2>
          <div className="flex justify-center md:justify-start space-x-6 mt-2 text-sm">
            <span>
              <strong>{user.mediaCount}</strong> posts
            </span>
            <span>
              <strong>{user.followersCount}</strong> followers
            </span>
            <span>
              <strong>{user.followsCount}</strong> following
            </span>
          </div>
          <div className="mt-3">
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600">
              Account Type: {user.accountType}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 mt-8">
        {user.media?.data.map((post: MediaItem) => {
          const isAutomationRunning: boolean =
            automations.data?.some(
              ({ mediaId }: IgCommentAutomation) => mediaId === post.id
            ) || false;
          console.log(isAutomationRunning);
          return post.mediaType === "IMAGE" ? (
            <Post post={post} isAutomationRunning={isAutomationRunning} />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Page;
