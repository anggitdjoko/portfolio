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
    <svg width="52" height="68" viewBox="0 0 52 68" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id={`doorLightPro-${index}`} cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`doorWood-${index}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7A6240" />
                <stop offset="30%" stopColor="#8B6F47" />
                <stop offset="50%" stopColor="#9A7E56" />
                <stop offset="70%" stopColor="#8B6F47" />
                <stop offset="100%" stopColor="#7A6240" />
            </linearGradient>
        </defs>

        {/* Door frame */}
        <rect x="2" y="2" width="48" height="64" fill="#5A4A32" rx="4" />

        {/* Door panel */}
        <rect x="5" y="5" width="42" height="58" fill={`url(#doorWood-${index})`} rx="2" />

        {/* Wood grain */}
        <path d="M13 8 L13 60" stroke="#7A6240" strokeWidth="0.5" opacity="0.35" />
        <path d="M26 5 L26 60" stroke="#7A6240" strokeWidth="0.5" opacity="0.35" />
        <path d="M39 8 L39 60" stroke="#7A6240" strokeWidth="0.5" opacity="0.35" />

        {/* Arch */}
        <path d="M5 30 Q5 5, 26 5 Q47 5, 47 30" fill="none" stroke="#6B5A3E" strokeWidth="1.5" />

        {/* Interior light */}
        <rect x="7" y="7" width="38" height="52" fill={`url(#doorLightPro-${index})`} rx="1" />

        {/* Light leak */}
        <rect x="5" y="59" width="42" height="3.5" fill={color} opacity="0.4" rx="1" />

        {/* Door panels */}
        <rect x="9" y="12" width="15" height="20" fill="#7A6240" rx="1" opacity="0.2" />
        <rect x="28" y="12" width="15" height="20" fill="#7A6240" rx="1" opacity="0.2" />
        <rect x="9" y="36" width="15" height="20" fill="#7A6240" rx="1" opacity="0.2" />
        <rect x="28" y="36" width="15" height="20" fill="#7A6240" rx="1" opacity="0.2" />

        {/* Door handle */}
        <circle cx="38" cy="37" r="4" fill="#D4A843" />
        <circle cx="38" cy="37" r="2.5" fill="#F4A261" />
        <circle cx="38.5" cy="36" r="1" fill="#FFF8F0" opacity="0.5" />

        {/* Mushrooms */}
        <g transform="translate(8, 56)">
            <ellipse cx="3.5" cy="3" rx="4" ry="2.8" fill="#E8DCC8" />
            <rect x="2.5" y="2" width="2" height="4" fill="#FFF8F0" />
            <circle cx="3" cy="1.5" r="1.3" fill="#C4725A" opacity="0.7" />
            <circle cx="4.5" cy="2" r="0.8" fill="#C4725A" opacity="0.5" />
        </g>
        <g transform="translate(36, 58)">
            <ellipse cx="3" cy="2" rx="3" ry="2" fill="#E8DCC8" />
            <rect x="2" y="1.5" width="2" height="3" fill="#FFF8F0" />
            <circle cx="2.5" cy="0.8" r="1" fill="#C4725A" opacity="0.6" />
        </g>

        {/* Wildflowers */}
        <circle cx="20" cy="60" r="1.8" fill={color} opacity="0.6" />
        <circle cx="32" cy="61" r="1.3" fill="#F4A261" opacity="0.5" />
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
        <div className="rounded-2xl p-4 shadow-xl" style={{
            background: 'rgba(253, 246, 227, 0.93)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(139, 111, 71, 0.18)',
            boxShadow: '0 25px 70px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.6)',
        }}>
            <div className="text-center mb-3 pb-2 border-b border-ghibli-bark/10">
                <span className="font-[family-name:var(--font-caveat)] text-xl text-ghibli-bark">Where to?</span>
            </div>

            <div className="flex flex-col gap-2">
                {doors.map((door, index) => (
                    <motion.div
                        key={door.label}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Link href={door.href} onClick={handleClick}
                            className="group flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 hover:bg-ghibli-bark/5">
                            <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                                <DoorSVG color={door.color} index={index} />
                                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ boxShadow: `0 0 18px ${door.color}35, 0 0 35px ${door.color}18` }} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-base font-bold font-[family-name:var(--font-caveat)] leading-tight" style={{ color: door.color }}>
                                    {door.icon} {door.label}
                                </span>
                                <span className="text-xs text-ghibli-bark/60 font-[family-name:var(--font-quicksand)] truncate">
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
