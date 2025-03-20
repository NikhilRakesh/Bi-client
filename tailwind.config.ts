import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "360px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
        ubuntuMedium: ["Ubuntu Medium", "sans-serif"],
      },
      fontStyle: {
        italic: ["italic"],
      },
    },
  },
  plugins: [],
} satisfies Config;
