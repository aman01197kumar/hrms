import { useEffect, useState } from "react";
import ManagerAssignment from "../modal/ManagerAssignment";
import AdminHeader from "../layout/AdminHeader";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const AdminDashboard = () => {
    const [search, setSearch] = useState("");
    const [employees, setEmployees] = useState([]);
    const [managers, setManagers] = useState([]);


    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users/get-all-employees');
            const filteredResponse = response?.data?.employees?.filter((emp) => emp.role === 'Employee');
            const filteredManagers = response?.data?.employees?.filter((emp) => emp.role === 'Manager');
            setEmployees(filteredResponse || []);
            setManagers(filteredManagers || []);
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
        }
        
    }

    useEffect(() => {
        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <AdminHeader employees={employees} managers={managers} />
            <div className="p-6 bg-gray-100 min-h-screen space-y-6">


                {/* ================= STATS ================= */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <p className="text-gray-500">Total Managers</p>
                        <h2 className="text-xl font-bold">{managers.length}</h2>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <p className="text-gray-500">Total Employees</p>
                        <h2 className="text-xl font-bold">{employees.length}</h2>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow text-center">
                        <p className="text-gray-500">Assignments</p>
                        <h2 className="text-xl font-bold">{employees.length}</h2>
                    </div>
                </div>

                {/* ================= MANAGERS TABLE ================= */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Managers</h2>

                        <input
                            type="text"
                            placeholder="Search Manager..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full table-fixed text-sm">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left w-1/4">Manager ID</th>
                                    <th className="px-4 py-3 text-left w-1/3">Name</th>
                                    <th className="px-4 py-3 text-left w-1/3">Department</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {managers.map((mgr) => (
                                    <tr key={mgr.empId} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{mgr.employeeId}</td>
                                        <td className="px-4 py-3">{mgr.name}</td>
                                        <td className="px-4 py-3">{mgr.department}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================= EMPLOYEES TABLE ================= */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">Employees</h2>

                        <input
                            type="text"
                            placeholder="Search Employee..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full table-fixed text-sm">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left w-1/4">Employee ID</th>
                                    <th className="px-4 py-3 text-left w-1/3">Name</th>
                                    <th className="px-4 py-3 text-left w-1/3">Department</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {filteredEmployees.map((emp) => (
                                    <tr key={emp.employeeId} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{emp.employeeId}</td>
                                        <td className="px-4 py-3">{emp.name}</td>
                                        <td className="px-4 py-3">{emp.department}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ================= ASSIGNMENT TABLE ================= */}
                <div className="bg-white p-5 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">
                        Employee → Manager Assignment
                    </h2>

                    <div className="overflow-hidden rounded-lg border">
                        <table className="w-full table-fixed text-sm">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left">Employee</th>
                                    <th className="px-4 py-3 text-left">Employee ID</th>
                                    <th className="px-4 py-3 text-left">Manager</th>
                                    <th className="px-4 py-3 text-left">Manager ID</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {employees.map((emp) => {
                                    const manager = managers.find(
                                        (m) => m.employeeId === emp.managerId
                                    );

                                    return (
                                        <tr key={emp.employeeId} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-3">{emp.name}</td>
                                            <td className="px-4 py-3">{emp.employeeId}</td>
                                            <td className="px-4 py-3">
                                                {manager?.name || "Not Assigned"}
                                            </td>
                                            <td className="px-4 py-3">
                                                {manager?.employeeId || "Not Assigned"}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <Toaster/>
        </>
    );
};

export default AdminDashboard;