import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const ManagerAssignment = ({ employees, managers, setShowAssignModal }) => {

    const [employeeSearch, setEmployeeSearch] = useState("");
    const [managerId, setManagerId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [managerSearch, setManagerSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const BASE_URL = import.meta.env.VITE_API_URL;

    const filteredManagers = managers.filter((mgr) => {
        const q = managerSearch.toLowerCase();
        return (
            (mgr.name?.toLowerCase?.() || "").includes(q) ||
            (mgr.mgrId?.toLowerCase?.() || "").includes(q)
        );
    });

    const filteredEmployeesList = employees.filter((emp) => {
        const q = employeeSearch.toLowerCase();
        return (
            (emp.name?.toLowerCase?.() || "").includes(q) ||
            (emp.employeeId?.toLowerCase?.() || "").includes(q)
        );
    });

    const assignManagerToEmployeeHandler = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(`${BASE_URL}/users/assign-manager`, { employeeId, managerId })
            toast.success(response?.data?.message);
            setShowAssignModal(false);
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-3"
            onClick={() => setShowAssignModal(false)}
        >
            <div
                className="bg-white w-full max-w-md md:max-w-lg p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-base md:text-xl font-semibold">
                        Assign Manager
                    </h2>
                    <button
                        onClick={() => setShowAssignModal(false)}
                        className="text-sm md:text-base"
                    >
                        ✕
                    </button>
                </div>

                {/* Manager Section */}
                <div className="mb-4">
                    <p className="text-xs md:text-sm mb-1">Select Manager</p>

                    <input
                        type="text"
                        placeholder="Search manager..."
                        className="w-full p-2 border rounded mb-2 text-sm"
                        value={managerSearch}
                        onChange={(e) => setManagerSearch(e.target.value)}
                    />

                    <div className="border rounded max-h-32 overflow-y-auto">
                        {filteredManagers.map((mgr) => (
                            <div
                                key={mgr.employeeId}
                                onClick={() => {
                                    setManagerId(mgr.employeeId);
                                    setManagerSearch(`${mgr.name} (${mgr.employeeId})`);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-xs md:text-sm"
                            >
                                {mgr.name} ({mgr.employeeId})
                            </div>
                        ))}
                    </div>
                </div>

                {/* Employee Section */}
                <div className="mb-4">
                    <p className="text-xs md:text-sm mb-1">Select Employee</p>

                    <input
                        type="text"
                        placeholder="Search employee..."
                        className="w-full p-2 border rounded mb-2 text-sm"
                        value={employeeSearch}
                        onChange={(e) => setEmployeeSearch(e.target.value)}
                    />

                    <div className="border rounded max-h-32 overflow-y-auto">
                        {filteredEmployeesList.map((emp) => (
                            <div
                                key={emp.empId}
                                onClick={() => {
                                    setEmployeeId(emp.employeeId);
                                    setEmployeeSearch(`${emp.name} (${emp.employeeId})`);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer text-xs md:text-sm"
                            >
                                {emp.name} ({emp.employeeId})
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col md:flex-row justify-end gap-2 md:gap-3">
                    <button
                        onClick={() => setShowAssignModal(false)}
                        className="w-full md:w-auto px-4 py-2 border rounded-lg text-sm"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={assignManagerToEmployeeHandler}
                        className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                    >
                        {isLoading ? "Assigning..." : "Assign"}
                    </button>
                </div>
            </div>

            <Toaster />
        </div>
    )
}

export default ManagerAssignment
