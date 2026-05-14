
import express from 'express';
import path from 'path';
import { assignTask, getAllPendingTasks, getAllTasksAssignedToEmployee, getMyTasks, updateTaskStatus } from '../controllers/taskAssignment.controller.js';
import { uploadTaskFile } from '../middleware/uploadTaskFile.js';
import { upload } from '../config/multerConfig.js';


export const taskroute = express.Router();

taskroute.post("/assign-task", assignTask);
// File upload for a task (returns file path)
taskroute.get("/get-tasks-assigned", getAllTasksAssignedToEmployee);
taskroute.get('/get-pending-tasks', getAllPendingTasks);
taskroute.get('/get-my-tasks', getMyTasks);
// Update status, note, fileUpload for a task
taskroute.patch(
    '/update-task/:taskId',
    upload.single('file'),
    updateTaskStatus
);