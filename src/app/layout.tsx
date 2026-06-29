import type { Metadata, Viewport } from 'next';
import { Caveat, Quicksand } from 'next/font/google';
import '@/styles/globals.css';

const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

const quicksand = Quicksand({
    subsets: ['latin'],
    variable: '--font-quicksand',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: 'Anggit Djoko Wibowo | Ghibli Portfolio',
    description: 'A magical Studio Ghibli-inspired portfolio by Anggit Djoko Wibowo.',
    keywords: ['developer', 'portfolio', 'ghibli', 'full-stack'],
};

export const viewport: Viewport = {
    themeColor: '#FDF6E3',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${caveat.variable} ${quicksand.variable} font-[family-name:var(--font-quicksand)]`}>
                {children}
            </body>
        </html>
    );
}
