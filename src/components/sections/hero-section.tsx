import type { ReactNode } from "react"
import { ArrowDown, Mail, MoveRight } from "lucide-react"

import { GithubMark } from "@/components/github-mark"
import { Reveal } from "@/components/reveal"
import type { IImportedData, IRange } from "@/types/interfaces"

export function HeroSection({ data }: { data: IImportedData }) {
  const jobs = data.Experiance
  const firstYear = jobs.length
    ? Math.min(...jobs.map((j) => j.DateStart.getUTCFullYear()))
    : new Date().getFullYear()
  const yearsExperience = new Date().getFullYear() - firstYear

  return (
    <section
      id="top"
      className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 pt-24 pb-16"
    >
      <Reveal>
        <p className="text-sm font-medium tracking-wide text-primary">
          {data.Headline}
        </p>
      </Reveal>
      <Reveal delay={100}>
        <h1 className="mt-3 text-5xl font-bold tracking-tight text-balance md:text-6xl">
          {data.Name}
        </h1>
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {data.Summary}
        </p>
      </Reveal>
      <Reveal delay={300}>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={data.Contact.Email.Link}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Mail className="size-4" />
            Get in touch
          </a>
          <a
            href={data.Contact.GitHub.Link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary/50 hover:text-primary"
          >
            <GithubMark className="size-4" />
            GitHub
          </a>
        </div>
      </Reveal>
      <Reveal delay={400}>
        <dl className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat value={`${yearsExperience}+`} label="Years in tech" />
          {data.Highlights.map((h) => (
            <Stat key={h.Label} value={h.Value} label={h.Label} />
          ))}
        </dl>
      </Reveal>
      <a
        href="#experience"
        aria-label="Scroll to experience"
        className="mt-16 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
      >
        <ArrowDown className="size-4" />
        View experience
      </a>
    </section>
  )
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3 transition hover:border-primary/40">
      <dt className="sr-only">{label}</dt>
      <dd className="text-3xl font-bold tracking-tight text-primary">
        {value}
      </dd>
      <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
    </div>
  )
}

/** Not currently rendered — drop <RangeCard range={data.Range} /> under the stats to use it. */
export function RangeCard({ range }: { range: IRange }) {
  return (
    <div className="mt-3 rounded-xl border border-border bg-card px-4 py-3">
      <p className="text-sm text-muted-foreground">{range.Label}</p>
      <p className="mt-1 flex flex-wrap items-center gap-2 text-lg font-semibold tracking-tight">
        <span>{range.From}</span>
        <MoveRight className="size-5 shrink-0 text-primary" aria-hidden />
        <span className="text-primary">{range.To}</span>
      </p>
    </div>
  )
}
