const { default: daisyui } = require("daisyui");

module.exports = {
  content: [
    "./index.html", // Your main HTML entry
    "./src/**/*.{js,jsx,ts,tsx}", // Match all JS/TS and JSX/TSX files in src
    "./src/pages/**/*.{js,jsx}", // Ensure all `pages` are included
    "./src/components/**/*.{js,jsx}", // Include components if any
  ],
  theme: {
    extend: {}, // Extend the default Tailwind theme if needed
  },
  plugins: [
    require("daisyui"), // Include DaisyUI as a plugin
  ],
  daisyui:{
    plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
  }
};
