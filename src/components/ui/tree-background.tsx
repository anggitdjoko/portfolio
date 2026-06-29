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

export function TreeBackground() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    // Create initial leaves
    const initialLeaves: Leaf[] = [];
    for (let i = 0; i < 15; i++) {
      initialLeaves.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 7,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
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
          duration: 8 + Math.random() * 7,
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.4,
        };
        return [...prev.slice(-20), newLeaf];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Tree SVG */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[80vh] opacity-20 dark:opacity-10">
        <svg viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Trunk */}
          <path d="M280 800 L280 400 Q280 350 300 300 Q320 250 300 200 Q280 150 300 100 Q320 50 300 0" 
            stroke="currentColor" strokeWidth="40" className="text-zinc-400 dark:text-zinc-600" fill="none"/>
          {/* Branches */}
          <path d="M280 400 Q200 350 150 300 Q100 250 120 200" stroke="currentColor" strokeWidth="20" className="text-zinc-400 dark:text-zinc-600" fill="none"/>
          <path d="M300 300 Q400 250 450 200 Q500 150 480 100" stroke="currentColor" strokeWidth="20" className="text-zinc-400 dark:text-zinc-600" fill="none"/>
          <path d="M290 200 Q220 150 180 100 Q140 50 160 0" stroke="currentColor" strokeWidth="15" className="text-zinc-400 dark:text-zinc-600" fill="none"/>
          <path d="M300 250 Q380 200 420 150 Q460 100 440 50" stroke="currentColor" strokeWidth="15" className="text-zinc-400 dark:text-zinc-600" fill="none"/>
          {/* Leaves clusters */}
          <circle cx="120" cy="200" r="60" className="fill-green-500/20 dark:fill-green-400/10"/>
          <circle cx="480" cy="100" r="70" className="fill-green-500/20 dark:fill-green-400/10"/>
          <circle cx="160" cy="0" r="50" className="fill-green-500/20 dark:fill-green-400/10"/>
          <circle cx="440" cy="50" r="55" className="fill-green-500/20 dark:fill-green-400/10"/>
          <circle cx="300" cy="0" r="80" className="fill-green-500/20 dark:fill-green-400/10"/>
        </svg>
      </div>

      {/* Falling Leaves */}
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
              x: `${leaf.x + (Math.random() - 0.5) * 20}vw`,
              rotate: leaf.rotation + 360,
              opacity: [0, 1, 1, 0] 
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
                  <svg width="80" height="80" viewBox="0 0 80 80" className="text-green-600 dark:text-green-400">
                    <path d="M40 0 C60 20 80 40 40 80 C0 40 20 20 40 0" fill="currentColor" opacity="0.8"/>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white dark:text-black uppercase tracking-wider">
                    {leaf.navItem.label}
                  </span>
                </div>
              </Link>
            ) : (
              <svg width="60" height="60" viewBox="0 0 60 60" className="text-green-500 dark:text-green-400 opacity-60">
                <path d="M30 0 C45 15 60 30 30 60 C0 30 15 15 30 0" fill="currentColor"/>
              </svg>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
