'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GhibliAvatar } from './GhibliAvatar';
import { DoorNav } from './DoorNav';

const HouseSVG = ({ isOpen }: { isOpen: boolean }) => (
    <svg
        width="160"
        height="180"
        viewBox="0 0 160 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
    >
        {/* Chimney */}
        <rect x="110" y="25" width="18" height="40" fill="#8B6F47" rx="2" />
        <ellipse cx="119" cy="22" rx="12" ry="5" fill="#6B5A3E" />
        {/* Smoke */}
        <motion.g
            animate={{ y: [0, -8, 0], opacity: [0.6, 0.3, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
            <circle cx="119" cy="15" r="4" fill="#D4C4A8" opacity="0.5" />
            <circle cx="125" cy="8" r="3" fill="#D4C4A8" opacity="0.4" />
            <circle cx="118" cy="2" r="2.5" fill="#D4C4A8" opacity="0.3" />
        </motion.g>

        {/* Roof */}
        <path
            d="M20 70 L80 20 L140 70 Z"
            fill="#4A7C59"
            stroke="#376B4D"
            strokeWidth="2"
        />
        <path
            d="M15 70 L80 15 L145 70 Z"
            fill="none"
            stroke="#5A8A64"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />

        {/* Roof texture lines */}
        <path d="M40 58 L80 30 L120 58" fill="none" stroke="#5A8A64" strokeWidth="0.8" opacity="0.5" />
        <path d="M50 63 L80 38 L110 63" fill="none" stroke="#5A8A64" strokeWidth="0.8" opacity="0.4" />

        {/* House body */}
        <rect x="25" y="70" width="110" height="80" fill="#FDF6E3" rx="3" />
        <rect x="25" y="70" width="110" height="80" fill="none" stroke="#8B6F47" strokeWidth="2" rx="3" />

        {/* Wood texture */}
        <line x1="25" y1="90" x2="135" y2="90" stroke="#D4C4A8" strokeWidth="0.5" />
        <line x1="25" y1="110" x2="135" y2="110" stroke="#D4C4A8" strokeWidth="0.5" />
        <line x1="25" y1="130" x2="135" y2="130" stroke="#D4C4A8" strokeWidth="0.5" />

        {/* Door */}
        <rect x="60" y="100" width="40" height="50" fill="#8B6F47" rx="20 20 0 0" />
        <rect x="60" y="100" width="40" height="50" fill="none" stroke="#6B5A3E" strokeWidth="1.5" rx="20 20 0 0" />
        <circle cx="90" cy="128" r="3" fill="#D4A843" />
        <circle cx="90" cy="128" r="1.5" fill="#F4A261" />

        {/* Windows */}
        <g>
            <rect x="35" y="82" width="20" height="18" fill="#87CEEB" rx="2" />
            <rect x="35" y="82" width="20" height="18" fill="none" stroke="#8B6F47" strokeWidth="1.5" rx="2" />
            <line x1="45" y1="82" x2="45" y2="100" stroke="#8B6F47" strokeWidth="1" />
            <line x1="35" y1="91" x2="55" y2="91" stroke="#8B6F47" strokeWidth="1" />
            {/* Window glow */}
            <rect x="36" y="83" width="8" height="7" fill="#F4A261" opacity="0.3" rx="1" />
        </g>

        <g>
            <rect x="105" y="82" width="20" height="18" fill="#87CEEB" rx="2" />
            <rect x="105" y="82" width="20" height="18" fill="none" stroke="#8B6F47" strokeWidth="1.5" rx="2" />
            <line x1="115" y1="82" x2="115" y2="100" stroke="#8B6F47" strokeWidth="1" />
            <line x1="105" y1="91" x2="125" y2="91" stroke="#8B6F47" strokeWidth="1" />
            {/* Window glow */}
            <rect x="113" y="83" width="8" height="7" fill="#F4A261" opacity="0.3" rx="1" />
        </g>

        {/* Foundation */}
        <rect x="20" y="148" width="120" height="8" fill="#8B6F47" rx="2" />

        {/* Grass */}
        <path d="M15 156 Q25 148, 35 156 Q45 148, 55 156 Q65 148, 75 156 Q85 148, 95 156 Q105 148, 115 156 Q125 148, 135 156 Q145 148, 155 156" fill="#7CA982" />

        {/* Flowers */}
        <circle cx="30" cy="152" r="3" fill="#F4A261" />
        <circle cx="30" cy="152" r="1.5" fill="#D4A843" />
        <circle cx="50" cy="154" r="2.5" fill="#EC4899" />
        <circle cx="50" cy="154" r="1" fill="#F4A261" />
        <circle cx="120" cy="153" r="3" fill="#87CEEB" />
        <circle cx="120" cy="153" r="1.5" fill="#D4A843" />
        <circle cx="140" cy="155" r="2" fill="#F4A261" />
        <circle cx="140" cy="155" r="1" fill="#D4A843" />

        {/* Fence */}
        <line x1="5" y1="145" x2="5" y2="160" stroke="#8B6F47" strokeWidth="2" />
        <line x1="15" y1="145" x2="15" y2="160" stroke="#8B6F47" strokeWidth="2" />
        <line x1="2" y1="150" x2="18" y2="150" stroke="#8B6F47" strokeWidth="1.5" />
        <line x1="145" y1="145" x2="145" y2="160" stroke="#8B6F47" strokeWidth="2" />
        <line x1="155" y1="145" x2="155" y2="160" stroke="#8B6F47" strokeWidth="2" />
        <line x1="142" y1="150" x2="158" y2="150" stroke="#8B6F47" strokeWidth="1.5" />
    </svg>
);

export const GhibliHouse = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    const handleClick = useCallback(() => {
        setIsOpen(prev => !prev);
        if (!hasAnimated) {
            setHasAnimated(true);
        }
    }, [hasAnimated]);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            {/* Navigation doors - appear when house is open */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                        className="mb-2"
                    >
                        <DoorNav onNavigate={() => setIsOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Avatar - appears when house is open */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                        className="absolute bottom-44 right-0"
                    >
                        <GhibliAvatar />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* House button */}
            <motion.button
                onClick={handleClick}
                className={`ghibli-house relative cursor-pointer focus:outline-none focus:ring-4 focus:ring-ghibli-sunset/30 rounded-2xl ${
                    isOpen ? 'open' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                    y: [0, -8, 0],
                }}
                transition={{
                    y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    },
                }}
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
            >
                <HouseSVG isOpen={isOpen} />

                {/* Glow effect when open */}
                {isOpen && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            boxShadow: '0 0 30px rgba(244, 162, 97, 0.4), 0 0 60px rgba(244, 162, 97, 0.2)',
                        }}
                    />
                )}
            </motion.button>
        </div>
    );
};

export default GhibliHouse;
