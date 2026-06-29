'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FallingLeaves } from './FallingLeaves';
import { GhibliHouse } from './GhibliHouse';

const GodRays = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
            className="absolute top-0 left-[25%] w-[350px] h-[130%]"
            style={{
                background: 'linear-gradient(180deg, rgba(244,162,97,0.3) 0%, rgba(244,162,97,0.1) 30%, rgba(212,168,67,0.05) 50%, transparent 70%)',
                transformOrigin: 'top center',
                filter: 'blur(40px)',
            }}
            animate={{
                rotate: [-10, -6, -10],
                opacity: [0.4, 0.7, 0.4],
                scaleX: [1, 1.3, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute top-0 left-[50%] w-[250px] h-[110%]"
            style={{
                background: 'linear-gradient(180deg, rgba(212,168,67,0.25) 0%, rgba(212,168,67,0.08) 40%, transparent 70%)',
                transformOrigin: 'top center',
                filter: 'blur(35px)',
            }}
            animate={{
                rotate: [6, 10, 6],
                opacity: [0.3, 0.6, 0.3],
                scaleX: [1, 1.2, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        <motion.div
            className="absolute top-0 left-[38%] w-[180px] h-[100%]"
            style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)',
                transformOrigin: 'top center',
                filter: 'blur(25px)',
            }}
            animate={{
                rotate: [-3, 3, -3],
                opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        />
        <motion.div
            className="absolute top-0 left-[65%] w-[200px] h-[90%]"
            style={{
                background: 'linear-gradient(180deg, rgba(244,162,97,0.15) 0%, transparent 60%)',
                transformOrigin: 'top center',
                filter: 'blur(30px)',
            }}
            animate={{
                rotate: [8, 12, 8],
                opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
    </div>
);

const FogLayer = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
            className="absolute bottom-0 left-0 right-0 h-[35%]"
            style={{
                background: 'linear-gradient(0deg, rgba(253,246,227,0.7) 0%, rgba(253,246,227,0.3) 30%, rgba(253,246,227,0.1) 60%, transparent 100%)',
                filter: 'blur(25px)',
            }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute top-[35%] left-[5%] w-[45%] h-[25%]"
            style={{
                background: 'radial-gradient(ellipse, rgba(253,246,227,0.35) 0%, transparent 70%)',
                filter: 'blur(50px)',
            }}
            animate={{ x: [0, 60, 0], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute top-[45%] right-[10%] w-[35%] h-[20%]"
            style={{
                background: 'radial-gradient(ellipse, rgba(253,246,227,0.3) 0%, transparent 70%)',
                filter: 'blur(45px)',
            }}
            animate={{ x: [0, -50, 0], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        />
        <motion.div
            className="absolute top-[60%] left-[30%] w-[40%] h-[15%]"
            style={{
                background: 'radial-gradient(ellipse, rgba(253,246,227,0.25) 0%, transparent 70%)',
                filter: 'blur(40px)',
            }}
            animate={{ x: [0, 30, 0], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
    </div>
);

const Fireflies = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 15 + Math.random() * 70,
        y: 15 + Math.random() * 70,
        size: 2 + Math.random() * 5,
        duration: 5 + Math.random() * 8,
        delay: Math.random() * 10,
        color: ['#F4A261', '#D4A843', '#87CEEB', '#FFD700'][Math.floor(Math.random() * 4)],
        drift: -20 + Math.random() * 40,
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
                        background: `radial-gradient(circle, ${p.color} 0%, ${p.color}90 30%, ${p.color}40 60%, transparent 80%)`,
                        boxShadow: `0 0 ${p.size * 4}px ${p.color}50, 0 0 ${p.size * 8}px ${p.color}25`,
                    }}
                    animate={{
                        opacity: [0, 0.9, 0],
                        scale: [0.3, 1.3, 0.3],
                        y: [0, -40, 0],
                        x: [0, p.drift, 0],
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

const DustMotes = () => {
    const motes = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 15 + Math.random() * 20,
        delay: Math.random() * 15,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            {motes.map(m => (
                <motion.div
                    key={m.id}
                    className="absolute rounded-full bg-white/20"
                    style={{
                        left: `${m.x}%`,
                        top: `${m.y}%`,
                        width: m.size,
                        height: m.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 30, -20, 0],
                        opacity: [0, 0.4, 0.2, 0],
                    }}
                    transition={{
                        duration: m.duration,
                        repeat: Infinity,
                        delay: m.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

const NoiseTexture = () => (
    <div
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply"
        style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
        }}
    />
);

const TreeBackground = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -70]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -35]);

    return (
        <div ref={ref} className="fixed inset-0 z-0 overflow-hidden">
            {/* Sky gradient - warm golden hour */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse at 50% 15%, rgba(244,162,97,0.35) 0%, transparent 50%),
                        radial-gradient(ellipse at 25% 8%, rgba(135,206,235,0.45) 0%, transparent 45%),
                        radial-gradient(ellipse at 75% 12%, rgba(212,168,67,0.25) 0%, transparent 40%),
                        radial-gradient(ellipse at 60% 5%, rgba(255,220,180,0.2) 0%, transparent 30%),
                        linear-gradient(180deg,
                            #7EC8E3 0%,
                            #A8D4E6 10%,
                            #C8DDE8 20%,
                            #E0D4C0 35%,
                            #FDF6E3 50%,
                            #F0E6D0 65%,
                            #E0D4B8 80%,
                            #D4C8A8 100%
                        )
                    `,
                }}
            />

            {/* Distant hills */}
            <motion.div style={{ y: y3 }} className="absolute bottom-0 left-0 right-0 h-[55%]">
                <svg className="w-full h-full" viewBox="0 0 1920 600" preserveAspectRatio="none" fill="none">
                    <path d="M0 600 L0 380 Q200 320, 400 350 Q600 380, 800 330 Q1000 280, 1200 320 Q1400 360, 1600 300 Q1800 240, 1920 280 L1920 600 Z" fill="#7CA982" opacity="0.25" />
                    <path d="M0 600 L0 420 Q250 380, 500 400 Q750 420, 1000 380 Q1250 340, 1500 370 Q1750 400, 1920 380 L1920 600 Z" fill="#5A8A64" opacity="0.2" />
                    <path d="M0 600 L0 450 Q300 420, 600 440 Q900 460, 1200 430 Q1500 400, 1920 420 L1920 600 Z" fill="#4A7C59" opacity="0.15" />
                </svg>
            </motion.div>

            {/* Mid trees */}
            <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 right-0 h-[65%]">
                <svg className="w-full h-full" viewBox="0 0 1920 700" preserveAspectRatio="none" fill="none">
                    <g opacity="0.35">
                        <ellipse cx="250" cy="500" rx="100" ry="140" fill="#376B4D" />
                        <ellipse cx="300" cy="480" rx="75" ry="120" fill="#4A7C59" />
                        <ellipse cx="150" cy="520" rx="60" ry="100" fill="#2D5016" />
                        <ellipse cx="1600" cy="490" rx="90" ry="130" fill="#376B4D" />
                        <ellipse cx="1650" cy="470" rx="70" ry="110" fill="#4A7C59" />
                        <ellipse cx="1750" cy="510" rx="55" ry="90" fill="#2D5016" />
                        <ellipse cx="900" cy="520" rx="110" ry="150" fill="#2D5016" />
                        <ellipse cx="950" cy="500" rx="80" ry="120" fill="#376B4D" />
                    </g>
                </svg>
            </motion.div>

            {/* Main tree */}
            <motion.div style={{ y: y1 }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[90%]">
                <svg className="w-full h-full" viewBox="0 0 1200 900" preserveAspectRatio="xMidYMax meet" fill="none">
                    <defs>
                        <filter id="treeShadow">
                            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.1" />
                        </filter>
                        <linearGradient id="trunkGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#7A6240" />
                            <stop offset="30%" stopColor="#8B6F47" />
                            <stop offset="50%" stopColor="#9A7E56" />
                            <stop offset="70%" stopColor="#8B6F47" />
                            <stop offset="100%" stopColor="#7A6240" />
                        </linearGradient>
                        <linearGradient id="canopyGrad1" x1="0.5" y1="0" x2="0.5" y2="1">
                            <stop offset="0%" stopColor="#8CB892" />
                            <stop offset="100%" stopColor="#4A7C59" />
                        </linearGradient>
                        <linearGradient id="canopyGrad2" x1="0.5" y1="0" x2="0.5" y2="1">
                            <stop offset="0%" stopColor="#9DC8A3" />
                            <stop offset="100%" stopColor="#5A8A64" />
                        </linearGradient>
                        <radialGradient id="canopyLight" cx="0.4" cy="0.3" r="0.6">
                            <stop offset="0%" stopColor="#B8D8BE" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#5A8A64" stopOpacity="0" />
                        </radialGradient>
                    </defs>

                    {/* Tree shadow */}
                    <ellipse cx="600" cy="880" rx="300" ry="20" fill="rgba(0,0,0,0.08)" />

                    {/* Main trunk */}
                    <path
                        d="M500 900 Q490 780, 485 660 Q480 540, 500 440 Q510 360, 530 300 Q540 250, 560 220 L640 220 Q660 250, 670 300 Q690 360, 700 440 Q720 540, 715 660 Q710 780, 700 900 Z"
                        fill="url(#trunkGrad)"
                    />

                    {/* Bark texture */}
                    <path d="M510 850 Q520 730, 515 610 Q525 490, 520 370" stroke="#6B5A3E" strokeWidth="3" fill="none" opacity="0.5" />
                    <path d="M560 880 Q570 760, 565 640 Q575 520, 570 400" stroke="#6B5A3E" strokeWidth="2.5" fill="none" opacity="0.4" />
                    <path d="M620 870 Q630 750, 625 630 Q635 510, 630 390" stroke="#6B5A3E" strokeWidth="2" fill="none" opacity="0.4" />
                    <path d="M670 860 Q680 740, 675 620 Q685 500, 680 380" stroke="#6B5A3E" strokeWidth="2.5" fill="none" opacity="0.45" />
                    <path d="M540 870 Q535 750, 540 630 Q530 510, 545 390" stroke="#7A6240" strokeWidth="1.5" fill="none" opacity="0.3" />

                    {/* Trunk highlights */}
                    <path d="M530 800 Q535 680, 540 560" stroke="#A88A6A" strokeWidth="5" fill="none" opacity="0.25" />
                    <path d="M600 780 Q605 660, 610 540" stroke="#A88A6A" strokeWidth="4" fill="none" opacity="0.2" />
                    <path d="M660 790 Q665 670, 670 550" stroke="#A88A6A" strokeWidth="3" fill="none" opacity="0.15" />

                    {/* Knots */}
                    <ellipse cx="555" cy="520" rx="14" ry="10" fill="#6B5A3E" opacity="0.5" />
                    <ellipse cx="555" cy="520" rx="10" ry="7" fill="#5A4A32" opacity="0.3" />
                    <ellipse cx="620" cy="650" rx="10" ry="8" fill="#6B5A3E" opacity="0.4" />
                    <ellipse cx="590" cy="420" rx="8" ry="6" fill="#6B5A3E" opacity="0.35" />

                    {/* Main branches */}
                    <path d="M520 360 Q420 280, 340 250 Q260 220, 220 200" stroke="url(#trunkGrad)" strokeWidth="16" fill="none" strokeLinecap="round" />
                    <path d="M680 360 Q780 280, 860 250 Q940 220, 980 200" stroke="url(#trunkGrad)" strokeWidth="16" fill="none" strokeLinecap="round" />
                    <path d="M530 420 Q450 360, 380 340" stroke="#7A6240" strokeWidth="10" fill="none" strokeLinecap="round" />
                    <path d="M670 420 Q750 360, 820 340" stroke="#7A6240" strokeWidth="10" fill="none" strokeLinecap="round" />
                    <path d="M540 310 Q480 260, 420 240" stroke="#7A6240" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <path d="M660 310 Q720 260, 780 240" stroke="#7A6240" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <path d="M340 250 Q300 230, 260 220" stroke="#6B5A3E" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <path d="M860 250 Q900 230, 940 220" stroke="#6B5A3E" strokeWidth="6" fill="none" strokeLinecap="round" />

                    {/* Roots */}
                    <path d="M500 900 Q420 890, 340 895 Q260 900, 200 910" stroke="#8B6F47" strokeWidth="24" fill="none" strokeLinecap="round" />
                    <path d="M700 900 Q780 890, 860 895 Q940 900, 1000 910" stroke="#8B6F47" strokeWidth="22" fill="none" strokeLinecap="round" />
                    <path d="M520 900 Q460 895, 390 900 Q320 905, 270 915" stroke="#7A6240" strokeWidth="14" fill="none" strokeLinecap="round" />
                    <path d="M680 900 Q740 895, 810 900 Q880 905, 930 915" stroke="#7A6240" strokeWidth="14" fill="none" strokeLinecap="round" />

                    {/* Root moss */}
                    <circle cx="320" cy="900" r="12" fill="#7CA982" opacity="0.45" />
                    <circle cx="300" cy="898" r="8" fill="#5A8A64" opacity="0.35" />
                    <circle cx="340" cy="902" r="6" fill="#4A7C59" opacity="0.3" />
                    <circle cx="880" cy="900" r="11" fill="#7CA982" opacity="0.45" />
                    <circle cx="900" cy="902" r="7" fill="#5A8A64" opacity="0.35" />
                    <circle cx="860" cy="898" r="5" fill="#4A7C59" opacity="0.3" />

                    {/* Canopy layers */}
                    <ellipse cx="600" cy="160" rx="400" ry="200" fill="#2D5016" />
                    <ellipse cx="500" cy="140" rx="300" ry="170" fill="#376B4D" />
                    <ellipse cx="700" cy="150" rx="280" ry="160" fill="#376B4D" />
                    <ellipse cx="600" cy="130" rx="350" ry="180" fill="#4A7C59" />
                    <ellipse cx="550" cy="110" rx="260" ry="150" fill="#5A8A64" />
                    <ellipse cx="650" cy="120" rx="240" ry="140" fill="#5A8A64" />
                    <ellipse cx="580" cy="100" rx="220" ry="120" fill="#6B9A74" />
                    <ellipse cx="620" cy="90" rx="200" ry="110" fill="#6B9A74" />
                    <ellipse cx="600" cy="80" rx="170" ry="90" fill="#7CA982" />
                    <ellipse cx="580" cy="65" rx="140" ry="70" fill="#8CB892" />
                    <ellipse cx="620" cy="55" rx="110" ry="55" fill="#9DC8A3" />

                    {/* Light spots */}
                    <ellipse cx="550" cy="50" rx="100" ry="50" fill="url(#canopyLight)" />
                    <ellipse cx="650" cy="40" rx="70" ry="35" fill="#B8D8BE" opacity="0.3" />
                    <ellipse cx="600" cy="30" rx="50" ry="25" fill="#C8E6C9" opacity="0.2" />

                    {/* Canopy edge detail */}
                    <g opacity="0.5">
                        <circle cx="230" cy="190" r="40" fill="#4A7C59" />
                        <circle cx="290" cy="160" r="45" fill="#376B4D" />
                        <circle cx="370" cy="130" r="50" fill="#4A7C59" />
                        <circle cx="460" cy="100" r="55" fill="#5A8A64" />
                        <circle cx="560" cy="75" r="60" fill="#6B9A74" />
                        <circle cx="640" cy="70" r="55" fill="#6B9A74" />
                        <circle cx="740" cy="95" r="50" fill="#5A8A64" />
                        <circle cx="830" cy="125" r="45" fill="#4A7C59" />
                        <circle cx="910" cy="155" r="40" fill="#376B4D" />
                        <circle cx="970" cy="185" r="35" fill="#4A7C59" />
                    </g>

                    {/* Hanging moss/vines */}
                    <g opacity="0.35">
                        <path d="M280 210 Q275 250, 280 290" stroke="#5A8A64" strokeWidth="2.5" fill="none" />
                        <path d="M290 200 Q288 240, 292 280" stroke="#4A7C59" strokeWidth="2" fill="none" />
                        <path d="M920 205 Q925 245, 920 285" stroke="#5A8A64" strokeWidth="2.5" fill="none" />
                        <path d="M910 195 Q912 235, 908 275" stroke="#4A7C59" strokeWidth="2" fill="none" />
                        <path d="M400 180 Q395 210, 400 240" stroke="#5A8A64" strokeWidth="1.5" fill="none" />
                        <path d="M800 175 Q805 205, 800 235" stroke="#5A8A64" strokeWidth="1.5" fill="none" />
                    </g>
                </svg>
            </motion.div>

            {/* Ground */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[18%]"
                style={{
                    background: 'linear-gradient(0deg, #C8B898 0%, #D4C4A8 30%, #E0D4B8 60%, #E8DCC8 80%, transparent 100%)',
                }}
            />

            {/* Grass tufts */}
            <div className="absolute bottom-[15%] left-0 right-0 h-[10%]">
                <svg className="w-full h-full" viewBox="0 0 1920 100" preserveAspectRatio="none" fill="none">
                    <path d="M0 100 Q12 75, 24 100 Q36 70, 48 100 Q60 65, 72 100 Q84 72, 96 100 Q108 68, 120 100 Q132 75, 144 100 Q156 70, 168 100 Q180 65, 192 100" fill="#7CA982" opacity="0.5" />
                    <path d="M200 100 Q212 70, 224 100 Q236 65, 248 100 Q260 72, 272 100 Q284 68, 296 100 Q308 75, 320 100" fill="#6B9A74" opacity="0.4" />
                    <path d="M400 100 Q412 68, 424 100 Q436 62, 448 100 Q460 70, 472 100 Q484 65, 496 100" fill="#5A8A64" opacity="0.35" />
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
            <DustMotes />
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
