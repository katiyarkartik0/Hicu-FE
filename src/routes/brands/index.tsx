import { lazy } from "react";
import AuthGuard from "@/auth/AuthGuard";
import { RouteObject } from "react-router-dom";
import automationRoutes from "./automation";
import Analytics from "@/pages/Analytics";

const BrandPage = lazy(() => import("@/pages/Brands/BrandPage"));
const BrandRedirect = lazy(() => import("@/pages/Brands/BrandRedirect"));
const RegisterBrand = lazy(() => import("@/pages/Brands/Register"));
const MainLayout = lazy(() => import("@/layouts/MainLayout"));
const Dashboard = lazy(() => import("../../pages/Dashboard"));

const brandRoutes: RouteObject = {
  path: "brand",
  element: (
    <AuthGuard>
      <BrandPage />
    </AuthGuard>
  ),
  children: [
    {
      index: true,
      element: <BrandRedirect />,
    },
    {
      path: "register",
      element: <RegisterBrand />,
    },
    {
      path: ":brandId",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "analytics",
          element: <Analytics/>,
        },
        automationRoutes,
      ],
    },
  ],
};

export default brandRoutes;
