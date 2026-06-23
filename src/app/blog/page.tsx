'use client';

import dynamic from 'next/dynamic';

const BlogContent = dynamic(() => import('./BlogContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-[#0a0a0f]" />,
});

export default function BlogPage() {
    return <BlogContent />;
}
