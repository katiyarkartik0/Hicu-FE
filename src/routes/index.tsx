import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import brandRoutes from "./brands";

const Root = lazy(() => import("@/components/Root"));
const Authentication = lazy(() => import("@/pages/Authentication"));
const About = lazy(() => import("@/pages/About"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Authentication />,
      },
      {
        path: "about",
        element: <About />,
      },
      brandRoutes,
    ],
  },
];

export default routes;
