'use client';

import { useState, useEffect, ReactNode } from 'react';

export function ClientOnly({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return fallback || <div className="min-h-screen bg-background" />;
    }

    return <>{children}</>;
}
