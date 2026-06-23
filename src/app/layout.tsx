import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display, Alex_Brush } from 'next/font/google';
import '@/styles/globals.css';

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

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const signature = Alex_Brush({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-signature',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Anggit Djoko Wibowo | Full-Stack Developer',
        template: '%s | Anggit Portfolio',
    },
    description: 'Full-Stack Developer building web apps with Next.js, React, and TypeScript. Currently Building Servgo, a SaaS POS platform.',
    keywords: ['developer', 'portfolio', 'full-stack', 'nextjs', 'react', 'typescript'],
    authors: [{ name: 'Anggit Djoko Wibowo' }],
    creator: 'Anggit Djoko Wibowo',
    icons: {
        icon: '/portfolio/favicon.svg',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        title: 'Anggit Djoko Wibowo | Full-Stack Developer',
        description: 'Full-Stack Developer building web apps with Next.js, React, and TypeScript.',
        siteName: 'Anggit Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Anggit Djoko Wibowo | Full-Stack Developer',
        description: 'Full-Stack Developer building web apps with Next.js, React, and TypeScript.',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
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
            <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${signature.variable} font-sans relative`}>
                {children}
            </body>
        </html>
    );
}
