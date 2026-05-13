import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);

  const navigate = useNavigate()

  const handleClock = () => {
    setIsClockedIn((prev) => !prev);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // add logout logic here
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">

      {/* Logo / Company Name */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-bold">
          HR
        </div>
        <h1 className="text-lg font-semibold text-gray-800">
          HRMS Portal
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Clock In / Out Button */}
        <button
          onClick={handleClock}
          className={`px-4 py-2 rounded-lg text-white text-sm transition ${isClockedIn
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
            }`}
        >
          {isClockedIn ? "Clock Out" : "Clock In"}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default Header;