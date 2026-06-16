/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        starlight: '#F8F9FA',
        'nebula-cyan': '#00E5FF',
        'apollo-gold': '#FFC107',
        'martian-rust': '#E03C31',
        'deep-space': '#030A14',
        'space-blue': '#050D1E',
        'panel-bg': 'rgba(3, 6, 15, 0.92)',
        'border-subtle': 'rgba(0, 229, 255, 0.12)',
        'border-glow': 'rgba(0, 229, 255, 0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-2': '0.3em',
        'widest-3': '0.4em',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'ring-pulse': 'ringPulse 2s ease-in-out infinite',
        'orbit-spin': 'spin 20s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'typing': 'typing 1.2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,229,255,0.4)' },
          '50%': { boxShadow: '0 0 50px rgba(0,229,255,0.8)' },
        },
        ringPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        typing: {
          '0%, 60%, 100%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
