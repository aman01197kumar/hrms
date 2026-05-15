import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const SelectedTask = ({ selectedTask, setShowModal }) => {
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [duration, setDuration] = useState("");
    const [notes, setNotes] = useState("");
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_URL;

    const handleFileChange = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    const removeFile = () => {
        setFile(null);
    };

    const handleSave = async () => {
        const formData = new FormData();

        formData.append("status", updatedStatus);
        formData.append("note", notes);

        if (updatedStatus === "Completed") {
            formData.append("duration", duration);
        }

        if (file) {
            formData.append("file", file); // MUST match multer field name
        }

        try {
            setIsLoading(true);
            const response = await axios.patch(
                `${BASE_URL}/tasks/update-task/${selectedTask._id}`,
                formData,
            );
            toast.success(response?.data?.message);
            closeModal();
        } catch (err) {
            toast.error(err?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white w-96 p-6 rounded-xl shadow-lg space-y-4">
                <h2 className="text-lg font-semibold">
                    {selectedTask.title}
                </h2>

                <p className="text-sm text-gray-600">
                    {selectedTask.description}
                </p>

                {/* STATUS */}
                <div>
                    <p className="text-sm font-medium mb-2">Update Status</p>
                    <div className="flex gap-3 text-sm">
                        {["Pending", "In Progress", "Completed"].map((status) => (
                            <label key={status} className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    value={status}
                                    checked={updatedStatus === status}
                                    onChange={(e) => setUpdatedStatus(e.target.value)}
                                />
                                {status}
                            </label>
                        ))}
                    </div>
                </div>

                {/* DURATION */}
                {updatedStatus === "Completed" && (
                    <div>
                        <label className="text-sm">Work Duration (hrs)</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full mt-1 px-2 py-1 border rounded"
                        />
                    </div>
                )}

                {/* FILE UPLOAD */}
                <div>
                    <label className="text-sm font-medium">Upload File</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full mt-1 text-sm"
                    />

                    {file && (
                        <div className="flex justify-between items-center mt-2 bg-gray-100 px-2 py-1 rounded">
                            <span className="text-xs">{file.name}</span>
                            <button
                                onClick={removeFile}
                                className="text-red-500 text-xs"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>

                {/* NOTES */}
                <div>
                    <label className="text-sm">Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full mt-1 px-2 py-1 border rounded"
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setShowModal(false)}
                        className="px-3 py-1 bg-gray-200 rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-indigo-600 text-white rounded"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default SelectedTask
