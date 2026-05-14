import axios from 'axios';
import React from 'react'
import { useSelector } from 'react-redux';

const AssignTask = ({ setShowAssignModal, taskData, setTaskData }) => {

    const employee = useSelector((state) => state.user.selectedEmployee);

    const assignTaskHandler = async () => {
        try {
            const response = await axios.post('http://localhost:3000/tasks/assign-task', {
                employeeId: employee.employeeId,
                title: taskData.title,
                description: taskData.description,
                deadline: taskData.deadline,
                priority: taskData.priority
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`
                    }
                });
            console.log("Task Assigned:", response?.data);
            setShowAssignModal(false);

        } catch (error) {
            console.error("Error assigning task:", error);
        }
    };
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={() => setShowAssignModal(false)}
        >
            <div
                className="bg-white w-[600px] p-6 rounded-2xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Assign Task</h2>
                    <button
                        onClick={() => setShowAssignModal(false)}
                        className="text-gray-500 hover:text-black"
                    >
                        ✕
                    </button>
                </div>

                {/* Employee Info */}
                <div className="bg-gray-100 p-3 rounded-lg mb-4 text-sm">
                    <p><strong>Employee ID:</strong> {employee?.employeeId || employee?.id}</p>
                    <p><strong>Name:</strong> {employee?.name}</p>
                    <p><strong>Job Profile:</strong> {employee?.jobProfile || employee?.role}</p>

                </div>

                {/* Form */}
                <div className="space-y-4">
                    {/* Task Title */}
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={taskData.title}
                        onChange={(e) =>
                            setTaskData({ ...taskData, title: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                    />

                    {/* Description */}
                    <textarea
                        placeholder="Task Description"
                        value={taskData.description}
                        onChange={(e) =>
                            setTaskData({ ...taskData, description: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                    />

                    {/* Deadline */}
                    <p className='font-semibold'>Deadline</p>
                    <input
                        type="date"
                        value={taskData.deadline}
                        onChange={(e) =>
                            setTaskData({ ...taskData, deadline: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                    />

                    {/* Priority */}
                    <p className='font-semibold'>Priority</p>
                    <select
                        value={taskData.priority}
                        onChange={(e) =>
                            setTaskData({ ...taskData, priority: e.target.value })
                        }
                        className="w-full p-2 border rounded-lg"
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={() => setShowAssignModal(false)}
                        className="px-4 py-2 border rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={assignTaskHandler}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        Assign
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AssignTask
