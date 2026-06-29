import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	darkMode: 'class',
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
				glow: {
					cyan: '#00FFFF',
					purple: '#A855F7',
					pink: '#EC4899'
				},
				ghibli: {
					sky: '#87CEEB',
					'leaf': '#7CA982',
					bark: '#8B6F47',
					sunset: '#F4A261',
					cream: '#FDF6E3',
					'forest-dark': '#2D5016',
					'moss': '#4A7C59',
					'gold': '#D4A843',
					'warm-white': '#FFF8F0',
					'deep-green': '#1A3A1A',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				input: 'hsl(var(--input))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				bento: {
					highlight: {
						light: '#D8E8D0',
						DEFAULT: '#4A7C59',
					},
					accent: {
						light: '#E8F0E0',
						DEFAULT: '#6B8F71',
					},
					primary: {
						light: '#D4E8D0',
						DEFAULT: '#376B4D',
					},
					secondary: {
						light: '#F5F0E0',
						DEFAULT: '#C4B98A',
					},
					base: {
						100: '#F5F0E8',
						200: '#FFFBF0',
						300: '#F0EBE0',
						content: '#1A2E1A',
					}
				}
			},
			fontFamily: {
				sans: [
					'var(--font-quicksand)',
					'var(--font-inter)',
					'system-ui',
					'sans-serif'
				],
				heading: [
					'var(--font-caveat)',
					'cursive'
				],
				body: [
					'var(--font-quicksand)',
					'sans-serif'
				],
				mono: [
					'var(--font-jetbrains)',
					'monospace'
				]
			},
			animation: {
				'fade-in': 'fadeIn 0.5s ease-out forwards',
				'fade-up': 'fadeUp 0.6s ease-out forwards',
				'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
				'slide-in-right': 'slideInRight 0.5s ease-out forwards',
				'scale-in': 'scaleIn 0.4s ease-out forwards',
				'glow-pulse': 'glowPulse 2s ease-in-out infinite',
				float: 'float 6s ease-in-out infinite',
				'rotate-slow': 'rotateSlow 20s linear infinite',
				'gradient-shift': 'gradientShift 8s ease infinite',
				marquee: 'marquee 30s linear infinite',
				'marquee-reverse': 'marqueeReverse 30s linear infinite',
				scan: 'scan 3s linear infinite',
				meteor: 'meteor 5s linear infinite',
				'ghibli-float': 'ghibliFloat 4s ease-in-out infinite',
				'falling-leaf': 'fallingLeaf var(--fall-duration, 12s) linear forwards',
				'leaf-sway': 'leafSway var(--sway-duration, 3s) ease-in-out infinite',
				'door-rise': 'doorRise 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
				'avatar-in': 'avatarIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
				'house-bounce': 'houseBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'glow-soft': 'glowSoft 2s ease-in-out infinite',
				'sunray': 'sunray 8s ease-in-out infinite',
			},
			keyframes: {
				meteor: {
					'0%': { transform: 'rotate(var(--angle)) translateX(0)', opacity: '1' },
					'70%': { opacity: '1' },
					'100%': {
						transform: 'rotate(var(--angle)) translateX(-500px)',
						opacity: '0'
					}
				},
				scan: {
					'0%': { top: '0%' },
					'100%': { top: '100%' }
				},
				fadeIn: {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				fadeUp: {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				slideInLeft: {
					'0%': {
						opacity: '0',
						transform: 'translateX(-30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				slideInRight: {
					'0%': {
						opacity: '0',
						transform: 'translateX(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				scaleIn: {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				glowPulse: {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)'
					}
				},
				float: {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				rotateSlow: {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				gradientShift: {
					'0%, 100%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					}
				},
				marquee: {
					'0%': {
						transform: 'translateX(0%)'
					},
					'100%': {
						transform: 'translateX(-50%)'
					}
				},
				marqueeReverse: {
					'0%': {
						transform: 'translateX(-50%)'
					},
					'100%': {
						transform: 'translateX(0%)'
					}
				},
				ghibliFloat: {
					'0%, 100%': {
						transform: 'translateY(0px) rotate(-1deg)'
					},
					'50%': {
						transform: 'translateY(-12px) rotate(1deg)'
					}
				},
				fallingLeaf: {
					'0%': {
						transform: 'translateY(-10vh) translateX(0) rotate(0deg)',
						opacity: '0'
					},
					'10%': {
						opacity: '0.8'
					},
					'90%': {
						opacity: '0.7'
					},
					'100%': {
						transform: 'translateY(110vh) translateX(var(--drift, 100px)) rotate(var(--end-rotation, 360deg))',
						opacity: '0'
					}
				},
				leafSway: {
					'0%, 100%': {
						transform: 'translateX(0) rotate(var(--base-rotation, 0deg))'
					},
					'50%': {
						transform: 'translateX(var(--sway-amount, 30px)) rotate(var(--sway-rotation, 15deg))'
					}
				},
				doorRise: {
					'0%': {
						opacity: '0',
						transform: 'translateY(40px) scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0) scale(1)'
					}
				},
				avatarIn: {
					'0%': {
						opacity: '0',
						transform: 'scale(0.5) translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1) translateY(0)'
					}
				},
				houseBounce: {
					'0%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.08)'
					},
					'100%': {
						transform: 'scale(1.05)'
					}
				},
				glowSoft: {
					'0%, 100%': {
						boxShadow: '0 0 15px rgba(244, 162, 97, 0.3), 0 0 30px rgba(244, 162, 97, 0.1)'
					},
					'50%': {
						boxShadow: '0 0 25px rgba(244, 162, 97, 0.5), 0 0 50px rgba(244, 162, 97, 0.2)'
					}
				},
				sunray: {
					'0%, 100%': {
						opacity: '0.3',
						transform: 'scale(1) rotate(0deg)'
					},
					'50%': {
						opacity: '0.6',
						transform: 'scale(1.1) rotate(5deg)'
					}
				}
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
				'mesh-gradient': 'radial-gradient(at 40% 20%, hsla(280,100%,70%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%)'
			},
			backdropBlur: {
				xs: '2px'
			},
			boxShadow: {
				glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
				'glow-sm': '0 0 10px rgba(0, 255, 255, 0.3)',
				'glow-md': '0 0 20px rgba(0, 255, 255, 0.4)',
				'glow-lg': '0 0 40px rgba(0, 255, 255, 0.5)',
				'inner-glow': 'inset 0 0 20px rgba(0, 255, 255, 0.1)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};

export default config;
