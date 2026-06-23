'use client';

import dynamic from 'next/dynamic';

const ContactContent = dynamic(() => import('./ContactContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-[#0a0a0f]" />,
});

export default function ContactPage() {
    return <ContactContent />;
}
