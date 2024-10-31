// pages/index.tsx
'use client';

import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";


import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });

import { Anton_SC } from "next/font/google";
const anton = Anton_SC({weight: '400'});

import { Source_Serif_4 } from "next/font/google";
const sourceS4 = Source_Serif_4({ subsets: ['latin'], style: 'italic'});

export default function Home() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  // Effect to handle Navbar visibility based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar isVisible={isNavbarVisible} />

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row">
        {/* Left Section - 40% Width */}
        <div className="md:w-[45%] bg-gray-500 flex-shrink-0 flex items-center justify-center p-4 sticky top-0  h-screen">
          {/* Left-side Content */}
          <p className="text-white text-lg">
            Welcome to My Website
          </p>
        </div>

        {/* Right Section - 60% Width */}
        <div className="md:w-[55%] bg-white p-8 pl-[105px]">
          {/* Scrollable Content */}
          <h2 className={` ${anton.className} text-[144px] leading-[130px] font-black mb-4 mt-[130]`}>
            MIR<br/>HASIBUL<br/>RAHMAN
          </h2>

          <div className={`mb-[40px] mt-[70px]`}>
            <p className={`${sourceS4.className} italic text-[22px] text-[#0E101199]`}>Based in Bangalore, India</p>
          </div>

          <div className="space-y-4">
            {/* Dummy Content to Enable Scrolling */}
            {Array.from({ length: 20 }).map((_, index) => (
              <p key={index} className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                vehicula, urna at efficitur aliquet, libero justo feugiat leo, at
                luctus turpis urna in quam. Donec vitae nunc nec justo aliquam
                suscipit. Integer in dolor at arcu gravida vehicula.
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Other Section Below */}
      <section className="bg-peachpuff h-[250px] flex items-center justify-center">
        This Section is supposed to be below both the left and right parts.
      </section>
    </>
  );
}
