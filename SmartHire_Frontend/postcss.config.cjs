// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-nesting': {},
    tailwindcss: {}, // ✅ Go back to standard Tailwind plugin
    autoprefixer: {},
  }
};
