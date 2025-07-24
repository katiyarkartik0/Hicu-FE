import API_BASE_URL from "@/constants";
import { Member } from "@/type/interfaces/auth";

type NewMember = Omit<Member, "id"> & { password: string };

const authService = {
  login: async (
    user: Omit<NewMember, "name">
  ): Promise<{ accessToken: string; member: Member }> => {
    const ENDPOINT = API_BASE_URL + "/auth/login";
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.log(e);
      data = null;
    }

    if (!res.ok || !data) {
      throw new Error(data?.message || "Login failed");
    }

    return data;
  },

  signup: async (
    user: NewMember
  ): Promise<{ accessToken: string; member: Member }> => {
    const ENDPOINT = API_BASE_URL + "/auth/signup";
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.log(e);
      data = null;
    }

    if (!res.ok || !data) {
      throw new Error(data?.message || "Signup failed");
    }

    return data;
  },

  checkCompanyEmail: async (email: string): Promise<{ isValid: boolean }> => {
    const ENDPOINT = API_BASE_URL + `/auth/signup?email=${email}`;
    const res = await fetch(ENDPOINT);

    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.log(e);
      data = null;
    }

    if (!res.ok || !data) {
      throw new Error(data?.message || "Check failed");
    }

    return data;
  },
};

export default authService;
