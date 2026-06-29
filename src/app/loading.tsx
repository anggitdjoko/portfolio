export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-ghibli-cream">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-ghibli-leaf/30 border-t-ghibli-leaf rounded-full animate-spin mx-auto mb-4" />
                <p className="font-[family-name:var(--font-caveat)] text-xl text-ghibli-bark">Loading magic...</p>
            </div>
        </div>
    );
}
