import React, { useState } from 'react'

const TaskAssigned = () => {
    const [search, setSearch] = useState("");

    const tasksData = [
        {
            empId: "EMP101",
            empName: "Aman Kumar",
            jobProfile: "Frontend Developer",
            title: "Build Login UI",
            status: "Completed",
        },
        {
            empId: "EMP102",
            empName: "Riya Sharma",
            jobProfile: "Backend Developer",
            title: "API Integration",
            status: "In Progress",
        },
        {
            empId: "EMP103",
            empName: "Rahul Verma",
            jobProfile: "Full Stack Developer",
            title: "Dashboard Module",
            status: "Pending",
        },
    ];

    const filteredEmployees = tasksData.filter((task) => {
        const query = search.toLowerCase();

        return (
            task.empName.toLowerCase().includes(query) ||
            task.empId.toLowerCase().includes(query) ||
            task.title.toLowerCase().includes(query)
        );
    });
    return (
        <div className="bg-white shadow overflow-hidden mt-6 p-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    Task Assigned
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
                            <th className="p-3">Job Profile</th>
                            <th className="p-3">Task Title</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {filteredEmployees.map((task, index) => (
                            <tr
                                key={index}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="p-3">{task.empId}</td>
                                <td className="p-3 font-medium text-gray-800">
                                    {task.empName}
                                </td>
                                <td className="p-3 text-gray-500">
                                    {task.jobProfile}
                                </td>
                                <td className="p-3">{task.title}</td>

                                {/* Status Badge */}
                                <td className="p-3">
                                    <span
                                        className={`text-xs px-3 py-1 rounded-full font-medium ${task.status === "Completed"
                                            ? "bg-green-100 text-green-600"
                                            : task.status === "In Progress"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {task.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <div className="flex justify-center">

                                        <a
                                            href={`/view-employee/${task.empId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <button className="text-indigo-600 text-sm border border-indigo-600 px-3 py-1 rounded-lg hover:bg-indigo-600 hover:text-white transition">
                                                View
                                            </button>
                                        </a>


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

export default TaskAssigned
