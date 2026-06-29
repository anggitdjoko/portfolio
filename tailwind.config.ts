import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                border: 'hsl(var(--border))',
                ring: 'hsl(var(--ring))',
                ghibli: {
                    sky: '#87CEEB',
                    leaf: '#7CA982',
                    bark: '#8B6F47',
                    sunset: '#F4A261',
                    cream: '#FDF6E3',
                    'forest-dark': '#2D5016',
                    moss: '#4A7C59',
                    gold: '#D4A843',
                    'warm-white': '#FFF8F0',
                    'deep-green': '#1A3A1A',
                },
            },
            fontFamily: {
                sans: ['var(--font-quicksand)', 'system-ui', 'sans-serif'],
                heading: ['var(--font-caveat)', 'cursive'],
                body: ['var(--font-quicksand)', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            }
        }
    },
    plugins: [],
};

export default config;
