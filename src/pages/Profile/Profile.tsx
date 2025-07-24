import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className="w-[85%] h-screen">
      <div className="h-[92%] flex justify-center">
        <div className="h-full w-[95%]">
          <div className="w-full h-[10%] border-b-2 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-xl">Profile</h2>
              <p>Manage your account settings and preferences</p>
            </div>
            <div>
              <button className="px-5 py-2 rounded-md border mx-1">
                Cancel
              </button>
              <button className="px-5 py-2 rounded-md text-white bg-blue-600 mx-1">
                Save Changes
              </button>
            </div>
          </div>
          <div className="w-full h-[90%] border-b-2 flex justify-between items-center">
            <div className="w-1/4 h-[95%] flex flex-col justify-between">
              <div className="w-full h-[49%] border rounded-md p-5">
                <div className="flex flex-col h-[80%] justify-between items-center">
                  <div className="w-32 h-32 bg-black rounded-full"></div>
                  <h2 className="font-bold text-2xl">John Doe</h2>
                  <p>john@acemic.com</p>
                  <button
                    disabled={true}
                    className="py-1 px-4 bg-blue-600 text-white rounded-3xl"
                  >
                    Admin
                  </button>
                </div>
                <button className="w-full py-3 border rounded-md mt-3">
                  Change Avatar
                </button>
              </div>
              <div className="w-full h-[49%] border rounded-md p-5">
                <div className="flex flex-col h-[80%] justify-between">
                  <div>
                    <h2 className="font-bold text-2xl">Brand Details</h2>
                    <p className="text-sm text-gray-500">
                      Information about your company
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Acme Inc.</p>
                    <p className="text-sm text-gray-500">acmeinc.com</p>
                  </div>
                  <div>
                    <p className="font-semibold">Plan</p>
                    <p className="text-sm text-gray-500">Business Pro</p>
                  </div>
                  <div>
                    <p className="font-semibold">Billing Cycle</p>
                    <p className="text-sm text-gray-500">Monthly</p>
                  </div>
                </div>
                <Link to="/brand">
                  <button className="w-full py-3 border rounded-md mt-3">
                    Manage Brand
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-1/2 overflow-scroll border h-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
