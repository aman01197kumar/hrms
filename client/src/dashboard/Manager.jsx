import { useEffect, useState } from "react";
import PendingTasks from "../modal/PendingTasks";
import ActiveEmployees from "../modal/ActiveEmployees";
import AssignTask from "../modal/AssignTask";
import TeamMembers from "../table/TeamMembers";
import TaskAssigned from "../table/TaskAssigned";
import Header from "../layout/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ManagerDashboard() {
    const [clockedIn, setClockedIn] = useState(false);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showEmployeesModal, setShowEmployeesModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [manager, setManager] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const token = localStorage.getItem("token");

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        deadline: "",
        priority: "Medium",
    });

    const BASE_URL = import.meta.env.VITE_API_URL;

    const activeEmployees = [
        {
            id: "EMP101",
            name: "Aman Kumar",
            checkIn: "09:10 AM",
            task: "Build Login UI",
        },
        {
            id: "EMP102",
            name: "Riya Sharma",
            checkIn: "09:00 AM",
            task: "Fix Dashboard Bugs",
        },
        {
            id: "EMP103",
            name: "Rahul Verma",
            checkIn: "09:30 AM",
            task: "API Integration",
        },
    ];



    const fetchManagerData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/get-employee-info`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setManager(response?.data?.employee || {});
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/users/get-employees-by-manager`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEmployees(response?.data?.employees || []);
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    const getPendingTasks = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/tasks/get-pending-tasks`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            toast.success("Pending tasks fetched successfully!");
            setPendingTasks(response?.data?.tasks || []);
            // You can set this data to state if you want to display it in the modal
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        fetchManagerData();
        fetchEmployees();
        getPendingTasks();
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-100 p-6">

                {/* MANAGER DETAILS */}
                <div className="bg-white p-5 rounded-xl shadow mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">
                        Manager Details
                    </h2>
                    <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                        <p><strong>Employee ID:</strong> {manager?.employeeId}</p>
                        <p><strong>Name:</strong> {manager?.name}</p>
                        <p><strong>Role:</strong> {manager?.role}</p>
                        <p><strong>Department:</strong> {manager?.department}</p>
                        <p><strong>Email:</strong> {manager?.email}</p>
                    </div>
                </div>

                {/* TEAM SUMMARY */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <p className="text-sm text-gray-500">Total Employees</p>
                        <h2 className="text-xl font-bold">{employees.length}</h2>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow text-center" onClick={() => setShowEmployeesModal(true)}>
                        <p className="text-sm text-gray-500">Active Employees</p>
                        <h2 className="text-xl font-bold">
                            {employees.filter((e) => e.status === "Active").length}
                        </h2>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow text-center" onClick={() => setShowModal(true)}>
                        <p className="text-sm text-gray-500">Pending Tasks</p>
                        <h2 className="text-xl font-bold">{pendingTasks.length}</h2>
                    </div>
                </div>

                {/* EMPLOYEE SECTION */}
                <TeamMembers employees={employees} setShowAssignModal={setShowAssignModal} />


                {/* TASKS ASSIGNED */}
                <TaskAssigned />


                {/* EXTRA SECTION */}
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                    {/* APPROVALS */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-3 text-gray-700">
                            Pending Approvals
                        </h2>
                        <ul className="text-sm text-gray-600 space-y-2">
                            <li>Rahul - Leave Request</li>
                            <li>Sneha - Task Completion Approval</li>
                        </ul>
                    </div>

                    {/* ATTENDANCE SNAPSHOT */}
                    <div className="bg-white p-5 rounded-xl shadow">
                        <h2 className="text-lg font-semibold mb-3 text-gray-700">
                            Attendance Snapshot
                        </h2>
                        <p className="text-sm text-gray-600">
                            2 Present | 1 On Leave
                        </p>
                    </div>
                </div>
                {showModal && <PendingTasks setShowModal={setShowModal} pendingTasks={pendingTasks} />}
                {showEmployeesModal && <ActiveEmployees setShowEmployeesModal={setShowEmployeesModal} activeEmployees={activeEmployees} />}
                {showAssignModal && <AssignTask setShowAssignModal={setShowAssignModal} taskData={taskData} setTaskData={setTaskData} />}
            </div>
            <Toaster />
        </>
    );
}