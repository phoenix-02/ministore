// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@invictus.codes/nuxt-vuetify'],
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate']
  },
  vuetify: {
    vuetifyOptions: {
    },
    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true,
      useIconCDN: true
    }
  }
})
