export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    modules: ['@nuxt/ui-pro', '@nuxt/eslint', '@nuxt/test-utils/module', '@pinia/colada-nuxt', '@pinia/nuxt', '@nuxt/image'],
    typescript: {
        typeCheck: 'build',
    },
    css: ['~/assets/css/main.css'],
    experimental: {
        typedPages: true,
    },
});