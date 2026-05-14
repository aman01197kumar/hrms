import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeOnboardingModal from "../modal/EmployeeOnboarding";
import ManagerAssignment from "../modal/ManagerAssignment";

const AdminHeader = ({ employees, managers }) => {
    const [showAssignModal, setShowAssignModal] = useState(false);
    const[showOnboardModal, setShowOnboardModal] = useState(false);

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b">

            {/* Left Section - Logo */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-lg font-bold">
                    HR
                </div>
                <h1 className="text-lg font-semibold text-gray-800">
                    HRMS Portal
                </h1>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">

                {/* Manager Assignment */}
                <button
                    onClick={() => setShowAssignModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                    Manager Assignment
                </button>

                {/* Add Employee */}
                <button
                    onClick={() => setShowOnboardModal(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                    Employee Onboarding
                </button>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100"
                >
                    Logout
                </button>

            </div>
            {showAssignModal && <ManagerAssignment employees={employees} managers={managers} setShowAssignModal={setShowAssignModal} />}
            {showOnboardModal && <EmployeeOnboardingModal isOpen={showOnboardModal} onClose={() => setShowOnboardModal(false)} />}
        </header>
    );
};

export default AdminHeader;