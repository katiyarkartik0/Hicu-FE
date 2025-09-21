import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import type { BrandInfo } from "@/type/interfaces/brands";

const brandService = {
  createBrand: async (
    brandInfo: Omit<BrandInfo, "id">
  ): Promise<BrandInfo> => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: "POST",
      body: JSON.stringify(brandInfo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to add new brand");
    }

    const result = await response.json();
    return result.data; // unwrap the { data } object from backend
  },

  getAllBrands: async (): Promise<BrandInfo[]> => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch accounts");
    }

    const result = await response.json();
    return result.data;
  },

  getBrandById: async (id: number): Promise<BrandInfo> => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch account");
    }

    const result = await response.json();
    return result.data;
  },

  updateBrand: async (id: number, payload: BrandInfo): Promise<BrandInfo> => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to update account");
    }

    const result = await response.json();
    return result.data;
  },

  deleteBrand: async (id: number): Promise<BrandInfo> => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const response = await fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete account");
    }

    const result = await response.json();
    return result.data; // return the deleted brand object
  },
};

export default brandService;
