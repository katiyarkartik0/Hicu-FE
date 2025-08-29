import React from "react";
import { useQuery } from "@tanstack/react-query";

import { useNumericParam } from "@/hooks/react-router";

import Loader from "@/components/ui/Loader";

import type { IgUserProfile, MediaItem } from "@/type/interfaces/instagram";
import brandService from "@/services/brands";

const Profile: React.FC = () => {
  const brandId = useNumericParam("brandId");
  if (!brandId) {
    return "";
  }

  const brand = useQuery({
    queryFn: () => brandService.getBrandById(brandId),
    queryKey: ["brand", brandId],
  });

  if (brand.isPending) {
    return <Loader />;
  }
  const user = brand.data as IgUserProfile;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-8 w-full ml-[12px]">
        <div className="flex items-center space-x-4">
          <img
            src={user.igProfilePictureUrl || "/placeholder-profile.png"}
            alt={`${user.igUsername}'s profile`}
            className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover outline outline-2 outline-grey-91 outline-offset-2"
          />
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <h2 className="text-[16px] md:text-[24px] text-grey-18 font-bold text-left">@{user.igUsername}</h2>
            <div className="flex justify-center md:justify-start space-x-3 md:space-x-6 mt-2 text-sm">
              <span>
                <strong>{user.igMediaCount}</strong> posts
              </span>
              <span>
                <strong>{user.igFollowersCount}</strong> followers
              </span>
              <span>
                <strong>{user.igFollowingCount}</strong> following
              </span>
            </div>
            <div className="mt-3">
              <p className="font-semibold text-[12px] md:text-[16px] text-grey-2c text-left">{user.igName}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
