import React from 'react'

const AssignTask = ({ setShowAssignModal, taskData, setTaskData }) => {
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
                    <p><strong>Employee ID:</strong> EMP101</p>
                    <p><strong>Name:</strong> Aman Kumar</p>
                    <p><strong>Job Profile:</strong> Frontend Developer</p>
                    <p><strong>Manager:</strong> Rahul Sharma</p>
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
                        onClick={() => {
                            console.log("Task Assigned:", taskData);
                            setShowAssignModal(false);
                            setTaskData({
                                title: "",
                                description: "",
                                deadline: "",
                                priority: "Medium",
                            });
                        }}
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
