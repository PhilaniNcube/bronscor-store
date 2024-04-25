import {z} from 'zod';

export const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
  NEXT_PUBLIC_SUPABASE_URL: z.string(),
  SHIPLOGIC_API_KEY: z.string(),
  NEXT_PUBLIC_PAYFAST_RETURN_URL: z.string(),
  NEXT_PUBLIC_PAYFAST_CANCEL_URL: z.string(),
  NEXT_PUBLIC_PAYFAST_NOTIFY_URL: z.string(),
  NEXT_PUBLIC_SITE_URL: z.string(),
  RESEND_API_KEY: z.string(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
