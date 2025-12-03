/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'main-gradient': 'linear-gradient(135deg, #ff00cc, #6a00ff)',
        'hero-gradient': 'linear-gradient(135deg, #2B0052, #6A00FF, #FF00CC)',
      },
      fontFamily: {
        display: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.25rem',
      },
      boxShadow: {
        card: '0 20px 45px rgba(71, 0, 117, 0.15)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

