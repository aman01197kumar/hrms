import React from 'react'

const ActiveEmployees = ({ setShowEmployeesModal, activeEmployees }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={() => setShowEmployeesModal(false)}
        >
            <div
                className="bg-white w-[800px] p-6 rounded-2xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Active Employees</h2>
                    <button
                        onClick={() => setShowEmployeesModal(false)}
                        className="text-gray-500 hover:text-black text-lg"
                    >
                        ✕
                    </button>
                </div>
            
                {/* Table */}
                <div className="overflow-y-auto max-h-[400px]">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left text-sm">
                                <th className="p-3">Employee ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Check-in Time</th>
                                <th className="p-3">Task Assigned</th>
                            </tr>
                        </thead>

                        <tbody>
                            {activeEmployees.map((emp, index) => (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="p-3">{emp.id}</td>
                                    <td className="p-3">{emp.name}</td>
                                    <td className="p-3">{emp.checkIn}</td>
                                    <td className="p-3">{emp.task}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="mt-4 text-right">
                    <button
                        onClick={() => setShowEmployeesModal(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ActiveEmployees
