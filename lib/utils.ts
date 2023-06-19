import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from "@/schema"

export const supabase = createClientComponentClient<Database>()

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(value)
}
