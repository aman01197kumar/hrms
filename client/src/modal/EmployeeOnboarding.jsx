import { useState } from "react";
import SuccessModal from "./OnboardSuccess";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function EmployeeOnboardingModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        jobProfile: "",
        department: "",
        role: "",
        joiningDate: "",
        employmentType: "Full-time",
        salary: "",
        bankName: "",
        accountNumber: "",
        ifsc: "",
        parmanent_address: "",
        emergencyContact: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [pin, setPin] = useState(null);
    const [isLoading, setIsloading] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_URL;
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // TODO: API call here
        try {
            setIsloading(true);
            const response = await axios.post(`${BASE_URL}/users/onboard-employee`, formData);
            setPin(response?.data?.pin);
            setShowModal(true);

        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        finally {
            setIsloading(false);
        }
    };

    const handleSuccessClose = () => {


        setShowModal(false);

        // Reset form
        setFormData({
            empId: "",
            name: "",
            email: "",
            phone: "",
            jobProfile: "",
            department: "",
            role: "",
            joiningDate: "",
            employmentType: "Full-time",
            salary: "",
            bankName: "",
            accountNumber: "",
            ifsc: "",
            parmanent_address: "",
            emergencyContact: ""
        });

        onClose(); // close onboarding modal
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white w-[700px] max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-semibold">Employee Onboarding</h2>
                    <button onClick={onClose}>✕</button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">

                        {/* Basic Info */}
                        <input name="name" value={formData.name} placeholder="Full Name" className="input" onChange={handleChange} />
                        <input name="email" value={formData.email} placeholder="Email" className="input" onChange={handleChange} />
                        <input name="phone" value={formData.phone} placeholder="Phone" className="input" onChange={handleChange} />

                        {/* Job Info */}
                        <input name="jobProfile" value={formData.jobProfile} placeholder="Job Profile" className="input" onChange={handleChange} />
                        <input name="department" value={formData.department} placeholder="Department" className="input" onChange={handleChange} />

                        <select name="role" value={formData.role} className="input" onChange={handleChange}>
                            <option value="">Select Role</option>
                            <option value="Manager">Manager</option>
                            <option value="Employee">Employee</option>
                        </select>

                        <input type="date" name="joiningDate" value={formData.joiningDate} className="input" onChange={handleChange} />

                        <select name="employmentType" value={formData.employmentType} className="input" onChange={handleChange}>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                        </select>

                        {/* Payment */}
                        <input name="salary" value={formData.salary} placeholder="Salary" className="input" onChange={handleChange} />
                        <input name="bankName" value={formData.bankName} placeholder="Bank Name" className="input" onChange={handleChange} />
                        <input name="accountNumber" value={formData.accountNumber} placeholder="Account Number" className="input" onChange={handleChange} />
                        <input name="ifsc" value={formData.ifsc} placeholder="IFSC Code" className="input" onChange={handleChange} />

                        {/* Other */}
                        <input name="parmanent_address" value={formData.parmanent_address} placeholder="Address" className="input col-span-2" onChange={handleChange} />
                        <input name="emergencyContact" value={formData.emergencyContact} placeholder="Emergency Contact" className="input" onChange={handleChange} />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
                            Cancel
                        </button>

                        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                            {isLoading?'processing...':'Onboard Employee'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            {showModal && (
                <SuccessModal
                    isOpen={showModal}
                    onClose={handleSuccessClose}
                    message="Employee onboarded successfully."
                    pin={pin}
                />
            )}
            <Toaster />
        </div>
    );
}