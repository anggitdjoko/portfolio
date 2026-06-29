'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface DoorItem {
    label: string;
    href: string;
    icon: string;
    color: string;
}

const doors: DoorItem[] = [
    { label: 'Home', href: '#home', icon: '🏠', color: '#F4A261' },
    { label: 'About', href: '#about', icon: '📖', color: '#7CA982' },
    { label: 'Skills', href: '#skills', icon: '⚡', color: '#87CEEB' },
    { label: 'Experience', href: '#experience', icon: '💼', color: '#D4A843' },
    { label: 'Projects', href: '#projects', icon: '🚀', color: '#8B6F47' },
    { label: 'Contact', href: '#contact', icon: '✉️', color: '#EC4899' },
];

const DoorSVG = ({ color, icon }: { color: string; icon: string }) => (
    <svg
        width="56"
        height="72"
        viewBox="0 0 56 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Door frame */}
        <rect x="2" y="2" width="52" height="68" fill="#6B5A3E" rx="4" />

        {/* Door panel */}
        <rect x="6" y="6" width="44" height="60" fill="#8B6F47" rx="2" />

        {/* Door arch top */}
        <path
            d="M6 30 Q6 6, 28 6 Q50 6, 50 30"
            fill="none"
            stroke="#6B5A3E"
            strokeWidth="2"
        />

        {/* Wood grain lines */}
        <path d="M15 10 L15 62" stroke="#7A6240" strokeWidth="0.5" opacity="0.4" />
        <path d="M28 6 L28 62" stroke="#7A6240" strokeWidth="0.5" opacity="0.4" />
        <path d="M41 10 L41 62" stroke="#7A6240" strokeWidth="0.5" opacity="0.4" />

        {/* Door handle */}
        <circle cx="42" cy="40" r="4" fill="#D4A843" />
        <circle cx="42" cy="40" r="2" fill="#F4A261" />

        {/* Light from inside */}
        <rect
            x="8"
            y="8"
            width="40"
            height="56"
            fill={`url(#doorGlow-${color.replace('#', '')})`}
            opacity="0.15"
            rx="2"
        />

        {/* Glow at bottom gap */}
        <rect x="6" y="62" width="44" height="4" fill={color} opacity="0.4" rx="1" />

        {/* Mushrooms at base */}
        <g transform="translate(10, 58)">
            <ellipse cx="4" cy="4" rx="4" ry="3" fill="#E8DCC8" />
            <rect x="3" y="3" width="2" height="4" fill="#FDF6E3" />
            <circle cx="3" cy="2" r="1" fill="#FF6B6B" opacity="0.6" />
        </g>
        <g transform="translate(40, 60)">
            <ellipse cx="3" cy="2" rx="3" ry="2" fill="#E8DCC8" />
            <rect x="2" y="2" width="2" height="3" fill="#FDF6E3" />
            <circle cx="2" cy="1" r="0.8" fill="#FF6B6B" opacity="0.6" />
        </g>

        {/* Wildflowers */}
        <circle cx="20" cy="62" r="2" fill={color} opacity="0.7" />
        <circle cx="35" cy="63" r="1.5" fill="#F4A261" opacity="0.6" />

        <defs>
            <radialGradient id={`doorGlow-${color.replace('#', '')}`} cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor={color} />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>
        </defs>
    </svg>
);

interface DoorNavProps {
    onNavigate?: () => void;
}

export const DoorNav = ({ onNavigate }: DoorNavProps) => {
    const handleClick = useCallback(() => {
        onNavigate?.();
    }, [onNavigate]);

    return (
        <div className="glass-strong rounded-2xl p-4 shadow-lg">
            <div className="flex flex-col gap-3">
                {doors.map((door, index) => (
                    <motion.div
                        key={door.label}
                        initial={{ opacity: 0, y: 40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.1,
                            ease: [0.34, 1.56, 0.64, 1],
                        }}
                    >
                        <Link
                            href={door.href}
                            onClick={handleClick}
                            className="group flex items-center gap-3 p-2 rounded-xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/10"
                        >
                            <div className="relative">
                                <DoorSVG color={door.color} icon={door.icon} />
                                <motion.div
                                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        boxShadow: `0 0 20px ${door.color}40, 0 0 40px ${door.color}20`,
                                    }}
                                />
                            </div>
                            <div className="flex flex-col">
                                <span
                                    className="text-lg font-bold font-heading"
                                    style={{ color: door.color }}
                                >
                                    {door.icon} {door.label}
                                </span>
                                <span className="text-xs text-muted-foreground font-body">
                                    {door.label === 'Home' && 'Welcome to my world'}
                                    {door.label === 'About' && 'Who am I?'}
                                    {door.label === 'Skills' && 'What I can do'}
                                    {door.label === 'Experience' && 'My journey'}
                                    {door.label === 'Projects' && 'What I\'ve built'}
                                    {door.label === 'Contact' && 'Let\'s talk'}
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
