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
        const centerY = rect.top + rect.height / 2;

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
        }, 3000);
        return () => clearInterval(waveInterval);
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="relative w-48 h-56"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
            <svg
                width="192"
                height="224"
                viewBox="0 0 192 224"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Body */}
                <ellipse cx="96" cy="180" rx="45" ry="35" fill="#FDF6E3" />
                <ellipse cx="96" cy="180" rx="45" ry="35" fill="none" stroke="#D4C4A8" strokeWidth="1.5" />

                {/* Sweater */}
                <path
                    d="M55 150 Q55 130, 70 120 L122 120 Q137 130, 137 150 L137 200 Q137 210, 127 210 L65 210 Q55 210, 55 200 Z"
                    fill="#FDF6E3"
                    stroke="#D4C4A8"
                    strokeWidth="1.5"
                />
                {/* Sweater pattern */}
                <path
                    d="M65 140 Q96 135, 127 140"
                    fill="none"
                    stroke="#E8DCC8"
                    strokeWidth="1"
                    opacity="0.5"
                />
                <path
                    d="M65 155 Q96 150, 127 155"
                    fill="none"
                    stroke="#E8DCC8"
                    strokeWidth="1"
                    opacity="0.5"
                />
                <path
                    d="M65 170 Q96 165, 127 170"
                    fill="none"
                    stroke="#E8DCC8"
                    strokeWidth="1"
                    opacity="0.5"
                />

                {/* Neck */}
                <rect x="86" y="105" width="20" height="20" fill="#FFE0C2" rx="5" />

                {/* Head */}
                <ellipse cx="96" cy="75" rx="38" ry="42" fill="#FFE0C2" />

                {/* Hair */}
                <path
                    d="M58 65 Q58 30, 96 25 Q134 30, 134 65 Q134 50, 125 45 Q115 35, 96 32 Q77 35, 67 45 Q58 50, 58 65Z"
                    fill="#6B5A3E"
                />
                {/* Hair sides */}
                <path
                    d="M58 65 Q55 80, 58 95 Q60 85, 65 75"
                    fill="#6B5A3E"
                />
                <path
                    d="M134 65 Q137 80, 134 95 Q132 85, 127 75"
                    fill="#6B5A3E"
                />
                {/* Hair bangs */}
                <path
                    d="M70 50 Q75 40, 85 38 Q80 45, 75 55"
                    fill="#5A4A32"
                />
                <path
                    d="M107 38 Q117 40, 122 50 Q117 55, 112 45"
                    fill="#5A4A32"
                />

                {/* Eyes */}
                <g>
                    <ellipse cx="80" cy="72" rx="6" ry="7" fill="white" />
                    <ellipse cx="112" cy="72" rx="6" ry="7" fill="white" />
                    <circle cx="81" cy="73" r="4" fill="#4A3728" />
                    <circle cx="113" cy="73" r="4" fill="#4A3728" />
                    <circle cx="82.5" cy="71.5" r="1.5" fill="white" />
                    <circle cx="114.5" cy="71.5" r="1.5" fill="white" />
                </g>

                {/* Eyebrows */}
                <path d="M74 63 Q80 60, 86 63" fill="none" stroke="#5A4A32" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M106 63 Q112 60, 118 63" fill="none" stroke="#5A4A32" strokeWidth="1.5" strokeLinecap="round" />

                {/* Nose */}
                <ellipse cx="96" cy="82" rx="3" ry="2" fill="#FFD0B0" />

                {/* Mouth - warm smile */}
                <path
                    d="M86 90 Q96 98, 106 90"
                    fill="none"
                    stroke="#C4725A"
                    strokeWidth="2"
                    strokeLinecap="round"
                />

                {/* Cheeks - rosy */}
                <ellipse cx="70" cy="85" rx="8" ry="5" fill="#FFB5B5" opacity="0.5" />
                <ellipse cx="122" cy="85" rx="8" ry="5" fill="#FFB5B5" opacity="0.5" />

                {/* Left arm (static) */}
                <path
                    d="M55 145 Q40 155, 35 170 Q30 180, 35 185"
                    fill="none"
                    stroke="#FFE0C2"
                    strokeWidth="12"
                    strokeLinecap="round"
                />
                <path
                    d="M55 145 Q40 155, 35 170 Q30 180, 35 185"
                    fill="none"
                    stroke="#D4C4A8"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />

                {/* Left hand */}
                <circle cx="35" cy="185" r="8" fill="#FFE0C2" />
                <circle cx="35" cy="185" r="8" fill="none" stroke="#D4C4A8" strokeWidth="1" />
            </svg>

            {/* Right arm (animated with cursor tracking) */}
            <svg
                className="absolute top-0 right-0"
                width="192"
                height="224"
                viewBox="0 0 192 224"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: 'visible' }}
            >
                <g
                    className="avatar-arm"
                    style={{
                        transform: `rotate(${armRotation}deg)`,
                        transformOrigin: '137px 145px',
                    }}
                >
                    {/* Right arm */}
                    <path
                        d="M137 145 Q155 130, 160 115 Q165 100, 158 90"
                        fill="none"
                        stroke="#FFE0C2"
                        strokeWidth="12"
                        strokeLinecap="round"
                    />
                    <path
                        d="M137 145 Q155 130, 160 115 Q165 100, 158 90"
                        fill="none"
                        stroke="#D4C4A8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />

                    {/* Right hand */}
                    <circle cx="158" cy="90" r="8" fill="#FFE0C2" />
                    <circle cx="158" cy="90" r="8" fill="none" stroke="#D4C4A8" strokeWidth="1" />

                    {/* Fingers */}
                    <motion.g
                        animate={isWaving ? {
                            rotate: [0, -15, 15, -15, 0],
                        } : {}}
                        transition={{
                            duration: 1.5,
                            repeat: isWaving ? Infinity : 0,
                            ease: "easeInOut",
                        }}
                        style={{ transformOrigin: '158px 90px' }}
                    >
                        <path d="M152 84 L148 78" stroke="#FFE0C2" strokeWidth="4" strokeLinecap="round" />
                        <path d="M156 82 L154 75" stroke="#FFE0C2" strokeWidth="4" strokeLinecap="round" />
                        <path d="M161 82 L161 74" stroke="#FFE0C2" strokeWidth="4" strokeLinecap="round" />
                        <path d="M165 84 L168 77" stroke="#FFE0C2" strokeWidth="4" strokeLinecap="round" />
                    </motion.g>
                </g>
            </svg>
        </motion.div>
    );
};

export default GhibliAvatar;
