'use client';

import dynamic from 'next/dynamic';

const ExperienceContent = dynamic(() => import('./ExperienceContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-background" />,
});

export default function ExperiencePage() {
    return <ExperienceContent />;
}
