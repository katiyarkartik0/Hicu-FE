import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import type { Prospect } from "@/pages/Analytics/Prospects";

export const prospectsService = {
  async fetchAllProspects(brandId: number) {
    const accountId = brandId;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const response = await fetch(`${API_BASE_URL}/prospects/${accountId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Failed to fetch all the prospects (HTTP ${response.status})`
      );
    }

    return result.data;
  },
  async fetchProspect({
    brandId,
    userId,
  }: {
    brandId: number;
    userId: string;
  }):Promise<Prospect> {
    const accountId = brandId;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const response = await fetch(
      `${API_BASE_URL}/prospects?accountId=${accountId}&userId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Failed to fetch prospect (HTTP ${response.status})`
      );
    }
console.log(result,"fkajhdfkjlhahfja")
    return result.data;
  },
};
