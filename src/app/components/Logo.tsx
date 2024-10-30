// src/components/Logo.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import localFont from 'next/font/local'; // Import next/font/local

// Configure the AntonSC font
const antonSC = localFont({
  src: '../../app/fonts/AntonSC.ttf', // Adjust the path based on your project structure
  weight: '500', // Specify the font weight
  style: 'bold', // Specify the font style
  variable: '--font-anton-sc', // Optional: Define a CSS variable for the font
});


const fullText = "MIR HASIBUL RAHMAN";
const initialText = "MIR";

// Helper function to generate a random character
const generateRandomChar = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

const Logo = () => {
  const [displayedText, setDisplayedText] = useState(initialText);
  const [isHovered, setIsHovered] = useState(false);
  const [glitchIndices, setGlitchIndices] = useState<Set<number>>(new Set());

  // Refs to manage timeouts
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glitchTimeoutsRef = useRef<Map<number, NodeJS.Timeout>>(new Map());

  // Typewriter Effect
  useEffect(() => {
    // Clear any existing typing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    if (isHovered && displayedText.length < fullText.length) {
      // Add one character
      typingTimeoutRef.current = setTimeout(() => {
        const nextChar = fullText.charAt(displayedText.length);
        const newIndex = displayedText.length;

        // Add the next character to displayedText
        setDisplayedText(prev => prev + nextChar);

        // If the next character is not a space, add its index to glitchIndices
        if (nextChar !== ' ') {
          setGlitchIndices(prev => new Set(prev).add(newIndex));
        }
      }, 60); // Typing speed: 60ms per character
    } else if (!isHovered && displayedText.length > initialText.length) {
      // Remove one character without glitch
      typingTimeoutRef.current = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
      }, 40); // Deleting speed: 40ms per character
    }

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, [isHovered, displayedText]);

  // Glitch Effect
  useEffect(() => {
    glitchIndices.forEach(index => {
      // Ensure we only glitch characters that are being added (not removed)
      // Also, ensure that we don't glitch space characters (redundant but safe)
      if (fullText.charAt(index) === ' ') {
        setGlitchIndices(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
        return;
      }

      // If the index is already being handled, skip
      if (glitchTimeoutsRef.current.has(index)) return;

      // Replace the character with a random one
      setDisplayedText(prev => {
        return prev.slice(0, index) + generateRandomChar() + prev.slice(index + 1);
      });

      // After 200ms, set the correct character and remove from glitchIndices
      const glitchTimeout = setTimeout(() => {
        setDisplayedText(prev => {
          return prev.slice(0, index) + fullText.charAt(index) + prev.slice(index + 1);
        });
        setGlitchIndices(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
        glitchTimeoutsRef.current.delete(index);
      }, 120); // Glitch duration: 200ms

      // Store the timeout to manage cleanup
      glitchTimeoutsRef.current.set(index, glitchTimeout);
    });

    return () => {
      // Cleanup glitch timeouts on unmount
      glitchTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      glitchTimeoutsRef.current.clear();
    };
  }, [glitchIndices]);

  // Cleanup glitch timeouts on unmount
  useEffect(() => {
    return () => {
      glitchTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      glitchTimeoutsRef.current.clear();
    };
  }, []);

  // Render the text with glitches
  const renderText = () => {
    return displayedText.split('').map((char, index) => {
      if (index < initialText.length) {
        // Initial Text "MIR"
        return (
          <span key={index} className={`font-inter text-[2.2rem] font-bold text-black ${antonSC.className}`}>
            {char}
          </span>
        );
      } else {
        // Revealed Text with possible glitch
        const isGlitching = glitchIndices.has(index);
        // Ensure that spaces are not glitched
        const displayChar = (char === ' ') ? ' ' : (isGlitching ? generateRandomChar() : char);
        return (
          <span key={index} className={`font-inter text-[2.2rem] font-semibold text-black ${antonSC.className}`}>
            {displayChar}
          </span>
        );
      }
    });
  };

  return (
    <div
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // style={{ minWidth: '250px' }} // Adjusted to accommodate increased font size
    >
      {/* Initial Text */}
      <span className={`font-inter text-[2.2rem] font-semibold text-black ${antonSC.className}`}>
        {initialText}
      </span>

      {/* Expanding Text */}
      <span
        className={`absolute left-full top-0 ml-2 font-inter text-[2.2rem] font-semibold text-black overflow-hidden whitespace-nowrap ${antonSC.className}`}
        style={{ whiteSpace: 'nowrap' }}
      >
        {renderText().slice(initialText.length)}
        {/* Blinking Cursor */}
        {((isHovered && displayedText.length < fullText.length) || (!isHovered && displayedText.length > initialText.length)) && (
          <span
            className="inline-block bg-gray-800 animate-pulse ml-1"
            style={{
              width: '0.5rem',
              height: '1rem',
              display: 'none'
            }}
          >
            &nbsp;
          </span>
        )}
      </span>
    </div>
  );
};

export default Logo;
