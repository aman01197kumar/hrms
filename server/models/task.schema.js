import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    assignedTo: {
      type: String, // employeeId
      required: true,
      index: true,
    },

    assignedBy: {
      type: String, // manager employeeId
      required: true,
      index: true,
    },

    deadline: Date,

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);