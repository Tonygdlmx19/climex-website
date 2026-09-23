/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        // Tomados del logotipo: cian "CLIMEX" y azul marino "Soluciones Integrales"
        brand: {
          50: '#EBF8FE',
          100: '#D2EFFC',
          200: '#A6DEF9',
          300: '#6CC8F3',
          400: '#2FB3EC',
          500: '#00A9E0',
          600: '#0088B8',
          700: '#006A91',
          800: '#004E6B',
          900: '#003347',
        },
        navy: {
          50: '#EEF0FA',
          100: '#DADDF3',
          200: '#B4BAE6',
          300: '#8791D4',
          400: '#5A67BE',
          500: '#3A47A5',
          600: '#2B3990',
          700: '#232E76',
          800: '#1A235A',
          900: '#0F1538',
        },
        ink: '#0F1B33',
        mist: '#F4F8FB',
        line: '#DDE5EE',
        whatsapp: { DEFAULT: '#25D366', dark: '#1DA851' },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 27, 51, 0.04), 0 8px 24px -8px rgba(15, 27, 51, 0.12)',
        lift: '0 12px 32px -12px rgba(0, 169, 224, 0.35)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
}
