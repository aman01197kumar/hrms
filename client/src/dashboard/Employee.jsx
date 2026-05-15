import { useEffect, useState } from "react";
import TaskSection from "../component/TaskSection";
import Header from "../layout/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function EmployeeDashboard() {
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [employee, setEmployee] = useState({});
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [updatedStatus, setUpdatedStatus] = useState("");
    const [duration, setDuration] = useState("");
    const [notes, setNotes] = useState("");

    const BASE_URL = import.meta.env.VITE_API_URL;

    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/get-employee-info`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            setEmployee(response?.data?.employee || {});
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }


    const fetchMyTasks = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tasks/get-my-tasks`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });
            setTasks(response?.data?.tasks || []);
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchEmployeeData();
        fetchMyTasks();
    }, []);


    const handleClock = () => {
        setIsClockedIn((prev) => !prev);
    };

    const openModal = (task) => {
        setSelectedTask(task);
        setUpdatedStatus(task.status);
        setDuration("");
        setNotes("");
    };

    const closeModal = () => {
        setSelectedTask(null);
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
                    }
                    : task
            )
        );

        closeModal();
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-6">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Employee Dashboard
                    </h1>

                    <button
                        onClick={handleClock}
                        className={`px-4 py-2 rounded-lg font-medium transition 
            ${isClockedIn
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-green-500 hover:bg-green-600 text-white"
                            }`}
                    >
                        {isClockedIn ? "Clock Out" : "Clock In"}
                    </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* EMPLOYEE INFO */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Employee Details
                        </h2>

                        <p className="text-sm text-gray-600">
                            <strong>Employee ID:</strong> {employee.employeeId}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Name:</strong> {employee.name}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Email:</strong> {employee.email}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Role:</strong> {employee.role}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Department:</strong> {employee.department}
                        </p>

                        <div className="mt-4 border-t pt-3">
                            <p className="text-sm text-gray-600">
                                <strong>Reporting Manager:</strong>
                            </p>
                            <p className="text-indigo-600 font-medium">
                                {employee.manager}
                            </p>
                        </div>
                    </div>

                    {/* TASK SECTION */}
                    <div className="bg-white p-5 rounded-xl shadow md:col-span-2">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Assigned Tasks
                        </h2>

                        <TaskSection tasks={tasks} setTasks={setTasks} />
                    </div>
                </div>

                {/* EXTRA SECTION */}
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {/* ATTENDANCE */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Attendance
                        </h2>

                        <p className="text-sm text-gray-600">
                            Today Status:
                            <span
                                className={`ml-2 font-medium ${isClockedIn ? "text-green-600" : "text-red-500"
                                    }`}
                            >
                                {isClockedIn ? "Working" : "Not Clocked In"}
                            </span>
                        </p>
                    </div>

                    {/* QUICK ACTIONS */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">
                            Quick Actions
                        </h2>

                        <div className="flex flex-col gap-3">
                            <button className="py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                Apply Leave
                            </button>

                            <button className="py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                                View Payslip
                            </button>

                            <button className="py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <Toaster />
        </>
    );
}