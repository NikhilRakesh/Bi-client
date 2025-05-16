import DashBoard from "@/newsComponents/DashBoard/DashBoard";
import Recommentation from "@/newsComponents/DashBoard/Recommentation";
import Header from "@/newsComponents/Headder/Headder";
import React from "react";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#dfe8f3] via-[#e6eff9] to-[#ecf5fc] p-6 md:px-12 text-gray-900">
      <header>
        <Header />
      </header>
      <main className="flex gap-6 ">
        <div className="flex flex-row w-9/12 overflow-y-auto max-h-screen scrollbar-hidden">
          <DashBoard />
        </div>
        <Recommentation />
      </main>
    </div>
  );
}
