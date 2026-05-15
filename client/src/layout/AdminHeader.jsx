import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeOnboardingModal from "../modal/EmployeeOnboarding";
import ManagerAssignment from "../modal/ManagerAssignment";

const AdminHeader = ({ employees, managers }) => {
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showOnboardModal, setShowOnboardModal] = useState(false);

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <header className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-6 py-4 bg-white shadow-md border-b gap-3">

            {/* Left Section - Logo */}
            <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-9 h-9 md:w-10 md:h-10 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-bold">
                        HR
                    </div>
                    <h1 className="text-base md:text-lg font-semibold text-gray-800">
                        HRMS Portal
                    </h1>
                </div>

                {/* Mobile Logout */}
                <button
                    onClick={handleLogout}
                    className="md:hidden px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>

            {/* Right Section - Actions */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-3">

                <button
                    onClick={() => setShowAssignModal(true)}
                    className="bg-indigo-600 text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-lg hover:bg-indigo-700 w-full md:w-auto"
                >
                    Manager Assignment
                </button>

                <button
                    onClick={() => setShowOnboardModal(true)}
                    className="bg-indigo-600 text-white px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm rounded-lg hover:bg-indigo-700 w-full md:w-auto"
                >
                    Employee Onboarding
                </button>

                {/* Desktop Logout */}
                <button
                    onClick={handleLogout}
                    className="hidden md:block px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>

            {showAssignModal && (
                <ManagerAssignment
                    employees={employees}
                    managers={managers}
                    setShowAssignModal={setShowAssignModal}
                />
            )}

            {showOnboardModal && (
                <EmployeeOnboardingModal
                    isOpen={showOnboardModal}
                    onClose={() => setShowOnboardModal(false)}
                />
            )}
        </header>
    );
};

export default AdminHeader;