'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FallingLeaves } from './FallingLeaves';
import { GhibliHouse } from './GhibliHouse';

const GodRays = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            className="absolute top-0 left-[30%] w-[250px] h-[120%]"
            style={{
                background: 'linear-gradient(180deg, rgba(255,220,180,0.2) 0%, rgba(255,200,150,0.08) 30%, transparent 60%)',
                transformOrigin: 'top center',
                filter: 'blur(50px)',
            }}
            animate={{ rotate: [-5, -2, -5], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute top-0 left-[55%] w-[180px] h-[100%]"
            style={{
                background: 'linear-gradient(180deg, rgba(255,210,160,0.15) 0%, transparent 50%)',
                transformOrigin: 'top center',
                filter: 'blur(40px)',
            }}
            animate={{ rotate: [3, 6, 3], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        />
    </div>
);

const FogLayer = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
            className="absolute bottom-0 left-0 right-0 h-[25%]"
            style={{
                background: 'linear-gradient(0deg, rgba(253,246,227,0.5) 0%, transparent 100%)',
                filter: 'blur(30px)',
            }}
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
    </div>
);

const Fireflies = () => {
    const particles = Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: 20 + Math.random() * 60,
        y: 20 + Math.random() * 60,
        size: 2 + Math.random() * 3,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 15,
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
                        background: `radial-gradient(circle, rgba(255,220,150,0.9) 0%, rgba(255,200,100,0.4) 40%, transparent 70%)`,
                        boxShadow: `0 0 ${p.size * 5}px rgba(255,200,100,0.3)`,
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.2, 0.5],
                        y: [0, -30, 0],
                        x: [0, Math.random() > 0.5 ? 10 : -10, 0],
                    }}
                    transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
};

const NoiseTexture = () => (
    <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
        }}
    />
);

