'use client';

import dynamic from 'next/dynamic';

const SkillsContent = dynamic(() => import('./SkillsContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-[#0a0a0f]" />,
});

export default function SkillsPage() {
    return <SkillsContent />;
}
