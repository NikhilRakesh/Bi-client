"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { RiDoubleQuotesL } from "react-icons/ri";
import BLOtpModal from "./BLOtpModal";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { setAccessTokenCookie, setRefreshTokenCookie } from "../../lib/cookies";
import Link from "next/link";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const BusinessListingOtp: React.FC = () => {
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [yourOtp, setYourOtp] = useState<string>("");
  const [nameInputVisible, setNameInputVisible] = useState(false);
  const [error, setError] = useState<string>("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const router = useRouter();
  useEffect(() => {
    if (!window.recaptchaVerifier) {
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
    if (phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, [auth]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setError("");
    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
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
          router.push("/business-listing/add-business?step=1");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.error("Error sending OTP:", error.message);
        if (error.status === 400) toast.error("invalid verification code");
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
  };

  const handleResendOtp = async () => {
    setOtp(["", "", "", "", "", ""]);
    const otpString = otp.join("");
    try {
      const response = await api.post("users/resendotp/", {
        phone: phone,
        otp: otpString,
      });
      if (response.status === 200) toast.success("OTP resented successfully");
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setName(e.target.value);
  };

  const handleNameSubmit = async () => {
    if (!name) {
      setError("please enter name");
      return;
    }
    try {
      const response = await api.post("users/signup2/", {
        phone: phone,
        name: name,
      });
      if (response.status === 200) {
        setIsModalOpen(true);
        alert(`this is your otp: ${yourOtp}`);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

  const openOtpModal = async () => {
    if (!phone) {
      setError("Please enter phone number");
      return;
    }
    if (phone.length < 10) {
      setError("Please enter valid mobile number");
    } else {
      try {
        const response = await api.post("users/signup1/", {
          phone: phone,
        });
        if (window.recaptchaVerifier) {
          const formattednumber = `+91${phone}`;
          const confirmation = await signInWithPhoneNumber(
            auth,
            formattednumber,
            window.recaptchaVerifier
          );
          setConfirmation(confirmation);
        }
        setYourOtp(response.data.otp);
        if (!response?.data.exists) {
          setNameInputVisible(true);
        } else {
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        throw error;
      }
    }
  };

  const closeOtpModal = () => setIsModalOpen(false);

  return (
    <div className="md:p-6 p-2 md:flex mb-10">
      <div className="md:w-6/12 md:flex  flex-col justify-center items-center mt-5 hidden ">
        <div className="w-full md:w-5/12 rounded-3xl flex justify-center items-center shadow-2xl rotate-6  bg-white">
          <img
            src="/brandsinfo home page mb.png "
            alt="phone"
            className="w-full object-cover border-2 p-2 h-auto rounded-lg"
          />
        </div>
      </div>

      <div className=" md:w-6/12 mt-5 font-ubuntu flex flex-col gap-5 items-center">
        <div className="w-full md:px-16">
          <div>
            {nameInputVisible ? (
              <div className="mt-4 flex border w-full p-1 border-gray-300 rounded-lg shadow-md focus-within:ring-2 focus-within:ring-[#f28b21] focus-within:border-[#f28b21] transition duration-200 ease-in-out">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  className="w-full p-2 outline-none text-black"
                  placeholder="Enter your name"
                />
                <button
                  onClick={handleNameSubmit}
                  className="w-full  py-2 bg-black text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300"
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="flex items-center border w-full p-1 border-gray-300 rounded-lg shadow-md focus-within:ring-2 focus-within:ring-[#f28b21] focus-within:border-[#f28b21] transition duration-200 ease-in-out">
                <label
                  htmlFor="phone"
                  className="text-lg font-medium text-gray-600 px-4 py-3 bg-white rounded-l-lg font-ubuntuMedium"
                >
                  +91
                </label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  ref={phoneInputRef}
                  required
                  maxLength={10}
                  className="w-full h-full no-arrows text-sm text-gray-800 placeholder-gray-400 focus:outline-none font-ubuntuMedium rounded-r-lg bg-white"
                  placeholder="Enter phone number"
                />
                <button
                  onClick={openOtpModal}
                  className="w-full py-3 bg-black text-white font-semibold rounded-lg transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex justify-center items-center gap-2">
                    <h1 className="font-ubuntu">List Now</h1>
                    <FaArrowRightLong className="animate-pulse" />
                  </div>
                </button>
              </div>
            )}
            {error && (
              <p className="text-red-500 font-ubuntu text-xs pt-2">{error}</p>
            )}
          </div>
          <div className="mt-4 text-center text-xs text-gray-500 md:text-sm">
            <p>
              By continuing, you agree to our
              <Link href={"/terms"} className="underline mr-1 ml-1">
                Terms of Use
              </Link>
              &amp;
              <Link href={"/privacy"} className="underline ml-1">
                Privacy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8 ">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-600 mt-5">
            Why List Your Business with Us?
          </h2>
          {[
            "Reach a larger audience by listing your business for free and gain more visibility.",
            "Enjoy instant online visibility without any fees or hidden charges.",
            "Get your business in front of local customers who are actively searching for your products or services.",
            "No website required! Just list your services and start gaining customers.",
            "Start getting leads now, absolutely free of cost.",
          ].map((text, index) => (
            <div
              key={index}
              className="flex items-start gap-4 text-lg md:text-xl text-gray-800 "
            >
              <div className="w-10 ">
                <RiDoubleQuotesL className="text-[#f28b21] w-full" />
              </div>
              <div>
                <p className="text-base md:text-lg">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BLOtpModal
        isOpen={isModalOpen}
        phone={phone}
        onClose={closeOtpModal}
        handleOtpSubmit={handleOtpSubmit}
        handleOtpChange={handleOtpChange}
        otp={otp}
        setOtp={setOtp}
        handleResendOtp={handleResendOtp}
      />
      <div id="recaptcha-container" ></div>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default BusinessListingOtp;
