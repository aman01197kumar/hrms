import express from 'express';
import { authenticateEmployee, getAllEmployees, getDashboardAccess, onboardEmployee, getEmployeesWithManagers, assignManagerToEmployee, getEmployeeInfo, getEmployeesByManager } from '../controllers/users.controller.js';


export const userroute = express.Router();

userroute.post('/onboard-employee', onboardEmployee);
userroute.post('/authenticate-employee', authenticateEmployee);
userroute.post('/get-role', getDashboardAccess);
userroute.get('/get-all-employees', getAllEmployees);
userroute.get('/get-employees-with-managers', getEmployeesWithManagers);
userroute.post('/assign-manager', assignManagerToEmployee)
userroute.get('/get-employees-by-manager', getEmployeesByManager);
userroute.get('/get-employee-info', getEmployeeInfo);
