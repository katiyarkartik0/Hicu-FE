import Form from "@/components/auth/Form";
import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";

function Authentication() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex flex-col">
        <Navbar />
        <div className="w-full flex justify-center items-center pt-4 flex-grow px-3 md:px-0">
          <div className="w-[95%] lg:w-[80%] h-full flex justify-between items-center flex-col-reverse md:flex-row">
            <div className="md:w-[1/2] w-[100%] md-h-[1/2] h-auto flex flex-col justify-between">
              <h2 className="text-center md:text-left font-bold text-grey-18 text-[32px] md:text-[48px] lg:text-[64px] leading-none mb-2">
                Grow your business with more customers
              </h2>
              <p className="text-center md:text-left text-[14px] md:text-[20px] text-grey-2c font-semibold leading-none mb-4 pl-2 pt-2 pr-[32px]">
                Our platform helps you attract, engage, and retain more
                customers with powerful tools and actionable insights.
              </p>
              <div className="w-full h-1/3 flex justify-between items-center pt-2 pb-4 md:py-4">
                <div className="flex">
                  <div className="w-12 h-full flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="#3B82F6"
                      className="stroke-grey-91 size-8 md:size-10 bg-grey-ef p-1 rounded-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  </div>
                  <div className="pl-2">
                    <h3 className="text-[14px] md:text-[18px] font-bold text-grey-18">Customer Acquisition</h3>
                    <p className="text-[12px] md:text-[14px] text-grey-91">Attract new customers with targeted campaigns</p>
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
                      className="stroke-grey-91 size-8 md:size-10 bg-grey-ef p-1 rounded-full"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                      />
                    </svg>
                  </div>
                  <div className="pl-2">
                    <h3 className="text-[14px] md:text-[18px] font-bold text-grey-18">Growth Analytics</h3>
                    <p className="text-[12px] md:text-[14px] text-grey-91">Track performance with real-time insights</p>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div className=" w-[100%] md:w-1/2 h-4/5 flex justify-center items-center pb-[32px] md:pb-[0] md:pl-[32px]">
              <Form />
            </div>
          </div>
        </div>{" "}
      </div>
      <Footer />
    </div>
  );
}

export default Authentication;
