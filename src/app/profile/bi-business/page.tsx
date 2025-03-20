import BusinessProfile from "@/components/Profile/BusinessProfile";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BusinessProfile />
    </Suspense>
  );
}
