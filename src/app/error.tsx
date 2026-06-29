'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-ghibli-cream">
            <div className="text-center">
                <h2 className="font-[family-name:var(--font-caveat)] text-3xl text-ghibli-bark mb-4">Something went wrong</h2>
                <button onClick={reset} className="ghibli-btn">Try again</button>
            </div>
        </div>
    );
}
