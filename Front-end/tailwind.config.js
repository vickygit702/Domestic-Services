 /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  corePlugins: { preflight: false },
  plugins: [require('@tailwindcss/forms')]
}