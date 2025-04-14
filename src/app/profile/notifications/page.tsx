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

interface Notification {
  buisness: string | null;
  id: number;
  is_read: boolean;
  message: string;
  timestamp: string;
  user: number;
}

export default function PremiumNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Profile Completion Bonus",
      message: "You earned 15 points for completing your business profile",
      time: "2 min ago",
      read: false,
      type: "reward",
      priority: "high",
    },
    {
      id: 2,
      title: "New Subscription Activated",
      message: "Premium plan successfully activated. Enjoy your new features!",
      time: "1 hour ago",
      read: true,
      type: "purchase",
      priority: "medium",
    },
    {
      id: 3,
      title: "Security Alert",
      message: "New login detected from Chrome on Windows",
      time: "5 hours ago",
      read: false,
      type: "alert",
      priority: "critical",
    },
    {
      id: 4,
      title: "Your Business Reached 1K Views",
      message: "Congratulations! Your profile was viewed 1,000 times this week",
      time: "1 day ago",
      read: true,
      type: "achievement",
      priority: "medium",
    },
    {
      id: 5,
      title: "Payment Receipt",
      message: "Your invoice #INV-2023-05-15 for $29.99 has been paid",
      time: "2 days ago",
      read: true,
      type: "payment",
      priority: "low",
    },
    {
      id: 6,
      title: "Profile Incomplete",
      message: "Complete 3 more sections to boost your visibility by 40%",
      time: "3 days ago",
      read: false,
      type: "reminder",
      priority: "high",
    },
  ]);
  const cookies = parseCookies();
  const access_token = cookies?.access_token;

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const response = await token_api(access_token).get(
        "communications/notifications/"
      );
      const data = await response.data;
      console.log(response.data);
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
      case "alert":
        return <FiAlertTriangle className="text-red-500" />;
      case "achievement":
        return <FiStar className="text-green-500" />;
      case "payment":
        return <FiCheck className="text-blue-500" />;
      default:
        return <FiMail className="text-gray-500" />;
    }
  };

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
            {unreadCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200 px-6">
        <div className="flex space-x-4">
          {["All", "Unread"].map((tab) => (
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

      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
              !notification.read ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 mt-1 p-2 rounded-lg ${
                  !notification.read
                    ? "bg-white shadow-sm border border-blue-200"
                    : "bg-gray-100"
                }`}
              >
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-sm font-medium ${
                      !notification.read ? "text-gray-900" : "text-gray-700"
                    }`}
                  >
                    {notification.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                  {!notification.read && (
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
    </div>
  );
}
