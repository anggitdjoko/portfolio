'use client';

import dynamic from 'next/dynamic';

const BlogContent = dynamic(() => import('./BlogContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-background" />,
});

export default function BlogPage() {
    return <BlogContent />;
}
