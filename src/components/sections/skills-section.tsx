import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"
import type { IJob } from "@/types/interfaces"

/** Skills are derived from the jobs, so the tag list can't drift from the history. */
export function SkillsSection({ jobs }: { jobs: IJob[] }) {
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
  )
}
