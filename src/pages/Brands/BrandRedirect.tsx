import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth";
import { brandMemberService } from "@/services/brandMember";
import Loader from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";

const useBrandsQuery = function () {
  const { memberDetails } = useAuth();

  return useQuery({
    queryKey: ["brands"],
    enabled: !!memberDetails, // run only if memberDetails exists
    queryFn: () => {
      if (!memberDetails) throw new Error("No member details");
      return brandMemberService.listBrandsOfMember(memberDetails.id);
    },
    refetchOnWindowFocus: false,
  });
};

function BrandRedirect() {
  const brands = useBrandsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!brands.isLoading && !brands.isFetching && brands.data) {
      if (brands.data.length > 0) {
        navigate(`/brand/${brands.data[0].id}`, { replace: true });
      } else {
        navigate("/brand/register", { replace: true });
      }
    }
  }, [brands.isLoading, brands.isFetching, brands.data, navigate]);

  return <Loader />;
}

export default BrandRedirect;
