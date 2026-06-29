'use client';

import { useEffect, useState } from 'react';

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
    '#5A8A64', '#6B9A74', '#7CA982', '#8CB892', '#4A7C59',
    '#376B4D', '#9DC8A3', '#B8D8BE', '#D4A843', '#C49A3A',
    '#E8C060', '#A0522D', '#8B4513',
];

const generateLeaf = (id: number): Leaf => ({
    id,
    startX: Math.random() * 100,
    size: 18 + Math.random() * 46,
    duration: 10 + Math.random() * 14,
    delay: Math.random() * 20,
    drift: -180 + Math.random() * 360,
    endRotation: 200 + Math.random() * 600,
    swayDuration: 2.5 + Math.random() * 5,
    swayAmount: 15 + Math.random() * 55,
    baseRotation: -50 + Math.random() * 100,
    swayRotation: -35 + Math.random() * 70,
    opacity: 0.45 + Math.random() * 0.45,
    type: Math.floor(Math.random() * 5),
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    blur: Math.random() > 0.75 ? 1 + Math.random() * 2.5 : 0,
});

const LeafSVG = ({ size, color, type }: { size: number; color: string; type: number }) => {
    const paths = [
        <g key="0">
            <ellipse cx="50" cy="45" rx="30" ry="35" fill={color} opacity="0.9" />
            <ellipse cx="50" cy="43" rx="27" ry="32" fill={`${color}dd`} />
            <path d="M50 10 L50 80" stroke={`${color}88`} strokeWidth="1.5" fill="none" />
            <path d="M50 25 L35 35 M50 35 L65 45 M50 45 L38 55 M50 55 L60 62" stroke={`${color}66`} strokeWidth="1" fill="none" />
        </g>,
        <g key="1">
            <path d="M50 8 L65 30 L90 35 L70 50 L78 75 L50 60 L22 75 L30 50 L10 35 L35 30 Z" fill={color} opacity="0.9" />
            <path d="M50 8 L50 75" stroke={`${color}88`} strokeWidth="1.5" fill="none" />
            <path d="M50 30 L35 25 M50 40 L65 35 M50 50 L38 48" stroke={`${color}66`} strokeWidth="0.8" fill="none" />
        </g>,
        <g key="2">
            <path d="M50 5 Q70 25, 75 50 Q70 75, 50 90 Q30 75, 25 50 Q30 25, 50 5 Z" fill={color} opacity="0.85" />
            <path d="M50 10 L50 85" stroke={`${color}88`} strokeWidth="1.5" fill="none" />
            <path d="M50 30 L38 40 M50 45 L62 55 M50 60 L40 68" stroke={`${color}66`} strokeWidth="0.8" fill="none" />
        </g>,
        <g key="3">
            <ellipse cx="50" cy="50" rx="25" ry="30" fill={color} opacity="0.9" />
            <ellipse cx="50" cy="48" rx="22" ry="27" fill={`${color}cc`} />
            <path d="M50 20 L50 78" stroke={`${color}88`} strokeWidth="1.2" fill="none" />
            <path d="M50 35 L40 42 M50 50 L60 55" stroke={`${color}66`} strokeWidth="0.8" fill="none" />
        </g>,
        <g key="4">
            <path d="M30 50 Q30 20, 50 10 Q70 20, 70 50 Q70 80, 50 90 Q30 80, 30 50 Z" fill={color} opacity="0.88" />
            <path d="M50 12 L50 88" stroke={`${color}88`} strokeWidth="1.5" fill="none" />
            <path d="M50 30 L38 38 M50 45 L62 52 M50 60 L40 66 M50 72 L58 78" stroke={`${color}66`} strokeWidth="0.7" fill="none" />
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
        const initialLeaves = Array.from({ length: 24 }, (_, i) => generateLeaf(i));
        setLeaves(initialLeaves);

        const interval = setInterval(() => {
            setLeaves(prev => {
                const newLeaves = [...prev];
                const idx = Math.floor(Math.random() * newLeaves.length);
                newLeaves[idx] = generateLeaf(Date.now() + idx);
                return newLeaves;
            });
        }, 3500);

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
                    <div style={{
                        animation: `leafSway ${leaf.swayDuration}s ease-in-out infinite`,
                        '--sway-amount': `${leaf.swayAmount}px`,
                        '--base-rotation': `${leaf.baseRotation}deg`,
                        '--sway-rotation': `${leaf.swayRotation}deg`,
                    } as React.CSSProperties}>
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
