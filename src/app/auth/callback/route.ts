import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/'

  if (!next.startsWith('/')) {
    next = '/'
  }

  console.log('[Callback] Received code:', code)
  console.log('[Callback] Will redirect to next:', next)

  if (code) {
    const supabase = await createClient()

    // ✅ Add clear logging for debugging
    const { error, data } = await supabase.auth.exchangeCodeForSession(code)

    console.log('[Callback] exchangeCodeForSession result:', { error, data })

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'

      const finalRedirect =
        isLocalEnv
          ? `${origin}${next}`
          : forwardedHost
            ? `https://${forwardedHost}${next}`
            : `${origin}${next}`

      console.log('[Callback] Redirecting user to:', finalRedirect)

      return NextResponse.redirect(finalRedirect)
    } else {
      console.error('[Callback] exchangeCodeForSession error:', error)
    }
  }

  console.warn('[Callback] Missing code, redirecting to auth error page.')
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
