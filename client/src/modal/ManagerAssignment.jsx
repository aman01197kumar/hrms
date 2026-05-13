import axios from 'axios';
import React, { useState } from 'react'

const ManagerAssignment = ({ employees, managers, setShowAssignModal }) => {

    const [employeeSearch, setEmployeeSearch] = useState("");
    const [managerId, setManagerId] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [managerSearch, setManagerSearch] = useState("");


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
        console.log(employeeId, managerId)
        if (!managerId || !employeeId) {
            alert("Please select both fields");
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/users/assign-manager', { employeeId, managerId })
            console.log(response?.data)
        }
        catch (error) {
            console.error("Error assigning manager:", error.message);
            // alert("Failed to assign manager. Please try again.");
        }
    }
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={() => setShowAssignModal(false)}
        >
            <div
                className="bg-white w-[500px] p-6 rounded-2xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Assign Manager</h2>
                    <button onClick={() => setShowAssignModal(false)}>✕</button>
                </div>

                {/* Manager Dropdown */}
                <div className="mb-4">
                    <p className="text-sm mb-1">Select Manager</p>

                    <input
                        type="text"
                        placeholder="Search manager..."
                        className="w-full p-2 border rounded mb-2"
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
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                                {mgr.name} ({mgr.employeeId})
                            </div>
                        ))}
                    </div>
                </div>

                {/* Employee Dropdown */}
                <div className="mb-4">
                    <p className="text-sm mb-1">Select Employee</p>

                    <input
                        type="text"
                        placeholder="Search employee..."
                        className="w-full p-2 border rounded mb-2"
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
                                className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                                {emp.name} ({emp.employeeId})
                            </div>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setShowAssignModal(false)}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        // onClick={() => {
                        //     if (!selectedManager || !selectedEmployee) {
                        //         alert("Please select both fields");
                        //         return;
                        //     }

                        //     console.log("Assigned:", {
                        //         manager: selectedManager,
                        //         employee: selectedEmployee,
                        //     });

                        //     setShowAssignModal(false);
                        //     setManagerSearch("");
                        //     setEmployeeSearch("");
                        //     setSelectedManager("");
                        //     setSelectedEmployee("");
                        // }}
                        onClick={assignManagerToEmployeeHandler}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Assign
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ManagerAssignment
