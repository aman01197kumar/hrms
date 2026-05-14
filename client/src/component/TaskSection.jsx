import { useState } from "react";
import SelectedTask from "../modal/SelectedTask";

export default function TaskSection({ tasks, setTasks }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false)


  const closeModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  const selectTaskHandler = (task) => {
    setSelectedTask(task);
    setShowModal(true)
  }
  // console.log(tasks)

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
              onClick={() => selectTaskHandler(task)}
              className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <span className="text-gray-700">{task.title}</span>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium
                  ${task.status === "Completed"
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
      {selectedTask && <SelectedTask selectedTask={selectedTask} setShowModal={setShowModal} />}
    </>
  );
}