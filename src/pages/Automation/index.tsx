import Button from "@/components/ui/Button";
import { useState } from "react";
import Providers from "./Providers";
const TABS = [
  {
    key: "providers",
    label: "Providers",
    component: Providers,
  }
  // Add more tiles here easily in future
];

const Automation = () => {
  const [activeTab, setActiveTab] = useState("providers");
  
  const ActiveComponent =
    TABS.find((tab) => tab.key === activeTab)?.component || (() => <></>);

  

  return (
    <div>
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
    </div>
  );
};

export default Automation;
