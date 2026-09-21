import { ChevronDown, Quote } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { formatMonthYearUTC } from "@/lib/format-date"
import type { IJob, IRecommendation } from "@/types/interfaces"

export function RecommendationsSection({
  recommendations,
  jobs,
}: {
  recommendations: IRecommendation[]
  jobs: IJob[]
}) {
  const sorted = [...(recommendations ?? [])].sort((a, b) =>
    b.Date.localeCompare(a.Date)
  )
  if (sorted.length === 0) return null

  return (
    <section
      id="recommendations"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-20"
    >
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight">Recommendations</h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-3 text-sm text-muted-foreground">
          Written on LinkedIn by managers and teammates.
        </p>
      </Reveal>
      <div className="mt-10 grid items-start gap-4 md:grid-cols-2">
        {sorted.map((rec) => (
          <RecommendationCard
            key={`${rec.Name}-${rec.Date}`}
            recommendation={rec}
            company={companyForRecommendation(rec, jobs)}
          />
        ))}
      </div>
    </section>
  )
}

/** Company the recommendation speaks to, from the first linked job id. */
function companyForRecommendation(rec: IRecommendation, jobs: IJob[]) {
  const id = rec.LinkedJob?.[0]
  if (id === undefined) return undefined
  const job = jobs.find((j) => Number(j.Id) === id)
  // ponytail: Company is "Name, City, State, Country" — the name is enough here.
  return job?.Company.split(",")[0]
}

function RecommendationCard({
  recommendation,
  company,
}: {
  recommendation: IRecommendation
  company?: string
}) {
  const [lead, ...rest] = recommendation.Text.split("\n\n")
  const written = new Date(`${recommendation.Date}T00:00:00Z`)

  return (
    <Reveal className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <Quote className="size-6 text-primary/40" />
      <blockquote className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-foreground/85">
        <p>{lead}</p>
        {rest.length > 0 && (
          <details className="entry">
            <summary className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:opacity-80">
              Read the full recommendation
              <ChevronDown className="chevron size-4 transition-transform" />
            </summary>
            <div className="mt-4 flex flex-col gap-4">
              {rest.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </details>
        )}
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4 text-sm">
        <span className="font-semibold">{recommendation.Name}</span>
        <span className="mt-0.5 block text-muted-foreground">
          {recommendation.Title}
        </span>
        <span className="mt-1 block text-xs text-muted-foreground">
          {recommendation.Relationship}
          {company ? ` at ${company}` : ""} · {formatMonthYearUTC(written)}
        </span>
      </figcaption>
    </Reveal>
  )
}
