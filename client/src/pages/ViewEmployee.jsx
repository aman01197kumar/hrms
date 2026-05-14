import React, { useState } from "react";
import { useSelector } from 'react-redux';
import AssignTask from "../modal/AssignTask";

const ViewEmployee = () => {
    const [showAssignModal, setShowAssignModal] = useState(false);

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        deadline: "",
        priority: "Medium",
    });

    // Get selected employee from Redux
    const employee = useSelector((state) => state.user.selectedEmployee);

    const tasks = [
        {
            title: "Build Login Page",
            status: "Completed",
            deadline: "10 May 2026",
            duration: "5 hrs",
            file: "login_ui.zip",
        },
        {
            title: "Dashboard UI",
            status: "In Progress",
            deadline: "15 May 2026",
            duration: "8 hrs",
            file: "—",
        },
    ];

    const workingHours = [
        {
            date: "10 May",
            duration: "8 hrs",
            status: "In Office",
        },
        {
            date: "9 May",
            duration: "6 hrs",
            status: "WFH",
        },
        {
            date: "8 May",
            duration: "—",
            status: "Leave",
        },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen space-y-6">
            {/* ================= EMPLOYEE DETAILS ================= */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4">Employee Details</h2>
                {employee ? (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><strong>ID:</strong> {employee.employeeId || employee.id}</p>
                        <p><strong>Name:</strong> {employee.name}</p>
                        <p><strong>Job Profile:</strong> {employee.jobProfile || employee.role}</p>
                        <p><strong>Joining Date:</strong> {employee.joiningDate || '--'}</p>
                        <p><strong>Employment Type:</strong> {employee.employmentType || '--'}</p>
                        <p><strong>Shift Timing:</strong> {employee.shift || '--'}</p>
                        <p><strong>Email:</strong> {employee.email || '--'}</p>
                        <p><strong>Phone:</strong> {employee.phone || '--'}</p>
                    </div>
                ) : (
                    <div className="text-gray-500">No employee selected.</div>
                )}
            </div>

            {/* ================= TASK TABLE ================= */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-xl font-semibold ">Task Details</h2>
                    <button className="text-indigo-600 text-sm border border-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition">
                        Assign Task
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3">Task</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Deadline</th>
                                <th className="p-3">Duration</th>
                                <th className="p-3">Files</th>
                            </tr>
                        </thead>

                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{task.title}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${task.status === "Completed"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-yellow-100 text-yellow-600"
                                                }`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{task.deadline}</td>
                                    <td className="p-3">{task.duration}</td>
                                    <td className="p-3 text-blue-600 cursor-pointer">
                                        {task.file}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= SALARY STRUCTURE ================= */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4">Salary Structure</h2>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><strong>Base Salary:</strong> ₹50,000</p>
                    <p><strong>HRA:</strong> ₹20,000</p>
                    <p><strong>Bonus:</strong> ₹10,000</p>
                    <p><strong>Deductions:</strong> ₹5,000</p>
                    <p><strong>Net Salary:</strong> ₹75,000</p>
                </div>
            </div>

            {/* ================= WORKING HOURS ================= */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4">Working Hours</h2>

                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-3">Date</th>
                            <th className="p-3">Duration</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {workingHours.map((day, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                                <td className="p-3">{day.date}</td>
                                <td className="p-3">{day.duration}</td>
                                <td className="p-3">{day.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= EXTRA FEATURES ================= */}

            {/* Performance Section */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4">Performance</h2>

                <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-100 p-4 rounded-xl">
                        <p className="text-sm">Tasks Completed</p>
                        <h3 className="text-lg font-bold">24</h3>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl">
                        <p className="text-sm">On-Time Delivery</p>
                        <h3 className="text-lg font-bold text-green-600">92%</h3>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-xl">
                        <p className="text-sm">Late Tasks</p>
                        <h3 className="text-lg font-bold text-red-500">3</h3>
                    </div>
                </div>
            </div>

            {/* Documents */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4">Documents</h2>

                <ul className="space-y-2 text-blue-600">
                    <li className="cursor-pointer">📄 Offer Letter</li>
                    <li className="cursor-pointer">📄 ID Proof</li>
                    <li className="cursor-pointer">📄 Resume</li>
                </ul>
            </div>
            {showAssignModal && <AssignTask setShowAssignModal={setShowAssignModal} taskData={taskData} setTaskData={setTaskData} />}
        </div>
    );
};

export default ViewEmployee;    