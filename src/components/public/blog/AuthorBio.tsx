import Image from 'next/image'

interface Props {
  name: string
  image?: string | null
  role?: string
}

export function AuthorBio({ name, image, role }: Props) {
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 flex items-start gap-4 my-10">
      {image ? (
        <Image src={image} alt={name} width={64} height={64} className="rounded-full shrink-0 object-cover" />
      ) : (
        <div className="h-16 w-16 rounded-full gradient-bg flex items-center justify-center text-2xl font-bold text-white shrink-0">
          {name[0]}
        </div>
      )}
      <div>
        <p className="font-bold text-[var(--text-primary)]">{name}</p>
        {role && <p className="text-sm text-[var(--text-muted)] mt-0.5">{role}</p>}
        <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
          Digital marketing expert at Logink, helping Indonesian brands grow through SEO, content, and performance marketing.
        </p>
      </div>
    </div>
  )
}
