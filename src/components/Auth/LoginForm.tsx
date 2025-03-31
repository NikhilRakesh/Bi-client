"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEdit } from "react-icons/ai";
import api from "@/lib/api";
import { AxiosError } from "axios";
import { setAccessTokenCookie, setRefreshTokenCookie } from "@/lib/cookies";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAgreed, setIsAgreed] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const router = useRouter();
  const InputRef = useRef<HTMLInputElement>(null);
  const OtpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isOtpValid = otp.every((digit) => digit !== "");

  const handlePhoneNumberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("users/signup1/", {
        phone: phone,
      });
      // alert(response.data.otp);
      if (window.recaptchaVerifier) {
        const formattednumber = `+91${phone}`;
        const confirmation = await signInWithPhoneNumber(
          auth,
          formattednumber,
          window.recaptchaVerifier
        );
        setConfirmation(confirmation);
      }
      if (!response?.data.exists) {
        setIsOtpSent(true);
        setIsOtpVerified(true);
      } else {
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw new Error("I failed you");
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
          router.back();
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // console.error("Error sending OTP:", error.message);
        if (error.status === 400) setError("invalid verification code");
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
    const otpString = otp.join("");
    setError("");
    setOtp(["", "", "", "", "", ""]);
    try {
      const response = await api.post("users/resendotp/", {
        phone: phone,
        otp: otpString,
      });
      console.log(response.status);
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d{0,10}$/.test(value)) {
      setPhone(value);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setError("");
  };

  const handleSubmitName = async () => {
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
        setIsOtpVerified(false);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  };

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
      window.recaptchaVerifier.render().then((widgetId: string) => {
        console.log("reCAPTCHA rendered with widgetId:", widgetId);
      });
    }

    if (InputRef.current) {
      InputRef.current.focus();
    }
    if (OtpInputRefs.current[0]) {
      OtpInputRefs.current[0]?.focus();
    }
  }, [isOtpSent, isOtpVerified, auth]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg md:bg-white md:rounded-lg md:shadow-xl p-8 space-y-6">
        <div id="recaptcha-container" className="hidden"></div>
        <div className="flex justify-center mb-6">
          <img
            src="/Brandsinfo-logo.png"
            alt="Logo"
            className="w-20 h-20 mb-4 rounded-full border-4 border-[#f28b21] p-5 shadow-xl"
          />
        </div>
        {!isOtpVerified ? (
          <div>
            <h1 className="text-3xl font-semibold text-center text-gray-900 font-ubuntuMedium mb-3">
              Login to Your Account
            </h1>
            <p className="text-sm text-gray-600 text-center max-w-md">
              Welcome back! Please enter your phone number and verify with OTP
              to access your account.
            </p>
          </div>
        ) : (
          <div className="text-center mt-8">
            <h1 className="text-3xl font-semibold font-ubuntuMedium text-black">
              Welcome to Brandsinfo!
            </h1>
            <p className="text-gray-600 mt-4 font-ubuntu text-sm">
              We are excited to have you on board! Please enter your name to get
              started with exploring the best businesses around you.
            </p>
          </div>
        )}
        {!isOtpSent ? (
          <form onSubmit={handlePhoneNumberSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium font-ubuntu text-gray-600 mb-2"
              >
                Phone Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-[#f28b21] focus-within:border-[#f28b21] transition duration-200 ease-in-out">
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
                  ref={InputRef}
                  required
                  className="w-full px-4 py-3 text-lg text-gray-600 no-arrows placeholder-gray-400 focus:outline-none font-ubuntuMedium rounded-r-lg bg-white"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={isAgreed}
                onChange={() => setIsAgreed(!isAgreed)}
                required
                className="text-[#f28b21] focus:ring-0"
              />
              <label htmlFor="agree" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-[#f28b21] hover:underline">
                  Terms & Conditions
                </Link>
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#f28b21] hover:underline"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            <div>
              <button
                type="submit"
                className={`w-full py-3 px-4 bg-[#f28b21] text-white font-semibold rounded-lg shadow-sm hover:bg-[#f28b21] focus:outline-none focus:ring-2 focus:ring-[#f28b21] focus:ring-opacity-50 ${
                  phone.length !== 10 ? "cursor-not-allowed" : ""
                }`}
                disabled={phone.length !== 10}
              >
                Send OTP
              </button>
            </div>
          </form>
        ) : !isOtpVerified ? (
          <div className="space-y-6">
            <div className="flex gap-2 items-center">
              <p className="text-sm text-gray-600">
                OTP sent to <strong>{phone}</strong>
              </p>
              <button
                type="button"
                onClick={() => setIsOtpSent(false)}
                className="text-[#f28b21] hover:underline"
              >
                <AiOutlineEdit className="w-5 h-5 inline-block" />
              </button>
            </div>
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <div className="flex md:space-x-3 space-x-1 mt-2 justify-center">
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
                      className="w-16 h-16 no-arrows text-center text-gray-500 font-ubuntu border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f28b21] focus:border-[#f28b21]"
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-red-500 font-ubuntu text-xs pt-2">
                    {error}
                  </p>
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
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full px-4 py-3 text-lg text-gray-600 placeholder-gray-400 focus:outline-none font-ubuntuMedium rounded-lg border border-gray-600"
                placeholder="Enter your name"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 font-ubuntu text-xs">{error}</p>
            )}
            <div>
              <button
                type="button"
                className="w-full py-3 px-4 bg-[#f28b21] text-white font-semibold rounded-lg shadow-sm hover:bg-[#f28b21] focus:outline-none focus:ring-2 focus:ring-[#f28b21] focus:ring-opacity-50"
                onClick={handleSubmitName}
              >
                Submit Name
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
