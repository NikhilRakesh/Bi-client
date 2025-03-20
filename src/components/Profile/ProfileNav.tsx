import Link from "next/link";
import React from "react";

const navItems = [
  { name: "Business", href: "/profile", key: "Business" },
  { name: "Enquires", href: "/profile/business-enquires", key: "Enquires" },
  { name: "BookMarks", href: "/profile/business-bookmarks", key: "BookMarks" },
];

export default function ProfileNav({ business }: { business: string }) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 transform -translate-x-1/2 mb-6 bg-black rounded-xl px-5 py-2 flex flex-row gap-3 w-fit">
      {navItems.map((item) => (
        <React.Fragment key={item.key}>
          <Link
            href={item.href}
            className={`font-ubuntuMedium ${
              business === item.key ? "text-orange-400" : "text-gray-300"
            }`}
          >
            {item.name}
          </Link>
          {item.key !== "BookMarks" && <span>|</span>}
        </React.Fragment>
      ))}
    </div>
  );
}
