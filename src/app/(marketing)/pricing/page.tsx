import BPlan from "@/components/Auth/AddBusiness/BPlan";
import Footer from "@/components/Footer/Footer";
import { Suspense } from "react";

export default function Plan() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <BPlan />
      </Suspense>
      <Footer />
    </div>
  );
}
