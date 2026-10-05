/** One legal document in one locale. Text fields are verbatim; `intro` = [before, bold, after]. */
export type LegalDoc = {
  updated: string // ISO date of the last substantive edit (visible dateline, dateModified)
  lede: string
  intro: [string, string, string]
  sections: { id: string; title: string; content: { subtitle: string; text: string }[] }[]
  ask: string[] // the closing "questions?" line(s)
}
