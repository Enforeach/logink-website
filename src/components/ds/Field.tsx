// Form fields, hook-free (importable by client forms). 48px, radius 4, --line border, errors via
// aria-describedby + alert icon. Forms live on Putih only.
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { Icon } from './Icon'
import { cn } from '@/lib/utils'

type Base = { label: string; name: string; error?: string; hint?: string }
const box = 'block w-full min-h-tap rounded-[var(--r-ui)] border border-[var(--line-strong)] bg-surface px-4 py-2 text-ink'

function Wrap({ label, name, error, hint, children }: Base & { children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={name} className="t-small font-650">{label}</label>
      {children}
      {hint ? <p id={`${name}-hint`} className="t-small text-ink-2">{hint}</p> : null}
      {error ? (
        <p id={`${name}-err`} className="t-small flex items-center gap-1.5 text-error" role="alert">
          <Icon name="alert" size={16} />
          {error}
        </p>
      ) : null}
    </div>
  )
}
const described = (b: Base) => [b.hint && `${b.name}-hint`, b.error && `${b.name}-err`].filter(Boolean).join(' ') || undefined

export function Input({ label, name, error, hint, className, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap label={label} name={name} error={error} hint={hint}>
      <input id={name} name={name} aria-invalid={error ? true : undefined} aria-describedby={described({ label, name, error, hint })} className={cn(box, className)} {...rest} />
    </Wrap>
  )
}
export function Textarea({ label, name, error, hint, className, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap label={label} name={name} error={error} hint={hint}>
      <textarea id={name} name={name} rows={5} aria-invalid={error ? true : undefined} aria-describedby={described({ label, name, error, hint })} className={cn(box, className)} {...rest} />
    </Wrap>
  )
}
export function Select({ label, name, error, hint, options, className, ...rest }: Base & { options: { value: string; label: string }[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrap label={label} name={name} error={error} hint={hint}>
      <select id={name} name={name} aria-invalid={error ? true : undefined} aria-describedby={described({ label, name, error, hint })} className={cn(box, className)} {...rest}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </Wrap>
  )
}
export function CheckboxGroup({ legend, name, options, checked, error }: {
  legend: string; name: string; options: { value: string; label: string }[]; checked?: string[]; error?: string
}) {
  return (
    <fieldset className="grid gap-2" aria-describedby={error ? `${name}-err` : undefined}>
      <legend className="t-small mb-1 font-650">{legend}</legend>
      {options.map((o) => (
        <label key={o.value} className="flex min-h-tap items-center gap-3">
          <input type="checkbox" name={name} value={o.value} defaultChecked={checked?.includes(o.value)} className="h-5 w-5" />
          {o.label}
        </label>
      ))}
      {error ? <p id={`${name}-err`} className="t-small flex items-center gap-1.5 text-error" role="alert"><Icon name="alert" size={16} />{error}</p> : null}
    </fieldset>
  )
}
/** Spam trap: real users never see or fill it. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Website</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
