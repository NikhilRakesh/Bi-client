"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ws } from "./api";
import { parseCookies } from "./cookies";

const WS_URL = ws;
const cookies = parseCookies();
const access_token = cookies?.access_token;

interface PaymentNotification {
  business: string;
  business_id: number;
  extras: string;
  message: string;
  ntype: string;
  timestamp: string;
  title: string;
  type: string;
}

interface WebSocketContextProps {
  socket: WebSocket | null;
  notificationCount: number;
  PaymentMessage: PaymentNotification | null;
}

interface WebSocketProviderProps {
  children: ReactNode;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined
);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [notificationCount, setNotificationCount] = useState(0);
  // const [notifications, setNotifications] = useState("");
  const [PaymentMessage, setPaymentMessage] =
    useState<PaymentNotification | null>(null);

  useEffect(() => {
    if (!access_token) {
      return;
    }
    const socketUrl = `${WS_URL}?token=${access_token}`;
    const newSocket = new WebSocket(socketUrl);

    newSocket.onopen = () => {
      console.log("WebSocket connection opened.");
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event?.data);
      console.log("data", data?.event);

      switch (data?.event?.ntype) {
        // case "chat":
        //   setChatMessages((prevMessages) => [...prevMessages, data]);
        //   break;
        case "notification_count":
          setNotificationCount(data?.event?.count);
          break;
        case "payment_status_update":
          setPaymentMessage(data?.event);
          break;
        default:
          console.log("Unknown message type:", data);
      }
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.close();
      }
    };
  }, [access_token]);

  return (
    <WebSocketContext.Provider
      value={{ socket, notificationCount, PaymentMessage }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
