/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Activation du mode sombre via une classe CSS
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Ajout des fichiers React
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        // Palette principale
        primary: {
          DEFAULT: '#2563eb', // Bleu principal
          light: '#3b82f6',
          dark: '#1d4ed8',
          pantone: '#2728C',
        },
        secondary: {
          DEFAULT: '#1e293b', // Gris foncé
          light: '#334155',
          dark: '#0f172a',
          pantone: '#7547C',
        },
        background: '#f8fafc', // Fond clair
        surface: '#ffffff',
        // Palette secondaire / accents
        accent: {
          success: '#22c55e', // Vert succès
          warning: '#f59e42', // Orange alerte
          error: '#ef4444', // Rouge erreur
        },
        muted: '#6b7280', // Texte secondaire
      },
    },
  },
  plugins: [],
};

