import { Task } from "../models/task.schema.js";
import { Employee } from "../models/user.schema.js";
import jwt from "jsonwebtoken";

export const assignTask = async (req, res) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const managerId = decoded.employeeId; // business id of the manager (e.g., EMP101)
        const { employeeId, employeeName, jobProfile, title, description, deadline, priority, duration, fileUpload, note } = req.body;


        // 1️⃣ Check if manager exists
        const manager = await Employee.findOne({
            employeeId: managerId,
            role: "Manager",
        });

        if (!manager) {
            return res.status(403).json({
                message: "Only managers can assign tasks",
            });
        }

        // 2️⃣ Check if employee belongs to this manager
        const employee = await Employee.findOne({
            employeeId: employeeId,
            managerId: managerId,
        });

        if (!employee) {
            return res.status(403).json({
                message: "You can only assign tasks to your team members",
            });
        }

        // 3️⃣ Create task
        const task = await Task.create({
            title,
            description,
            assignedToId: employeeId,
            assignedToName: employeeName,
            assignedById: managerId,
            deadline,
            priority,
            jobProfile,
            duration,
            fileUpload,
            note,
        });

        return res.status(201).json({
            message: "Task assigned successfully",
            task,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const getAllTasksAssignedToEmployee = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const managerId = decoded.employeeId;

        const tasks = await Task.find({ assignedById: managerId });

        if (!tasks) {
            return res.status(404).json({
                message: "No tasks assigned to employee",
            });
        }
        return res.status(200).json({
            tasks,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export const getAllPendingTasks = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employeeId = decoded.employeeId;

        const tasks = await Task.find({ assignedById: employeeId, status: "Pending" });

        if (!tasks) {
            return res.status(404).json({
                message: "No pending tasks found",
            });
        }
        return res.status(200).json({
            tasks,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export const getMyTasks = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employeeId = decoded.employeeId;

        const tasks = await Task.find({ assignedToId: employeeId });
        if (!tasks) {
            return res.status(404).json({
                message: "No tasks assigned to you",
            });
        }
        return res.status(200).json({
            tasks,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
export const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status, note,duration } = req.body;

        const file = req.file; // ✅ get file from multer

        const validStatuses = ["Pending", "In Progress", "Completed"];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updateFields = {};

        if (status) updateFields.status = status;
        if (note) updateFields.note = note;
        if(duration) updateFields.duration = duration;

        if (file) {
            updateFields.fileUpload = file.path; // ✅ important
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.status(200).json({
            message: "Task submitted successfully",
            task: updatedTask,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};