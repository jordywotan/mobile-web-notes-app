/** @type {import('tailwindcss').Config} */
import sharedConfig from '@repo/tailwind-config';

const config = {
    // Use the shared Tailwind CSS configuration from packages folder
    ...sharedConfig,

    content: ['./app/**/*.{js,ts,jsx,tsx}', '../../packages/tailwind-config/src/**/*.{js,ts,jsx,tsx}'],
};

export default config;
