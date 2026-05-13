import { useState } from "react";
import PendingTasks from "../modal/PendingTasks";
import ActiveEmployees from "../modal/ActiveEmployees";
import AssignTask from "../modal/AssignTask";
import TeamMembers from "../table/TeamMembers";
import TaskAssigned from "../table/TaskAssigned";
import Header from "../layout/Header";

export default function ManagerDashboard() {
    const [clockedIn, setClockedIn] = useState(false);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showEmployeesModal, setShowEmployeesModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        deadline: "",
        priority: "Medium",
    });

    const pendingTasks = [
        {
            id: 1,
            title: "Build Login UI",
            assignedTo: "Rahul",
            employeeId: "EMP101",
            status: "In Progress",
            deadline: "2026-05-20",
        },
        {
            id: 2,
            title: "API Integration",
            assignedTo: "Sneha",
            employeeId: "EMP102",
            status: "Pending",
            deadline: "2026-05-18",
        },
    ];

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

    const manager = {
        employeeId: "EMP001",
        name: "Aman Kumar",
        role: "Engineering Manager",
        department: "Product Development",
        email: "aman@company.com",
    };

    const employees = [
        { Emp_id: "EMP101", name: "Rahul", role: "Frontend Dev", status: "Active" },
        { Emp_id: "EMP102", name: "Sneha", role: "Backend Dev", status: "On Leave" },
        { Emp_id: "EMP103", name: "Arjun", role: "QA Engineer", status: "Active" },
    ];


    return (
        <>
        <Header/>
        <div className="min-h-screen bg-gray-100 p-6">

            {/* MANAGER DETAILS */}
            <div className="bg-white p-5 rounded-xl shadow mb-6">
                <h2 className="text-lg font-semibold mb-3 text-gray-700">
                    Manager Details
                </h2>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                    <p><strong>Employee ID:</strong> {manager.employeeId}</p>
                    <p><strong>Name:</strong> {manager.name}</p>
                    <p><strong>Role:</strong> {manager.role}</p>
                    <p><strong>Department:</strong> {manager.department}</p>
                    <p><strong>Email:</strong> {manager.email}</p>
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
                    <h2 className="text-xl font-bold">5</h2>
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
        </>
    );
}