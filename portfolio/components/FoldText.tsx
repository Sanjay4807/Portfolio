"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FoldTextProps {
  text?: string;
  splitBy?: "char" | "word";
  hinge?: "top" | "bottom";
  trigger?: "mount" | "hover" | "scroll";
  duration?: number;
  stagger?: number;
  ease?: string;
  perspective?: number;
  creaseShading?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

const FoldText: React.FC<FoldTextProps> = ({
  text = "",
  splitBy = "char",
  hinge = "top",
  trigger = "mount",
  duration = 0.65,
  stagger = 0.045,
  ease = "power3.out",
  perspective = 700,
  creaseShading = 0.55,
  fontSize = 80,
  fontWeight = 800,
  color = "#f7f2e8"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      {
        rotationX: hinge === 'top' ? -90 : 90,
        opacity: 0,
        transformOrigin: hinge === 'top' ? '50% 0%' : '50% 100%'
      },
      {
        rotationX: 0,
        opacity: 1,
        duration: duration,
        stagger: stagger,
        ease: ease,
        delay: trigger === 'mount' ? 0.1 : 0
      }
    );
  }, [duration, stagger, ease, hinge, trigger]);

  const characters = text.split('').map((char, i) => (
    <span 
      key={i} 
      className="char" 
      style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </span>
  ));

  return (
    <div 
      ref={containerRef}
      style={{
        perspective: `${perspective}px`,
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight,
        color: color,
        display: 'inline-block'
      }}
    >
      {characters}
    </div>
  );
};

export default FoldText;
