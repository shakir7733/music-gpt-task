'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Music, Compass, User, Heart, Plus, Search, Command } from 'lucide-react';
/**
 * Sidebar Navigation Component
 * Implements the left sidebar from Figma design with logo, search, navigation, and library sections
 */
export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Music, label: 'Create', href: '/create' },
    { icon: Compass, label: 'Explore', href: '/explore' },
  ];

  const libraryItems = [
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Heart, label: 'Liked', href: '/liked' },
    { icon: Plus, label: 'New playlist', href: '/playlist/new' },
  ];

  return (
    <aside className="p-4 h-screen w-48 bg-[#ffffff06] flex flex-col gap-8">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="MusicGPT Logo" className="w-6 h-6" />
        <span className="text-lg font-normal text-white">MusicGPT</span>
      </div>

      {/* Search Input */}
      <div className="flex flex-row justify-between items-center px-4 py-[3px] gap-2.5 w-[146px] border border-white/16 rounded-full">
        <div className="flex flex-row items-center gap-2">
          <Search className="w-5 h-5 text-[#E4E6E8]" strokeWidth={1.67} />
          <input 
            type="text"
            placeholder="Search"
            className="w-[49px] bg-transparent border-none outline-none font-inter font-medium text-sm leading-[31px] tracking-[0.02em] text-white placeholder:text-white flex-none"
            aria-label="Search"
          />
        </div>
        <div className="flex flex-row items-center gap-0.5">
          <Command className="w-4 h-4 text-white/20 " strokeWidth={1.67} />
          <span className="text-sm leading-[17px] tracking-[0.02em] text-white/20 font-inter flex-none">K</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all max-w-fit ${
                    pathname === item.href
                      ? 'bg-white/9 text-white'
                      : 'text-white hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="text-sm font-normal">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Library Section */}
        <div className="mt-8">
          <h3 className="px-5 py-3 text-xs font-semibold text-gray-500 tracking-wider">
            Library
          </h3>
          <ul className="space-y-1">
            {libraryItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all max-w-fit ${
                      pathname === item.href
                        ? 'bg-white/9 text-white'
                        : 'text-white hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-normal">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Bottom Notification Banner */}
      <div>
        <div className="mb-4 px-3 py-2.5 rounded-xl" 
            style={{
                background: 'linear-gradient(233.67deg, rgba(48, 7, 255, 0.29) -2.43%, rgba(209, 40, 150, 0.271346) 58.32%, rgba(255, 86, 35, 0.25) 98.83%), #1D2125'
            }}
            >
            <div className="text-xs font-semibold text-white mb-1">
            Model v6 Pro is here!
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
            Pushing boundaries to the world's best AI music model
            </p>
        </div>

        {/* Footer Flag */}
        <div className="pb-4 mt-5 flex justify-start gap-2 flex-wrap">
            <FooterText>Pricing</FooterText>
            <FooterText>Affiliate</FooterText>
            <FooterText>API</FooterText>
            <FooterText>About</FooterText>
            <FooterText>Terms</FooterText>
            <FooterText>Privacy</FooterText>
        </div>
      </div>
    </aside>
  );
}

export const FooterText = ({children}:{children: React.ReactNode}) => {
    return (
        <div className="text-xs text-white/50">{children}</div>
    );
}