import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils"

const memberService = {
    getMemberById:async function(){
        const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        const res = await fetch(`${API_BASE_URL}/accounts/${accountId}/members`, {
          method: "POST",
          body: JSON.stringify({ memberId, status, scope }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
    
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to add member");
        return data;
    }
}