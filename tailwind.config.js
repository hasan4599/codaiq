module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00F0FF',
          500: '#00F0FF',
          600: '#0066FF'
        },
        accent: '#00FF88',
        dark: {
          DEFAULT: '#020617',
          800: '#0a101f',
          700: '#131e3a'
        }
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
