"use client";

import React, { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  delay?: number; // delay per character in ms, optional, default to 70
  className?: string;
  onTypingComplete?: () => void; // Callback when typing is done
}

const TypingText: React.FC<TypingTextProps> = ({ text, delay = 70, className, onTypingComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      if (onTypingComplete) {
        onTypingComplete();
      }
    }
  }, [currentIndex, delay, text, onTypingComplete]);

  return <span className={className}>{displayedText}</span>;
};

export default TypingText;
