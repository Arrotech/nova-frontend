/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3B82F6',
                    dark: '#2563EB',
                    light: '#60A5FA',
                },
                secondary: {
                    DEFAULT: '#0F172A',
                },
                accent: {
                    DEFAULT: '#F59E0B',
                },
                dark: '#020617',
                'card-dark': '#0F172A',
                'surface': '#0B1120',
                'surface-light': '#111827',
                'surface-card': '#1E293B',
                'text-main': '#F1F5F9',
                'text-muted': '#94A3B8',
                'text-light': '#64748B',
                'border-dark': 'rgba(255,255,255,0.06)',
            },
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                body: ['Plus Jakarta Sans', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 30px rgba(59, 130, 246, 0.3)',
                'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
            },
            keyframes: {
                'slide-in': {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '0.7' },
                },
            },
            animation: {
                'slide-in': 'slide-in 0.4s ease-out forwards',
                'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
            },
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                lg: '2rem',
            },
        },
    },
    plugins: [],
}
