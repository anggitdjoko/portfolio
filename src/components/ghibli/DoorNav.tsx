'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DoorItem {
    label: string;
    href: string;
    icon: string;
    color: string;
    description: string;
}

const doors: DoorItem[] = [
    { label: 'Home', href: '#home', icon: '🏡', color: '#F4A261', description: 'Welcome home' },
    { label: 'About', href: '#about', icon: '📖', color: '#7CA982', description: 'My story' },
    { label: 'Skills', href: '#skills', icon: '✨', color: '#87CEEB', description: 'What I do' },
    { label: 'Experience', href: '#experience', icon: '🗺️', color: '#D4A843', description: 'My journey' },
    { label: 'Projects', href: '#projects', icon: '🛠️', color: '#8B6F47', description: 'Creations' },
    { label: 'Contact', href: '#contact', icon: '🕊️', color: '#C4725A', description: 'Say hello' },
];

const DoorSVG = ({ color, index }: { color: string; index: number }) => (
    <svg
        width="48"
        height="64"
        viewBox="0 0 48 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <radialGradient id={`doorLight-${index}`} cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
        </defs>

        {/* Door frame */}
        <rect x="2" y="2" width="44" height="60" fill="#5A4A32" rx="3" />

        {/* Door panel - aged wood */}
        <rect x="5" y="5" width="38" height="54" fill="#8B6F47" rx="2" />

        {/* Wood grain */}
        <path d="M12 8 L12 56" stroke="#7A6240" strokeWidth="0.5" opacity="0.4" />
        <path d="M24 5 L24 56" stroke="#7A6240" strokeWidth="0.5" opacity="0.4" />
        <path d="M36 8 L36 56" stroke="#7A6240" strokeWidth="0.5" opacity="0.4" />

        {/* Arch */}
        <path d="M5 28 Q5 5, 24 5 Q43 5, 43 28" fill="none" stroke="#6B5A3E" strokeWidth="1.5" />

        {/* Interior light */}
        <rect x="7" y="7" width="34" height="48" fill={`url(#doorLight-${index})`} rx="1" />

        {/* Light leak at bottom */}
        <rect x="5" y="55" width="38" height="3" fill={color} opacity="0.35" rx="1" />

        {/* Door handle */}
        <circle cx="35" cy="35" r="3.5" fill="#D4A843" />
        <circle cx="35" cy="35" r="2" fill="#F4A261" />
        <circle cx="35.5" cy="34" r="0.8" fill="#FFF8F0" opacity="0.5" />

        {/* Tiny mushrooms */}
        <g transform="translate(8, 52)">
            <ellipse cx="3" cy="3" rx="3.5" ry="2.5" fill="#E8DCC8" />
            <rect x="2" y="2" width="2" height="3.5" fill="#FFF8F0" />
            <circle cx="2.5" cy="1.5" r="1.2" fill="#C4725A" opacity="0.7" />
        </g>
        <g transform="translate(33, 54)">
            <ellipse cx="2.5" cy="2" rx="2.5" ry="1.8" fill="#E8DCC8" />
            <rect x="1.5" y="1.5" width="2" height="3" fill="#FFF8F0" />
            <circle cx="2" cy="1" r="0.8" fill="#C4725A" opacity="0.6" />
        </g>

        {/* Wildflower */}
        <circle cx="20" cy="56" r="1.5" fill={color} opacity="0.5" />
    </svg>
);

interface DoorNavProps {
    onNavigate?: () => void;
}

export const DoorNav = ({ onNavigate }: DoorNavProps) => {
    const handleClick = useCallback(() => {
        setTimeout(() => onNavigate?.(), 300);
    }, [onNavigate]);

    return (
        <div
            className="rounded-2xl p-4 shadow-xl"
            style={{
                background: 'rgba(253, 246, 227, 0.92)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(139, 111, 71, 0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)',
            }}
        >
            {/* Title */}
            <div className="text-center mb-3 pb-2 border-b border-ghibli-bark/10">
                <span className="font-heading text-xl text-ghibli-bark">Where to?</span>
            </div>

            <div className="flex flex-col gap-2">
                {doors.map((door, index) => (
                    <motion.div
                        key={door.label}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.08 + index * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        <Link
                            href={door.href}
                            onClick={handleClick}
                            className="group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-ghibli-bark/5"
                        >
                            <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                                <DoorSVG color={door.color} index={index} />
                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        boxShadow: `0 0 15px ${door.color}30, 0 0 30px ${door.color}15`,
                                    }}
                                />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span
                                    className="text-base font-bold font-heading leading-tight"
                                    style={{ color: door.color }}
                                >
                                    {door.icon} {door.label}
                                </span>
                                <span className="text-xs text-ghibli-bark/60 font-body truncate">
                                    {door.description}
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DoorNav;
