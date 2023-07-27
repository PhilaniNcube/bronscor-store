import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { Database } from './schema'


export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  const {data: {session}} = await supabase.auth.getSession()

   const {data:is_admin} = await supabase.rpc("is_admin").single()


  if (req.nextUrl.pathname.startsWith('/dashboard') && is_admin === true) {
    return NextResponse.next()
  } else if (req.nextUrl.pathname.startsWith('/dashboard') && is_admin === false) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return res
}
