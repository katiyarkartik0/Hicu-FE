import Button from "@/components/ui/Button";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const TABS: { key: string; label: string }[] = [
  {
    key: "prospect",
    label: "Prospect",
  },
  {
    key: "post",
    label: "Post",
  },
  {
    key: "automation",
    label: "Automation",
  },
  // Add more tiles here easily in future
];
function Analytics() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // get the last part of the URL
  const activeTabKey = pathname.split("/").pop() || "prospect";
  return (
    <div className="w-full flex">
      <div className="w-full">
        <div className="flex justify-center">
          <div className="h-full w-[95%]">
            <div className="w-full bg-gray-100 rounded-lg p-2 flex justify-center items-center">
              <div className="w-full h-full flex justify-between items-center gap-2">
                {TABS.map((tab) => (
                  <Button
                    key={tab.key}
                    onClick={() => navigate(tab.key)}
                    className={`${
                      activeTabKey === tab.key ? "bg-white" : ""
                    } rounded-md font-medium w-full border-none`}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
