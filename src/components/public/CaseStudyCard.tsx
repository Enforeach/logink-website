import Link from 'next/link'
import Image from 'next/image'
import { CaseStudyData } from '@/types'
import { Badge } from '@/components/ui/Badge'

interface CaseStudyCardProps {
  caseStudy: CaseStudyData
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const topMetric = caseStudy.metrics?.[0]

  return (
    <Link
      href={`/portfolio/${caseStudy.slug}`}
      className="group relative rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--border-hover)] hover:shadow-2xl transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="aspect-[16/10] bg-[var(--bg-elevated)] relative overflow-hidden">
        {caseStudy.thumbnail ? (
          <Image
            src={caseStudy.thumbnail}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 gradient-bg opacity-10" />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <h3 className="font-bold text-white text-lg mb-2">{caseStudy.title}</h3>
        </div>
        {/* Client logo */}
        {caseStudy.clientLogo && (
          <div className="absolute top-4 left-4 h-10 w-20 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden">
            <Image src={caseStudy.clientLogo} alt={caseStudy.clientName} fill className="object-contain p-2" />
          </div>
        )}
        {/* Key metric badge */}
        {topMetric && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-violet text-white backdrop-blur-sm">
            +{topMetric.afterValue} {topMetric.metricLabel}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <Badge variant="default" size="sm">{caseStudy.industry}</Badge>
          {caseStudy.service && (
            <Badge variant="violet" size="sm">{caseStudy.service.name}</Badge>
          )}
        </div>
        <h3 className="font-bold text-[var(--text-primary)] mb-1 group-hover:text-brand-violet transition-colors line-clamp-2">
          {caseStudy.title}
        </h3>
        <p className="text-sm text-[var(--text-muted)]">{caseStudy.clientName}</p>
      </div>
    </Link>
  )
}
