'use client';

import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Leaf {
    id: number;
    startX: number;
    size: number;
    duration: number;
    delay: number;
    drift: number;
    endRotation: number;
    swayDuration: number;
    swayAmount: number;
    baseRotation: number;
    swayRotation: number;
    opacity: number;
    type: number;
    color: string;
    blur: number;
}

const LEAF_COLORS = [
    '#5A8A64', '#6B9A74', '#7CA982', '#8CB892',
    '#4A7C59', '#376B4D', '#9DC8A3', '#B8D8BE',
    '#D4A843', '#C49A3A', '#E8C060',
];

const generateLeaf = (id: number): Leaf => ({
    id,
    startX: Math.random() * 100,
    size: 16 + Math.random() * 44,
    duration: 10 + Math.random() * 12,
    delay: Math.random() * 20,
    drift: -150 + Math.random() * 300,
    endRotation: 200 + Math.random() * 500,
    swayDuration: 2.5 + Math.random() * 4,
    swayAmount: 15 + Math.random() * 50,
    baseRotation: -45 + Math.random() * 90,
    swayRotation: -30 + Math.random() * 60,
    opacity: 0.5 + Math.random() * 0.4,
    type: Math.floor(Math.random() * 4),
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    blur: Math.random() > 0.7 ? 1 + Math.random() * 2 : 0,
});

const LeafSVG = ({ size, color, type }: { size: number; color: string; type: number }) => {
    const paths = [
        // Type 0: Round leaf (like Totoro's forest)
        <g key="0">
            <ellipse cx="50" cy="45" rx="30" ry="35" fill={color} opacity="0.9" />
            <ellipse cx="50" cy="45" rx="28" ry="33" fill={`${color}dd`} />
            <path d="M50 10 L50 80" stroke={`${color}88`} strokeWidth="1.5" fill="none" />
            <path d="M50 25 L35 35 M50 35 L65 45 M50 45 L38 55 M50 55 L60 62" stroke={`${color}66`} strokeWidth="1" fill="none" />
        </g>,
        // Type 1: Pointed leaf (like maple)
        <g key="1">
            <path d="M50 8 L65 30 L90 35 L70 50 L78 75 L50 60 L22 75 L30 50 L10 35 L35 30 Z" fill={color} opacity="0.9" />
            <path d="M50 8 L50 75" stroke={`${color}88`} strokeWidth="1.5" fill="none" />
            <path d="M50 30 L35 25 M50 40 L65 35 M50 50 L38 48" stroke={`${color}66`} strokeWidth="0.8" fill="none" />
        </g>,
        // Type 2: Elongated leaf
        <g key="2">
            <path d="M50 5 Q70 25, 75 50 Q70 75, 50 90 Q30 75, 25 50 Q30 25, 50 5 Z" fill={color} opacity="0.85" />
            <path d="M50 10 L50 85" stroke={`${color}88`} strokeWidth="1.5" fill="none" />
            <path d="M50 30 L38 40 M50 45 L62 55 M50 60 L40 68" stroke={`${color}66`} strokeWidth="0.8" fill="none" />
        </g>,
        // Type 3: Small rounded leaf
        <g key="3">
            <ellipse cx="50" cy="50" rx="25" ry="30" fill={color} opacity="0.9" />
            <ellipse cx="50" cy="48" rx="22" ry="27" fill={`${color}cc`} />
            <path d="M50 20 L50 78" stroke={`${color}88`} strokeWidth="1.2" fill="none" />
            <path d="M50 35 L40 42 M50 50 L60 55" stroke={`${color}66`} strokeWidth="0.8" fill="none" />
        </g>,
    ];

    return (
        <svg width={size} height={size} viewBox="0 0 100 95" fill="none" xmlns="http://www.w3.org/2000/svg">
            {paths[type]}
        </svg>
    );
};

export const FallingLeaves = () => {
    const [leaves, setLeaves] = useState<Leaf[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const initialLeaves = Array.from({ length: 22 }, (_, i) => generateLeaf(i));
        setLeaves(initialLeaves);

        const regenerateLeaves = () => {
            setLeaves(prev => {
                const newLeaves = [...prev];
                const indexToReplace = Math.floor(Math.random() * newLeaves.length);
                newLeaves[indexToReplace] = generateLeaf(Date.now() + indexToReplace);
                return newLeaves;
            });
        };

        const interval = setInterval(regenerateLeaves, 4000);
        return () => clearInterval(interval);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    className="absolute"
                    style={{
                        left: `${leaf.startX}%`,
                        top: '-5%',
                        animation: `fallingLeaf ${leaf.duration}s linear ${leaf.delay}s infinite`,
                        opacity: leaf.opacity,
                        filter: leaf.blur > 0 ? `blur(${leaf.blur}px)` : 'none',
                        willChange: 'transform, opacity',
                    }}
                >
                    <div
                        style={{
                            animation: `leafSway ${leaf.swayDuration}s ease-in-out infinite`,
                            '--sway-amount': `${leaf.swayAmount}px`,
                            '--base-rotation': `${leaf.baseRotation}deg`,
                            '--sway-rotation': `${leaf.swayRotation}deg`,
                        } as React.CSSProperties}
                    >
                        <div style={{ transform: `rotate(${leaf.baseRotation}deg)` }}>
                            <LeafSVG size={leaf.size} color={leaf.color} type={leaf.type} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FallingLeaves;
