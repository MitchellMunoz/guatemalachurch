export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    modules: [
        '@nuxt/ui-pro',
        '@nuxt/eslint',
        '@nuxt/test-utils/module',
        '@pinia/colada-nuxt',
        '@pinia/nuxt',
        '@nuxt/image',
        '@nuxt/content',
    ],
    typescript: {
        typeCheck: 'build',
    },
    css: ['~/assets/css/main.css'],
    colorMode: {
        preference: 'dark',
        fallback: 'dark',
        classSuffix: '',
        storage: 'cookie',
    },

    experimental: {
        typedPages: true,
    },
});
