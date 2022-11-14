/** @type {import('next').NextConfig} */
const nextTranslate=require('next-translate')

module.exports = nextTranslate({
    reactStrictMode: true,
    swcMinify: false,
    i18n: { locales: ['default', 'fr'], defaultLocale: 'default', localeDetection: false },
    env: { SITENAME: 'AI-UNIVERSITY', HOSTNAME: 'https://www.aiuniversity.tn', GTAG: '', API: 'https://api-staging.aiuniversity.tn/api/', defaultLocale: 'fr' },
    images: { domains: ['api-staging.aiuniversity.tn'] },
    typescript: { ignoreBuildErrors: true }
})