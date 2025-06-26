/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E40AF', // blue-800 - Trust-building blue
        'primary-50': '#EFF6FF', // blue-50
        'primary-100': '#DBEAFE', // blue-100
        'primary-200': '#BFDBFE', // blue-200
        'primary-300': '#93C5FD', // blue-300
        'primary-400': '#60A5FA', // blue-400
        'primary-500': '#3B82F6', // blue-500
        'primary-600': '#2563EB', // blue-600
        'primary-700': '#1D4ED8', // blue-700
        'primary-800': '#1E40AF', // blue-800
        'primary-900': '#1E3A8A', // blue-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#3B82F6', // blue-500 - Supporting blue
        'secondary-50': '#EFF6FF', // blue-50
        'secondary-100': '#DBEAFE', // blue-100
        'secondary-200': '#BFDBFE', // blue-200
        'secondary-300': '#93C5FD', // blue-300
        'secondary-400': '#60A5FA', // blue-400
        'secondary-500': '#3B82F6', // blue-500
        'secondary-600': '#2563EB', // blue-600
        'secondary-700': '#1D4ED8', // blue-700
        'secondary-800': '#1E40AF', // blue-800
        'secondary-900': '#1E3A8A', // blue-900
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#EA580C', // orange-600 - High-contrast orange for CTAs
        'accent-50': '#FFF7ED', // orange-50
        'accent-100': '#FFEDD5', // orange-100
        'accent-200': '#FED7AA', // orange-200
        'accent-300': '#FDBA74', // orange-300
        'accent-400': '#FB923C', // orange-400
        'accent-500': '#F97316', // orange-500
        'accent-600': '#EA580C', // orange-600
        'accent-700': '#C2410C', // orange-700
        'accent-800': '#9A3412', // orange-800
        'accent-900': '#7C2D12', // orange-900
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FFFFFF', // white - Clean canvas
        'background-secondary': '#F8FAFC', // slate-50 - Subtle section separation

        // Surface Colors
        'surface': '#F8FAFC', // slate-50 - Subtle section separation
        'surface-100': '#F1F5F9', // slate-100
        'surface-200': '#E2E8F0', // slate-200
        'surface-300': '#CBD5E1', // slate-300

        // Text Colors
        'text-primary': '#1F2937', // gray-800 - Maximum contrast
        'text-secondary': '#6B7280', // gray-500 - Supporting information
        'text-muted': '#9CA3AF', // gray-400
        'text-foreground': '#111827', // gray-900

        // Status Colors
        'success': '#059669', // emerald-600 - Positive reinforcement
        'success-50': '#ECFDF5', // emerald-50
        'success-100': '#D1FAE5', // emerald-100
        'success-500': '#10B981', // emerald-500
        'success-foreground': '#FFFFFF', // white

        'warning': '#D97706', // amber-600 - Scarcity indicators
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-500': '#F59E0B', // amber-500
        'warning-foreground': '#FFFFFF', // white

        'error': '#DC2626', // red-600 - Form validation feedback
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-500': '#EF4444', // red-500
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': '#E5E7EB', // gray-200
        'border-secondary': '#D1D5DB', // gray-300
      },
      fontFamily: {
        'primary': ['Inter', 'sans-serif'],
        'secondary': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'cta': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'testimonial': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '100': '100',
        '120': '120',
        '150': '150',
        '200': '200',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-in-out',
        'slide-up': 'slideUp 300ms ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}