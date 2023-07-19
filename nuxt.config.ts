// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '/assets/css/global.scss',
  ],
  modules: [
    '@vueuse/nuxt', '@nuxtjs/supabase'
  ],
  devtools: { enabled: true }
})