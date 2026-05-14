import axios from "axios";
import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {  useNavigate } from "react-router-dom";

export default function Login() {

  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const[isloading, setIsLoading] = useState(false);

  const inputsRef = useRef([]);

  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return; // only digits

    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // move to next box
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // go back on backspace
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = pin.join("");

    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:3000/users/authenticate-employee', {verificationCode});
      localStorage.setItem('token', response?.data?.token);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  finally{
    setIsLoading(false);
  }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">HRMS Portal</h1>
        <p className="text-indigo-100 text-center">
          Secure login using uPIN
        </p>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold">Welcome to HRMS Portal</h2>
            <p className="text-sm text-gray-500">
              Enter your 6-digit uPIN
            </p>
          </div>


          {/* PIN Boxes */}
          <div className="flex justify-between gap-2">
            {pin.map((digit, index) => (
              <input
                key={index}
                type="password"
                maxLength={1}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {isloading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}