import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Processing - Brandsinfo",
  description:
    "Your payment is being processed. Please wait while we confirm your transaction.",
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div>
        <main>{children}</main>
      </div>
    </>
  );
}
