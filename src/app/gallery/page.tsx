'use client';

import dynamic from 'next/dynamic';

const GalleryContent = dynamic(() => import('./GalleryContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-[#0a0a0f]" />,
});

export default function GalleryPage() {
    return <GalleryContent />;
}
