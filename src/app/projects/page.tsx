'use client';

import dynamic from 'next/dynamic';

const ProjectsContent = dynamic(() => import('./ProjectsContent'), {
    ssr: false,
    loading: () => <div className="min-h-screen bg-background" />,
});

export default function ProjectsPage() {
    return <ProjectsContent />;
}
