import API_BASE_URL from "@/constants";
// import { Integration } from "@/type/interfaces/integration";

export const pineconeService = {
  syncPineconeAndShopify: async function ({
    brandId,
  }: {
    brandId: number;
  }): Promise<any> {
    const accountId = brandId;
    const ENDPOINT = API_BASE_URL + `/pinecone/upsert?accountId=${accountId}`;
    const res = await fetch(ENDPOINT);
    if (!res.ok) throw new Error("Failed to fetch integrations");
    return res.json();
  },
};
