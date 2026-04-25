export default function AdminVerifyPage() {
  return (
    <div className="min-h-screen mesh-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="h-12 w-12 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-extrabold text-lg">L</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Logink CMS</h1>
        </div>

        <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 text-center">
          <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="font-bold text-[var(--text-primary)] mb-2">Check your email</h2>
          <p className="text-sm text-[var(--text-secondary)]">
            A magic link has been sent to your email address. Click the link to sign in.
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-4">
            The link will expire in 10 minutes. Check your spam folder if you don&apos;t see it.
          </p>
        </div>
      </div>
    </div>
  )
}
