import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './auth/Login'
import EmployeeDashboard from './dashboard/Employee'
import ManagerDashboard from './dashboard/Manager'
import ViewEmployee from './pages/ViewEmployee'
import AdminDashboard from './dashboard/Admin'
import ProtectedRoute from './protectedRoute/ProtectedRoute'
import DashboardAccess from './dashboard/DashboardAccess'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <h1 className='text-3xl font-bold text-center mt-20'>
            Welcome to HRMS Dashboard
          </h1>
        } />

        <Route path="/signin" element={<Login />} />

        {/* Single Entry Point */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardAccess />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <h1 className='text-3xl font-bold text-center mt-20'>
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App