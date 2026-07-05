/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Accent is driven by a CSS variable so it can be themed at runtime.
        accent: "var(--accent)",
        ink: "#0A0C11",
        panelA: "#13161f",
        panelB: "#101319",
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      keyframes: {
        "pf-pulse": {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".3", transform: "scale(.75)" },
        },
        "pf-blink": {
          "0%,49%": { opacity: "1" },
          "50%,100%": { opacity: "0" },
        },
        "pf-spin": { to: { transform: "rotate(360deg)" } },
        "pf-scan": {
          "0%": { top: "10%" },
          "50%": { top: "88%" },
          "100%": { top: "10%" },
        },
      },
      animation: {
        "pf-pulse": "pf-pulse 2s infinite",
        "pf-blink": "pf-blink 1s step-end infinite",
        "pf-spin": "pf-spin 4s linear infinite",
        "pf-scan": "pf-scan 3.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
