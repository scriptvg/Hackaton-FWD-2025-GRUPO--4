/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. Activar modo oscuro por clase (aplicar 'dark' en <html> o en el root)
  darkMode: "class",

  // 2. Rutas de escaneo para purgar CSS no usado
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./public/index.html"
  ],

  // 3. Extender la paleta usando variables CSS (defínelas en tu CSS global)
  theme: {
    extend: {
      colors: {
        // Color principal
        teal: {
          500: "var(--color-teal-500)",
          600: "var(--color-teal-600)",
        },
        // Fondo y texto adaptables
        background: {
          DEFAULT: "var(--color-bg)",
          dark:    "var(--color-bg-dark)"
        },
        text: {
          DEFAULT: "var(--color-text)",
          dark:    "var(--color-text-dark)"
        }
      }
    }
  },

};
