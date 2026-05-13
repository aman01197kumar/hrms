import React from "react";

const SuccessModal = ({ isOpen, onClose, message,pin }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-2xl shadow-lg w-[350px] p-6 text-center animate-fadeIn">

                {/* Success Icon */}
                <div className="flex justify-center mb-4">
                    <div className="bg-green-100 text-green-600 rounded-full p-3 text-2xl">
                        ✓
                    </div>
                </div>

                {/* Message */}
                <h2 className="text-lg font-semibold mb-2">
                    Success!
                </h2>
                <p className="text-gray-600 mb-6">
                    {message || "Employee onboarded successfully."}
                </p>
                <p className="text-green-600 font-bold text-lg mb-6">
                    {pin && `Your employee pin is: ${pin}`}
                </p>
                {/* Button */}
                <button
                    onClick={onClose}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;