// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  css: [
    '@/assets/css/custom.css' ,// Importation des styles personnalisés
    '@/assets/css/tailwind.css'
  ],
  buildModules: [
    '@nuxtjs/tailwindcss' // Module TailwindCSS
  ]
};
