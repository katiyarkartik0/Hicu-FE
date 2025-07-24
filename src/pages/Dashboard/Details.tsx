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
      <div className="w-full h-auto p-7 border rounded-md mb-4">
        <div className="mb-4">
          <h2 className="font-semibold text-2xl">Brand Information</h2>
          <p className="font-light text-gray-500">
            Update your brand details and settings
          </p>
        </div>
        <div className="mb-4">
          <label className="font-semibold text-sm">Brand Name</label>
          <input
            className="font-light text-gray-500 border p-2 w-full rounded-md mt-2"
            value={"HiCu Inc."}
          ></input>
        </div>
        <div className="mb-4">
          <label className="font-semibold text-sm">Website</label>
          <input
            className="font-light text-gray-500 border p-2 w-full rounded-md mt-2"
            value={"HiCu.com"}
          ></input>
        </div>
        <div className="">
          <label className="font-semibold text-sm">Description</label>
          <input
            className="font-light text-gray-500 border p-2 w-full rounded-md mt-2"
            value={"Description"}
          ></input>
        </div>
      </div>
      <div className="w-full h-auto p-7 border rounded-md mb-4">
        <div className="mb-4">
          <h2 className="font-semibold text-2xl">Subscription Details</h2>
          <p className="font-light text-gray-500">
            Your current plan and billing information
          </p>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2">
            <p className="text-md text-sm text-grey-500">Current Plan</p>
            <p className="font-semibold text-lg">Business Pro</p>
          </div>
          <div className="w-1/2">
            <p className="text-md text-sm text-grey-500">Billing Cycle</p>
            <p className="font-semibold text-lg">Monthly</p>
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/2">
            <p className="text-md text-sm text-grey-500">Next Billing Date</p>
            <p className="font-semibold text-lg">May 27, 2025</p>
          </div>
          <div className="w-1/2">
            <p className="text-md text-sm text-grey-500">Amount</p>
            <p className="font-semibold text-lg">$50/Month</p>
          </div>
        </div>
        <button className="px-5 py-2 border border-2 rounded-md" type="submit">
          Change Plan
        </button>
      </div>
      <div className="w-full h-auto p-7 border rounded-md mb-4">
        <div className="mb-4">
          <h2 className="font-semibold text-2xl">Pinecone</h2>
          <p className="font-light text-gray-500">
            Synchronize Pinecone and Shopify
          </p>
          <button
            onClick={handleSyncClick}
            className="px-5 py-2 rounded-md text-white bg-blue-600 mx-1"
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
