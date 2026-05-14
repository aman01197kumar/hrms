import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    assignedToId: {
      type: String, // employeeId
      required: true,
      index: true,
    },
    assignedToName: {
      type: String, // employee name
      required: true,
    },
    assignedById: {
      type: String, // manager employeeId
      required: true,
      index: true,
    },


    deadline: Date,
    duration: {
      type: Number, // duration in hours or minutes
      required: false,
    },
    fileUpload: {
      type: String, // file path or URL
      required: false,
    },
    note: {
      type: String,
      required: false,
    },

    jobProfile: {
      type: String,
      enum: ["Developer", "Designer", "QA", "HR", "Sales"],
    },
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