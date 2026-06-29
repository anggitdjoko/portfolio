'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FallingLeaves } from './FallingLeaves';
import { GhibliHouse } from './GhibliHouse';

const GodRays = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Ray 1 */}
        <motion.div
            className="absolute top-0 left-[30%] w-[300px] h-[120%]"
            style={{
                background: 'linear-gradient(180deg, rgba(244,162,97,0.25) 0%, rgba(244,162,97,0.08) 40%, transparent 70%)',
                transformOrigin: 'top center',
                filter: 'blur(30px)',
            }}
            animate={{
                rotate: [-8, -5, -8],
                opacity: [0.4, 0.7, 0.4],
                scaleX: [1, 1.2, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Ray 2 */}
        <motion.div
            className="absolute top-0 left-[55%] w-[200px] h-[100%]"
            style={{
                background: 'linear-gradient(180deg, rgba(212,168,67,0.2) 0%, rgba(212,168,67,0.05) 50%, transparent 80%)',
                transformOrigin: 'top center',
                filter: 'blur(25px)',
            }}
            animate={{
                rotate: [5, 8, 5],
                opacity: [0.3, 0.6, 0.3],
                scaleX: [1, 1.15, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        {/* Ray 3 */}
        <motion.div
            className="absolute top-0 left-[42%] w-[150px] h-[90%]"
            style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)',
                transformOrigin: 'top center',
                filter: 'blur(20px)',
            }}
            animate={{
                rotate: [-2, 2, -2],
                opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
    </div>
);

const FogLayer = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Bottom fog */}
        <motion.div
            className="absolute bottom-0 left-0 right-0 h-[30%]"
            style={{
                background: 'linear-gradient(0deg, rgba(253,246,227,0.6) 0%, rgba(253,246,227,0.2) 40%, transparent 100%)',
                filter: 'blur(20px)',
            }}
            animate={{
                opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Mid fog patches */}
        <motion.div
            className="absolute top-[40%] left-[10%] w-[40%] h-[20%]"
            style={{
                background: 'radial-gradient(ellipse, rgba(253,246,227,0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
            }}
            animate={{
                x: [0, 50, 0],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute top-[50%] right-[15%] w-[30%] h-[15%]"
            style={{
                background: 'radial-gradient(ellipse, rgba(253,246,227,0.25) 0%, transparent 70%)',
                filter: 'blur(35px)',
            }}
            animate={{
                x: [0, -40, 0],
                opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        />
    </div>
);

const Fireflies = () => {
    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
        size: 2 + Math.random() * 4,
        duration: 4 + Math.random() * 6,
        delay: Math.random() * 8,
        color: Math.random() > 0.5 ? '#F4A261' : '#D4A843',
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                        background: `radial-gradient(circle, ${p.color} 0%, ${p.color}80 40%, transparent 70%)`,
                        boxShadow: `0 0 ${p.size * 3}px ${p.color}60, 0 0 ${p.size * 6}px ${p.color}30`,
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.2, 0.5],
                        y: [0, -30, 0],
                        x: [0, Math.random() > 0.5 ? 15 : -15, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
};

const NoiseTexture = () => (
    <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-multiply"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
        }}
    />
);

const TreeBackground = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -30]);

    return (
        <div ref={ref} className="fixed inset-0 z-0 overflow-hidden">
            {/* Sky gradient - warm sunset */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse at 50% 20%, rgba(244,162,97,0.3) 0%, transparent 50%),
                        radial-gradient(ellipse at 30% 10%, rgba(135,206,235,0.4) 0%, transparent 40%),
                        radial-gradient(ellipse at 70% 15%, rgba(212,168,67,0.2) 0%, transparent 35%),
                        linear-gradient(180deg,
                            #87CEEB 0%,
                            #A8D4E6 15%,
                            #C8DDE8 25%,
                            #E8DCC8 40%,
                            #FDF6E3 55%,
                            #F0E6D0 70%,
                            #E0D4B8 85%,
                            #D4C8A8 100%
                        )
                    `,
                }}
            />

            {/* Background hills (parallax layer 3) */}
            <motion.div style={{ y: y3 }} className="absolute bottom-0 left-0 right-0 h-[60%]">
                <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
                    <path
                        d="M0 600 L0 350 Q150 280, 300 320 Q450 360, 600 300 Q750 240, 900 280 Q1050 320, 1200 260 Q1350 200, 1440 250 L1440 600 Z"
                        fill="#7CA982"
                        opacity="0.3"
                    />
                    <path
                        d="M0 600 L0 400 Q200 350, 400 380 Q600 410, 800 360 Q1000 310, 1200 350 Q1400 390, 1440 370 L1440 600 Z"
                        fill="#5A8A64"
                        opacity="0.25"
                    />
                </svg>
            </motion.div>

            {/* Mid trees (parallax layer 2) */}
            <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 right-0 h-[70%]">
                <svg className="w-full h-full" viewBox="0 0 1440 700" preserveAspectRatio="none" fill="none">
                    {/* Distant trees */}
                    <g opacity="0.4">
                        <ellipse cx="200" cy="500" rx="80" ry="120" fill="#4A7C59" />
                        <ellipse cx="250" cy="480" rx="60" ry="100" fill="#5A8A64" />
                        <ellipse cx="1200" cy="490" rx="70" ry="110" fill="#4A7C59" />
                        <ellipse cx="1250" cy="470" rx="55" ry="90" fill="#5A8A64" />
                        <ellipse cx="700" cy="510" rx="90" ry="130" fill="#376B4D" />
                    </g>
                </svg>
            </motion.div>

            {/* Main tree (parallax layer 1) */}
            <motion.div style={{ y: y1 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[85%]">
                <svg className="w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMax meet" fill="none">
                    {/* Tree shadow on ground */}
                    <ellipse cx="500" cy="780" rx="250" ry="20" fill="rgba(0,0,0,0.1)" />

                    {/* Main trunk - organic shape */}
                    <path
                        d="M420 800 Q410 700, 405 600 Q400 500, 420 420 Q430 350, 450 300 Q460 250, 480 220 L520 220 Q540 250, 550 300 Q570 350, 580 420 Q600 500, 595 600 Q590 700, 580 800 Z"
                        fill="#8B6F47"
                    />
                    {/* Trunk bark texture */}
                    <path d="M430 750 Q440 650, 435 550 Q445 450, 440 350" stroke="#6B5A3E" strokeWidth="3" fill="none" opacity="0.5" />
                    <path d="M480 780 Q490 680, 485 580 Q495 480, 490 380" stroke="#6B5A3E" strokeWidth="2" fill="none" opacity="0.4" />
                    <path d="M540 760 Q550 660, 545 560 Q555 460, 550 360" stroke="#6B5A3E" strokeWidth="2.5" fill="none" opacity="0.45" />
                    <path d="M460 770 Q455 670, 460 570 Q450 470, 465 370" stroke="#7A6240" strokeWidth="1.5" fill="none" opacity="0.3" />

                    {/* Trunk highlights */}
                    <path d="M440 700 Q445 600, 450 500" stroke="#A88A6A" strokeWidth="4" fill="none" opacity="0.3" />
                    <path d="M520 680 Q525 580, 530 480" stroke="#A88A6A" strokeWidth="3" fill="none" opacity="0.25" />

                    {/* Knots */}
                    <ellipse cx="470" cy="500" rx="12" ry="8" fill="#6B5A3E" opacity="0.6" />
                    <ellipse cx="510" cy="620" rx="8" ry="6" fill="#6B5A3E" opacity="0.5" />

                    {/* Main branches */}
                    <path d="M440 350 Q350 280, 280 250 Q210 220, 180 200" stroke="#8B6F47" strokeWidth="12" fill="none" strokeLinecap="round" />
                    <path d="M560 350 Q650 280, 720 250 Q790 220, 820 200" stroke="#8B6F47" strokeWidth="12" fill="none" strokeLinecap="round" />
                    <path d="M450 400 Q380 350, 320 330" stroke="#7A6240" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <path d="M550 400 Q620 350, 680 330" stroke="#7A6240" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <path d="M460 300 Q400 250, 350 230" stroke="#7A6240" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M540 300 Q600 250, 650 230" stroke="#7A6240" strokeWidth="6" fill="none" strokeLinecap="round" />

                    {/* Roots */}
                    <path d="M420 800 Q350 790, 280 795 Q210 800, 160 810" stroke="#8B6F47" strokeWidth="20" fill="none" strokeLinecap="round" />
                    <path d="M580 800 Q650 790, 720 795 Q790 800, 840 810" stroke="#8B6F47" strokeWidth="18" fill="none" strokeLinecap="round" />
                    <path d="M440 800 Q390 795, 330 800 Q270 805, 230 815" stroke="#7A6240" strokeWidth="12" fill="none" strokeLinecap="round" />
                    <path d="M560 800 Q610 795, 670 800 Q730 805, 770 815" stroke="#7A6240" strokeWidth="12" fill="none" strokeLinecap="round" />

                    {/* Moss on roots */}
                    <circle cx="280" cy="800" r="10" fill="#7CA982" opacity="0.5" />
                    <circle cx="260" cy="798" r="7" fill="#5A8A64" opacity="0.4" />
                    <circle cx="720" cy="800" r="9" fill="#7CA982" opacity="0.5" />
                    <circle cx="740" cy="802" r="6" fill="#5A8A64" opacity="0.4" />

                    {/* Canopy - layered for depth */}
                    {/* Back canopy */}
                    <ellipse cx="500" cy="150" rx="350" ry="180" fill="#376B4D" />
                    <ellipse cx="400" cy="130" rx="250" ry="150" fill="#2D5016" />
                    <ellipse cx="600" cy="140" rx="230" ry="140" fill="#2D5016" />

                    {/* Mid canopy */}
                    <ellipse cx="500" cy="120" rx="300" ry="160" fill="#4A7C59" />
                    <ellipse cx="450" cy="100" rx="220" ry="130" fill="#5A8A64" />
                    <ellipse cx="550" cy="110" rx="200" ry="120" fill="#5A8A64" />

                    {/* Front canopy */}
                    <ellipse cx="480" cy="90" rx="180" ry="100" fill="#6B9A74" />
                    <ellipse cx="520" cy="80" rx="160" ry="90" fill="#7CA982" />
                    <ellipse cx="500" cy="70" rx="130" ry="70" fill="#8CB892" />

                    {/* Light spots on canopy */}
                    <ellipse cx="450" cy="60" rx="80" ry="40" fill="#9DC8A3" opacity="0.5" />
                    <ellipse cx="550" cy="50" rx="60" ry="30" fill="#B8D8BE" opacity="0.4" />
                    <ellipse cx="500" cy="40" rx="40" ry="20" fill="#C8E6C9" opacity="0.3" />

                    {/* Canopy edge detail */}
                    <g opacity="0.6">
                        <circle cx="200" cy="180" r="35" fill="#5A8A64" />
                        <circle cx="250" cy="150" r="40" fill="#4A7C59" />
                        <circle cx="320" cy="120" r="45" fill="#5A8A64" />
                        <circle cx="400" cy="90" r="50" fill="#6B9A74" />
                        <circle cx="500" cy="70" r="55" fill="#7CA982" />
                        <circle cx="600" cy="80" r="50" fill="#6B9A74" />
                        <circle cx="680" cy="110" r="45" fill="#5A8A64" />
                        <circle cx="750" cy="140" r="40" fill="#4A7C59" />
                        <circle cx="800" cy="170" r="35" fill="#5A8A64" />
                    </g>

                    {/* Hanging vines/moss */}
                    <g opacity="0.4">
                        <path d="M250 200 Q245 230, 250 260" stroke="#5A8A64" strokeWidth="2" fill="none" />
                        <path d="M260 190 Q258 220, 262 250" stroke="#4A7C59" strokeWidth="1.5" fill="none" />
                        <path d="M740 195 Q745 225, 740 255" stroke="#5A8A64" strokeWidth="2" fill="none" />
                    </g>
                </svg>
            </motion.div>

            {/* Ground */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[15%]"
                style={{
                    background: 'linear-gradient(0deg, #C8B898 0%, #D4C4A8 40%, #E0D4B8 70%, transparent 100%)',
                }}
            />

            {/* Grass tufts */}
            <div className="absolute bottom-[12%] left-0 right-0 h-[8%]">
                <svg className="w-full h-full" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
                    <path d="M0 80 Q10 60, 20 80 Q30 55, 40 80 Q50 50, 60 80 Q70 55, 80 80 Q90 60, 100 80" fill="#7CA982" opacity="0.6" />
                    <path d="M100 80 Q110 55, 120 80 Q130 50, 140 80 Q150 60, 160 80 Q170 45, 180 80" fill="#6B9A74" opacity="0.5" />
                    <path d="M200 80 Q210 55, 220 80 Q230 50, 240 80 Q250 60, 260 80 Q270 45, 280 80" fill="#5A8A64" opacity="0.4" />
                </svg>
            </div>
        </div>
    );
};

interface GhibliLayoutProps {
    children: React.ReactNode;
}

export const GhibliLayout = ({ children }: GhibliLayoutProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            {/* Background layers */}
            <TreeBackground />
            <GodRays />
            <FogLayer />
            <Fireflies />

            {/* Noise texture overlay */}
            <NoiseTexture />

            {/* Falling leaves */}
            <FallingLeaves />

            {/* Main content */}
            <main className="relative z-20">
                {children}
            </main>

            {/* House navigation */}
            <GhibliHouse />
        </div>
    );
};

export default GhibliLayout;
