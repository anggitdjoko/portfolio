'use client';

import { motion } from 'framer-motion';

export default function AchievementsPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0f] pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Achievements
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Certifications, awards, and milestones.
                    </p>
                </motion.div>
                <div className="text-center text-gray-400">
                    <p>Coming soon...</p>
                </div>
            </div>
        </main>
    );
}
