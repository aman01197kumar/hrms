import React from 'react'

const PendingTasks = ({ setShowModal, pendingTasks }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-[700px] p-6 rounded-xl shadow-lg">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Pending Tasks
                    </h2>

                    <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="p-2 border">Task Title</th>
                                <th className="p-2 border">Assigned To</th>
                                <th className="p-2 border">Employee ID</th>
                                <th className="p-2 border">Status</th>
                                <th className="p-2 border">Deadline</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pendingTasks.map((task) => (
                                <tr key={task.id} className="text-center">
                                    <td className="p-2 border">{task.title}</td>
                                    <td className="p-2 border">{task.assignedTo}</td>
                                    <td className="p-2 border">{task.employeeId}</td>
                                    <td className="p-2 border">
                                        <span
                                            className={`px-2 py-1 rounded text-xs ${task.status === "Completed"
                                                ? "bg-green-100 text-green-600"
                                                : task.status === "In Progress"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="p-2 border">{task.deadline}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PendingTasks
