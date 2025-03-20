import { token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

type EmailOtpModalProps = {
  setEmailToParent: (email: string) => void;
  bid: number;
};

const EmailOtpModal = ({ setEmailToParent, bid }: EmailOtpModalProps) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpField, setOtpField] = useState(false);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const OtpInputRefs = useRef<(HTMLInputElement | null)[]>(
    new Array(4).fill(null)
  );

  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(email))
      return "Please enter a valid email address";
    return "";
  };

  const validateOtp = (otp: string[]) => {
    if (otp.some((digit) => digit === "")) return "Please enter all OTP digits";
    return "";
  };

  const handleEmailSubmit = async () => {
    const emailValidationError = validateEmail(email);
    setEmailError(emailValidationError);

    if (emailValidationError) return;

    try {
      const response = await token_api(access_token).post("users/addemail/", {
        email,
        bid,
      });
      if (response.status === 200) {
        setOtpField(true);
        toast.success("Email added successfully, please enter OTP.");
      } else {
        toast.error("Failed to add email.");
      }
    } catch (error) {
      console.error("Unknown error:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleOtpSubmit = async () => {
    const otpValidationError = validateOtp(otp);
    setOtpError(otpValidationError);

    if (otpValidationError) return;

    setIsLoading(true);
    try {
      const response = await token_api(access_token).post(
        "users/verifyemailotp/",
        { email, otp: otp.join("") }
      );
      if (response.status === 200) {
        setEmailToParent(email);
        toast.success("OTP verified successfully!");
      } else {
        toast.error("Invalid OTP.");
      }
    } catch (error) {
      console.error("Unknown error:", error);
      toast.error("Something went wrong.");
    }
    setIsLoading(false);
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1);
    setOtp(newOtp);
    setOtpError("");

    if (e.target.value && index < 5) {
      const nextInput = OtpInputRefs.current[index + 1];
      nextInput?.focus();
    }

    if (!e.target.value && index > 0) {
      const prevInput = OtpInputRefs.current[index - 1];
      prevInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md max-w-sm w-full">
        {!otpField && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
              Enter Email
            </h3>
            <input
              type="email"
              className="border p-2 rounded-md w-full mb-3 text-gray-600"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-800 text-white py-1 px-4 rounded-md"
                onClick={() => setEmailToParent("")}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 text-white py-1 px-4 rounded-md"
                onClick={handleEmailSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit Email"}
              </button>
            </div>
          </>
        )}

        {otpField && (
          <>
            <h3 className="text-xl font-semibold mb-4 text-gray-700 text-center">
              Enter OTP
            </h3>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="number"
                  className="border-2 border-gray-300 no-arrows p-2 outline-orange-400 rounded-md text-center w-12 text-gray-600"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  ref={(el) => {
                    OtpInputRefs.current[index] = el;
                  }}
                />
              ))}
            </div>
            {otpError && <p className="text-red-500 text-sm">{otpError}</p>}

            <div className="flex justify-center gap-2 mt-4">
              <button
                className="bg-gray-800 text-white py-1 px-4 rounded-md"
                onClick={() => setEmailToParent("")}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 text-white py-1 px-4 rounded-md"
                onClick={handleOtpSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default EmailOtpModal;
