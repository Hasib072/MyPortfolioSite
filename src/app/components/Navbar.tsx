// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo'; // Ensure the correct path to Logo.tsx

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


interface NavbarProps {
  isVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to check if the current route matches the link
  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={`w-full pt-[30px] ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-500 ease-in-out bg-black bg-opacity-50 z-50`}
      style={{
        backgroundColor: "transparent",
        position:'absolute',
        left:"0%",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" passHref>
              
                <Logo />
              
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:space-x-8 items-center ml-[20rem]">
            <Link href="/work" passHref>
              <p
                className={`${
                  isActive('/work') ? 'text-black' : 'text-gray-800 hover:text-black hover:underline hover:underline-offset-8 hover:decoration-2'
                } ${inter.className} px-3 py-2 rounded-md text-[1.35rem] font-bold transition-colors duration-200`}
              >
                Work
              </p>
            </Link>
            <Link href="/about" passHref>
              <p
                className={`${
                  isActive('/about') ? 'text-black' : 'text-gray-800 hover:text-black hover:underline hover:underline-offset-8 hover:decoration-2'
                } px-3 py-2 rounded-md text-[1.35rem] font-bold transition-colors duration-200`}
              >
                About
              </p>
            </Link>
            <Link href="/blog" passHref>
              <p
                className={`${
                  isActive('/blog') ? 'text-black' : 'text-gray-800 hover:text-black hover:underline hover:underline-offset-8 hover:decoration-2'
                } px-3 py-2 rounded-md text-[1.35rem] font-bold transition-colors duration-200`}
              >
                Blog
              </p>
            </Link>
          </div>

          {/* "Let's Talk" Button */}
          <div className="hidden md:flex items-center">
            <Link href="/contact" passHref>
              <p className=" inline-flex items-center px-4 py-2 border-transparent text-[22px] font-bold rounded-md text-black bg-transparent underline underline-offset-8 decoration-2 hover:no-underline">
                Let's Talk
              </p>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                // Hamburger Icon
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              ) : (
                // Close Icon
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/work" passHref>
              <p
                className={`${
                  isActive('/work') ? 'text-gray-300 underline' : 'text-gray-300 hover:text-white hover:underline hover:underline-offset-8'
                } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
              >
                Work
              </p>
            </Link>
            <Link href="/about" passHref>
              <p
                className={`${
                  isActive('/about') ? 'text-gray-300 underline' : 'text-gray-300 hover:text-white hover:underline'
                } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
              >
                About
              </p>
            </Link>
            <Link href="/blog" passHref>
              <p
                className={`${
                  isActive('/blog') ? 'text-gray-300 underline' : 'text-gray-300 hover:text-white hover:underline'
                } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
              >
                Blog
              </p>
            </Link>
            <Link href="/contact" passHref>
              <p
                className={`${
                  isActive('/contact') ? 'text-gray-300 underline' : 'text-gray-300 hover:text-white hover:underline'
                } block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200`}
              >
                Let's Talk
              </p>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
