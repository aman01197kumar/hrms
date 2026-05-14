import express from 'express';
import { assignTask, getAllTasksAssignedToEmployee } from '../controllers/taskAssignment.controller.js';
// import { verifyToken } from '../middleware/authorization.js';

export const taskroute = express.Router();

taskroute.post("/assign-task", assignTask);
taskroute.get("/get-tasks", getAllTasksAssignedToEmployee);