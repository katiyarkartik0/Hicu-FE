export type MediaItem = {
  id: string;
  mediaType: string;
  mediaUrl: string;
  caption?: string;
  timestamp: string;
};

export type UserProfile = {
  id: string;
  name: string;
  username: string;
  profilePictureUrl: string;
  followersCount: number;
  followsCount: number;
  mediaCount: number;
  accountType: string;
  media: {
    data: MediaItem[];
  };
};
