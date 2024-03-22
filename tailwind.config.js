/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand Madi
        'madi-maastritch-blue': '#02182B',
        'madi-persian-green': '#00A78E',
        'madi-cyan': '#00B7EB',
        'madi-bud-green': '#7AC143',
        // Brand Madi v2
        'madi-midnight-blue': '#0B0F2E',
        'madi-vivid-orchid': '#CC2DFF',
        'madi-medium-turquoise': '#00B7EB',
        'madi-navy-blue': '#000B6F',
        // Midnight Blue
        midnight: {
          50: '#E9ECF7',
          100: '#CED5EB',
          200: '#A0ACDE',
          300: '#7584D1',
          400: '#596AD9',
          500: '#2C3BB7',
          600: '#1C2391',
          700: '#0F126B',
          800: '#060645',
          900: '#03021F',
        },
        // Navi Blue
        'navy-blue': {
          50: '#E6F1FF',
          100: '#A3C8FF',
          200: '#7AABFF',
          300: '#528BFF',
          400: '#2969FF',
          500: '#0018F4',
          600: '#000ECF',
          700: '#0006A8',
          800: '#000082',
          900: '#03005C',
        },
        // Vivid Orchid
        'vivid-orchid': {
          50: '#FEF0FF',
          100: '#FAD1FF',
          200: '#F2A8FF',
          300: '#E880FF',
          400: '#DB57FF',
          500: '#CC2DFF',
          600: '#A31CD9',
          700: '#7E0EB3',
          800: '#5D048C',
          900: '#400266',
        },
        // Turquoise
        turquoise: {
          50: '#F0FFFD',
          100: '#D1FFFA',
          200: '#A8FFF8',
          300: '#7CF7F1',
          400: '#50EBE8',
          500: '#28DCDE',
          600: '#18B0B8',
          700: '#0C8691',
          800: '#035F6B',
          900: '#013B45',
        },
        // Persian
        persian: {
          25: '#EAFFFC',
          50: '#C5FFF6',
          100: '#A0FFF1',
          200: '#7BFFEB',
          300: '#56FFE6',
          400: '#30F9DB',
          500: '#14D0B4',
          600: '#00A78E',
          700: '#007E6B',
          800: '#005549',
          900: '#003226',
        },
        // Neutral
        'neutral-50': '#F9FAFC',
        'neutral-100': '#F4F6FA',
        'neutral-200': '#EDEFF5',
        'neutral-300': '#E6E8F0',
        'neutral-400': '#D8DAE5',
        'neutral-500': '#C1C4D6',
        'neutral-600': '#8F95B2',
        'neutral-700': '#696F8C',
        'neutral-800': '#474D66',
        'neutral-900': '#101840',
        // shadcn/ui
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
    fontFamily: {
      'madi-mono': ['SpaceMono', 'SFMono-Regular'],
      'maven-pro': ['Maven Pro'],
      soleil: ['Soleil'],
      'bio-sans': ['Bio Sans'],
      sequences: ['Courier New'],
      'source-code-pro': ['Source Code Pro'],
      'roboto-mono': ['Roboto Mono'],
    },
    keyframes: {
      marquee2: {
        '0%': { transform: 'translateX(0)' },
        '100%': { transform: 'translateX(-100%)' },
      },
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
    },
    animation: {
      marquee3: 'marquee 8s linear infinite',
      'marquee-long': 'marquee 30s linear infinite',
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
    },
  },
  plugins: [],
};
