'use client';

import dynamic from 'next/dynamic';

const SkillsContent = dynamic(() => import('./SkillsContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-background" />,
});

export default function SkillsPage() {
    return <SkillsContent />;
}
