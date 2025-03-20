"use client";

import { useState } from "react";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown button */}
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className="text-black text-xs px-4 font-openSans inline-flex items-center"
        type="button"
      >
        categories
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="#f28b21"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div id="dropdown" className="z-10 bg-white absolute mt-2">
          <ul className="py-2 text-sm text-black">
            <li>
              <a href="#" className="block px-4 py-2">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">
                Earnings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2">
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
