import { useState } from "react";
import Button from "@/components/ui/Button";
import Details from "./Details";
import Collaborator from "./Collaborator";
import Integrations from "./Integrations/Integrations";

const TABS = [
  {
    key: "brand",
    label: "Brand Details",
    component: Details,
  },
  {
    key: "collaborators",
    label: "Collaborators",
    component: Collaborator,
  },
  {
    key: "integrations",
    label: "Integrations",
    component: Integrations,
  },
  // Add more tiles here easily in future
];
function Dashboard() {
  const [activeTab, setActiveTab] = useState("integrations");

  const ActiveComponent =
    TABS.find((tab) => tab.key === activeTab)?.component || Details;

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
                    onClick={() => setActiveTab(tab.key)}
                    className={`${
                      activeTab === tab.key ? "bg-white" : ""
                    } rounded-md font-medium w-full border-none`}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="w-full h-[80%] mt-[2%] border-b-2 flex flex-col justify-between overflow-scroll items-center">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
