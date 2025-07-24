import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import type { Configurations } from "@/type/interfaces/configurations";

export const configurationsService = {
  upsertBrandConfiguration: async function ({
    id,
    brandId,
    integrationId,
    config,
  }: {
    id?: number;
    brandId: number;
    integrationId: number;
    config: any;
  }) {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const accountId = brandId;
    const ENDPOINT = API_BASE_URL + `/configurations/upsert`;
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id, config, accountId, integrationId }),
    });
    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.log(e);
      data = null;
    }
    if (!res.ok || !data)
      throw new Error("Failed to create brandIntegration configuraion");
    return res.json();
  },
  getConfigurationsForBrand: async function ({
    brandId,
  }: {
    brandId: number;
  }): Promise<Configurations[]> {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  
    if (!accessToken) {
      throw new Error("No access token found");
    }
  
    const params = new URLSearchParams({ accountId: brandId.toString() });
    const ENDPOINT = `${API_BASE_URL}/configurations/all?${params.toString()}`;
  
    const res = await fetch(ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    let data;
  
    try {
      data = await res.json();
    } catch (err) {
      console.error("Failed to parse JSON response", err);
      throw new Error("Invalid JSON response");
    }
  
    if (!res.ok) {
      throw new Error(data?.message || `Request failed with status ${res.status}`);
    }
  
    return data;
  },
  
};
