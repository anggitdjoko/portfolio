'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

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
    hue: number;
}

const LEAF_COUNT = 20;

const generateLeaf = (id: number): Leaf => ({
    id,
    startX: Math.random() * 100,
    size: 20 + Math.random() * 40,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 15,
    drift: -100 + Math.random() * 200,
    endRotation: 180 + Math.random() * 360,
    swayDuration: 2 + Math.random() * 3,
    swayAmount: 20 + Math.random() * 40,
    baseRotation: -30 + Math.random() * 60,
    swayRotation: -20 + Math.random() * 40,
    opacity: 0.6 + Math.random() * 0.3,
    hue: 80 + Math.random() * 60,
});

const LeafSVG = ({ size, hue }: { size: number; hue: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M50 10 C60 25, 85 35, 85 55 C85 75, 65 90, 50 90 C35 90, 15 75, 15 55 C15 35, 40 25, 50 10Z"
            fill={`hsl(${hue}, 45%, 55%)`}
            stroke={`hsl(${hue}, 40%, 40%)`}
            strokeWidth="1.5"
        />
        <path
            d="M50 20 L50 80"
            stroke={`hsl(${hue}, 40%, 40%)`}
            strokeWidth="1.5"
            strokeLinecap="round"
        />
        <path
            d="M50 35 L35 45 M50 45 L65 55 M50 55 L38 65 M50 65 L62 72"
            stroke={`hsl(${hue}, 40%, 40%)`}
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
        />
    </svg>
);

export const FallingLeaves = () => {
    const [leaves, setLeaves] = useState<Leaf[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const initialLeaves = Array.from({ length: LEAF_COUNT }, (_, i) => generateLeaf(i));
        setLeaves(initialLeaves);

        const regenerateLeaves = () => {
            setLeaves(prev => {
                const newLeaves = [...prev];
                const indexToReplace = Math.floor(Math.random() * newLeaves.length);
                newLeaves[indexToReplace] = generateLeaf(Date.now() + indexToReplace);
                return newLeaves;
            });
        };

        const interval = setInterval(regenerateLeaves, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
            aria-hidden="true"
        >
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    className="leaf-particle animate-falling-leaf"
                    style={{
                        left: `${leaf.startX}%`,
                        '--fall-duration': `${leaf.duration}s`,
                        '--drift': `${leaf.drift}px`,
                        '--end-rotation': `${leaf.endRotation}deg`,
                        animationDelay: `${leaf.delay}s`,
                        opacity: leaf.opacity,
                    } as React.CSSProperties}
                >
                    <div
                        className="animate-leaf-sway"
                        style={{
                            '--sway-duration': `${leaf.swayDuration}s`,
                            '--sway-amount': `${leaf.swayAmount}px`,
                            '--base-rotation': `${leaf.baseRotation}deg`,
                            '--sway-rotation': `${leaf.swayRotation}deg`,
                        } as React.CSSProperties}
                    >
                        <LeafSVG size={leaf.size} hue={leaf.hue} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FallingLeaves;
