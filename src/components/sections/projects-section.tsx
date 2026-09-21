import { ArrowUpRight, Calendar } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { formatMonthYearUTC, ONGOING_YEAR } from "@/lib/format-date"
import type { IProject } from "@/types/interfaces"

export function ProjectsSection({
  projects
}: {
  projects: IProject[]
}) {
  if (!projects?.length) return null

  return (
    <section id="projects" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-3 text-sm text-muted-foreground">
          Built outside of client work.
        </p>
      </Reveal>
      <div className="mt-10 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.Title} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: IProject }) {
  const ongoing = project.DateEnd.getUTCFullYear() >= ONGOING_YEAR
  const era = `${formatMonthYearUTC(project.DateStart)} — ${ongoing ? "Present" : formatMonthYearUTC(project.DateEnd)
    }`

  return (
    <Reveal className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl font-semibold tracking-tight">
          {project.Title}
        </h3>
        <span className="text-sm text-muted-foreground">{project.Tagline}</span>
      </div>
      <span className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="size-4 shrink-0" />
        {era}
      </span>

      <p className="mt-5 text-sm leading-relaxed text-foreground/85">
        {project.Description}
      </p>

      {project.Highlights?.length > 0 && (
        <ul className="mt-5 flex flex-col gap-2 text-sm leading-relaxed text-foreground/85">
          {project.Highlights.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {project.Skills?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {project.Skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {project.Links?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4">
          {project.Links.map((link) => (
            <a
              key={link.Url}
              href={link.Url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary transition hover:opacity-80"
            >
              {link.Label}
              <ArrowUpRight className="size-4" />
            </a>
          ))}
        </div>
      )}
    </Reveal>
  )
}
