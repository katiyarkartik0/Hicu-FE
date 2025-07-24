export interface Member {
  id: number;
  name: string;
  email: string;
}

export interface AuthContextType {
  memberDetails: Member | null;
  accessToken: string | null;
  setMemberDetails: React.Dispatch<React.SetStateAction<Member | null>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  loading: boolean;
}
