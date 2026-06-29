'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FallingLeaves } from './FallingLeaves';
import { GhibliHouse } from './GhibliHouse';

const TreeSVG = () => (
    <div className="fixed inset-0 pointer-events-none z-0">
        {/* Sky gradient */}
        <div className="absolute inset-0 ghibli-tree-bg" />

        {/* Sun rays */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full">
            <motion.div
                className="sunray absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                    width: '200px',
                    height: '100%',
                    transformOrigin: 'top center',
                    rotate: '-15deg',
                }}
                animate={{
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="sunray absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                    width: '150px',
                    height: '100%',
                    transformOrigin: 'top center',
                    rotate: '10deg',
                }}
                animate={{
                    opacity: [0.15, 0.35, 0.15],
                    scale: [1, 1.08, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                }}
            />
        </div>

        {/* Giant tree */}
        <svg
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[80vh]"
            viewBox="0 0 800 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax meet"
        >
            {/* Tree trunk */}
            <path
                d="M350 600 L340 400 Q335 350, 350 300 Q360 250, 380 200 L420 200 Q440 250, 450 300 Q465 350, 460 400 L450 600 Z"
                fill="#8B6F47"
                stroke="#6B5A3E"
                strokeWidth="2"
            />

            {/* Bark texture */}
            <path d="M360 550 Q370 500, 365 450 Q375 400, 370 350" fill="none" stroke="#6B5A3E" strokeWidth="1.5" opacity="0.5" />
            <path d="M400 580 Q410 530, 405 480 Q415 430, 410 380" fill="none" stroke="#6B5A3E" strokeWidth="1" opacity="0.4" />
            <path d="M430 560 Q440 510, 435 460 Q445 410, 440 360" fill="none" stroke="#6B5A3E" strokeWidth="1" opacity="0.3" />

            {/* Roots */}
            <path
                d="M350 600 Q300 590, 250 595 Q200 600, 180 610"
                fill="none"
                stroke="#8B6F47"
                strokeWidth="20"
                strokeLinecap="round"
            />
            <path
                d="M450 600 Q500 590, 550 595 Q600 600, 620 610"
                fill="none"
                stroke="#8B6F47"
                strokeWidth="18"
                strokeLinecap="round"
            />
            <path
                d="M370 600 Q340 595, 300 600 Q260 605, 240 615"
                fill="none"
                stroke="#7A6240"
                strokeWidth="12"
                strokeLinecap="round"
            />

            {/* Moss on roots */}
            <circle cx="250" cy="598" r="8" fill="#7CA982" opacity="0.6" />
            <circle cx="270" cy="595" r="6" fill="#5A8A64" opacity="0.5" />
            <circle cx="560" cy="598" r="7" fill="#7CA982" opacity="0.6" />
            <circle cx="580" cy="600" r="5" fill="#5A8A64" opacity="0.5" />

            {/* Main canopy */}
            <ellipse cx="400" cy="120" rx="280" ry="150" fill="#4A7C59" />
            <ellipse cx="350" cy="100" rx="200" ry="120" fill="#5A8A64" />
            <ellipse cx="450" cy="90" rx="180" ry="110" fill="#6B9A74" />
            <ellipse cx="400" cy="80" rx="150" ry="90" fill="#7CA982" />

            {/* Canopy highlights */}
            <ellipse cx="380" cy="60" rx="120" ry="60" fill="#8CB892" opacity="0.6" />
            <ellipse cx="420" cy="50" rx="80" ry="40" fill="#9DC8A3" opacity="0.4" />

            {/* Canopy shadows */}
            <ellipse cx="350" cy="140" rx="200" ry="80" fill="#376B4D" opacity="0.4" />
            <ellipse cx="400" cy="160" rx="250" ry="60" fill="#2D5016" opacity="0.3" />

            {/* Individual leaf clusters */}
            <g opacity="0.7">
                <circle cx="200" cy="150" r="30" fill="#5A8A64" />
                <circle cx="250" cy="120" r="25" fill="#6B9A74" />
                <circle cx="300" cy="80" r="35" fill="#7CA982" />
                <circle cx="350" cy="50" r="30" fill="#8CB892" />
                <circle cx="400" cy="40" r="25" fill="#9DC8A3" />
                <circle cx="450" cy="50" r="30" fill="#8CB892" />
                <circle cx="500" cy="80" r="35" fill="#7CA982" />
                <circle cx="550" cy="120" r="25" fill="#6B9A74" />
                <circle cx="600" cy="150" r="30" fill="#5A8A64" />
            </g>

            {/* Branches */}
            <path
                d="M380 250 Q300 200, 250 180 Q200 160, 180 140"
                fill="none"
                stroke="#8B6F47"
                strokeWidth="8"
                strokeLinecap="round"
            />
            <path
                d="M420 250 Q500 200, 550 180 Q600 160, 620 140"
                fill="none"
                stroke="#8B6F47"
                strokeWidth="8"
                strokeLinecap="round"
            />
            <path
                d="M390 280 Q330 240, 280 220"
                fill="none"
                stroke="#7A6240"
                strokeWidth="5"
                strokeLinecap="round"
            />
            <path
                d="M410 280 Q470 240, 520 220"
                fill="none"
                stroke="#7A6240"
                strokeWidth="5"
                strokeLinecap="round"
            />

            {/* Fireflies / spirit particles */}
            <motion.g
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <circle cx="200" cy="200" r="3" fill="#F4A261" opacity="0.8" />
                <circle cx="300" cy="150" r="2" fill="#D4A843" opacity="0.7" />
                <circle cx="500" cy="180" r="2.5" fill="#F4A261" opacity="0.6" />
                <circle cx="600" cy="200" r="2" fill="#D4A843" opacity="0.8" />
                <circle cx="250" cy="250" r="1.5" fill="#F4A261" opacity="0.5" />
                <circle cx="550" cy="220" r="2" fill="#D4A843" opacity="0.7" />
            </motion.g>
            <motion.g
                animate={{ opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
                <circle cx="350" cy="180" r="2" fill="#87CEEB" opacity="0.6" />
                <circle cx="450" cy="160" r="2.5" fill="#87CEEB" opacity="0.5" />
                <circle cx="280" cy="130" r="1.5" fill="#87CEEB" opacity="0.7" />
                <circle cx="520" cy="140" r="2" fill="#87CEEB" opacity="0.6" />
            </motion.g>
        </svg>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ghibli-cream to-transparent dark:from-ghibli-deep-green dark:to-transparent" />
    </div>
);

interface GhibliLayoutProps {
    children: React.ReactNode;
}

export const GhibliLayout = ({ children }: GhibliLayoutProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden">
            {/* Background tree */}
            <TreeSVG />

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
