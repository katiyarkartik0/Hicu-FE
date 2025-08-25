import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useNumericParam } from "@/hooks/react-router";

import { automationService } from "@/services/automation";

import Loader from "@/components/ui/Loader";
import { instagramService } from "@/services/instagram";
import { MediaItem } from "@/type/interfaces/instagram";
import { IgCommentAutomation } from "@/type/interfaces/automation";
import Post from "@/components/providers/instagram/Post";

const Posts: React.FC = () => {
  const brandId = useNumericParam("brandId");
  if (!brandId) {
    return "";
  }

  const automations = useQuery({
    queryFn: () => automationService.getAllIgCommentAutomations({ brandId }),
    queryKey: ["automations", brandId],
  });

  const posts = useQuery({
    queryFn: () => instagramService.fetchAllPosts({ brandId }),
    queryKey: ["posts", brandId],
  });

  if (automations.isPending || posts.isPending) {
    return <Loader />;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-1 mt-8">
        {posts.data.map((post: MediaItem) => {
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
    </>
  );
};

export default Posts;
