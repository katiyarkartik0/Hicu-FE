// components/Root.tsx
// import queryClient from "@/api/queryClient";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();

  useEffect(() => {
    // Global logic: page tracking, auth checks, etc.
    // console.log("Route changed:", location.pathname);
    // queryClient.refetchQueries({type:"active"})
    // Example: analytics.pageView(location.pathname);
  }, [location]);

  return (
    <>
      {/* Shared UI components like toast, modals, etc. */}
      {/* <ToastContainer /> */}
      <Outlet />
    </>
  );
};

export default Root;