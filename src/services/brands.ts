import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import type { BrandInfo } from "@/type/interfaces/brands";

const brandService = {
  createBrand: async (
    brandInfo: Omit<BrandInfo, "id">
  ): Promise<{
    id: number;
    name: string;
    description?: string;
    website?: string;
    svgIcon?: string;
    createdAt: Date;
    updatedAt: Date;
  }> => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await fetch(`${API_BASE_URL}/accounts`, {
      method: "POST",
      body: JSON.stringify(brandInfo),
      headers: {
        "Content-Type": "application/json",
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
    if (!res.ok || !data) {
      throw new Error(data?.message || "Failed to add new brand");
    }
    return data;
  },

  getAllBrands: async () => {
    const res = await fetch(`${API_BASE_URL}/accounts`);
    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.log(e);
      data = null;
    }
    if (!res.ok || !data)
      throw new Error(data?.message || "Failed to fetch accounts");
    return data;
  },
  getBrandById: async (id: number): Promise<any> => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch account");
    return data;
  },
  updateBrand: async (id: number, payload: BrandInfo) => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to update account");
    return data;
  },
  deleteBrand: async (id: number) => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const res = await fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete account");
    return true;
  },
};

export default brandService;
