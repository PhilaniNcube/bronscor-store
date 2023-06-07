import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/schema"

export const supabase = createClientComponentClient<Database>()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
