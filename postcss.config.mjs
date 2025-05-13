/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, 
    // the autoprefixer insure that if any of the browser that we use needs some prefix, it will add it.
  },
};

export default config;
