'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const MAX_ARM_ROTATION = 25;

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

        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = requestAnimationFrame(() => setArmRotation(clampedAngle));
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [handleMouseMove]);

    useEffect(() => {
        const interval = setInterval(() => setIsWaving(prev => !prev), 4500);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="relative w-40 h-52 sm:w-48 sm:h-60"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <svg width="100%" height="100%" viewBox="0 0 180 220" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}>
                <defs>
                    <linearGradient id="skinReal" x1="0.3" y1="0" x2="0.7" y2="1">
                        <stop offset="0%" stopColor="#FFE0C2" />
                        <stop offset="100%" stopColor="#FFD0A8" />
                    </linearGradient>
                    <linearGradient id="sweaterReal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F0E8D8" />
                        <stop offset="100%" stopColor="#E0D4BE" />
                    </linearGradient>
                    <linearGradient id="hairReal" x1="0.3" y1="0" x2="0.7" y2="1">
                        <stop offset="0%" stopColor="#4A3828" />
                        <stop offset="100%" stopColor="#3A2818" />
                    </linearGradient>
                </defs>

                {/* Body */}
                <path d="M50 130 Q50 108, 65 98 L115 98 Q130 108, 130 130 L132 195 Q132 205, 122 205 L58 205 Q48 205, 48 195 Z"
                    fill="url(#sweaterReal)" stroke="rgba(180,160,130,0.4)" strokeWidth="1" />

                {/* Sweater knit */}
                <path d="M55 120 Q90 115, 125 120" fill="none" stroke="rgba(200,185,160,0.5)" strokeWidth="0.8" />
                <path d="M53 135 Q90 130, 127 135" fill="none" stroke="rgba(200,185,160,0.4)" strokeWidth="0.8" />
                <path d="M52 150 Q90 145, 128 150" fill="none" stroke="rgba(200,185,160,0.35)" strokeWidth="0.8" />
                <path d="M51 165 Q90 160, 129 165" fill="none" stroke="rgba(200,185,160,0.3)" strokeWidth="0.8" />

                {/* Collar */}
                <path d="M65 98 Q90 92, 115 98" fill="none" stroke="rgba(180,160,130,0.5)" strokeWidth="1.5" />

                {/* Neck */}
                <rect x="80" y="86" width="20" height="15" fill="url(#skinReal)" rx="6" />

                {/* Head */}
                <ellipse cx="90" cy="56" rx="36" ry="40" fill="url(#skinReal)" />

                {/* Hair */}
                <path d="M54 46 Q54 16, 90 8 Q126 16, 126 46 Q126 34, 118 26 Q108 16, 90 12 Q72 16, 62 26 Q54 34, 54 46Z"
                    fill="url(#hairReal)" />
                <path d="M54 46 Q50 62, 54 78 Q56 66, 60 58" fill="url(#hairReal)" />
                <path d="M126 46 Q130 62, 126 78 Q124 66, 120 58" fill="url(#hairReal)" />
                <path d="M56 52 Q52 65, 56 76" fill="#3A2818" />
                <path d="M124 52 Q128 65, 124 76" fill="#3A2818" />
                <path d="M68 34 Q74 24, 84 20 Q80 28, 74 40" fill="#3A2818" />
                <path d="M106 20 Q116 24, 122 34 Q116 40, 110 28" fill="#3A2818" />
                <path d="M78 22 Q86 14, 94 10 Q90 18, 84 28" fill="#4A3828" />

                {/* Eyes */}
                <ellipse cx="76" cy="52" rx="8" ry="9" fill="white" />
                <ellipse cx="104" cy="52" rx="8" ry="9" fill="white" />
                <circle cx="77" cy="53" r="5.5" fill="#2A1A0A" />
                <circle cx="105" cy="53" r="5.5" fill="#2A1A0A" />
                <circle cx="78" cy="52" r="3" fill="#1A0A00" />
                <circle cx="106" cy="52" r="3" fill="#1A0A00" />
                <circle cx="80" cy="50" r="2" fill="white" />
                <circle cx="108" cy="50" r="2" fill="white" />
                <circle cx="76" cy="54" r="1" fill="white" opacity="0.5" />
                <circle cx="104" cy="54" r="1" fill="white" opacity="0.5" />

                {/* Eyebrows */}
                <path d="M68 42 Q76 38, 84 42" fill="none" stroke="#3A2818" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M96 42 Q104 38, 112 42" fill="none" stroke="#3A2818" strokeWidth="1.8" strokeLinecap="round" />

                {/* Nose */}
                <ellipse cx="90" cy="64" rx="2.5" ry="2" fill="rgba(220,180,150,0.6)" />

                {/* Mouth */}
                <path d="M80 72 Q90 80, 100 72" fill="none" stroke="#B86B50" strokeWidth="2" strokeLinecap="round" />

                {/* Cheeks */}
                <ellipse cx="65" cy="66" rx="8" ry="5" fill="rgba(220,150,150,0.3)" />
                <ellipse cx="115" cy="66" rx="8" ry="5" fill="rgba(220,150,150,0.3)" />

                {/* Left arm */}
                <path d="M50 125 Q35 135, 30 148 Q25 160, 30 165" fill="none" stroke="url(#skinReal)" strokeWidth="14" strokeLinecap="round" />
                <path d="M50 125 Q35 135, 30 148 Q25 160, 30 165" fill="none" stroke="rgba(180,160,130,0.3)" strokeWidth="1" strokeLinecap="round" />
                <circle cx="30" cy="165" r="8" fill="url(#skinReal)" />
            </svg>

            {/* Right arm */}
            <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 180 220" fill="none"
                xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <g style={{
                    transform: `rotate(${armRotation}deg)`,
                    transformOrigin: '130px 125px',
                    transition: 'transform 0.15s ease-out',
                }}>
                    <path d="M130 125 Q148 108, 152 92 Q156 78, 150 68" fill="none"
                        stroke="url(#skinReal)" strokeWidth="14" strokeLinecap="round" />
                    <path d="M130 125 Q148 108, 152 92 Q156 78, 150 68" fill="none"
                        stroke="rgba(180,160,130,0.3)" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="150" cy="68" r="8" fill="url(#skinReal)" />
                    <motion.g
                        animate={isWaving ? { rotate: [0, -12, 12, -12, 0] } : { rotate: 0 }}
                        transition={{ duration: 2.2, repeat: isWaving ? Infinity : 0, ease: "easeInOut" }}
                        style={{ transformOrigin: '150px 68px' }}
                    >
                        <path d="M144 62 L140 54" stroke="url(#skinReal)" strokeWidth="5" strokeLinecap="round" />
                        <path d="M148 60 L146 50" stroke="url(#skinReal)" strokeWidth="5" strokeLinecap="round" />
                        <path d="M153 60 L153 50" stroke="url(#skinReal)" strokeWidth="5" strokeLinecap="round" />
                        <path d="M157 62 L160 54" stroke="url(#skinReal)" strokeWidth="5" strokeLinecap="round" />
                    </motion.g>
                </g>
            </svg>
        </motion.div>
    );
};

export default GhibliAvatar;
