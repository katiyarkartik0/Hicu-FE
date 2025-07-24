import { lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";

const Automation = lazy(() => import("@/pages/Automation"));
const Instagram = lazy(() => import("@/pages/Automation/Providers/Instagram"));
const CommentAutomationForm = lazy(() => import("@/pages/Automation/Providers/Instagram/CommentAutomationForm"));

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
      path: "instagram/create/:mediaId",
      element: <CommentAutomationForm />,
    },
  ],
};

export default automationRoutes;
