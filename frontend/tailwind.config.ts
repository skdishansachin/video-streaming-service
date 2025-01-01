import { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter Variable', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;

