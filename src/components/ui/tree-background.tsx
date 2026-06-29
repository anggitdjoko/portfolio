'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Leaf {
  id: number;
  x: number;
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
  color: string;
  navItem?: { label: string; href: string };
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Skills', href: '/skills' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const ghibliColors = [
  '#4a7c59', // Forest green
  '#6b8f71', // Sage green
  '#8fbc8f', // Dark sea green
  '#90b77d', // Asparagus
  '#a4c639', // Android green
  '#b5d99c', // Tea green
  '#c1e1c1', // Tea green dark
  '#d4edda', // Honeydew
];

export function TreeBackground() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // Create initial leaves
    const initialLeaves: Leaf[] = [];
    for (let i = 0; i < 20; i++) {
      initialLeaves.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 10,
        rotation: Math.random() * 360,
        scale: 0.6 + Math.random() * 0.6,
        color: ghibliColors[Math.floor(Math.random() * ghibliColors.length)],
        navItem: i < navItems.length ? navItems[i] : undefined,
      });
    }
    setLeaves(initialLeaves);

    // Continuously add new leaves
    const interval = setInterval(() => {
      setLeaves(prev => {
        const newLeaf: Leaf = {
          id: Date.now(),
          x: Math.random() * 100,
          delay: 0,
          duration: 10 + Math.random() * 10,
          rotation: Math.random() * 360,
          scale: 0.6 + Math.random() * 0.6,
          color: ghibliColors[Math.floor(Math.random() * ghibliColors.length)],
        };
        return [...prev.slice(-25), newLeaf];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Ghibli-style gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 via-background to-green-100/20 dark:from-green-950/20 dark:via-background dark:to-green-900/10" />

      {/* Tree SVG - Ghibli Style */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[90vh] opacity-30 dark:opacity-15">
        <svg viewBox="0 0 800 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Main trunk - thick and organic */}
          <path d="M380 900 Q370 700 360 500 Q350 400 370 300 Q380 250 370 200 Q360 150 380 100 Q390 50 380 0" 
            stroke="#5d4037" strokeWidth="60" fill="none" strokeLinecap="round"/>
          {/* Trunk texture */}
          <path d="M370 900 Q365 700 355 500 Q350 400 365 300 Q370 250 365 200 Q360 150 375 100" 
            stroke="#4e342e" strokeWidth="20" fill="none" strokeLinecap="round" opacity="0.5"/>
          
          {/* Branches - organic Ghibli style */}
          <path d="M360 500 Q280 450 200 400 Q150 370 120 320 Q100 280 130 240" 
            stroke="#5d4037" strokeWidth="30" fill="none" strokeLinecap="round"/>
          <path d="M370 400 Q450 350 520 300 Q570 270 600 220 Q620 180 590 140" 
            stroke="#5d4037" strokeWidth="25" fill="none" strokeLinecap="round"/>
          <path d="M365 300 Q290 250 220 200 Q180 170 160 120 Q150 80 180 40" 
            stroke="#5d4037" strokeWidth="20" fill="none" strokeLinecap="round"/>
          <path d="M375 250 Q440 200 500 150 Q540 120 560 70 Q570 30 540 0" 
            stroke="#5d4037" strokeWidth="18" fill="none" strokeLinecap="round"/>
          <path d="M370 200 Q320 150 280 100 Q260 60 280 20" 
            stroke="#5d4037" strokeWidth="15" fill="none" strokeLinecap="round"/>
          
          {/* Leaf clusters - Ghibli style soft green */}
          <circle cx="120" cy="240" r="80" fill="#4a7c59" opacity="0.4"/>
          <circle cx="130" cy="320" r="70" fill="#6b8f71" opacity="0.3"/>
          <circle cx="590" cy="140" r="90" fill="#4a7c59" opacity="0.4"/>
          <circle cx="600" cy="220" r="75" fill="#6b8f71" opacity="0.3"/>
          <circle cx="180" cy="40" r="60" fill="#4a7c59" opacity="0.4"/>
          <circle cx="540" cy="0" r="70" fill="#6b8f71" opacity="0.3"/>
          <circle cx="280" cy="20" r="55" fill="#4a7c59" opacity="0.4"/>
          <circle cx="380" cy="0" r="100" fill="#4a7c59" opacity="0.5"/>
          <circle cx="400" cy="50" r="80" fill="#6b8f71" opacity="0.3"/>
          
          {/* Subtle glow effect */}
          <circle cx="380" cy="100" r="150" fill="url(#treeGlow)" opacity="0.1"/>
          <defs>
            <radialGradient id="treeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#4a7c59"/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Falling Leaves - Ghibli Style */}
      <AnimatePresence>
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{ 
              y: '-10vh', 
              x: `${leaf.x}vw`,
              rotate: leaf.rotation,
              opacity: 0 
            }}
            animate={{ 
              y: '110vh', 
              x: `${leaf.x + (Math.random() - 0.5) * 30}vw`,
              rotate: leaf.rotation + 720,
              opacity: [0, 0.8, 0.8, 0] 
            }}
            transition={{ 
              duration: leaf.duration, 
              delay: leaf.delay,
              ease: 'linear' 
            }}
            className="absolute pointer-events-auto"
            style={{ scale: leaf.scale }}
          >
            {leaf.navItem ? (
              <Link href={leaf.navItem.href} className="block">
                <div className="relative group cursor-pointer">
                  <svg width="90" height="90" viewBox="0 0 90 90">
                    {/* Ghibli-style leaf shape */}
                    <path d="M45 5 C65 20 85 45 45 85 C5 45 25 20 45 5" 
                      fill={leaf.color} stroke="#3d5a3d" strokeWidth="1"/>
                    <path d="M45 15 L45 75" stroke="#3d5a3d" strokeWidth="1.5" opacity="0.6"/>
                    <path d="M45 30 L30 20" stroke="#3d5a3d" strokeWidth="1" opacity="0.4"/>
                    <path d="M45 40 L60 30" stroke="#3d5a3d" strokeWidth="1" opacity="0.4"/>
                    <path d="M45 50 L28 42" stroke="#3d5a3d" strokeWidth="1" opacity="0.4"/>
                    <path d="M45 60 L62 52" stroke="#3d5a3d" strokeWidth="1" opacity="0.4"/>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-white dark:text-black uppercase tracking-wider drop-shadow-md">
                    {leaf.navItem.label}
                  </span>
                </div>
              </Link>
            ) : (
              <svg width="50" height="50" viewBox="0 0 50 50">
                <path d="M25 2 C38 12 48 25 25 48 C2 25 12 12 25 2" 
                  fill={leaf.color} stroke="#3d5a3d" strokeWidth="0.5" opacity="0.7"/>
                <path d="M25 8 L25 42" stroke="#3d5a3d" strokeWidth="1" opacity="0.4"/>
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
