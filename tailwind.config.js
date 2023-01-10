const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
        xl: '3rem',
        '2xl': '4rem'
      }
    },
    fontFamily: {
      sans: ['var(--epilogue)'],
      mono: [...fontFamily.mono]
    },
    corePlugins: {
      aspectRatio: false
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16'
    },
    extend: {
      maxWidth: {
        '8xl': '1920px'
      },
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        black: 'rgb(var(--black) / <alpha-value>)',
        white: 'rgb(var(--white) / <alpha-value>)',
        red: {
          DEFAULT: 'rgb(var(--red-1) / <alpha-value>)',
          1: 'rgb(var(--red-1) / <alpha-value>)',
          2: 'rgb(var(--red-2) / <alpha-value>)',
          3: 'rgb(var(--red-3) / <alpha-value>)'
        },
        yellow: {
          DEFAULT: 'rgb(var(--yellow-1) / <alpha-value>)',
          1: 'rgb(var(--yellow-1) / <alpha-value>)',
          2: 'rgb(var(--yellow-2) / <alpha-value>)',
          3: 'rgb(var(--yellow-3) / <alpha-value>)'
        },
        green: {
          DEFAULT: 'rgb(var(--green-1) / <alpha-value>)',
          1: 'rgb(var(--green-1) / <alpha-value>)',
          2: 'rgb(var(--green-2) / <alpha-value>)',
          3: 'rgb(var(--green-3) / <alpha-value>)'
        },
        blue: {
          DEFAULT: 'rgb(var(--blue-1) / <alpha-value>)',
          1: 'rgb(var(--blue-1) / <alpha-value>)',
          2: 'rgb(var(--blue-2) / <alpha-value>)',
          3: 'rgb(var(--blue-3) / <alpha-value>)'
        },
        pink: {
          DEFAULT: 'rgb(var(--pink-1) / <alpha-value>)',
          1: 'rgb(var(--pink-1) / <alpha-value>)',
          2: 'rgb(var(--pink-2) / <alpha-value>)',
          3: 'rgb(var(--pink-3) / <alpha-value>)'
        },
        accent: {
          1: 'rgb(var(--accent-1) / <alpha-value>)',
          2: 'rgb(var(--accent-2) / <alpha-value>)',
          3: 'rgb(var(--accent-3) / <alpha-value>)',
          4: 'rgb(var(--accent-4) / <alpha-value>)',
          5: 'rgb(var(--accent-5) / <alpha-value>)'
        },
        syntax: {
          1: 'var(--syntax-1)',
          2: 'var(--syntax-2)',
          3: 'var(--syntax-3)',
          4: 'var(--syntax-4)',
          5: 'var(--syntax-5)',
          6: 'var(--syntax-6)',
          7: 'var(--syntax-7)',
          8: 'var(--syntax-8)',
          9: 'var(--syntax-9)',
          10: 'var(--syntax-10)',
          11: 'var(--syntax-11)',
          12: 'var(--syntax-12)',
          13: 'var(--syntax-13)',
          14: 'var(--syntax-14)',
          15: 'var(--syntax-15)'
        }
      },
      textColor: {
        base: 'rgb(var(--text-base) / <alpha-value>)',
        primary: 'rgb(var(--text-primary) / <alpha-value>)',
        secondary: 'rgb(var(--text-secondary) / <alpha-value>)'
      },
      boxShadow: {
        'down-1': '0 2px rgb(var(--secondary))',
        'down-2': '0 4px rgb(var(--secondary))',
        'down-3': '0 6px rgb(var(--secondary))',
        'up-1': '0 -2px rgb(var(--secondary))',
        'up-2': '0 -4px rgb(var(--secondary))',
        'up-3': '0 -6px rgb(var(--secondary))',
        'red-down': '0 4px rgb(var(--red-1))',
        'red-up': '0 -4px rgb(var(--red-1))',
        'secondary-1': '0 2px rgb(var(--primary))'
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(var(--secondary))',
            a: {
              color: 'rgb(var(--green-1))',
              '&:hover': {
                color: 'rgb(var(--blue-1))'
              },
              code: 'rgb(var(--green-1))'
            },
            '[class~="lead"]': {
              color: 'rgb(var(--secondary))'
            },
            'h1, h2, h3, h4, h5, h6': {
              color: 'rgb(var(--secondary))',
              fontSize: null
            },
            strong: {
              color: 'rgb(var(--secondary))'
            },
            'ol > li::marker': {
              color: 'rgb(var(--secondary))'
            },
            'ul > li::marker': {
              color: 'rgb(var(--secondary))'
            },
            hr: {
              borderColor: 'rgb(var(--secondary))'
            },
            blockquote: {
              color: 'rgb(var(--accent-4))',
              borderLeftColor: 'rgb(var(--red-1))'
            },
            figcaption: {
              color: 'rgb(var(--accent-4))'
            },
            // pre: {
            //   color: 'rgb(var(--accent-2))',
            //   backgroundColor: 'rgb(var(--accent-3))',
            //   overflowX: 'auto',
            //   fontWeight: '400',
            //   '& > code': {
            //     backgroundColor: 'transparent',
            //     '&::before, ::after': {
            //       content: 'none'
            //     }
            //   }
            // },

            pre: null,
            code: null,
            'code::before': null,
            'code::after': null,
            'pre code': null,
            'pre code::before': null,
            'pre code::after': null,
            'thead, tbody tr, tfoot': {
              borderBottomColor: 'rgb(var(--accent-2))'
            },
            'thead th': {
              color: 'rgb(var(--secondary))'
            }
          }
        }
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)'
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ]
}
