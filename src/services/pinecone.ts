import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
// import { Integration } from "@/type/interfaces/integration";

export const pineconeService = {
  syncPineconeAndShopify: async function ({
    brandId,
  }: {
    brandId: number;
  }): Promise<any> {
    const accountId = brandId;
    const ENDPOINT = API_BASE_URL + `/pinecone/upsert?accountId=${accountId}`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await fetch(ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch integrations");
    return res.json();
  },
};
