import { bindings, defineConfig, defineWorker } from 'cf/config';

export default defineConfig({
  worker: defineWorker({
    name: 'itealab',
    entrypoint: 'vinext/server/fetch-handler',
    compatibilityDate: '2026-10-01',
    compatibilityFlags: ['nodejs_compat'],
    assets: { notFoundHandling: 'none' },
    domains: ['itealab.org'],
    workersDev: true,
    previewUrls: true,
    observability: {
      enabled: true,
      logs: {
        enabled: true,
      },
    },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      ...(process.env.NEXTJS_ENV && {
        NEXTJS_ENV: bindings.text(process.env.NEXTJS_ENV),
      }),
      ...(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && {
        NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: bindings.text(process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME),
      }),
      ...(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY && {
        NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: bindings.text(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
      }),
      ...(process.env.NEXT_PUBLIC_SUPABASE_URL && {
        NEXT_PUBLIC_SUPABASE_URL: bindings.text(process.env.NEXT_PUBLIC_SUPABASE_URL),
      }),
      CLOUDINARY_API_KEY: bindings.secret(),
      CLOUDINARY_API_SECRET: bindings.secret(),
    },
  }),
});
