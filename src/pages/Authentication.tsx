import Form from "@/components/auth/Form";
import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";

function Authentication() {
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="w-full h-[86%] flex justify-center items-center">
        <div className="w-[95%] h-full flex justify-between items-center">
          <div className="w-1/2 h-1/2 flex flex-col justify-between">
            <h2 className="font-bold text-6xl">
              Grow your business with more customers
            </h2>
            <p className="text-2xl text-gray-500">
              Our platform helps you attract, engage, and retain more customers
              with powerful tools and actionable insights.
            </p>
            <div className="w-full h-1/3 flex justify-between items-center">
              <div className="flex">
                <div className="w-12 h-full flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#3B82F6"
                    className="size-10 bg-blue-100 p-1 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Customer Acquisition</h3>
                  <p>Attract new customers with targeted campaigns</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-12 h-full flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#3B82F6"
                    className="size-10 bg-blue-100 p-1 rounded-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Growth Analytics</h3>
                  <p>Track performance with real-time insights</p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div className="w-1/2 h-4/5 flex justify-center items-center">
            <Form />
          </div>
        </div>
      </div>{" "}
      <Footer />
    </div>
  );
}

export default Authentication;
