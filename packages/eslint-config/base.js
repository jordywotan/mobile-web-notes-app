import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

/** @type {import('eslint').Linter.FlatConfig[]} */
const baseConfig = [
    {
        ignores: [
            // Global ignores
            'node_modules/',
            '.turbo/',
            'dist/',
            '.next/',
            'public/',
        ],
    },
    {
        // All files
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaFeatures: { modules: true },
                project: true,
            },
            globals: {
                ...globals.node,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            import: importPlugin,
            'simple-import-sort': simpleImportSortPlugin,
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
        },
    },
];

export { baseConfig };
