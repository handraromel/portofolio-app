/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    extend: {
      scrollBehavior: ['smooth'],
      animation: {
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      boxShadow: {
        glow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)'
      }
    }
  },
  plugins: []
}
