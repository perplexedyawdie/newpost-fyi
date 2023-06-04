/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        'newpost-blue': {
          'primary': '#4768fa',
          'primary-focus': '#153ff9',
          'primary-content': '#161827',
          'secondary': '#7b92b2',
          'secondary-focus': '#5b769a',
          'secondary-content': '#161827',
          'accent': '#67cba0',
          'accent-focus': '#41be88',
          'accent-content': '#161827',
          'neutral': '#161827',
          'neutral-focus': '#06060a',
          'neutral-content': '#eaf0f6',
          'base-100': '#ffffff',
          'base-200': '#f7fafd',
          'base-300': '#eaf0f6',
          'base-content': '#161827',
          'info': '#1c92f2',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',
          '--rounded-box': '1rem',
          '--rounded-btn': '1.9rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '.25s',
          '--animation-input': '.2s',
          '--btn-text-case': 'uppercase',
          '--navbar-padding': '.5rem',
          '--border-btn': '1px',
        },
      },
    ],
  },
}
