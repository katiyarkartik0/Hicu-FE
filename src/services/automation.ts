import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import type {
  Automation,
  IgCommentAutomation,
  IgDmAutomation,
} from "@/type/interfaces/automation";

export const automationService = {
  async createIgCommentAutomation({
    automation,
    brandId,
  }: {
    automation: Omit<IgCommentAutomation, "id" | "accountId">;
    brandId: number;
  }): Promise<IgCommentAutomation> {
    const accountId = brandId;
    const ENDPOINT = API_BASE_URL + `/automations/igComment`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ ...automation, accountId }),
      headers: {
        "Content-Type": "application/json",
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

  async getAllIgCommentAutomations({
    brandId,
  }: {
    brandId: number;
  }): Promise<IgCommentAutomation[]> {
    const accountId = brandId;
    const ENDPOINT =
      API_BASE_URL + `/automations/igComment?accountId=${accountId}`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const response = await fetch(ENDPOINT, {
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

  async createIgDmAutomation({
    automation,
    brandId,
  }: {
    automation: Omit<IgDmAutomation, "id" | "accountId">;
    brandId: number;
  }): Promise<IgCommentAutomation> {
    const accountId = brandId;
    const ENDPOINT = API_BASE_URL + `/automations/igDm`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify({ ...automation, accountId }),
      headers: {
        "Content-Type": "application/json",
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

  async getAllAutomations({
    brandId,
  }: {
    brandId: number;
  }): Promise<Automation[]> {
    const accountId = brandId;
    const ENDPOINT = API_BASE_URL + `/automations?accountId=${accountId}`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const response = await fetch(ENDPOINT, {
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

  async getAutomationByMediaId(
    mediaId: string
  ): Promise<(Automation & { id: number }) | null> {
    if (!mediaId) {
      throw new Error("Media ID is required");
    }

    const ENDPOINT = `${API_BASE_URL}/automations/${mediaId}`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    if (!accessToken) {
      throw new Error("Access token not found. Please log in again.");
    }

    try {
      const response = await fetch(ENDPOINT, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
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
    } catch (err: any) {
      console.error("Error fetching automation by mediaId:", err);
      throw new Error(
        err?.message || "Something went wrong while fetching automation"
      );
    }
  },
  async deleteAutomation(id: number) {
    const ENDPOINT = API_BASE_URL + `/automations/${id}`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await fetch(ENDPOINT, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.log(e);
      data = null;
    }
    if (!res.ok || !data)
      throw new Error(data?.message || "Failed to delete automation");
    return data;
  },
};
