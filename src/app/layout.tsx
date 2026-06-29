import type { Metadata, Viewport } from 'next';
import { Caveat, Quicksand, Inter, JetBrains_Mono } from 'next/font/google';
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

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Anggit Djoko Wibowo | Ghibli Portfolio',
        template: '%s | Anggit Portfolio',
    },
    description: 'A magical Studio Ghibli-inspired portfolio. Full-Stack Developer building web apps with Next.js, React, and TypeScript.',
    keywords: ['developer', 'portfolio', 'full-stack', 'nextjs', 'react', 'typescript', 'ghibli', 'studio ghibli'],
    authors: [{ name: 'Anggit Djoko Wibowo' }],
    creator: 'Anggit Djoko Wibowo',
    icons: {
        icon: '/portfolio/favicon.svg',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        title: 'Anggit Djoko Wibowo | Ghibli Portfolio',
        description: 'A magical Studio Ghibli-inspired portfolio. Full-Stack Developer building web apps with Next.js, React, and TypeScript.',
        siteName: 'Anggit Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Anggit Djoko Wibowo | Ghibli Portfolio',
        description: 'A magical Studio Ghibli-inspired portfolio. Full-Stack Developer building web apps with Next.js, React, and TypeScript.',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#FFFBF0' },
        { media: '(prefers-color-scheme: dark)', color: '#0F1A14' },
    ],
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
            <body className={`${caveat.variable} ${quicksand.variable} ${inter.variable} ${jetbrainsMono.variable} font-quicksand relative`}>
                {children}
            </body>
        </html>
    );
}
