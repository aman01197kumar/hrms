import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);

  const navigate = useNavigate()

  const handleClock = () => {
    setIsClockedIn((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md px-4 sm:px-6 py-3 flex justify-between items-center">

      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-bold">
          HR
        </div>
        <h1 className="text-sm sm:text-lg font-semibold text-gray-800 whitespace-nowrap">
          HRMS Portal
        </h1>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Clock Button */}
        <button
          onClick={handleClock}
          className={`px-2 sm:px-4 py-2 rounded-lg text-white text-xs sm:text-sm transition whitespace-nowrap ${isClockedIn
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
            }`}
        >
          {isClockedIn ? "Clock Out" : "Clock In"}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-2 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:bg-gray-100 whitespace-nowrap"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default Header;