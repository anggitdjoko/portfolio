'use client';

import dynamic from 'next/dynamic';

const AchievementsContent = dynamic(() => import('./AchievementsContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-[#0a0a0f]" />,
});

export default function AchievementsPage() {
    return <AchievementsContent />;
}
