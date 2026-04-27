export default function BlogDetailLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="pt-32 pb-12 px-4 mesh-gradient">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-4 w-12 rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-1 rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-16 rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-1 rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-24 rounded bg-[var(--bg-elevated)]" />
          </div>
          <div className="h-6 w-28 rounded-full bg-[var(--bg-elevated)] mb-4" />
          <div className="space-y-3 mb-6">
            <div className="h-10 w-full rounded bg-[var(--bg-elevated)]" />
            <div className="h-10 w-4/5 rounded bg-[var(--bg-elevated)]" />
            <div className="h-10 w-3/5 rounded bg-[var(--bg-elevated)]" />
          </div>
          <div className="h-5 w-full rounded bg-[var(--bg-elevated)] mb-2" />
          <div className="h-5 w-3/4 rounded bg-[var(--bg-elevated)] mb-6" />
          <div className="flex items-center gap-4">
            <div className="h-7 w-7 rounded-full bg-[var(--bg-elevated)]" />
            <div className="h-4 w-24 rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-20 rounded bg-[var(--bg-elevated)]" />
            <div className="h-4 w-16 rounded bg-[var(--bg-elevated)]" />
          </div>
        </div>
      </section>

      {/* Featured image skeleton */}
      <div className="max-w-5xl mx-auto px-4 -mt-4 mb-8">
        <div className="aspect-[16/9] rounded-2xl bg-[var(--bg-elevated)] animate-pulse" />
      </div>

      {/* Content skeleton */}
      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            <div className="animate-pulse space-y-4">
              {[100, 90, 95, 80, 100, 85, 75, 95, 60, 88].map((w, i) => (
                <div key={i} className={`h-5 rounded bg-[var(--bg-elevated)]`} style={{ width: `${w}%` }} />
              ))}
              <div className="h-8" />
              {[100, 92, 88, 97, 70].map((w, i) => (
                <div key={i + 10} className={`h-5 rounded bg-[var(--bg-elevated)]`} style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="hidden lg:block animate-pulse">
              <div className="sticky top-24 p-5 rounded-2xl border border-[var(--border-default)] space-y-3">
                <div className="h-4 w-32 rounded bg-[var(--bg-elevated)]" />
                {[85, 70, 90, 65, 80].map((w, i) => (
                  <div key={i} className="h-4 rounded bg-[var(--bg-elevated)]" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
