module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      light: '#d7d7d6',
      gray: '#4C5B61',
      green: '#00BEA6',
      brown: '#b07156',
      almond: '#ffeccc',
      yellow: '#f5b700',
      red: 'red',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
