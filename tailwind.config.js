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
                    DEFAULT: '#2563EB',
                    dark: '#1E40AF',
                    light: '#60A5FA',
                },
                secondary: {
                    DEFAULT: '#0F172A',
                },
                accent: {
                    DEFAULT: '#F59E0B',
                },
                dark: '#020617',
                'card-dark': '#1E293B',
                'text-main': '#0F172A',
                'text-muted': '#64748B',
                'text-light': '#94A3B8',
            },
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                body: ['Plus Jakarta Sans', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 20px rgba(37, 99, 235, 0.5)',
            }
        },
        container: {
            center: true,
            padding: '2rem',
        },
    },
    plugins: [],
}
