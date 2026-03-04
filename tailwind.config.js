/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: '#f2d5d5',
                accent: '#2f3273',
                ink: '#0b0859',
                indigo: '#3e4297',
                deep: '#20224f',
                surface: '#fefcfc',
                'background-light': '#f2d5d5',
                'background-dark': '#20224f',
                brand: {
                    50: '#eef5ff',
                    100: '#d9e9ff',
                    500: '#2f6fed',
                    600: '#245bd0',
                    900: '#173979',
                },
                neutral: {
                    0: '#ffffff',
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    400: '#94a3b8',
                    700: '#334155',
                    900: '#0f172a',
                },
                success: '#16a34a',
                warning: '#f59e0b',
                danger: '#dc2626',
            },
            fontFamily: {
                display: ['Inter', 'sans-serif'],
            },
            spacing: {
                xs: '4px',
                sm: '8px',
                md: '16px',
                lg: '24px',
                xl: '32px',
            },
            fontSize: {
                xs: ['12px', { lineHeight: '16px' }],
                sm: ['14px', { lineHeight: '20px' }],
                base: ['16px', { lineHeight: '24px' }],
                lg: ['18px', { lineHeight: '28px' }],
                xl: ['20px', { lineHeight: '28px' }],
            },
            borderRadius: {
                DEFAULT: '0.25rem',
                lg: '12px',
                xl: '0.75rem',
                full: '9999px',
            },
        },
    },
};
