'use client';

import dynamic from 'next/dynamic';

const HomeContent = dynamic(() => import('./HomeContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-background" />,
});

export default function Home() {
    return <HomeContent />;
}
