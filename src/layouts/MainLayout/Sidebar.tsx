import { Link } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useNumericParam } from "@/hooks/react-router";

import { brandMemberService } from "@/services/brandMember";
import { useAuth } from "@/hooks/auth";

import SidebarLink from "@/components/ui/SidebarLink";

import {
  MenuIcon,
  ChartSpline,
  Users,
  Bell,
  Plus,
  CreditCard,
  Settings,
  X,
  Workflow,
} from "lucide-react";

import type { BrandInfo } from "@/type/interfaces/brands";
import ListBox from "@/components/ui/ListBox";

const useBrandsQuery = function () {
  const { memberDetails } = useAuth();

  return useQuery({
    queryKey: ["brands"],
    enabled: !!memberDetails, // prevent fetching when memberDetails is null
    queryFn: () => {
      if (!memberDetails) throw new Error("No member details");
      return brandMemberService.listBrandsOfMember(memberDetails.id);
    },
    refetchOnWindowFocus: false,
  });
};

function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const brands = useBrandsQuery();
  const brandId = useNumericParam("brandId");

  const defaultBrand = brands?.data?.find((b: BrandInfo) => b.id === brandId);

  const getIcon = (svg: string | null) =>
    svg ? (
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    ) : (
      <div className="rounded-full w-5 h-5 flex items-center justify-center bg-neutral-900" />
    );

  const brandList =
    brands.data?.map((brand: BrandInfo) => {
      const icon = getIcon(brand.svgIcon);
      return {
        icon,
        label: brand.name,
        element: (
          <SidebarLink
            end={false}
            to={`/brand/${brand.id}`}
            icon={icon}
            label={brand.name}
          />
        ),
      };
    }) || [];

  const defaultBrandItem = defaultBrand
    ? {
        icon: getIcon(defaultBrand.svgIcon),
        label: defaultBrand.name,
        element: (
          <SidebarLink
            end={false}
            to={`/brand/${defaultBrand.id}`}
            icon={getIcon(defaultBrand.svgIcon)}
            label={defaultBrand.name}
          />
        ),
      }
    : undefined;

  return (
    <>
      {!isMobileOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
          onClick={() => setIsMobileOpen(true)}
        >
          <MenuIcon size={24} />
        </button>
      )}

      <div
        className={`fixed z-40 top-0 left-0 h-full w-60 md:static md:translate-x-0 md:block border p-5 bg-white flex flex-col justify-between items-center transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-60`}
      >
        <div className="w-full flex items-center justify-between md:hidden mb-4">
          <Link to="dashboard" className="font-bold text-lg px-1 text-grey-18">
            HiCu
          </Link>
          <button onClick={() => setIsMobileOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="hidden md:block w-full mb-4">
          <Link to="/dashboard" className="font-bold text-lg px-1 text-grey-18">
            HiCu
          </Link>
        </div>

        <div className="w-full flex-1 overflow-y-auto">
          <div className="my-2 flex flex-col gap-2">
            <ListBox items={brandList} defaultItem={defaultBrandItem} />
            <SidebarLink
              to=""
              icon={<MenuIcon strokeWidth={1.5} size={18} />}
              label="Dashboard"
            />
            <SidebarLink
              to="analytics"
              end={false}
              icon={<ChartSpline strokeWidth={1.5} size={18} />}
              label="Analytics"
            />
            <SidebarLink
              end={false}
              to="automation"
              icon={<Workflow strokeWidth={1.5} size={18} />}
              label="Automation"
            />
            <SidebarLink
              end={false}
              to="/brand/register"
              icon={<Plus strokeWidth={1.5} size={18} />}
              label="Add new"
            />
          </div>

          <h2 className="text-sm px-2 font-bold mt-6 text-grey-2c">Account</h2>
          <div className="my-2 flex flex-col gap-2">
            <SidebarLink
              end={false}
              to="notification"
              icon={<Bell strokeWidth={1.5} size={18} />}
              label="Notifications"
            />
            <SidebarLink
              end={false}
              to="billing"
              icon={<CreditCard strokeWidth={1.5} size={18} />}
              label="Billing"
            />
            <SidebarLink
              end={false}
              to="profile"
              icon={<Settings strokeWidth={1.5} size={18} />}
              label="Profile"
            />
          </div>
        </div>

        <div className="w-full text-center text-xs mt-4">
          <p>&copy; 2025 Hicu.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
