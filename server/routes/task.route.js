import express from 'express';
import { assignTask, getAllPendingTasks, getAllTasksAssignedToEmployee, getMyTasks } from '../controllers/taskAssignment.controller.js';
// import { verifyToken } from '../middleware/authorization.js';

export const taskroute = express.Router();

taskroute.post("/assign-task", assignTask);
taskroute.get("/get-tasks-assigned", getAllTasksAssignedToEmployee);
taskroute.get('/get-pending-tasks', getAllPendingTasks);
taskroute.get('/get-my-tasks', getMyTasks);