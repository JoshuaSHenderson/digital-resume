import { GraduationCap, ShieldCheck } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { formatMonthYearUTC } from "@/lib/format-date"
import { cn } from "@/lib/utils"
import type { ICertification, IEducation, IJob } from "@/types/interfaces"

/** Skills are derived from the jobs, so the tag list can't drift from the history. */
export function SkillsSection({
  jobs,
  education,
  certifications,
}: {
  jobs: IJob[]
  education: IEducation
  certifications: ICertification[]
}) {
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
    <section id="skills" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-8 flex flex-wrap gap-2">
          {skills.map(([name]) => (
            <span
              key={name}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition hover:border-primary/50",
                   "border-primary/40 bg-primary/5 font-medium text-primary"
              )}
            >
              {name}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        {certifications?.length > 0 && (
          <Reveal className="rounded-2xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShieldCheck className="size-4 text-primary" />
              Certifications
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {certifications.map((cert) => (
                <li key={cert.Name}>
                  <p className="font-medium">{cert.Name}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {cert.Issuer} ·{" "}
                    {formatMonthYearUTC(new Date(cert.Date))}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {education && (
          <Reveal className="rounded-2xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <GraduationCap className="size-4 text-primary" />
              Education
            </h3>
            <p className="mt-4 font-medium">{education.Degree}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {education.School}
              {education.Location && `, ${education.Location}`} ·{" "}
              {new Date(education.DateEnd).getUTCFullYear()} · GPA{" "}
              {education.GPA}
            </p>
            {education.Honors?.length ? (
              <ul className="mt-3 flex flex-col gap-1.5 text-sm text-foreground/85">
                {education.Honors.map((honor) => (
                  <li key={honor} className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                    <span>{honor}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>
        )}
      </div>
    </section>
  )
}
