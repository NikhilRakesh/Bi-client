"use client";

import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

interface OpenStatusProps {
  opensAt: string;
  closesAt: string;
}

const OpenStatus = ({ opensAt, closesAt }: OpenStatusProps) => {
  const [openStatus, setOpenStatus] = useState<{
    status: string;
    message: string;
    color: string;
    nextTime: string;
  }>({
    status: "closed",
    message: "",
    color: "text-gray-600",
    nextTime: "",
  });

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    const convertToMinutes = (time: string) => {
      const [hours, minutes] = time?.split(":")?.map((x) => parseInt(x, 10));
      return hours * 60 + minutes;
    };

    const openTimeInMinutes = convertToMinutes(opensAt);
    const closeTimeInMinutes = convertToMinutes(closesAt);
    const currentTimeInMinutes = currentHour * 60 + currentMinute;

    if (
      currentTimeInMinutes >= openTimeInMinutes &&
      currentTimeInMinutes <= closeTimeInMinutes
    ) {
      setOpenStatus({
        status: "open",
        message: `Open. Closes at ${closesAt}`,
        color: "text-green-600",
        nextTime: closesAt,
      });
    } else {
      setOpenStatus({
        status: "closed",
        message: `Closed. Opens at ${opensAt}`,
        color: "text-gray-600",
        nextTime: opensAt,
      });
    }
  }, [opensAt, closesAt]);

  const convertTo12HourFormat = (time24: string) => {
    // Remove the seconds part (e.g., "22:15:00" → "22:15")
    const timeWithoutSeconds = time24.split(":").slice(0, 2).join(":");

    const date = new Date(`1970-01-01T${timeWithoutSeconds}:00Z`);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex items-center px-2 gap-1">
      <FaClock className="text-blue-500" size={15} />
      <p className="text-gray-500">
        <span
          className={`${
            openStatus.status === "open" ? "text-green-600" : "text-gray-600"
          }`}
        >
          {openStatus.status === "open" ? "Open" : "Closed"}
        </span>
        {openStatus.status === "open"
          ? `. Closes at ${convertTo12HourFormat(closesAt)}`
          : `. Opens at ${convertTo12HourFormat(opensAt)}`}
      </p>
    </div>
  );
};

export default OpenStatus;
