// Get all employees under a specific managerId
// Get employees with their manager info (id, name, managerId, managerName)
import { Employee } from "../models/user.schema.js";
import jwt from "jsonwebtoken";


export const onboardEmployee = async (req, res) => {
    try {
        const { name, email, phone, jobProfile, department, role, joiningDate, employmentType, salary, bankName, accountNumber, ifsc, parmanent_address, emergencyContact } = req.body;

        if (!name || !email || !phone || !jobProfile || !department || !role || !joiningDate || !employmentType || !salary || !bankName || !accountNumber || !ifsc || !parmanent_address || !emergencyContact) {
            return res.status(400).json({ message: "All fields are required." });
        }
        
        const orgDomain = "@physicswallah.live";
        if (!email.endsWith(orgDomain)) {
            return res.status(400).json({ message: "Only organizational emails are allowed." });
        }

        // Generate a unique 6-digit random number
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        // Generate next empId synchronously (e.g., EMP101, EMP102)
        let lastEmployee = await Employee.findOne({}, {}, { sort: { createdAt: -1 } });
        let nextEmpNumber = 101;
        if (lastEmployee && lastEmployee.employeeId && /^EMP\d+$/.test(lastEmployee.employeeId)) {
            nextEmpNumber = parseInt(lastEmployee.employeeId.replace('EMP', '')) + 1;
        }
        const employeeId = `EMP${nextEmpNumber}`;

        const newEmployee = new Employee({
            employeeId,
            managerId: null,
            name,
            email,
            phone,
            jobProfile,
            department,
            role,
            joiningDate,
            employmentType,
            salary,
            bankName,
            accountNumber,
            ifsc,
            parmanent_address,
            emergencyContact,
            verificationCode
        });

        await newEmployee.save();

        res.status(201).json({ pin: verificationCode });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const authenticateEmployee = async (req, res) => {
    try {
        const { verificationCode } = req.body;

        let token = null;
        const adminVerificationCode = process.env.ADMIN_VERIFICATION_CODE;
        if (verificationCode === undefined) {
            return res.status(400).json({ message: "Verification code is required." });
        }
        else if (verificationCode === adminVerificationCode) {
            token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "Admin authenticated successfully", token });
        }
        else {

            const employee = await Employee.findOne({ verificationCode: Number(verificationCode) });
            if (!employee) {
                return res.status(400).json({ message: "Invalid verification code. Please try again." });
            }

            token = jwt.sign({ role: employee.role, employeeId: employee.employeeId, managerId: employee.managerId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        }
        res.status(200).json({ message: "Employee authenticated successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDashboardAccess = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: "Dashboard access granted", role: decoded.role });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getEmployeesWithManagers = async (req, res) => {
    try {
        // Find all employees, populate their manager's name and _id
        const employees = await Employee.find({}, { _id: 1, name: 1, managerId: 1 })
            .populate({
                path: 'managerId',
                select: 'name _id',
                model: 'Employee'
            });

        // Format the result for UI
        const result = employees.map(emp => ({
            id: emp._id,
            name: emp.name,
            managerId: emp.managerId ? emp.managerId._id : null,
            managerName: emp.managerId ? emp.managerId.name : null
        }));
        res.status(200).json({ employees: result });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignManagerToEmployee = async (req, res) => {
    try {
        const {employeeId, managerId} = req.body;

        if (!employeeId || !managerId) {
            return res.status(400).json({ message: "Both employeeId and managerId are required." });
        }
        // Find employee and manager by business id
        const employee = await Employee.findOne({ employeeId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const manager = await Employee.findOne({ employeeId: managerId });
        if (!manager) {
            return res.status(404).json({ message: "Manager not found" });
        }

        employee.managerId = manager.employeeId; // store business id as per schema
        await employee.save();

        res.status(200).json({ message: "Manager assigned to employee successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getEmployeeInfo = async (req, res) => {
    try {
        
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employee = await Employee.findOne({ employeeId: decoded.employeeId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEmployeesByManager = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        const managerId = decoded.employeeId;
        if (!managerId) {
            return res.status(400).json({ message: "managerId is required in params" });
        }
        // Find all employees whose managerId matches
        const employees = await Employee.find({ managerId });
        res.status(200).json({ employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
