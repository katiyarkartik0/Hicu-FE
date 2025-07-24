import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";

export const prospectsService = {
  async fetchAllProspect(brandId: number) {
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
          `Failed to fetch automation (HTTP ${response.status})`
      );
    }

    return result.data;
  },
};
