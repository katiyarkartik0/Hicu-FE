import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import { IgCommentAutomation } from "@/type/interfaces/igCommentAutomation";

export const igCommentAutomationService = {
  createAutomation: async ({
    automation,
    brandId,
  }: {
    automation: {
      name?: string;
      mediaId: string;
      commentAutomationId?: number;
    };
    brandId: number;
  }): Promise<IgCommentAutomation> => {
    const accountId = brandId;
    const ENDPOINT = `${API_BASE_URL}/igCommentAutomation`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const body = { ...automation, accountId };

    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body), // ✅ fix: no nested { body }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Failed to create automation (HTTP ${response.status})`
      );
    }

    return result.data as IgCommentAutomation;
  },

  findAutomationsByMediaId: async ({
    mediaId,
  }: {
    mediaId: string;
  }): Promise<IgCommentAutomation[]> => {
    const ENDPOINT = `${API_BASE_URL}/igCommentAutomation/media/${mediaId}`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const response = await fetch(ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Failed to fetch automations by mediaId (HTTP ${response.status})`
      );
    }

    return result.data as IgCommentAutomation[];
  },
};
