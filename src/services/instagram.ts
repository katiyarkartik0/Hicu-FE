import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";

export const instagramService = {
  fetchAllPosts: async () => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const res = await fetch(`${API_BASE_URL}/instagram/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.error(e);
      data = null;
    }

    if (!res.ok || !data) {
      throw new Error(data?.message || "Failed to fetch all posts");
    }

    return data;
  },

  fetchPostByMediaId: async (mediaId: string) => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const res = await fetch(`${API_BASE_URL}/instagram/post/${mediaId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.error(e);
      data = null;
    }

    if (!res.ok || !data) {
      throw new Error(data?.message || "Failed to fetch post by media ID");
    }

    return data;
  },

  async getProfileDetails({ brandId }: { brandId: number }) {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const accountId = brandId;
    const res = await fetch(
      `${API_BASE_URL}/instagram/profile?accountId=${accountId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.error(e);
      data = null;
    }

    if (!res.ok || !data) {
      throw new Error(data?.message || "Failed to fetch post by media ID");
    }

    return data;
  },
};