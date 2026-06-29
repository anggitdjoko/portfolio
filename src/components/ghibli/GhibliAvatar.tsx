'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const MAX_ARM_ROTATION = 30;

export const GhibliAvatar = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [armRotation, setArmRotation] = useState(0);
    const [isWaving, setIsWaving] = useState(true);
    const animationFrameRef = useRef<number>();

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 3;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        const clampedAngle = Math.max(-MAX_ARM_ROTATION, Math.min(MAX_ARM_ROTATION, angle - 90));

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
            setArmRotation(clampedAngle);
        });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [handleMouseMove]);

    useEffect(() => {
        const waveInterval = setInterval(() => {
            setIsWaving(prev => !prev);
        }, 3500);
        return () => clearInterval(waveInterval);
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="relative w-40 h-52 sm:w-48 sm:h-60"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 180 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
            >
                <defs>
                    <filter id="soft">
                        <feGaussianBlur stdDeviation="0.5" />
                    </filter>
                </defs>

                {/* Body - oversized sweater */}
                <path
                    d="M50 130 Q50 110, 65 100 L115 100 Q130 110, 130 130 L132 190 Q132 200, 122 200 L58 200 Q48 200, 48 190 Z"
                    fill="#FFF8F0"
                    stroke="#E8DCC8"
                    strokeWidth="1.5"
                />

                {/* Sweater knit texture */}
                <path d="M55 120 Q90 115, 125 120" fill="none" stroke="#F0E6D0" strokeWidth="1" opacity="0.6" />
                <path d="M53 135 Q90 130, 127 135" fill="none" stroke="#F0E6D0" strokeWidth="1" opacity="0.5" />
                <path d="M52 150 Q90 145, 128 150" fill="none" stroke="#F0E6D0" strokeWidth="1" opacity="0.4" />
                <path d="M51 165 Q90 160, 129 165" fill="none" stroke="#F0E6D0" strokeWidth="1" opacity="0.3" />

                {/* Sweater collar */}
                <path d="M65 100 Q90 95, 115 100" fill="none" stroke="#E8DCC8" strokeWidth="2" />

                {/* Neck */}
                <rect x="80" y="88" width="20" height="16" fill="#FFDAB9" rx="6" />

                {/* Head */}
                <ellipse cx="90" cy="58" rx="36" ry="40" fill="#FFDAB9" />

                {/* Hair - messy, organic */}
                <path
                    d="M54 48 Q54 18, 90 12 Q126 18, 126 48 Q126 35, 118 28 Q108 18, 90 14 Q72 18, 62 28 Q54 35, 54 48Z"
                    fill="#5A4A32"
                />
                {/* Hair sides - messy strands */}
                <path d="M54 48 Q50 65, 54 82 Q56 70, 60 60" fill="#5A4A32" />
                <path d="M126 48 Q130 65, 126 82 Q124 70, 120 60" fill="#5A4A32" />
                <path d="M56 55 Q52 70, 56 80" fill="#4A3A28" />
                <path d="M124 55 Q128 70, 124 80" fill="#4A3A28" />

                {/* Bangs - soft, Ghibli-style */}
                <path d="M66 35 Q72 25, 82 22 Q78 32, 72 42" fill="#4A3A28" />
                <path d="M98 22 Q108 25, 114 35 Q108 42, 102 32" fill="#4A3A28" />
                <path d="M78 24 Q85 18, 92 16 Q88 24, 82 30" fill="#5A4A32" />

                {/* Eyes - big, expressive, Ghibli-style */}
                <g>
                    {/* Eye whites */}
                    <ellipse cx="75" cy="55" rx="8" ry="9" fill="white" />
                    <ellipse cx="105" cy="55" rx="8" ry="9" fill="white" />

                    {/* Irises */}
                    <circle cx="76" cy="56" r="5.5" fill="#3A2818" />
                    <circle cx="106" cy="56" r="5.5" fill="#3A2818" />

                    {/* Pupils */}
                    <circle cx="77" cy="55" r="3" fill="#1A1008" />
                    <circle cx="107" cy="55" r="3" fill="#1A1008" />

                    {/* Eye highlights - Ghibli signature */}
                    <circle cx="79" cy="53" r="2" fill="white" />
                    <circle cx="109" cy="53" r="2" fill="white" />
                    <circle cx="75" cy="57" r="1" fill="white" opacity="0.6" />
                    <circle cx="105" cy="57" r="1" fill="white" opacity="0.6" />
                </g>

                {/* Eyebrows - soft */}
                <path d="M67 44 Q75 40, 83 44" fill="none" stroke="#4A3A28" strokeWidth="2" strokeLinecap="round" />
                <path d="M97 44 Q105 40, 113 44" fill="none" stroke="#4A3A28" strokeWidth="2" strokeLinecap="round" />

                {/* Nose - subtle */}
                <ellipse cx="90" cy="66" rx="2.5" ry="2" fill="#FFCBA4" />

                {/* Mouth - warm smile */}
                <path
                    d="M80 74 Q90 82, 100 74"
                    fill="none"
                    stroke="#C4725A"
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/* Cheeks - rosy, Ghibli signature */}
                <ellipse cx="65" cy="68" rx="9" ry="6" fill="#FFB5B5" opacity="0.45" />
                <ellipse cx="115" cy="68" rx="9" ry="6" fill="#FFB5B5" opacity="0.45" />

                {/* Left arm (static, resting) */}
                <path
                    d="M50 125 Q35 135, 30 150 Q25 162, 30 168"
                    fill="none"
                    stroke="#FFDAB9"
                    strokeWidth="14"
                    strokeLinecap="round"
                />
                <path
                    d="M50 125 Q35 135, 30 150 Q25 162, 30 168"
                    fill="none"
                    stroke="#E8DCC8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* Left hand */}
                <circle cx="30" cy="168" r="9" fill="#FFDAB9" />
                <circle cx="30" cy="168" r="9" fill="none" stroke="#E8C8A8" strokeWidth="0.8" />
            </svg>

            {/* Right arm (animated with cursor tracking) */}
            <svg
                className="absolute top-0 right-0 w-full h-full"
                viewBox="0 0 180 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                <g
                    style={{
                        transform: `rotate(${armRotation}deg)`,
                        transformOrigin: '130px 125px',
                        transition: 'transform 0.15s ease-out',
                    }}
                >
                    {/* Right arm */}
                    <path
                        d="M130 125 Q148 110, 152 95 Q156 80, 150 70"
                        fill="none"
                        stroke="#FFDAB9"
                        strokeWidth="14"
                        strokeLinecap="round"
                    />
                    <path
                        d="M130 125 Q148 110, 152 95 Q156 80, 150 70"
                        fill="none"
                        stroke="#E8DCC8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />

                    {/* Right hand */}
                    <circle cx="150" cy="70" r="9" fill="#FFDAB9" />
                    <circle cx="150" cy="70" r="9" fill="none" stroke="#E8C8A8" strokeWidth="0.8" />

                    {/* Fingers - waving */}
                    <motion.g
                        animate={isWaving ? {
                            rotate: [0, -12, 12, -12, 0],
                        } : { rotate: 0 }}
                        transition={{
                            duration: 1.8,
                            repeat: isWaving ? Infinity : 0,
                            ease: "easeInOut",
                        }}
                        style={{ transformOrigin: '150px 70px' }}
                    >
                        <path d="M144 64 L140 56" stroke="#FFDAB9" strokeWidth="5" strokeLinecap="round" />
                        <path d="M148 61 L146 52" stroke="#FFDAB9" strokeWidth="5" strokeLinecap="round" />
                        <path d="M153 61 L153 52" stroke="#FFDAB9" strokeWidth="5" strokeLinecap="round" />
                        <path d="M157 63 L160 55" stroke="#FFDAB9" strokeWidth="5" strokeLinecap="round" />
                    </motion.g>
                </g>
            </svg>
        </motion.div>
    );
};

export default GhibliAvatar;
