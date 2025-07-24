import React, { createContext, useState, useEffect, ReactNode } from "react";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import type { AuthContextType, Member } from "@/type/interfaces/auth";

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [memberDetails, setMemberDetails] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true); // 👈 new loading state

  useEffect(() => {
    const raw = storage.get(LOCAL_STORAGE_KEY.MEMBER_DETAILS);
    const token = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setMemberDetails(parsed);
      } catch (err) {
        console.error(err);
        storage.remove(LOCAL_STORAGE_KEY.MEMBER_DETAILS);
      }
    }

    if (token) {
      setAccessToken(token);
    }

    setLoading(false); // 👈 done loading
  }, []);
  return (
    <AuthContext.Provider
      value={{
        memberDetails,
        setMemberDetails,
        accessToken,
        setAccessToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
