'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Error caught:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
    }, [error]);

    return (
        <div style={{ padding: '20px', background: '#1a1a1a', color: 'white', fontFamily: 'monospace' }}>
            <h1 style={{ color: '#ff4444' }}>Error Caught</h1>
            <p><strong>Message:</strong> {error.message}</p>
            <p><strong>Digest:</strong> {error.digest}</p>
            <details>
                <summary>Stack Trace</summary>
                <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>{error.stack}</pre>
            </details>
            <button 
                onClick={reset}
                style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
            >
                Try Again
            </button>
        </div>
    );
}
