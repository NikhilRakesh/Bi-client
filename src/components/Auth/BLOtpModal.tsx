import React, { useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

type OTPModalProps = {
  isOpen: boolean;
  phone: string;
  onClose: () => void;
  handleOtpSubmit: (e: React.FormEvent) => void;
  handleOtpChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  handleResendOtp: () => void;
};

const BLOtpModal: React.FC<OTPModalProps> = ({
  isOpen,
  phone,
  onClose,
  handleOtpSubmit,
  handleOtpChange,
  otp,
  setOtp,
  handleResendOtp,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  const handleFocus = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    handleOtpChange(e, index);
    if (e.target.value.length === 1 && index < otp.length - 1) {
      const nextInput = inputRefs.current[index + 1];
      nextInput?.focus();
    }

    if (!e.target.value && index > 0) {
      const prevInput = inputRefs.current[index - 1];
      prevInput?.focus();
    }
    
  };

  const handleResend = () => {
    setOtp(Array(otp.length).fill(""));
    handleResendOtp();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      ></div>

      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-10/12 max-w-md">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className=" text-[#4f4e4d] hover:underline "
            >
              <AiOutlineClose className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center mb-2">
              <img
                src="/Brandsinfo-logo.png"
                alt="Logo"
                className="w-20 h-20 mb-4 rounded-full border-4 border-[#f28b21] p-5 shadow-xl"
              />
            </div>

            <h2 className="text-center text-xl font-semibold font-ubuntuMedium text-gray-700">
              OTP VERIFICATION
            </h2>

            <div className="flex gap-2 items-center">
              <p className="text-sm text-gray-600 font-ubuntu">
                OTP sent to <strong className="text-gray-600">{phone}</strong>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <div className="flex md:space-x-2 space-x-2 mt-3  justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="number"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleFocus(e, index)}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      className="md:w-14 md:h-16 w-12 h-12 no-arrows text-center text-gray-500 font-ubuntu border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f28b21] focus:border-[#f28b21]"
                    />
                  ))}
                </div>
                <div className="font-ubuntu text-black text-xs flex justify-between mt-5">
                  <p>Didn &rsquo; Receive the OTP?</p>
                  <p
                    className="text-blue-500 cursor-pointer"
                    onClick={handleResend}
                  >
                    Resend OTP
                  </p>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#f28b21] text-white font-semibold rounded-lg shadow-sm hover:bg-[#f28b21] focus:outline-none focus:ring-2 focus:ring-[#f28b21] focus:ring-opacity-50"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BLOtpModal;
