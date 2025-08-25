export type MediaItem = {
  id: string;
  mediaType: string;
  mediaUrl: string;
  caption?: string;
  timestamp: string;
};


export type IgUserProfile = {
  igUserId: string;
  igName: string;
  igUsername: string;
  igBiography: string;
  igProfilePictureUrl: string;
  igFollowersCount: number;
  igFollowingCount: number;
  igMediaCount: number;
  igAccountType: string;
};
