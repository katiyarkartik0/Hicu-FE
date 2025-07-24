import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import { MemberStatus } from "@/type/enums/auth";
import { BrandInfo } from "@/type/interfaces/brands";

export const brandMemberService = {
  addMemberToBrand: async ({
    brandId: accountId,
    memberId,
    status,
    scope,
  }: {
    brandId: number;
    memberId: number;
    status: MemberStatus;
    scope: string[];
  }) => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await fetch(`${API_BASE_URL}/account-member`, {
      method: "POST",
      body: JSON.stringify({ accountId, memberId, status, scope }),
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
    if (!res.ok || !data)
      throw new Error(data?.message || "Failed to add member");
    return data;
  },
  listMembersOfAccount: async (brandId: number) => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const accountId = brandId;
    const res = await fetch(`${API_BASE_URL}/accounts/${accountId}/members`, {
      method: "GET",
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
      throw new Error(data?.message || "Failed to fetch members");
    return data;
  },
  listBrandsOfMember: async (memberId: number): Promise<BrandInfo[]> => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const res = await fetch(
      `${API_BASE_URL}/account-member/accounts/${memberId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.log(e);
      data = null;
    }
    if (!res.ok || !data)
      throw new Error(data?.message || "Failed to fetch member's accounts");
    return data;
  },
  updateMemberInBrand: async (
    brandMemberId: number,
    update: { status?: MemberStatus; scope?: string[] }
  ) => {
    const accountMemberId = brandMemberId;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const res = await fetch(
      `${API_BASE_URL}/accounts/members/${accountMemberId}`,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.log(e);
      data = null;
    }
    if (!res.ok || !data)
      throw new Error(data?.message || "Failed to update member");
    return data;
  },
  removeMemberFromAccount: async (brandMemberId: number) => {
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
    const accountMemberId = brandMemberId;
    const res = await fetch(
      `${API_BASE_URL}/accounts/members/${accountMemberId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    let data;
    try {
      data = await res.json();
    } catch (e) {
      console.log(e);
      data = null;
    }
    if (!res.ok || !data)
      throw new Error(data?.message || "Failed to remove member from account");
    return data;
  },
};
