'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GhibliAvatar } from './GhibliAvatar';
import { DoorNav } from './DoorNav';

const HouseSVG = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        width="150"
        height="170"
        viewBox="0 0 150 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.2))' }}
    >
        <defs>
            <radialGradient id="houseGlowPro" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#F4A261" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F4A261" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B4513" />
                <stop offset="100%" stopColor="#A0522D" />
            </linearGradient>
            <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF8F0" />
                <stop offset="100%" stopColor="#F5E6D3" />
            </linearGradient>
        </defs>

        {/* Warm glow */}
        <circle cx="75" cy="85" r="65" fill="url(#houseGlowPro)" />

        {/* Chimney */}
        <rect x="102" y="18" width="18" height="40" fill="#7A6240" rx="2" />
        <rect x="100" y="14" width="22" height="7" fill="#6B5A3E" rx="2" />
        {/* Chimney bricks */}
        <line x1="102" y1="25" x2="120" y2="25" stroke="#6B5A3E" strokeWidth="0.5" opacity="0.4" />
        <line x1="102" y1="32" x2="120" y2="32" stroke="#6B5A3E" strokeWidth="0.5" opacity="0.4" />
        <line x1="102" y1="39" x2="120" y2="39" stroke="#6B5A3E" strokeWidth="0.5" opacity="0.4" />
        <line x1="111" y1="18" x2="111" y2="58" stroke="#6B5A3E" strokeWidth="0.5" opacity="0.3" />

        {/* Smoke */}
        <motion.g
            animate={{ y: [0, -15, 0], opacity: [0.5, 0.15, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
            <circle cx="111" cy="10" r="6" fill="#D4C4A8" opacity="0.4" />
            <circle cx="117" cy="1" r="5" fill="#D4C4A8" opacity="0.3" />
            <circle cx="110" cy="-6" r="4" fill="#D4C4A8" opacity="0.2" />
            <circle cx="115" cy="-12" r="3" fill="#D4C4A8" opacity="0.1" />
        </motion.g>

        {/* Roof */}
        <path d="M12 65 L75 14 L138 65 Z" fill="url(#roofGrad)" stroke="#6B3A1F" strokeWidth="1.5" />
        <path d="M28 58 L75 22 L122 58" fill="none" stroke="#6B3A1F" strokeWidth="0.8" opacity="0.35" />
        <path d="M38 62 L75 30 L112 62" fill="none" stroke="#6B3A1F" strokeWidth="0.6" opacity="0.25" />

        {/* Roof moss */}
        <circle cx="42" cy="45" r="5" fill="#5A8A64" opacity="0.5" />
        <circle cx="38" cy="48" r="3" fill="#4A7C59" opacity="0.4" />
        <circle cx="108" cy="45" r="4" fill="#5A8A64" opacity="0.45" />
        <circle cx="112" cy="48" r="2.5" fill="#4A7C59" opacity="0.35" />
        <circle cx="75" cy="28" r="3" fill="#5A8A64" opacity="0.3" />

        {/* House body */}
        <rect x="18" y="65" width="114" height="78" fill="url(#wallGrad)" rx="2" />
        <rect x="18" y="65" width="114" height="78" fill="none" stroke="#D4C4A8" strokeWidth="1.5" rx="2" />

        {/* Wood planks */}
        <line x1="18" y1="83" x2="132" y2="83" stroke="#E8DCC8" strokeWidth="0.5" opacity="0.5" />
        <line x1="18" y1="101" x2="132" y2="101" stroke="#E8DCC8" strokeWidth="0.5" opacity="0.5" />
        <line x1="18" y1="119" x2="132" y2="119" stroke="#E8DCC8" strokeWidth="0.5" opacity="0.5" />
        <line x1="18" y1="137" x2="132" y2="137" stroke="#E8DCC8" strokeWidth="0.5" opacity="0.4" />

        {/* Door */}
        <rect x="55" y="90" width="40" height="53" fill="#8B6F47" rx="20 20 0 0" />
        <rect x="55" y="90" width="40" height="53" fill="none" stroke="#6B5A3E" strokeWidth="1.5" rx="20 20 0 0" />
        {/* Door panels */}
        <rect x="60" y="98" width="13" height="18" fill="#7A6240" rx="1" opacity="0.3" />
        <rect x="77" y="98" width="13" height="18" fill="#7A6240" rx="1" opacity="0.3" />
        <rect x="60" y="120" width="13" height="18" fill="#7A6240" rx="1" opacity="0.3" />
        <rect x="77" y="120" width="13" height="18" fill="#7A6240" rx="1" opacity="0.3" />
        {/* Door light leak */}
        <rect x="57" y="92" width="2.5" height="48" fill="#F4A261" opacity="0.35" rx="1" />
        {/* Door handle */}
        <circle cx="86" cy="118" r="3.5" fill="#D4A843" />
        <circle cx="86" cy="118" r="2" fill="#F4A261" />
        <circle cx="86.5" cy="117" r="1" fill="#FFF8F0" opacity="0.5" />

        {/* Windows */}
        <g>
            <rect x="26" y="74" width="22" height="18" fill="#87CEEB" rx="2" />
            <rect x="26" y="74" width="22" height="18" fill="none" stroke="#8B6F47" strokeWidth="1.5" rx="2" />
            <line x1="37" y1="74" x2="37" y2="92" stroke="#8B6F47" strokeWidth="1" />
            <line x1="26" y1="83" x2="48" y2="83" stroke="#8B6F47" strokeWidth="1" />
            <rect x="27" y="75" width="9" height="7" fill="#F4A261" opacity="0.4" rx="1" />
            <rect x="27" y="84" width="9" height="7" fill="#F4A261" opacity="0.3" rx="1" />
        </g>
        <g>
            <rect x="102" y="74" width="22" height="18" fill="#87CEEB" rx="2" />
            <rect x="102" y="74" width="22" height="18" fill="none" stroke="#8B6F47" strokeWidth="1.5" rx="2" />
            <line x1="113" y1="74" x2="113" y2="92" stroke="#8B6F47" strokeWidth="1" />
            <line x1="102" y1="83" x2="124" y2="83" stroke="#8B6F47" strokeWidth="1" />
            <rect x="111" y="75" width="9" height="7" fill="#F4A261" opacity="0.4" rx="1" />
            <rect x="111" y="84" width="9" height="7" fill="#F4A261" opacity="0.3" rx="1" />
        </g>

        {/* Window boxes */}
        <rect x="24" y="92" width="26" height="4" fill="#8B6F47" rx="1" />
        <circle cx="28" cy="91" r="2" fill="#FF6B6B" opacity="0.7" />
        <circle cx="33" cy="90" r="1.5" fill="#F4A261" opacity="0.6" />
        <circle cx="38" cy="91" r="2" fill="#FF6B6B" opacity="0.7" />
        <circle cx="43" cy="90" r="1.5" fill="#87CEEB" opacity="0.6" />
        <rect x="100" y="92" width="26" height="4" fill="#8B6F47" rx="1" />
        <circle cx="104" cy="91" r="2" fill="#F4A261" opacity="0.7" />
        <circle cx="109" cy="90" r="1.5" fill="#FF6B6B" opacity="0.6" />
        <circle cx="114" cy="91" r="2" fill="#87CEEB" opacity="0.7" />
        <circle cx="119" cy="90" r="1.5" fill="#F4A261" opacity="0.6" />

        {/* Foundation */}
        <rect x="12" y="141" width="126" height="7" fill="#8B6F47" rx="2" />

        {/* Grass & flowers */}
        <path d="M8 148 Q18 138, 28 148 Q38 138, 48 148 Q58 138, 68 148 Q78 138, 88 148 Q98 138, 108 148 Q118 138, 128 148 Q138 138, 148 148" fill="#7CA982" />

        {/* Wildflowers */}
        <circle cx="22" cy="144" r="3" fill="#F4A261" />
        <circle cx="22" cy="144" r="1.5" fill="#D4A843" />
        <circle cx="45" cy="146" r="2.5" fill="#EC4899" opacity="0.8" />
        <circle cx="45" cy="146" r="1" fill="#F4A261" opacity="0.6" />
        <circle cx="125" cy="145" r="2.5" fill="#87CEEB" />
        <circle cx="125" cy="145" r="1" fill="#D4A843" />
        <circle cx="140" cy="147" r="2" fill="#F4A261" />
        <circle cx="140" cy="147" r="1" fill="#D4A843" />

        {/* Fence */}
        <line x1="2" y1="142" x2="2" y2="155" stroke="#8B6F47" strokeWidth="2" />
        <line x1="10" y1="142" x2="10" y2="155" stroke="#8B6F47" strokeWidth="2" />
        <line x1="0" y1="147" x2="12" y2="147" stroke="#8B6F47" strokeWidth="1.5" />
        <line x1="140" y1="142" x2="140" y2="155" stroke="#8B6F47" strokeWidth="2" />
        <line x1="148" y1="142" x2="148" y2="155" stroke="#8B6F47" strokeWidth="2" />
        <line x1="138" y1="147" x2="150" y2="147" stroke="#8B6F47" strokeWidth="1.5" />

        {/* Stone path */}
        <ellipse cx="75" cy="158" rx="10" ry="3.5" fill="#D4C4A8" opacity="0.6" />
        <ellipse cx="63" cy="163" rx="7" ry="3" fill="#D4C4A8" opacity="0.5" />
        <ellipse cx="87" cy="163" rx="6" ry="2.5" fill="#D4C4A8" opacity="0.5" />
        <ellipse cx="75" cy="167" rx="5" ry="2" fill="#D4C4A8" opacity="0.4" />
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
                        className="absolute bottom-40 right-0 sm:bottom-48"
                    >
                        <GhibliAvatar />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={handleClick}
                className="relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-ghibli-sunset/30 rounded-2xl group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
            >
                <HouseSVG isOpen={isOpen} />

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="absolute inset-0 rounded-2xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                boxShadow: '0 0 50px rgba(244, 162, 97, 0.5), 0 0 100px rgba(244, 162, 97, 0.25)',
                            }}
                        />
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default GhibliHouse;
