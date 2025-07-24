import API_BASE_URL from "@/constants";
import { Integration } from "@/type/interfaces/integration";

export const integrationService = {
  fetchIntegrations: async function (): Promise<Integration[]> {
    const ENDPOINT = API_BASE_URL + "/integrations";
    const res = await fetch(ENDPOINT);
    if (!res.ok) throw new Error("Failed to fetch integrations");
    return res.json();
  },
};
