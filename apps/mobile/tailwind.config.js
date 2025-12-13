const sharedConfig = require('@repo/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require('nativewind/preset')],

    // Use the shared Tailwind CSS configuration from packages folder
    ...sharedConfig,

    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        '../../packages/tailwind-config/src/**/*.{js,ts,jsx,tsx}',
    ],
};
