export interface BrandInfo {
  id: number;
  name: string;
  description?: string | null;
  website?: string | null;
  svgIcon?: string | null;
  createdAt: Date;
  updatedAt: Date;
  igUserId?: string | null;
  igUsername?: string | null;
  igFollowersCount?: number | null;
  igFollowingCount?: number | null;
  igMediaCount?: number | null;
  igName?: string | null;
  igBiography?: string | null;
  igProfilePictureUrl?: string | null;
  igAccountType?: string | null;
}
