import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"]
      },
      colors: {
        bgDark: "#0b1020"
      },
      boxShadow: {
        glass: "0 8px 32px rgba(85, 112, 255, 0.25)"
      },
      animation: {
        floatSlow: "floatSlow 8s ease-in-out infinite",
        pulseSoft: "pulseSoft 5s ease-in-out infinite"
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.8" }
        }
      }
    }
  },
  plugins: [typography]
};
