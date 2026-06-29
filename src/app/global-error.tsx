'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div className="min-h-screen flex items-center justify-center" style={{ background: '#FDF6E3' }}>
                    <div className="text-center">
                        <h2 style={{ fontFamily: 'var(--font-caveat), cursive', fontSize: '2rem', color: '#8B6F47' }}>Something went wrong</h2>
                        <button onClick={reset} style={{
                            padding: '12px 24px',
                            borderRadius: '9999px',
                            background: 'linear-gradient(135deg, #4A7C59, #7CA982)',
                            color: '#FDF6E3',
                            border: 'none',
                            cursor: 'pointer',
                            marginTop: '1rem'
                        }}>Try again</button>
                    </div>
                </div>
            </body>
        </html>
    );
}
