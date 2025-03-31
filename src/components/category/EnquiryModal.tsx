"use client";

import api, { token_api } from "@/lib/api";
import {
  parseCookies,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/lib/cookies";
import { auth } from "@/lib/firebase";
import { AxiosError } from "axios";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoClose } from "react-icons/io5";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  bid: number;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  bid,
}) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [isOtpValid, setIsOtpValid] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const OtpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name) {
      newErrors.name = "Name is required";
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    if (/^\d{0,10}$/.test(input)) {
      setPhone(input);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        let response;
        if (access_token) {
          response = await token_api(access_token).post("users/enquiries/", {
            mobile_number: phone,
            bid: bid,
            name: name,
            message,
          });
        } else {
          if (window.recaptchaVerifier) {
            const formattednumber = `+91${phone}`;
            const confirmation = await signInWithPhoneNumber(
              auth,
              formattednumber,
              window.recaptchaVerifier
            );
            setConfirmation(confirmation);
          }
          response = await api.post("users/enquiries/", {
            mobile_number: phone,
            bid: bid,
            name: name,
            message,
          });
        }

        if (response?.status === 200) {
          setIsSubmitting(false);
          setIsOtpModalOpen(true);
        }

        if (response.status === 201) {
          toast.success("Enquiry sent successfully");
          setIsSubmitting(false);
          setName("");
          setPhone("");
          onClose();
        }
      } catch (error) {
        setIsSubmitting(false);
        console.error("Error enquiry:", error);
        throw error;
      }
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    try {
      if (confirmation) {
        const result = await confirmation.confirm(otpString);
        const idToken = await result.user.getIdToken();
        const response = await api.post("users/verifyotp/", {
          phone: phone,
          otp: otpString,
          idToken,
        });
        if (response.status === 201) {
          const access_token = response.data.sessionid;
          const refresh_token = response.data.refresh_token;
          if (!access_token || !refresh_token) {
            return;
          }
          setAccessTokenCookie(access_token);
          setRefreshTokenCookie(refresh_token);
          window.location.reload();
          onClose();
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 400) setError("Invalid verification code");
      } else {
        console.error("Unknown error:", error);
      }

      throw error;
    }
  };

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(0, 1);
    setOtp(newOtp);
    setError("");

    if (e.target.value && index < 5) {
      const nextInput = OtpInputRefs.current[index + 1];
      nextInput?.focus();
    }

    if (!e.target.value && index > 0) {
      const prevInput = OtpInputRefs.current[index - 1];
      prevInput?.focus();
    }
  };

  const handleResendOtp = async () => {
    setOtp(["", "", "", "", "", ""]);
    try {
      const response = await api.post("users/resendotp/", {
        phone: phone,
      });
      console.log(response.status);
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };
  
  useEffect(() => {
    if (!window.recaptchaVerifier && isOpen) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (res: string) => {
            console.log("reCAPTCHA solved:", res);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
          },
        }
      );
    }
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.render().then((widgetId: string) => {
        console.log("reCAPTCHA rendered with widgetId:", widgetId);
      });
    }
  }, [auth]);

  useEffect(() => {
    if (isOtpModalOpen) {
      OtpInputRefs.current[0]?.focus();
    }
  }, [isOtpModalOpen]);

  useEffect(() => {
    const isFullOtp = otp.every((digit) => digit.length === 1);
    setIsOtpValid(isFullOtp);
  }, [otp]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-0 left-0 w-full text-gray-700 h-screen flex justify-center items-center font-ubuntu bg-gray-600 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg md:w-4/12 shadow-lg  relative z-60">
        <div id="recaptcha-container"></div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <IoClose size={24} />
        </button>
        {isOtpModalOpen ? (
          <div className="py-3">
            <h2 className="md:text-2xl text-gray-800 font-ubuntuMedium font-semibold text-center mb-4">
              Check your SMS for the verification code!
            </h2>
          </div>
        ) : (
          <h2 className="text-2xl text-gray-800 font-ubuntuMedium font-semibold text-center mb-4">
            Send Enquiry
          </h2>
        )}

        {isOtpModalOpen ? (
          <form onSubmit={handleOtpSubmit} className="space-y-6 border">
            <div>
              <div className="flex md:space-x-3 space-x-2 mt-2 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="number"
                    maxLength={1}
                    value={digit}
                    ref={(el) => {
                      OtpInputRefs.current[index] = el;
                    }}
                    onChange={(e) => handleOtpChange(e, index)}
                    className="md:w-16 md:h-16 w-12 h-12 no-arrows text-center text-gray-500 font-ubuntu border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f28b21] focus:border-[#f28b21]"
                  />
                ))}
              </div>
              {error && (
                <p className="text-red-500 font-ubuntu text-xs pt-2">{error}</p>
              )}

              <div className="font-ubuntu text-black text-xs flex justify-between mt-5">
                <p>Didn&apos;t Receive the OTP?</p>
                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f28b21] focus:ring-opacity-50 ${
                  isOtpValid
                    ? "bg-[#f28b21] hover:bg-[#f28b21]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isOtpValid}
              >
                Verify OTP
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                id="name"
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                id="phone"
                type="text"
                value={phone}
                placeholder="Phone number"
                onChange={handlePhoneChange}
                className="w-full p-2 border border-gray-500 no-arrows rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="mb-4">
              <textarea
                id="message"
                value={message}
                placeholder="Write your message (Optional)"
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none disabled:bg-gray-300"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </div>
          </form>
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default EnquiryModal;
