'use client';

import dynamic from 'next/dynamic';

const ContactContent = dynamic(() => import('./ContactContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-background" />,
});

export default function ContactPage() {
    return <ContactContent />;
}
