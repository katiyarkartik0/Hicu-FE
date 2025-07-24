import { AuthContextType } from "@/type/interfaces/auth";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

