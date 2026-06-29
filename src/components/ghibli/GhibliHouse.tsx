'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GhibliAvatar } from './GhibliAvatar';
import { DoorNav } from './DoorNav';

const HouseSVG = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        width="140"
        height="160"
        viewBox="0 0 140 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))' }}
    >
        {/* Warm glow behind house */}
        <defs>
            <radialGradient id="houseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F4A261" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#F4A261" stopOpacity="0" />
            </radialGradient>
            <filter id="painterly">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
            </filter>
        </defs>

        {/* Glow */}
        <circle cx="70" cy="80" r="60" fill="url(#houseGlow)" />

        {/* Chimney */}
        <rect x="95" y="20" width="16" height="35" fill="#8B6F47" rx="2" />
        <rect x="93" y="17" width="20" height="6" fill="#6B5A3E" rx="2" />

        {/* Smoke - organic */}
        <motion.g
            animate={{ y: [0, -12, 0], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
            <circle cx="103" cy="12" r="5" fill="#D4C4A8" opacity="0.4" />
            <circle cx="108" cy="4" r="4" fill="#D4C4A8" opacity="0.3" />
            <circle cx="102" cy="-3" r="3" fill="#D4C4A8" opacity="0.2" />
        </motion.g>

        {/* Roof - warm red-brown */}
        <path
            d="M15 60 L70 15 L125 60 Z"
            fill="#A0522D"
            stroke="#8B4513"
            strokeWidth="1.5"
        />
        {/* Roof texture */}
        <path d="M30 53 L70 22 L110 53" fill="none" stroke="#8B4513" strokeWidth="0.8" opacity="0.4" />
        <path d="M40 56 L70 30 L100 56" fill="none" stroke="#8B4513" strokeWidth="0.6" opacity="0.3" />

        {/* Roof moss */}
        <circle cx="45" cy="42" r="4" fill="#5A8A64" opacity="0.5" />
        <circle cx="95" cy="42" r="3" fill="#5A8A64" opacity="0.4" />

        {/* House body - warm cream */}
        <rect x="20" y="60" width="100" height="70" fill="#FFF8F0" rx="2" />
        <rect x="20" y="60" width="100" height="70" fill="none" stroke="#D4C4A8" strokeWidth="1.5" rx="2" />

        {/* Wood planks */}
        <line x1="20" y1="78" x2="120" y2="78" stroke="#E8DCC8" strokeWidth="0.5" />
        <line x1="20" y1="96" x2="120" y2="96" stroke="#E8DCC8" strokeWidth="0.5" />
        <line x1="20" y1="114" x2="120" y2="114" stroke="#E8DCC8" strokeWidth="0.5" />

        {/* Door - warm wood */}
        <rect x="52" y="85" width="36" height="45" fill="#8B6F47" rx="18 18 0 0" />
        <rect x="52" y="85" width="36" height="45" fill="none" stroke="#6B5A3E" strokeWidth="1" rx="18 18 0 0" />

        {/* Door light leak */}
        <rect x="54" y="87" width="2" height="40" fill="#F4A261" opacity="0.3" rx="1" />

        {/* Door handle */}
        <circle cx="80" cy="110" r="3" fill="#D4A843" />
        <circle cx="80" cy="110" r="1.5" fill="#F4A261" />

        {/* Windows - warm glow */}
        <g>
            <rect x="28" y="70" width="18" height="16" fill="#87CEEB" rx="2" />
            <rect x="28" y="70" width="18" height="16" fill="none" stroke="#8B6F47" strokeWidth="1.5" rx="2" />
            <line x1="37" y1="70" x2="37" y2="86" stroke="#8B6F47" strokeWidth="1" />
            <line x1="28" y1="78" x2="46" y2="78" stroke="#8B6F47" strokeWidth="1" />
            {/* Warm interior glow */}
            <rect x="29" y="71" width="7" height="6" fill="#F4A261" opacity="0.4" rx="1" />
        </g>

        <g>
            <rect x="94" y="70" width="18" height="16" fill="#87CEEB" rx="2" />
            <rect x="94" y="70" width="18" height="16" fill="none" stroke="#8B6F47" strokeWidth="1.5" rx="2" />
            <line x1="103" y1="70" x2="103" y2="86" stroke="#8B6F47" strokeWidth="1" />
            <line x1="94" y1="78" x2="112" y2="78" stroke="#8B6F47" strokeWidth="1" />
            <rect x="101" y="71" width="7" height="6" fill="#F4A261" opacity="0.4" rx="1" />
        </g>

        {/* Foundation */}
        <rect x="15" y="128" width="110" height="6" fill="#8B6F47" rx="2" />

        {/* Grass & flowers at base */}
        <path d="M10 134 Q20 126, 30 134 Q40 126, 50 134 Q60 126, 70 134 Q80 126, 90 134 Q100 126, 110 134 Q120 126, 130 134" fill="#7CA982" />

        {/* Wildflowers */}
        <circle cx="25" cy="130" r="3" fill="#F4A261" />
        <circle cx="25" cy="130" r="1.5" fill="#D4A843" />
        <circle cx="45" cy="132" r="2.5" fill="#EC4899" opacity="0.8" />
        <circle cx="115" cy="131" r="2.5" fill="#87CEEB" />
        <circle cx="115" cy="131" r="1" fill="#D4A843" />

        {/* Tiny fence */}
        <line x1="5" y1="130" x2="5" y2="140" stroke="#8B6F47" strokeWidth="1.5" />
        <line x1="12" y1="130" x2="12" y2="140" stroke="#8B6F47" strokeWidth="1.5" />
        <line x1="3" y1="134" x2="14" y2="134" stroke="#8B6F47" strokeWidth="1" />
        <line x1="128" y1="130" x2="128" y2="140" stroke="#8B6F47" strokeWidth="1.5" />
        <line x1="135" y1="130" x2="135" y2="140" stroke="#8B6F47" strokeWidth="1.5" />
        <line x1="126" y1="134" x2="137" y2="134" stroke="#8B6F47" strokeWidth="1" />

        {/* Stone path */}
        <ellipse cx="70" cy="145" rx="8" ry="3" fill="#D4C4A8" opacity="0.6" />
        <ellipse cx="60" cy="150" rx="6" ry="2.5" fill="#D4C4A8" opacity="0.5" />
        <ellipse cx="80" cy="150" rx="5" ry="2" fill="#D4C4A8" opacity="0.5" />
    </svg>
);

export const GhibliHouse = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
            {/* Navigation doors */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <DoorNav onNavigate={() => setIsOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Avatar */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="absolute bottom-36 right-0 sm:bottom-44"
                    >
                        <GhibliAvatar />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* House button */}
            <motion.button
                onClick={handleClick}
                className="relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-ghibli-sunset/30 rounded-2xl group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                animate={{
                    y: [0, -6, 0],
                }}
                transition={{
                    y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
            >
                <HouseSVG isOpen={isOpen} />

                {/* Glow when open */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                boxShadow: '0 0 40px rgba(244, 162, 97, 0.5), 0 0 80px rgba(244, 162, 97, 0.25)',
                            }}
                        />
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default GhibliHouse;
