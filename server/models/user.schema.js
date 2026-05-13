import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    managerId: {
      type: String,
      ref: "User",
      required: false,
      index: true,
      sparse: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,

    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Please use a valid phone number"],
    },

    jobProfile: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    joiningDate: {
      type: Date,
      required: true,
    },

    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract"],
      default: "Full-time",
    },

    salary: {
      type: Number,
      required: true,
    },

    bankName: {
      type: String,
    },

    accountNumber: {
      type: Number,
    },

    ifsc: {
      type: String,
    },

    parmanent_address: {
      type: String,
    },

    emergencyContact: {
      type: Number,
      match: [/^[0-9]{10}$/, "Invalid emergency contact"],
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    verificationCode: {
      type: String,
      index: true,
      required: true,
      unique: true,
      min: 100000,
      max: 999999,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);