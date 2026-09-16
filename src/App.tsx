import type { ReactNode } from "react"
import {
  ArrowDown,
  Building2,
  Calendar,
  ChevronDown,
  Mail,
} from "lucide-react"

import { useInView } from "@/lib/use-in-view"
import { cn } from "@/lib/utils"
import { formatMonthYearUTC } from "@/lib/format-date"
import type { IJob } from "./components/types/interfaces"

export interface AppProps {
  jobs: IJob[]
}

const ONGOING_YEAR = 2098
const EMAIL = "joshua.henderson@hotmail.com"
const GITHUB = "https://github.com/JoshuaSHenderson"

export function App({ jobs }: AppProps) {
  const firstYear = jobs.length
    ? Math.min(...jobs.map((j) => j.DateStart.getUTCFullYear()))
    : new Date().getFullYear()
  const yearsExperience = new Date().getFullYear() - firstYear

  const skillCounts = new Map<string, number>()
  for (const job of jobs) {
    for (const skill of job.Skills ?? []) {
      skillCounts.set(skill, (skillCounts.get(skill) ?? 0) + 1)
    }
  }
  const skills = [...skillCounts.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0])
  )

  return (
    <div className="relative">
      <TopNav />

      {/* ── Hero ── */}
      <section className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-6 pt-24 pb-16">
        <Reveal>
          <p className="text-sm font-medium tracking-wide text-primary">
            Application Developer
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-balance md:text-6xl">
            Joshua Henderson
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {yearsExperience} years across software development, cloud
            administration, and systems engineering. Currently building
            SharePoint and Azure solutions for 60+ client tenants at VPO
            Construction Management Software &amp; Services.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Mail className="size-4" />
              Get in touch
            </a>
            <a
              href={GITHUB}
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
          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8">
            <Stat value={`${yearsExperience}+`} label="Years experience" />
            <Stat value={jobs.length} label="Roles held" />
            <Stat value={skills.length} label="Skills applied" />
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

      {/* ── Experience ── */}
      <section
        id="experience"
        className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20"
      >
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
          <p className="mt-2 text-muted-foreground">
            Seven roles, {firstYear} to present.
          </p>
        </Reveal>
        <div className="mt-10 flex flex-col">
          {jobs.map((job) => (
            <ExperienceEntry key={job.Id} job={job} />
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section
        id="skills"
        className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20"
      >
        <Reveal>
          <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
          <p className="mt-2 text-muted-foreground">
            Ordered by how many roles each was applied in.
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap gap-2">
            {skills.map(([name, count]) => (
              <span
                key={name}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-sm transition hover:border-primary/50",
                  count >= 3
                    ? "border-primary/40 bg-primary/5 font-medium text-primary"
                    : "border-border text-foreground/80"
                )}
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20"
      >
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Let's work together
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
              Open to conversations about application development, cloud
              architecture, and systems work.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Mail className="size-4" />
              {EMAIL}
            </a>
          </div>
        </Reveal>
        <footer className="mt-12 flex items-center justify-between text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Joshua Henderson</span>
          <span>
            Press{" "}
            <kbd className="rounded border border-border px-1.5 py-0.5">D</kbd>{" "}
            to toggle theme
          </span>
        </footer>
      </section>
    </div>
  )
}

function GithubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="#" className="text-sm font-semibold tracking-tight">
          Joshua Henderson
        </a>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#experience" className="transition hover:text-foreground">
            Experience
          </a>
          <a href="#skills" className="transition hover:text-foreground">
            Skills
          </a>
          <a href="#contact" className="transition hover:text-foreground">
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="text-3xl font-bold tracking-tight text-primary">
        {value}
      </dd>
      <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
    </div>
  )
}

function ExperienceEntry({ job }: { job: IJob }) {
  const ongoing = job.DateEnd.getUTCFullYear() >= ONGOING_YEAR
  const era = `${formatMonthYearUTC(job.DateStart)} — ${
    ongoing ? "Present" : formatMonthYearUTC(job.DateEnd)
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

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", inView && "in-view", className)}
    >
      {children}
    </div>
  )
}

export default App
