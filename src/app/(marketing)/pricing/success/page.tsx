"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import { WebSocketProvider } from "@/lib/WebSocketContext";
import SuccessPage from "@/components/package/SuccessPage";

export default function PurchaseSuccess() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <WebSocketProvider>
        <SuccessPage />
      </WebSocketProvider>
    </div>
  );
}
