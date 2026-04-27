import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { CtaWidgetForm } from '@/components/admin/CtaWidgetForm'

interface Props { params: Promise<{ id: string }> }

export default async function EditCtaWidgetPage({ params }: Props) {
  const { id } = await params
  let widget = null
  try {
    widget = await prisma.ctaWidget.findUnique({ where: { id } })
  } catch {}
  if (!widget) notFound()
  return <CtaWidgetForm widget={widget as any} />
}
