import { Navigate } from "react-router-dom";
import EmployeeDashboard from "../dashboard/Employee";
import ManagerDashboard from "../dashboard/Manager";
import AdminDashboard from "../dashboard/Admin";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DashboardAccess = () => {
    const [role, setRole] = useState(null);
    const token = localStorage.getItem("token");
    const BASE_URL = import.meta.env.VITE_API_URL;

    if (!token) {
        return <Navigate to="/" replace />;
    }



    const fetchUserRole = async () => {
        try {

            const response = await axios.post(`${BASE_URL}/users/get-role`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRole(response?.data?.role);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }

    }


    useEffect(() => {
        fetchUserRole();
    }, []);

    // Show loading while fetching role
    if (role === null) {
        return <div>Loading...</div>;
    }
    // Role-based rendering
    switch (role) {
        case "Employee":
            return <EmployeeDashboard />;

        case "Manager":
            return <ManagerDashboard />;

        case "admin":
            return <AdminDashboard />;

        default:
            return <Navigate to="/" replace />;
    }
};

export default DashboardAccess;