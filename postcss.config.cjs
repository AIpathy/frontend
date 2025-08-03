module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // Tailwind 4.1 specific optimizations
      config: './tailwind.config.js',
    },
    autoprefixer: {
      // Enhanced autoprefixer settings for better browser support
      flexbox: 'no-2009',
      grid: 'autoplace',
    },
  },
};
  