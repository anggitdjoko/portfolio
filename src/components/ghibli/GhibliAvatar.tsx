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
        const interval = setInterval(() => setIsWaving(prev => !prev), 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className="relative w-44 h-56 sm:w-52 sm:h-64"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <svg width="100%" height="100%" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.15))' }}>
                <defs>
                    <linearGradient id="sweaterGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFF8F0" />
                        <stop offset="100%" stopColor="#F5E6D3" />
                    </linearGradient>
                    <radialGradient id="skinGrad" cx="0.4" cy="0.3" r="0.6">
                        <stop offset="0%" stopColor="#FFE8D0" />
                        <stop offset="100%" stopColor="#FFDAB9" />
                    </radialGradient>
                </defs>

                {/* Body */}
                <path d="M55 145 Q55 120, 72 110 L128 110 Q145 120, 145 145 L147 210 Q147 220, 137 220 L63 220 Q53 220, 53 210 Z"
                    fill="url(#sweaterGrad)" stroke="#E8DCC8" strokeWidth="1.5" />

                {/* Sweater texture */}
                <path d="M60 135 Q100 130, 140 135" fill="none" stroke="#F0E6D0" strokeWidth="1" opacity="0.6" />
                <path d="M58 150 Q100 145, 142 150" fill="none" stroke="#F0E6D0" strokeWidth="1" opacity="0.5" />
                <path d="M57 165 Q100 160, 143 165" fill="none" stroke="#F0E6D0" strokeWidth="1" opacity="0.4" />
                <path d="M56 180 Q100 175, 144 180" fill="none" stroke="#F0E6D0" strokeWidth="1" opacity="0.35" />
                <path d="M55 195 Q100 190, 145 195" fill="none" stroke="#F0E6D0" strokeWidth="1" opacity="0.3" />

                {/* Collar */}
                <path d="M72 110 Q100 104, 128 110" fill="none" stroke="#E8DCC8" strokeWidth="2" />
                <path d="M78 113 Q100 108, 122 113" fill="none" stroke="#E8DCC8" strokeWidth="1" opacity="0.5" />

                {/* Neck */}
                <rect x="85" y="95" width="30" height="18" fill="url(#skinGrad)" rx="8" />

                {/* Head */}
                <ellipse cx="100" cy="62" rx="40" ry="44" fill="url(#skinGrad)" />

                {/* Hair */}
                <path d="M60 52 Q60 18, 100 10 Q140 18, 140 52 Q140 38, 130 30 Q118 18, 100 14 Q82 18, 70 30 Q60 38, 60 52Z"
                    fill="#5A4A32" />
                <path d="M60 52 Q56 70, 60 90 Q62 78, 66 68" fill="#5A4A32" />
                <path d="M140 52 Q144 70, 140 90 Q138 78, 134 68" fill="#5A4A32" />
                <path d="M62 60 Q58 75, 62 88" fill="#4A3A28" />
                <path d="M138 60 Q142 75, 138 88" fill="#4A3A28" />
                <path d="M72 38 Q78 26, 90 22 Q85 32, 78 45" fill="#4A3A28" />
                <path d="M110 22 Q122 26, 128 38 Q122 45, 115 32" fill="#4A3A28" />
                <path d="M82 25 Q90 18, 98 14 Q94 22, 88 32" fill="#5A4A32" />

                {/* Eyes */}
                <ellipse cx="82" cy="60" rx="9" ry="10" fill="white" />
                <ellipse cx="118" cy="60" rx="9" ry="10" fill="white" />
                <circle cx="83" cy="61" r="6" fill="#3A2818" />
                <circle cx="119" cy="61" r="6" fill="#3A2818" />
                <circle cx="84" cy="60" r="3.5" fill="#1A1008" />
                <circle cx="120" cy="60" r="3.5" fill="#1A1008" />
                <circle cx="86" cy="58" r="2.5" fill="white" />
                <circle cx="122" cy="58" r="2.5" fill="white" />
                <circle cx="82" cy="62" r="1.2" fill="white" opacity="0.6" />
                <circle cx="118" cy="62" r="1.2" fill="white" opacity="0.6" />

                {/* Eyebrows */}
                <path d="M73 48 Q82 44, 91 48" fill="none" stroke="#4A3A28" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M109 48 Q118 44, 127 48" fill="none" stroke="#4A3A28" strokeWidth="2.2" strokeLinecap="round" />

                {/* Nose */}
                <ellipse cx="100" cy="72" rx="3" ry="2.5" fill="#FFCBA4" />

                {/* Mouth */}
                <path d="M88 80 Q100 90, 112 80" fill="none" stroke="#C4725A" strokeWidth="2.5" strokeLinecap="round" />

                {/* Cheeks */}
                <ellipse cx="70" cy="74" rx="10" ry="7" fill="#FFB5B5" opacity="0.4" />
                <ellipse cx="130" cy="74" rx="10" ry="7" fill="#FFB5B5" opacity="0.4" />

                {/* Left arm */}
                <path d="M55 138 Q38 150, 32 165 Q26 178, 32 184" fill="none" stroke="url(#skinGrad)" strokeWidth="16" strokeLinecap="round" />
                <path d="M55 138 Q38 150, 32 165 Q26 178, 32 184" fill="none" stroke="#E8DCC8" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="32" cy="184" r="10" fill="url(#skinGrad)" />
                <circle cx="32" cy="184" r="10" fill="none" stroke="#E8C8A8" strokeWidth="0.8" />
            </svg>

            {/* Right arm */}
            <svg className="absolute top-0 right-0 w-full h-full" viewBox="0 0 200 240" fill="none"
                xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible' }}>
                <g style={{
                    transform: `rotate(${armRotation}deg)`,
                    transformOrigin: '145px 138px',
                    transition: 'transform 0.15s ease-out',
                }}>
                    <path d="M145 138 Q165 120, 170 105 Q175 88, 168 78" fill="none"
                        stroke="url(#skinGrad)" strokeWidth="16" strokeLinecap="round" />
                    <path d="M145 138 Q165 120, 170 105 Q175 88, 168 78" fill="none"
                        stroke="#E8DCC8" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="168" cy="78" r="10" fill="url(#skinGrad)" />
                    <circle cx="168" cy="78" r="10" fill="none" stroke="#E8C8A8" strokeWidth="0.8" />
                    <motion.g
                        animate={isWaving ? { rotate: [0, -15, 15, -15, 0] } : { rotate: 0 }}
                        transition={{ duration: 2, repeat: isWaving ? Infinity : 0, ease: "easeInOut" }}
                        style={{ transformOrigin: '168px 78px' }}
                    >
                        <path d="M162 72 L158 62" stroke="url(#skinGrad)" strokeWidth="6" strokeLinecap="round" />
                        <path d="M166 69 L164 58" stroke="url(#skinGrad)" strokeWidth="6" strokeLinecap="round" />
                        <path d="M171 69 L171 58" stroke="url(#skinGrad)" strokeWidth="6" strokeLinecap="round" />
                        <path d="M175 71 L178 61" stroke="url(#skinGrad)" strokeWidth="6" strokeLinecap="round" />
                    </motion.g>
                </g>
            </svg>
        </motion.div>
    );
};

export default GhibliAvatar;
