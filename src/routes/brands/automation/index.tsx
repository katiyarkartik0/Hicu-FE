import AutomationBuilder from "@/pages/Automation/Providers/Instagram/CommentAutomationBuilder";
import AutomationList from "@/pages/Automation/Providers/Instagram/CommentAutomation";
import { lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";

const Automation = lazy(() => import("@/pages/Automation"));
const Instagram = lazy(() => import("@/pages/Automation/Providers/Instagram"));

const automationRoutes: RouteObject = {
  path: "automation",
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Automation />,
    },
    {
      path: "instagram",
      element: <Instagram />,
    },
    {
      path: "instagram/comment/create/:mediaId",
      element: <AutomationList />,
    },
    {
      path: "instagram/create/:mediaId/buildAutomation/:automationId",
      element: <AutomationBuilder />,
    },
  ],
};

export default automationRoutes;
