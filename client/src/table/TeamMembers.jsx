import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setSelectedEmployee } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const TeamMembers = ({ employees, setShowAssignModal }) => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase())
    );

    const viewEmployeeDetailsHandler = (emp) => {
        dispatch(setSelectedEmployee(emp));
        navigate(`/view-employee/${emp.employeeId}`);
    }

    const assignTaskHandler = (emp) => {
        dispatch(setSelectedEmployee(emp));
        setShowAssignModal(true);
    };

    return (
        <div className="bg-white p-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    Team Members
                </h2>

                <input
                    type="text"
                    placeholder="Search employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-1 rounded-lg text-sm"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">

                    {/* Header */}
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="p-3">Employee ID</th>
                            <th className="p-3">Employee Name</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* Body */}

                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr
                                key={emp.employeeId}
                                className="border-b hover:bg-gray-50 transition"
                            >

                                {/* Employee ID */}
                                <td className="p-3 font-medium text-gray-800">
                                    {emp.employeeId}
                                </td>
                                {/* Employee Name */}
                                <td className="p-3 font-medium text-gray-800">
                                    {emp.name}
                                </td>

                                {/* Role */}
                                <td className="p-3 text-gray-500">
                                    {emp.role}
                                </td>

                                {/* Status */}
                                <td className="p-3">
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-medium ${emp.status === "Active"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        {emp.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="p-3">
                                    <div className="flex justify-center gap-3">


                                        <button className="text-indigo-600 text-sm border border-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                                            onClick={() => viewEmployeeDetailsHandler(emp)}>
                                            View
                                        </button>

                                        <button
                                            onClick={() => assignTaskHandler(emp)}
                                            className="text-indigo-600 text-sm border border-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                                        >
                                            Assign
                                        </button>

                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TeamMembers
