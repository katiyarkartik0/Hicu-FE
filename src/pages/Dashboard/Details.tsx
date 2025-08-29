import { useNumericParam } from "@/hooks/react-router";
import { pineconeService } from "@/services/pinecone";
import { useQuery } from "@tanstack/react-query";

function Details() {
  const brandId = useNumericParam("brandId");
  if (!brandId) {
    return "";
  }
  const sync = useQuery({
    queryFn: () => pineconeService.syncPineconeAndShopify({ brandId }),
    queryKey: ["syncPineconeAndShopify", brandId],
    enabled: false,
  });
  const handleSyncClick = () => {
    sync.refetch();
  };

  return (
    <>
      <div className="w-full h-auto p-7 border border-grey-ef rounded-md mb-4">
        <div className="mb-4">
          <h2 className="font-bold text-[24px] text-grey-2c">
            Brand Information
          </h2>
          <p className="text-grey-91 text-[14px]">
            Update your brand details and settings
          </p>
        </div>
        <div className="mb-4">
          <label className="font-semibold text-[14px] text-grey-2c">Brand Name</label>
          <input
            className="font-light text-gray-ef border p-2 w-full rounded-md mt-[4px] text-[14px]"
            value={"HiCu Inc."}
          ></input>
        </div>
        <div className="mb-4">
          <label className="font-semibold text-[14px] text-grey-2c">Website</label>
          <input
            className="font-light text-gray-ef border p-2 w-full rounded-md mt-[4px] text-[14px]"
            value={"HiCu.com"}
          ></input>
        </div>
        <div className="">
          <label className="font-semibold text-[14px] text-grey-2c">Description</label>
          <input
            className="font-light text-gray-ef border p-2 w-full rounded-md mt-[4px] text-[14px]"
            value={"Description"}
          ></input>
        </div>
      </div>
      <div className="w-full h-auto p-7 border border-grey-ef rounded-md mb-4">
        <div className="mb-4">
          <h2 className="font-bold text-[24px] text-grey-2c">
            Subscription Details
          </h2>
          <p className="font-light text-gray-500">
            Your current plan and billing information
          </p>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2">
            <p className="text-[14px] text-grey-2c">Current Plan</p>
            <p className="font-semibold text-[14px] text-grey-18">Business Pro</p>
          </div>
          <div className="w-1/2">
            <p className="text-[14px] text-grey-2c">Billing Cycle</p>
            <p className="font-semibold text-[14px] text-grey-18">Monthly</p>
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2">
            <p className="text-[14px] text-grey-2c">Next Billing Date</p>
            <p className="font-semibold text-[14px] text-grey-18">May 27, 2025</p>
          </div>
          <div className="w-1/2">
            <p className="text-[14px] text-grey-2c">Amount</p>
            <p className="font-semibold text-[14px] text-grey-18">$50/Month</p>
          </div>
        </div>
        <button className="px-5 py-2 border border-grey-2c text-grey-2c text-[14px] font-semibold rounded-md hover:bg-grey-2c hover:text-white active:bg-grey-2c active:text-white" type="submit">
          Change Plan
        </button>
      </div>
      <div className="w-full h-auto p-7 border border-grey-ef rounded-md mb-4">
        <div className="mb-4">
          <h2 className="font-bold text-[24px] text-grey-2c">Pinecone</h2>
          <p className="font-light text-gray-500">
            Synchronize Pinecone and Shopify
          </p>
          <button
            onClick={handleSyncClick}
            className="px-5 py-2 rounded-md text-white bg-grey-2c hover:bg-grey-18 active:bg-grey-18 mt-3"
          >
            {sync.isLoading ? "Syncing..." : "Sync Pinecone and Shopify"}
          </button>
          {sync.isError && <p>Sync failed. Please try again.</p>}
          {sync.data && !sync.isLoading && !sync.isError && (
            <p>Sync completed successfully!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Details;
