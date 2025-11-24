'use client';

import { useState } from 'react';
import { ProfileMenu } from './ProfileMenu';

/**
 * Header Component with Avatar Button
 * Shows notification badge and opens profile menu on click
 */
export function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="p-4">
        <div className="flex flex-row justify-end items-center gap-4">
          {/* Avatar Button */}
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="relative group w-10 h-10"
          >
            {/* Notification Badge */}
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#10B981] text-black text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-black z-10">
              2
            </span>

            {/* Avatar with gradient border */}
            <div className="w-10 h-10 rounded-full p-0.5 cursor-pointer bg-linear-to-br from-orange-500 via-pink-500 to-purple-500 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-lg font-normal text-white">
                J
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Profile Menu */}
      <ProfileMenu isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
