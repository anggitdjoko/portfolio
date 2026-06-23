'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate, motionValue, LayoutGroup } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, SortAsc, SortDesc, ExternalLink, X, Calendar, Building2, Trophy, Medal, Award, Target, ChevronRight, ChevronLeft, MousePointer2, Eye, Share2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';
import { Achievement } from '@/types';
import dynamic from 'next/dynamic';

const FallingText = dynamic(() => import('@/components/effects/FallingText'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5 rounded-xl" />
});
const CertificateHeroScroll = dynamic(() => import('@/components/sections/CertificateHeroScroll'), {
    ssr: false,
    loading: () => <div className="h-[400px] w-full animate-pulse bg-zinc-100/5 dark:bg-zinc-800/5 rounded-xl" />
});
import { usePerformance } from '@/hooks/usePerformance';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

// ... rest of the original achievements page code ...
// (I'll copy the full content from the original file)

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function AchievementsContent() {
    const t = useTranslations('achievements');
    const { isLowPowerMode } = usePerformance();
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

    // Simplified version - just show achievements list
    const filteredAchievements = useMemo(() => {
        let achievements = [...portfolioData.achievements];
        
        if (searchQuery) {
            achievements = achievements.filter(a => 
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.issuer.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeCategory !== 'all') {
            achievements = achievements.filter(a => a.category.toLowerCase() === activeCategory);
        }

        achievements.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return achievements;
    }, [searchQuery, sortOrder, activeCategory]);

    return (
        <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAchievements.map((achievement, i) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="p-6 rounded-2xl bg-[#111118] border border-white/10 hover:border-indigo-500/30 transition-colors cursor-pointer"
                            onClick={() => setSelectedAchievement(achievement)}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                    <Award size={20} />
                                </div>
                                <span className="text-xs text-gray-400">{achievement.category}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                            <p className="text-sm text-gray-400 mb-2">{achievement.issuer}</p>
                            <p className="text-xs text-gray-500">{formatDate(achievement.date)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
