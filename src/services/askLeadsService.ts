import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import type { Leads as LeadsAsked } from "@/type/interfaces/leads";

export const askLeadsService = {
  async createLeadsRequisites({
    brandId,
    leadsAsked,
  }: {
    brandId: number;
    leadsAsked: Omit<LeadsAsked, "brandId">;
  }): Promise<LeadsAsked & { id: number }> {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const accountId = brandId;
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: "POST",
      body: JSON.stringify({ ...leadsAsked, accountId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    const data: LeadsAsked & { id: number } = {
      ...result.data,
      brandId: result.data.accountId,
    };
    return data;
  },

  async getLeadsRequisites({
    brandId,
  }: {
    brandId: number;
  }): Promise<LeadsAsked & { id: number }> {
    const accountId = brandId;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const response = await fetch(`${API_BASE_URL}/leads/${accountId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result = await response.json();
    console.log(result, "result");
    const data: LeadsAsked & { id: number } = {
      ...result.data,
      brandId: result.data.accountId,
    };
    return data;
  },

  async updateLeadsRequisites({
    brandId,
    updates,
  }: {
    brandId: number;
    updates: Partial<LeadsAsked>;
  }) {
    const accountId = brandId;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    
    const response = await fetch(`${API_BASE_URL}/leads/${accountId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updates),
    });
    const result = await response.json();
    console.log(result, "result");
    const data: LeadsAsked & { id: number } = {
      ...result.data,
      brandId: result.data.accountId,
    };
    return data;
  },
};