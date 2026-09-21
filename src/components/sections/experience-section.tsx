import { Building2, Calendar, ChevronDown } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { formatMonthYearUTC, ONGOING_YEAR } from "@/lib/format-date"
import type { IJob } from "@/types/interfaces"

export function ExperienceSection({ jobs }: { jobs: IJob[] }) {
  return (
    <section
      id="experience"
      className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20"
    >
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
      </Reveal>
      <div className="mt-10 flex flex-col">
        {jobs.map((job) => (
          <ExperienceEntry key={job.Id} job={job} />
        ))}
      </div>
    </section>
  )
}

function ExperienceEntry({ job }: { job: IJob }) {
  const ongoing = job.DateEnd.getUTCFullYear() >= ONGOING_YEAR
  const era = `${formatMonthYearUTC(job.DateStart)} — ${ongoing ? "Present" : formatMonthYearUTC(job.DateEnd)
    }`
  const bullets = job.Descriptions
  const hidden = bullets.slice(3)

  return (
    <Reveal className="group border-b border-border py-10 first:pt-0 last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl font-semibold tracking-tight">{job.Title}</h3>
        {ongoing && (
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Current
          </span>
        )}
      </div>
      <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <Building2 className="size-4 shrink-0" />
          {job.Company}
        </span>
        <span className="inline-flex items-center gap-2">
          <Calendar className="size-4 shrink-0" />
          {era}
        </span>
      </div>

      <div>
        <span className="mt-5 flex flex-col gap-2 text-sm leading-relaxed text-foreground/85">
          {job.JobDescription}
        </span>
      </div>

      <ul className="mt-5 flex flex-col gap-2 text-sm leading-relaxed text-foreground/85">
        {bullets.slice(0, 3).map((item, i) => (
          <Bullet key={i} text={item} />
        ))}
      </ul>
      {hidden.length > 0 && (
        <details className="entry mt-2">
          <summary className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:opacity-80">
            Show {hidden.length} more
            <ChevronDown className="chevron size-4 transition-transform" />
          </summary>
          <ul className="mt-2 flex flex-col gap-2 text-sm leading-relaxed text-foreground/85">
            {hidden.map((item, i) => (
              <Bullet key={i} text={item} />
            ))}
          </ul>
        </details>
      )}

      {job.Skills?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {job.Skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </Reveal>
  )
}

function Bullet({ text }: { text: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
      <span>{text}</span>
    </li>
  )
}
