import NotificationPage from "@/components/Notifications/NotificationPage";
import { WebSocketProvider } from "@/lib/WebSocketContext";

export default function Notification() {
  return (
    <div>
      <WebSocketProvider>
        <NotificationPage />
      </WebSocketProvider>
    </div>
  );
}
