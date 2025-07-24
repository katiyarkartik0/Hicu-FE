import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <div className="h-16 px-4 border-b flex items-center justify-between w-full">
      <div className="w-full md:w-[40%] relative">
        <input
          type="text"
          className="border h-10 pl-10 pr-3 rounded-md w-full text-sm"
          placeholder="Search..."
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      <div className="flex items-center gap-4 ml-4">
        <Bell className="w-5 h-5 text-gray-600" />
        <div className="w-8 h-8 bg-black rounded-full"></div>
      </div>
    </div>
  );
}

export default Navbar;
