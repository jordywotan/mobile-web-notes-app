import nextPlugin from '@next/eslint-plugin-next';
import turboPlugin from 'eslint-config-turbo';
import prettierConfig from 'eslint-config-prettier';
import { reactConfig } from './react.js';

/** @type {import('eslint').Linter.FlatConfig[]} */
const nextConfig = [
    ...reactConfig,
    {
        // Next.js specific plugins and rules
        plugins: {
            '@next/next': nextPlugin,
            turbo: turboPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
            ...nextPlugin.configs['core-web-vitals'].rules,
            ...turboPlugin.rules,
            '@next/next/no-html-link-for-pages': 'off',
        },
    },
    // Add Prettier at the very end to override any conflicting rules
    prettierConfig,
];

export { nextConfig };
