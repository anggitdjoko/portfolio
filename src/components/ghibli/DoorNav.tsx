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
    { label: 'Home', href: '#home', icon: '🏡', color: '#C4944A', description: 'Welcome home' },
    { label: 'About', href: '#about', icon: '📖', color: '#6B8F60', description: 'My story' },
    { label: 'Skills', href: '#skills', icon: '✨', color: '#6A9BB5', description: 'What I do' },
    { label: 'Experience', href: '#experience', icon: '🗺️', color: '#B8944A', description: 'My journey' },
    { label: 'Projects', href: '#projects', icon: '🛠️', color: '#7A6445', description: 'Creations' },
    { label: 'Contact', href: '#contact', icon: '🕊️', color: '#B87060', description: 'Say hello' },
];

const DoorSVG = ({ color, index }: { color: string; index: number }) => (
    <svg width="48" height="62" viewBox="0 0 48 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id={`dLight-${index}`} cx="50%" cy="30%" r="55%">
                <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`dWood-${index}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5C4830" />
                <stop offset="30%" stopColor="#6B5538" />
                <stop offset="50%" stopColor="#7A6445" />
                <stop offset="70%" stopColor="#6B5538" />
                <stop offset="100%" stopColor="#5C4830" />
            </linearGradient>
        </defs>

        <rect x="2" y="2" width="44" height="58" fill="#4D3D28" rx="3" />
        <rect x="4" y="4" width="40" height="54" fill={`url(#dWood-${index})`} rx="2" />
        <path d="M11 6 L11 55" stroke="rgba(80,60,40,0.3)" strokeWidth="0.5" />
        <path d="M24 4 L24 55" stroke="rgba(80,60,40,0.3)" strokeWidth="0.5" />
        <path d="M37 6 L37 55" stroke="rgba(80,60,40,0.3)" strokeWidth="0.5" />
        <path d="M4 26 Q4 4, 24 4 Q44 4, 44 26" fill="none" stroke="#5C4830" strokeWidth="1.2" />
        <rect x="6" y="6" width="36" height="48" fill={`url(#dLight-${index})`} rx="1" />
        <rect x="4" y="54" width="40" height="3" fill={color} opacity="0.35" rx="1" />
        <rect x="8" y="10" width="14" height="18" fill="rgba(80,60,40,0.2)" rx="1" />
        <rect x="26" y="10" width="14" height="18" fill="rgba(80,60,40,0.2)" rx="1" />
        <rect x="8" y="32" width="14" height="18" fill="rgba(80,60,40,0.2)" rx="1" />
        <rect x="26" y="32" width="14" height="18" fill="rgba(80,60,40,0.2)" rx="1" />
        <circle cx="35" cy="33" r="3.5" fill="#B8944A" />
        <circle cx="35" cy="33" r="2" fill="#C4A45A" />
        <circle cx="35.5" cy="32" r="0.8" fill="rgba(255,248,230,0.4)" />
        <g transform="translate(7, 52)">
            <ellipse cx="3" cy="2.5" rx="3.5" ry="2.2" fill="rgba(200,190,170,0.5)" />
            <rect x="2" y="1.5" width="2" height="3.5" fill="rgba(240,235,220,0.6)" />
            <circle cx="2.5" cy="1" r="1" fill="rgba(180,80,70,0.5)" />
        </g>
        <g transform="translate(34, 54)">
            <ellipse cx="2.5" cy="1.8" rx="2.5" ry="1.5" fill="rgba(200,190,170,0.5)" />
            <rect x="1.5" y="1" width="2" height="3" fill="rgba(240,235,220,0.6)" />
            <circle cx="2" cy="0.5" r="0.8" fill="rgba(180,80,70,0.4)" />
        </g>
        <circle cx="18" cy="55" r="1.3" fill={color} opacity="0.4" />
        <circle cx="30" cy="56" r="1" fill="rgba(200,180,100,0.4)" />
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
        <div className="rounded-xl p-4 shadow-lg" style={{
            background: 'rgba(245,237,224,0.94)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(160,140,110,0.15)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.5)',
        }}>
            <div className="text-center mb-3 pb-2 border-b border-ghibli-bark/8">
                <span className="font-[family-name:var(--font-caveat)] text-lg text-ghibli-bark/80">Where to?</span>
            </div>

            <div className="flex flex-col gap-1.5">
                {doors.map((door, index) => (
                    <motion.div
                        key={door.label}
                        initial={{ opacity: 0, y: 25, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.06 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Link href={door.href} onClick={handleClick}
                            className="group flex items-center gap-3 px-2.5 py-1.5 rounded-lg transition-all duration-300 hover:bg-ghibli-bark/4">
                            <div className="relative flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.03]">
                                <DoorSVG color={door.color} index={index} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold font-[family-name:var(--font-caveat)] leading-tight" style={{ color: door.color }}>
                                    {door.icon} {door.label}
                                </span>
                                <span className="text-[11px] text-ghibli-bark/50 font-[family-name:var(--font-quicksand)] truncate">
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
