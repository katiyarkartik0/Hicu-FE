import { useAuth } from "@/hooks/auth";
import type { Member } from "@/type/interfaces/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const {
    accessToken,
    memberDetails,
    loading,
  }: {
    accessToken: string | null;
    memberDetails: Member | null;
    loading: boolean;
  } = useAuth();

  useEffect(() => {
    if (!loading && (!accessToken || !memberDetails)) {
      navigate("/");
    }
  }, [loading, accessToken, memberDetails]);
  if (loading) {
    return "Loading...";
  }
  return <>{children}</>;
}

export default AuthGuard;
