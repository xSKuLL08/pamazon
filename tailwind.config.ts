import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html"
    ],
    theme: {
        extend: {
            colors: {
                black: '#000000',
                white: '#FFFFFF',
                gray: {
                    400: '#9CA3AF',
                    500: '#6B7280',
                    600: '#4B5563',
                    700: '#374151',
                    800: '#1F2937',
                    900: '#111827',
                },
                blue: {
                    300: '#93C5FD',
                    400: '#60A5FA',
                    500: '#3B82F6',
                    600: '#2563EB',
                },
                purple: {
                    400: '#A78BFA',
                    500: '#8B5CF6',
                    600: '#7C3AED',
                }
            },
            boxShadow: {
                glow: '0 0 20px rgba(37, 99, 235, 0.25)',
            },
            borderRadius: {
                'xl': '1rem',
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
    darkMode: 'class',
}

export default config