const TreeBackground = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden">
            {/* Sky - realistic golden hour */}
            <div className="absolute inset-0" style={{
                background: `
                    radial-gradient(ellipse at 50% 10%, rgba(255,200,150,0.3) 0%, transparent 40%),
                    radial-gradient(ellipse at 30% 5%, rgba(180,210,230,0.3) 0%, transparent 35%),
                    radial-gradient(ellipse at 70% 8%, rgba(255,210,170,0.2) 0%, transparent 30%),
                    linear-gradient(180deg,
                        #6BA3BE 0%,
                        #8BB8CE 8%,
                        #A8C8D8 16%,
                        #C8D8E0 24%,
                        #E0D8C8 36%,
                        #F0E8D8 48%,
                        #F5EDE0 60%,
                        #E8DCC8 72%,
                        #D8CDB5 84%,
                        #C8BD9E 100%
                    )
                `,
            }} />

            {/* Distant landscape */}
            <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 right-0 h-[50%]">
                <div className="absolute inset-0" style={{
                    background: `
                        linear-gradient(180deg, transparent 0%, rgba(120,160,100,0.15) 20%, rgba(100,140,80,0.2) 40%, rgba(80,120,60,0.15) 60%, transparent 100%),
                        radial-gradient(ellipse at 20% 50%, rgba(90,130,70,0.3) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 45%, rgba(100,140,80,0.25) 0%, transparent 45%),
                        radial-gradient(ellipse at 50% 55%, rgba(70,110,50,0.2) 0%, transparent 40%)
                    `,
                }} />
            </motion.div>

            {/* Main tree - realistic painted style */}
            <motion.div style={{ y: y1 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[85%]">
                <svg className="w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="xMidYMax meet" fill="none">
                    <defs>
                        <linearGradient id="trunkReal" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#5C4830" />
                            <stop offset="20%" stopColor="#6B5538" />
                            <stop offset="40%" stopColor="#7A6445" />
                            <stop offset="60%" stopColor="#6B5538" />
                            <stop offset="80%" stopColor="#5C4830" />
                            <stop offset="100%" stopColor="#4D3D28" />
                        </linearGradient>
                        <linearGradient id="barkLight" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="rgba(160,140,100,0.15)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                        <radialGradient id="canopyReal" cx="0.5" cy="0.3" r="0.7">
                            <stop offset="0%" stopColor="#6B9A5A" />
                            <stop offset="40%" stopColor="#5A8A4A" />
                            <stop offset="70%" stopColor="#4A7A3A" />
                            <stop offset="100%" stopColor="#3A6A2A" />
                        </radialGradient>
                        <radialGradient id="canopyHighlight" cx="0.4" cy="0.2" r="0.5">
                            <stop offset="0%" stopColor="rgba(180,210,160,0.4)" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>

                    {/* Ground shadow */}
                    <ellipse cx="500" cy="780" rx="280" ry="15" fill="rgba(0,0,0,0.06)" />

                    {/* Trunk */}
                    <path d="M430 800 Q420 680, 415 560 Q410 440, 430 360 Q440 280, 460 240 L540 240 Q560 280, 570 360 Q590 440, 585 560 Q580 680, 570 800 Z" fill="url(#trunkReal)" />

                    {/* Bark texture */}
                    <path d="M440 750 Q450 630, 445 510 Q455 390, 450 270" stroke="rgba(80,60,40,0.3)" strokeWidth="2" fill="none" />
                    <path d="M480 770 Q490 650, 485 530 Q495 410, 490 290" stroke="rgba(80,60,40,0.25)" strokeWidth="1.5" fill="none" />
                    <path d="M520 760 Q530 640, 525 520 Q535 400, 530 280" stroke="rgba(80,60,40,0.2)" strokeWidth="1.5" fill="none" />
                    <path d="M550 750 Q560 630, 555 510 Q565 390, 560 270" stroke="rgba(80,60,40,0.25)" strokeWidth="2" fill="none" />

                    {/* Bark highlights */}
                    <path d="M450 700 Q455 580, 460 460" stroke="rgba(140,120,80,0.12)" strokeWidth="4" fill="none" />
                    <path d="M510 680 Q515 560, 520 440" stroke="rgba(140,120,80,0.1)" strokeWidth="3" fill="none" />

                    {/* Knots */}
                    <ellipse cx="470" cy="480" rx="10" ry="7" fill="rgba(70,55,35,0.4)" />
                    <ellipse cx="530" cy="600" rx="8" ry="6" fill="rgba(70,55,35,0.35)" />

                    {/* Branches */}
                    <path d="M440 320 Q360 260, 280 240 Q200 220, 160 200" stroke="url(#trunkReal)" strokeWidth="12" fill="none" strokeLinecap="round" />
                    <path d="M560 320 Q640 260, 720 240 Q800 220, 840 200" stroke="url(#trunkReal)" strokeWidth="12" fill="none" strokeLinecap="round" />
                    <path d="M450 380 Q380 330, 320 310" stroke="#6B5538" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <path d="M550 380 Q620 330, 680 310" stroke="#6B5538" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <path d="M460 270 Q400 230, 340 210" stroke="#6B5538" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M540 270 Q600 230, 660 210" stroke="#6B5538" strokeWidth="6" fill="none" strokeLinecap="round" />

                    {/* Roots */}
                    <path d="M430 800 Q370 790, 300 795 Q230 800, 180 810" stroke="url(#trunkReal)" strokeWidth="18" fill="none" strokeLinecap="round" />
                    <path d="M570 800 Q630 790, 700 795 Q770 800, 820 810" stroke="url(#trunkReal)" strokeWidth="16" fill="none" strokeLinecap="round" />
                    <path d="M445 800 Q400 795, 340 800 Q280 805, 240 815" stroke="#5C4830" strokeWidth="10" fill="none" strokeLinecap="round" />
                    <path d="M555 800 Q600 795, 660 800 Q720 805, 760 815" stroke="#5C4830" strokeWidth="10" fill="none" strokeLinecap="round" />

                    {/* Root moss */}
                    <circle cx="280" cy="800" r="8" fill="rgba(100,150,80,0.3)" />
                    <circle cx="260" cy="798" r="5" fill="rgba(80,130,60,0.25)" />
                    <circle cx="720" cy="800" r="7" fill="rgba(100,150,80,0.3)" />
                    <circle cx="740" cy="802" r="5" fill="rgba(80,130,60,0.25)" />

                    {/* Canopy - realistic layered */}
                    <ellipse cx="500" cy="140" rx="380" ry="180" fill="rgba(40,80,30,0.9)" />
                    <ellipse cx="420" cy="120" rx="280" ry="150" fill="rgba(50,90,40,0.85)" />
                    <ellipse cx="580" cy="130" rx="260" ry="140" fill="rgba(50,90,40,0.85)" />
                    <ellipse cx="500" cy="110" rx="320" ry="160" fill="rgba(60,100,50,0.8)" />
                    <ellipse cx="470" cy="90" rx="240" ry="130" fill="rgba(70,110,60,0.75)" />
                    <ellipse cx="530" cy="100" rx="220" ry="120" fill="rgba(70,110,60,0.75)" />
                    <ellipse cx="500" cy="80" rx="200" ry="100" fill="rgba(80,120,70,0.7)" />
                    <ellipse cx="480" cy="65" rx="160" ry="80" fill="rgba(90,130,80,0.6)" />
                    <ellipse cx="520" cy="55" rx="130" ry="65" fill="rgba(100,140,90,0.5)" />
                    <ellipse cx="500" cy="45" rx="100" ry="50" fill="rgba(110,150,100,0.4)" />

                    {/* Canopy highlights */}
                    <ellipse cx="460" cy="40" rx="80" ry="40" fill="url(#canopyHighlight)" />
                    <ellipse cx="540" cy="35" rx="60" ry="30" fill="rgba(160,190,140,0.2)" />

                    {/* Hanging moss */}
                    <g opacity="0.25">
                        <path d="M220 210 Q218 240, 220 270" stroke="rgba(80,120,60,0.6)" strokeWidth="2" fill="none" />
                        <path d="M780 205 Q782 235, 780 265" stroke="rgba(80,120,60,0.6)" strokeWidth="2" fill="none" />
                        <path d="M350 190 Q348 215, 350 240" stroke="rgba(80,120,60,0.5)" strokeWidth="1.5" fill="none" />
                        <path d="M650 185 Q652 210, 650 235" stroke="rgba(80,120,60,0.5)" strokeWidth="1.5" fill="none" />
                    </g>
                </svg>
            </motion.div>

            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-[15%]" style={{
                background: 'linear-gradient(0deg, #B8A888 0%, #C8B898 30%, #D8C8A8 60%, transparent 100%)',
            }} />

            {/* Grass */}
            <div className="absolute bottom-[12%] left-0 right-0 h-[6%] opacity-60">
                <svg className="w-full h-full" viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none">
                    <path d="M0 60 Q8 45, 16 60 Q24 40, 32 60 Q40 42, 48 60 Q56 38, 64 60 Q72 44, 80 60" fill="rgba(100,150,80,0.4)" />
                    <path d="M100 60 Q108 42, 116 60 Q124 38, 132 60 Q140 44, 148 60" fill="rgba(90,140,70,0.35)" />
                    <path d="M200 60 Q208 40, 216 60 Q224 36, 232 60 Q240 42, 248 60" fill="rgba(80,130,60,0.3)" />
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
            <TreeBackground />
            <GodRays />
            <FogLayer />
            <Fireflies />
            <NoiseTexture />
            <FallingLeaves />

            <main className="relative z-20">
                {children}
            </main>

            <GhibliHouse />
        </div>
    );
};

export default GhibliLayout;
