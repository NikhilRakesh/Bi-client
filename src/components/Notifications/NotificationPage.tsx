"use client";

import {
  FiBell,
  FiCheck,
  FiStar,
  FiAlertTriangle,
  FiShoppingBag,
  FiMail,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import BackButton from "@/components/Common/BackButton";
import { token_api } from "@/lib/api";
import { parseCookies } from "@/lib/cookies";
import { useWebSocket } from "@/lib/WebSocketContext";

interface Notification {
  buisness: number;
  id: number;
  is_read: boolean;
  message: string;
  timestamp: string;
  user: number;
  ntype: string;
}

export default function NotificationPage() {
  const [notifications, setNotofications] = useState<Notification[] | null>(
    null
  );
  const cookies = parseCookies();
  const access_token = cookies?.access_token;
  const { notificationCount } = useWebSocket();

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const response = await token_api(access_token).get(
        "communications/notifications/"
      );
      if (response.status === 200) {
        console.log(response.data);

        setNotofications(response.data);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reward":
        return <FiStar className="text-amber-500" />;
      case "purchase":
        return <FiShoppingBag className="text-indigo-500" />;
      case "BUISNESS_UPDATES":
        return <FiAlertTriangle className="text-red-500" />;
      case "PLAN_EXPIRED":
        return <FiAlertTriangle className="text-red-500" />;
      case "VISIT_REPORT":
        return <FiStar className="text-green-500" />;
      case "ENQUIRY_REPORT":
        return <FiStar className="text-green-500" />;
      case "plan_purchase":
        return <FiCheck className="text-blue-500" />;
      default:
        return <FiMail className="text-gray-500" />;
    }
  };

  function formatRelativeTime(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    if (weeks >= 1) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } else if (days >= 1) {
      return dayName;
    } else if (hours >= 1) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between space-x-3">
          <BackButton />
          <div className="flex items-center justify-between gap-2">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <FiBell className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              Notifications
            </h1>
            {notificationCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {notificationCount} new
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 px-6">
        <div className="flex space-x-4">
          {["All"].map((tab) => (
            <button
              key={tab}
              className={`py-3 px-1 font-medium text-sm border-b-2 ${
                tab === "All"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {notifications && (
        <div className="divide-y divide-gray-100">
          {notifications?.map((notification) => (
            <div
              key={notification.id}
              className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                !notification.is_read ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`flex-shrink-0 mt-1 p-2 rounded-lg ${
                    !notification.is_read
                      ? "bg-white shadow-sm border border-blue-200"
                      : "bg-gray-100"
                  }`}
                >
                  {getNotificationIcon(notification?.ntype)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-sm font-medium ${
                        !notification.is_read
                          ? "text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {/* {notification.title} */}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatRelativeTime(notification.timestamp)}
                    </span>
                    {!notification.is_read && (
                      <p className="text-xs text-indigo-600 hover:text-indigo-800">
                        New
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
