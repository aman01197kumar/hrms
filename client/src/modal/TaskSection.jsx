import { useState } from "react";

export default function TaskSection({ tasks, setTasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null); // NEW

  const openModal = (task) => {
    setSelectedTask(task);
    setUpdatedStatus(task.status);
    setDuration(task.duration || "");
    setNotes(task.notes || "");
    setFile(task.file || null); // load existing file
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSave = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              status: updatedStatus,
              duration: updatedStatus === "Completed" ? duration : "",
              notes,
              file, // SAVE FILE
            }
          : task
      )
    );

    closeModal();
  };

  return (
    <>
      {/* TASK LIST */}
      <div className="bg-white p-5 rounded-xl shadow md:col-span-2">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">
          Assigned Tasks
        </h2>

        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => openModal(task)}
              className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <span className="text-gray-700">{task.title}</span>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                  ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : task.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
              >
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedTask && (
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
                onClick={closeModal}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}