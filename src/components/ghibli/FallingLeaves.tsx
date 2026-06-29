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
    '#5A7A4A', '#6B8A5A', '#7A9A6A', '#8AAA7A', '#4A6A3A',
    '#3A5A2A', '#9AB88A', '#AAD0A0', '#C4A050', '#B89040',
    '#D0B060', '#8A6A3A', '#7A5A2A',
];

const generateLeaf = (id: number): Leaf => ({
    id,
    startX: Math.random() * 100,
    size: 16 + Math.random() * 42,
    duration: 12 + Math.random() * 16,
    delay: Math.random() * 22,
    drift: -160 + Math.random() * 320,
    endRotation: 200 + Math.random() * 500,
    swayDuration: 3 + Math.random() * 5,
    swayAmount: 12 + Math.random() * 45,
    baseRotation: -40 + Math.random() * 80,
    swayRotation: -25 + Math.random() * 50,
    opacity: 0.4 + Math.random() * 0.4,
    type: Math.floor(Math.random() * 4),
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    blur: Math.random() > 0.8 ? 1 + Math.random() * 2 : 0,
});

const LeafSVG = ({ size, color, type }: { size: number; color: string; type: number }) => {
    const paths = [
        <g key="0">
            <ellipse cx="50" cy="45" rx="28" ry="33" fill={color} opacity="0.85" />
            <ellipse cx="50" cy="43" rx="25" ry="30" fill={`${color}dd`} />
            <path d="M50 12 L50 78" stroke={`${color}88`} strokeWidth="1.2" fill="none" />
            <path d="M50 25 L37 34 M50 36 L63 44 M50 46 L40 54 M50 56 L58 62" stroke={`${color}66`} strokeWidth="0.8" fill="none" />
        </g>,
        <g key="1">
            <path d="M50 10 L62 28 L85 33 L68 48 L75 70 L50 58 L25 70 L32 48 L15 33 L38 28 Z" fill={color} opacity="0.85" />
            <path d="M50 10 L50 72" stroke={`${color}88`} strokeWidth="1.2" fill="none" />
        </g>,
        <g key="2">
            <path d="M50 8 Q68 25, 72 48 Q68 72, 50 85 Q32 72, 28 48 Q32 25, 50 8 Z" fill={color} opacity="0.8" />
            <path d="M50 12 L50 82" stroke={`${color}88`} strokeWidth="1.2" fill="none" />
            <path d="M50 30 L40 38 M50 45 L60 52 M50 60 L42 66" stroke={`${color}66`} strokeWidth="0.7" fill="none" />
        </g>,
        <g key="3">
            <ellipse cx="50" cy="50" rx="22" ry="28" fill={color} opacity="0.85" />
            <ellipse cx="50" cy="48" rx="19" ry="25" fill={`${color}cc`} />
            <path d="M50 22 L50 76" stroke={`${color}88`} strokeWidth="1" fill="none" />
            <path d="M50 36 L42 42 M50 50 L58 55" stroke={`${color}66`} strokeWidth="0.7" fill="none" />
        </g>,
    ];

    return (
        <svg width={size} height={size} viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            {paths[type]}
        </svg>
    );
};

export const FallingLeaves = () => {
    const [leaves, setLeaves] = useState<Leaf[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const initialLeaves = Array.from({ length: 18 }, (_, i) => generateLeaf(i));
        setLeaves(initialLeaves);

        const interval = setInterval(() => {
            setLeaves(prev => {
                const newLeaves = [...prev];
                const idx = Math.floor(Math.random() * newLeaves.length);
                newLeaves[idx] = generateLeaf(Date.now() + idx);
                return newLeaves;
            });
        }, 4000);

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
