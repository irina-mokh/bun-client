module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#d7d7d6',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
