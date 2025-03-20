import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Brandsinfo",
  description: "Login to access your account on Brandsinfo",
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
