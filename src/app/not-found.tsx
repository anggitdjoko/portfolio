import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-ghibli-cream">
            <div className="text-center">
                <h1 className="font-[family-name:var(--font-caveat)] text-6xl text-ghibli-bark mb-4">404</h1>
                <h2 className="font-[family-name:var(--font-caveat)] text-2xl text-ghibli-bark/70 mb-6">Lost in the forest</h2>
                <Link href="/" className="ghibli-btn">Go Home</Link>
            </div>
        </div>
    );
}
