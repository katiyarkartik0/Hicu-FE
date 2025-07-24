import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import queryClient from "@/api/queryClient";

import { useAuth } from "@/hooks/auth";
import brandService from "@/services/brands";
import { brandMemberService } from "@/services/brandMember";

import Input from "@/components/ui/Input";

import type { BrandInfo } from "@/type/interfaces/brands";
import { MemberStatus } from "@/type/enums/auth";

const useBrand = function () {
  const { memberDetails } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (brandInfo: Omit<BrandInfo, "id">) => {
      const { id }: { id: number } = await brandService.createBrand(brandInfo);

      if (!memberDetails) {
        navigate("/");
        throw new Error("Unauthorized");
      }

      await brandMemberService.addMemberToBrand({
        brandId: id,
        memberId: memberDetails.id,
        status: MemberStatus.ACTIVE,
        scope: ["SUPER_ADMIN"],
      });
      await queryClient.invalidateQueries({ queryKey: ["brands"] });

      return id;
    },
    onSuccess: (brandId) => {
      navigate(`/brand/${brandId}`);
    },
    onError: (err: any) => {
      console.error(err);
      alert(err.message || "Something went wrong.");
    },
  });
};

const defaultBrandInfo: Omit<BrandInfo, "id"> = {
  name: "",
  svgIcon: "",
  website: "",
  description: "",
};

export default function RegisterBrand() {
  const [brandInfo, setBrandInfo] =
    useState<Omit<BrandInfo, "id">>(defaultBrandInfo);
  const [errors, setErrors] = useState<Partial<Omit<BrandInfo, "id">>>({});
  const brandMutation = useBrand();

  const validate = (): boolean => {
    const newErrors: Partial<BrandInfo> = {};
    if (!brandInfo.name.trim()) newErrors.name = "Brand name is required.";
    if (brandInfo.website && !/^https?:\/\/.+/.test(brandInfo.website)) {
      newErrors.website = "Website must be a valid URL.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setBrandInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    console.log(brandInfo);
    brandMutation.mutate(brandInfo);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white shadow rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Register new Brand</h2>

      <label className="block mb-2 font-medium">
        Brand Name<span className="text-red-500">*</span>
      </label>
      <Input
        value={brandInfo.name}
        name="name"
        placeholder="Enter brand name"
        className="w-full"
        onChange={handleChange}
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
      )}

      <label className="block mb-2 font-medium mt-4">Description</label>
      <textarea
        name="description"
        value={brandInfo.description}
        placeholder="Enter description"
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <label className="block mb-2 font-medium mt-4">Website</label>
      <Input
        type="url"
        name="website"
        value={brandInfo.website}
        placeholder="https://example.com"
        className="w-full"
        onChange={handleChange}
      />
      {errors.website && (
        <p className="text-red-500 text-sm mb-2">{errors.website}</p>
      )}

      <label className="block mb-2 font-medium mt-4">
        SVG Icon (as HTML string)
      </label>
      <textarea
        name="svgIcon"
        value={brandInfo.svgIcon}
        placeholder="<svg>...</svg>"
        onChange={handleChange}
        className="w-full h-36 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      <button
        type="submit"
        disabled={brandMutation.isPending}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {brandMutation.isPending ? "Registering..." : "Register Brand"}
      </button>
    </form>
  );
}
