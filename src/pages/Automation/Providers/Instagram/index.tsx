import { useState } from "react";
import Page from "./Page";
import Button from "@/components/ui/Button";
import Leads from "./Leads/Leads";
import DmAutomationForm from "./DmAutomationForm";

const TABS = [
  {
    key: "page",
    label: "Page",
    component: Page,
  },
  {
    key: "dmAutomation",
    label: "DM Automation",
    component: DmAutomationForm,
  },
  {
    key: "leads",
    label: "Leads Generation",
    component: Leads,
  },
  // Add more tiles here easily in future
];

export default function () {
  const [activeTab, setActiveTab] = useState("page");

  const ActiveComponent =
    TABS.find((tab) => tab.key === activeTab)?.component || (() => <></>);

  return (
    <>
      <div className="w-full flex">
        <div className="w-full">
          <div className="flex justify-center">
            <div className="h-full w-[95%]">
              <div className="w-full bg-grey-ef rounded-lg p-2 flex justify-center items-center">
                <div className="w-full h-full flex justify-between items-center gap-2 text-grey-18">
                  {TABS.map((tab) => (
                    <Button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`${
                        activeTab === tab.key ? "bg-white" : ""
                      } rounded-md font-medium w-full border-none text-[13px] sm:text-[16px]`}
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
    </>
  );
}
