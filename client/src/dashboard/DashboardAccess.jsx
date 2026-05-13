import { Navigate } from "react-router-dom";
import EmployeeDashboard from "../dashboard/Employee";
import ManagerDashboard from "../dashboard/Manager";
import AdminDashboard from "../dashboard/Admin";
import axios from "axios";
import { useEffect, useState } from "react";

const DashboardAccess = () => {
    const [role, setRole] = useState(null);
    const token = localStorage.getItem("token");


    // Not logged in
    if (!token) {
        return <Navigate to="/signin" replace />;
    }



    const fetchUserRole = async () => {
        try {
            
            const response = await axios.post('http://localhost:3000/users/get-role', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response?.data?.role, 'roleee')
            setRole(response?.data?.role);
        } catch (error) {
            console.error("Error fetching user role:", error);
        }
        
    }


    useEffect(() => {
        fetchUserRole();
    }, []);

    // Show loading while fetching role
    if (role === null) {
        return <div>Loading...</div>;
    }
    console.log(role, 'rolee')
    // Role-based rendering
    switch (role) {
        case "Employee":
            return <EmployeeDashboard />;

        case "Manager":
            return <ManagerDashboard />;

        case "admin":
            return <AdminDashboard />;

        default:
            return <Navigate to="/signin" replace />;
    }
};

export default DashboardAccess;