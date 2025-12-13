import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

const config: Omit<Config, 'content'> = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#FF6B6B',
                'background-light': '#F8F9FA',
                'background-dark': '#101922',
                'text-light': '#212529',
                'text-dark': '#F8F9FA',
                'subtle-light': '#6C757D',
                'subtle-dark': '#adb5bd',
                'border-light': '#dee2e6',
                'border-dark': '#343a40',
                'card-light': '#ffffff',
                'card-dark': '#212529',
                success: '#198754',
                warning: '#ffc107',
                danger: '#dc3545',
            },
            fontFamily: {
                display: ['Manrope', ...fontFamily.sans],
            },
            borderRadius: { DEFAULT: '0.25rem', lg: '0.5rem', xl: '0.75rem', full: '9999px' },
        },
    },
    plugins: [],
};

export default config;
