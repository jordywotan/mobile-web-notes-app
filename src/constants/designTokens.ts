export const designTokens = {
    colors: {
        primary: '#f2d5d5',
        accent: '#2f3273',
        ink: '#0b0859',
        indigo: '#3e4297',
        deep: '#20224f',
        surface: '#fefcfc',
        brand: {
            50: '#f2d5d5',
            100: '#fefcfc',
            500: '#2f3273',
            600: '#20224f',
            900: '#0b0859',
        },
        neutral: {
            0: '#fefcfc',
            50: '#f2d5d5',
            100: '#f7ecec',
            400: '#8a8cb8',
            700: '#2f3273',
            900: '#0b0859',
        },
        semantic: {
            success: '#16a34a',
            warning: '#f59e0b',
            danger: '#dc2626',
        },
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
    },
    typography: {
        sizes: {
            xs: 12,
            sm: 14,
            base: 16,
            lg: 18,
            xl: 20,
        },
        lineHeights: {
            xs: 16,
            sm: 20,
            base: 24,
            lg: 28,
            xl: 28,
        },
        weights: {
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
        },
    },
} as const;

export type DesignTokens = typeof designTokens;
