'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GhibliAvatar } from './GhibliAvatar';
import { DoorNav } from './DoorNav';

const HouseSVG = ({ isOpen }: { isOpen: boolean }) => (
    <svg width="140" height="155" viewBox="0 0 140 155" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.15))' }}>
        <defs>
            <linearGradient id="roofReal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6B4226" />
                <stop offset="100%" stopColor="#7A5230" />
            </linearGradient>
            <linearGradient id="wallReal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5EDE0" />
                <stop offset="100%" stopColor="#E8DCC8" />
            </linearGradient>
        </defs>

        {/* Chimney */}
        <rect x="98" y="15" width="16" height="38" fill="#5C4830" rx="1" />
        <rect x="96" y="12" width="20" height="5" fill="#4D3D28" rx="1" />

        {/* Smoke */}
        <motion.g animate={{ y: [0, -12, 0], opacity: [0.4, 0.1, 0.4] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx="106" cy="8" r="5" fill="rgba(200,190,170,0.4)" />
            <circle cx="110" cy="0" r="4" fill="rgba(200,190,170,0.3)" />
            <circle cx="105" cy="-6" r="3" fill="rgba(200,190,170,0.2)" />
        </motion.g>

        {/* Roof */}
        <path d="M10 62 L70 12 L130 62 Z" fill="url(#roofReal)" stroke="#5C3A1A" strokeWidth="1" />
        <path d="M25 56 L70 20 L115 56" fill="none" stroke="rgba(80,50,25,0.3)" strokeWidth="0.8" />

        {/* Roof moss */}
        <circle cx="38" cy="42" r="4" fill="rgba(90,130,70,0.45)" />
        <circle cx="35" cy="45" r="2.5" fill="rgba(70,110,50,0.35)" />
        <circle cx="102" cy="42" r="3.5" fill="rgba(90,130,70,0.4)" />
        <circle cx="105" cy="45" r="2" fill="rgba(70,110,50,0.3)" />

        {/* Wall */}
        <rect x="16" y="62" width="108" height="72" fill="url(#wallReal)" stroke="rgba(180,160,130,0.5)" strokeWidth="1" rx="1" />

        {/* Wood texture */}
        <line x1="16" y1="80" x2="124" y2="80" stroke="rgba(200,180,150,0.4)" strokeWidth="0.5" />
        <line x1="16" y1="98" x2="124" y2="98" stroke="rgba(200,180,150,0.4)" strokeWidth="0.5" />
        <line x1="16" y1="116" x2="124" y2="116" stroke="rgba(200,180,150,0.4)" strokeWidth="0.5" />

        {/* Door */}
        <rect x="52" y="85" width="36" height="49" fill="#6B5538" rx="18 18 0 0" />
        <rect x="52" y="85" width="36" height="49" fill="none" stroke="#5C4830" strokeWidth="1" rx="18 18 0 0" />
        <rect x="56" y="92" width="12" height="16" fill="rgba(90,70,45,0.3)" rx="1" />
        <rect x="72" y="92" width="12" height="16" fill="rgba(90,70,45,0.3)" rx="1" />
        <rect x="56" y="112" width="12" height="16" fill="rgba(90,70,45,0.3)" rx="1" />
        <rect x="72" y="112" width="12" height="16" fill="rgba(90,70,45,0.3)" rx="1" />
        <rect x="54" y="87" width="2" height="44" fill="rgba(244,162,97,0.25)" rx="1" />
        <circle cx="80" cy="112" r="3" fill="#C4A040" />
        <circle cx="80" cy="112" r="1.5" fill="#D4B050" />

        {/* Windows */}
        <g>
            <rect x="24" y="72" width="20" height="16" fill="rgba(135,180,210,0.6)" rx="1" />
            <rect x="24" y="72" width="20" height="16" fill="none" stroke="#6B5538" strokeWidth="1.5" rx="1" />
            <line x1="34" y1="72" x2="34" y2="88" stroke="#6B5538" strokeWidth="0.8" />
            <line x1="24" y1="80" x2="44" y2="80" stroke="#6B5538" strokeWidth="0.8" />
            <rect x="25" y="73" width="8" height="6" fill="rgba(244,162,97,0.3)" rx="0.5" />
        </g>
        <g>
            <rect x="96" y="72" width="20" height="16" fill="rgba(135,180,210,0.6)" rx="1" />
            <rect x="96" y="72" width="20" height="16" fill="none" stroke="#6B5538" strokeWidth="1.5" rx="1" />
            <line x1="106" y1="72" x2="106" y2="88" stroke="#6B5538" strokeWidth="0.8" />
            <line x1="96" y1="80" x2="116" y2="80" stroke="#6B5538" strokeWidth="0.8" />
            <rect x="103" y="73" width="8" height="6" fill="rgba(244,162,97,0.3)" rx="0.5" />
        </g>

        {/* Window boxes */}
        <rect x="22" y="88" width="24" height="3" fill="#6B5538" rx="0.5" />
        <circle cx="26" cy="87" r="1.8" fill="rgba(200,80,80,0.6)" />
        <circle cx="31" cy="86" r="1.3" fill="rgba(244,162,97,0.5)" />
        <circle cx="36" cy="87" r="1.8" fill="rgba(200,80,80,0.6)" />
        <circle cx="41" cy="86" r="1.3" fill="rgba(135,180,210,0.5)" />
        <rect x="94" y="88" width="24" height="3" fill="#6B5538" rx="0.5" />
        <circle cx="98" cy="87" r="1.8" fill="rgba(244,162,97,0.6)" />
        <circle cx="103" cy="86" r="1.3" fill="rgba(200,80,80,0.5)" />
        <circle cx="108" cy="87" r="1.8" fill="rgba(135,180,210,0.6)" />
        <circle cx="113" cy="86" r="1.3" fill="rgba(244,162,97,0.5)" />

        {/* Foundation */}
        <rect x="10" y="132" width="120" height="5" fill="#6B5538" rx="1" />

        {/* Grass */}
        <path d="M6 137 Q16 128, 26 137 Q36 128, 46 137 Q56 128, 66 137 Q76 128, 86 137 Q96 128, 106 137 Q116 128, 126 137 Q136 128, 140 137" fill="rgba(100,150,80,0.5)" />

        {/* Flowers */}
        <circle cx="20" cy="133" r="2.5" fill="rgba(244,162,97,0.7)" />
        <circle cx="20" cy="133" r="1.2" fill="rgba(180,120,50,0.5)" />
        <circle cx="42" cy="135" r="2" fill="rgba(200,100,150,0.6)" />
        <circle cx="120" cy="134" r="2" fill="rgba(135,180,210,0.6)" />
        <circle cx="135" cy="136" r="1.5" fill="rgba(244,162,97,0.5)" />

        {/* Stone path */}
        <ellipse cx="70" cy="148" rx="9" ry="3" fill="rgba(180,170,150,0.5)" />
        <ellipse cx="60" cy="152" rx="6" ry="2.5" fill="rgba(180,170,150,0.4)" />
        <ellipse cx="80" cy="152" rx="5" ry="2" fill="rgba(180,170,150,0.4)" />
    </svg>
);

export const GhibliHouse = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
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

            <motion.button
                onClick={handleClick}
                className="relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-ghibli-sunset/20 rounded-xl group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                animate={{ y: [0, -4, 0] }}
                transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
            >
                <HouseSVG isOpen={isOpen} />

                <AnimatePresence>
                    {isOpen && (
                        <motion.div className="absolute inset-0 rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ boxShadow: '0 0 40px rgba(244,162,97,0.4), 0 0 80px rgba(244,162,97,0.2)' }}
                        />
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default GhibliHouse;
