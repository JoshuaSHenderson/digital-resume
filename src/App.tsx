import type { ReactNode } from "react"
import {
  Castle,
  ChevronDown,
  Gem,
  Hourglass,
  Send,
  Sparkles,
  Swords,
} from "lucide-react"

import { useInView } from "@/lib/use-in-view"
import { cn } from "@/lib/utils"
import { formatMonthYearUTC } from "@/lib/format-date"
import type { IJob } from "./components/types/interfaces"

export interface AppProps {
  jobs: IJob[]
}

const ONGOING_YEAR = 2098
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]

const STARS = Array.from({ length: 80 }, (_, i) => ({
  left: (i * 37.7) % 100,
  top: (i * 53.3) % 100,
  size: 1 + ((i * 7) % 3),
  delay: (i * 0.43) % 4,
  duration: 2.5 + ((i * 13) % 30) / 10,
}))

const EMBERS = Array.from({ length: 14 }, (_, i) => ({
  left: (i * 7.3 + 3) % 100,
  delay: (i * 1.7) % 9,
  duration: 7 + (i % 5),
  size: 2 + (i % 3),
}))

export function App({ jobs }: AppProps) {
  const firstYear = jobs.length
    ? Math.min(...jobs.map((j) => j.DateStart.getUTCFullYear()))
    : new Date().getFullYear()
  const yearsAdventuring = new Date().getFullYear() - firstYear

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
    <div className="relative overflow-x-clip">
      <EnchantedBackdrop />
      <TopNav />

      {/* ── Hero ── */}
      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <Reveal>
          <FlourishDivider />
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 text-xs tracking-[0.4em] text-muted-foreground uppercase">
            Hear ye, hear ye · The chronicle of
          </p>
        </Reveal>
        <Reveal delay={200}>
          <h1 className="font-display text-shimmer mt-4 text-5xl leading-tight font-bold text-balance md:text-7xl">
            Joshua Henderson
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="font-heading mt-5 text-lg tracking-widest text-accent-foreground/90 md:text-xl">
            <span className="text-primary">Cloud Mage</span> · Warden of
            Systems · <span className="text-primary">Artificer of Code</span>
          </p>
        </Reveal>
        <Reveal delay={400}>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            From humble squire of the Geek Squad to Application Developer of
            the VPO realm — {yearsAdventuring} years spent forging order from
            chaos across the cloud kingdoms of Azure, SharePoint, and beyond.
          </p>
        </Reveal>
        <Reveal delay={500}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <HeroStat value={yearsAdventuring} label="Years Adventuring" />
            <HeroStat value={jobs.length} label="Quests Undertaken" />
            <HeroStat value={skills.length} label="Powers Mastered" />
          </div>
        </Reveal>
        <Reveal delay={600}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#saga"
              className="font-heading rounded-sm border border-primary bg-primary px-6 py-3 text-sm tracking-widest text-primary-foreground uppercase shadow-[0_0_20px_-4px_var(--primary)] transition hover:shadow-[0_0_32px_-4px_var(--primary)]"
            >
              Begin the Saga
            </a>
            <a
              href="#summon"
              className="font-heading rounded-sm border border-border px-6 py-3 text-sm tracking-widest uppercase transition hover:border-primary hover:text-primary"
            >
              Summon Me
            </a>
          </div>
        </Reveal>
        <a
          href="#saga"
          aria-label="Scroll to the quest log"
          className="absolute bottom-6 text-muted-foreground transition hover:text-primary"
        >
          <ChevronDown className="animate-bob size-6" />
        </a>
      </section>

      {/* ── Quest Log ── */}
      <section id="saga" className="relative mx-auto max-w-3xl px-6 py-24">
        <SectionHeader
          icon={<Swords className="size-5" />}
          kicker="The Saga"
          title="Quest Log"
          blurb="Every campaign fought, every realm served — recorded here in order of most recent glory."
        />

        <div className="relative mt-16">
          <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-primary/70 via-accent/40 to-transparent" />
          <div className="flex flex-col gap-12">
            {jobs.map((job, i) => (
              <QuestCard key={job.Id} job={job} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Powers ── */}
      <section id="powers" className="relative mx-auto max-w-4xl px-6 py-24">
        <SectionHeader
          icon={<Sparkles className="size-5" />}
          kicker="The Grimoire"
          title="Powers & Runes"
          blurb="Abilities gathered along the road. Each rune grows brighter with every quest it was wielded in."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {skills.map(([name, count], i) => (
            <Reveal key={name} delay={(i % 4) * 90}>
              <RuneTile name={name} count={count} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Summon ── */}
      <section id="summon" className="relative mx-auto max-w-2xl px-6 py-24">
        <Reveal>
          <div className="relative rounded-lg border border-primary/40 bg-card/70 px-8 py-14 text-center shadow-[0_0_60px_-20px_var(--primary)] backdrop-blur">
            <CornerOrnaments />
            <FlourishDivider />
            <h2 className="font-heading mt-6 text-3xl font-semibold tracking-wide text-balance md:text-4xl">
              Summon the Adventurer
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
              Does your realm need a steady hand with the cloud arts? Send a
              raven — or, failing that, an email — and the adventurer shall
              answer.
            </p>
            <a
              href="mailto:joshua.henderson@hotmail.com"
              className="font-heading mt-8 inline-flex items-center gap-2 rounded-sm border border-primary bg-primary px-6 py-3 text-sm tracking-widest text-primary-foreground uppercase shadow-[0_0_20px_-4px_var(--primary)] transition hover:shadow-[0_0_32px_-4px_var(--primary)]"
            >
              <Send className="size-4" />
              Send a Raven
            </a>
          </div>
        </Reveal>
        <p className="mt-12 text-center text-xs tracking-widest text-muted-foreground uppercase">
          Forged with React & Tailwind in the year MMXXVI · Press{" "}
          <kbd className="rounded border border-border px-1.5 py-0.5 font-sans">
            D
          </kbd>{" "}
          to turn day into night
        </p>
      </section>
    </div>
  )
}

/* ── Fantasy scenery ── */

function EnchantedBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* arcane glow orbs */}
      <div className="animate-float-slow absolute -top-32 left-1/4 size-96 rounded-full bg-accent/20 blur-3xl" />
      <div
        className="animate-float-slow absolute right-1/5 bottom-0 size-80 rounded-full bg-primary/15 blur-3xl"
        style={{ animationDelay: "-3.5s" }}
      />
      {/* starfield */}
      {STARS.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-primary"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {/* rising embers */}
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="animate-ember absolute -bottom-2 rounded-full bg-accent shadow-[0_0_6px_1px_var(--accent)]"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            animationDelay: `${e.delay}s`,
            animationDuration: `${e.duration}s`,
          }}
        />
      ))}
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--background))]" />
    </div>
  )
}

function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a
          href="#"
          className="font-heading flex items-center gap-2 text-lg font-semibold tracking-widest"
        >
          <Swords className="size-4 text-primary" />
          J·H
        </a>
        <div className="font-heading flex items-center gap-6 text-sm tracking-wider">
          <a href="#saga" className="transition hover:text-primary">
            The Saga
          </a>
          <a href="#powers" className="transition hover:text-primary">
            Powers
          </a>
          <a href="#summon" className="transition hover:text-primary">
            Summon
          </a>
        </div>
      </nav>
    </header>
  )
}

/* ── Building blocks ── */

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

function FlourishDivider() {
  return (
    <div className="flex items-center justify-center gap-3 text-primary">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/70" />
      <Gem className="size-4" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/70" />
    </div>
  )
}

function CornerOrnaments() {
  return (
    <>
      <span className="absolute top-2 left-2 size-3 border-t border-l border-primary/70" />
      <span className="absolute top-2 right-2 size-3 border-t border-r border-primary/70" />
      <span className="absolute bottom-2 left-2 size-3 border-b border-l border-primary/70" />
      <span className="absolute right-2 bottom-2 size-3 border-r border-b border-primary/70" />
    </>
  )
}

function HeroStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="relative min-w-36 rounded-sm border border-border bg-card/50 px-5 py-4 backdrop-blur">
      <CornerOrnaments />
      <p className="font-heading text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  )
}

function SectionHeader({
  icon,
  kicker,
  title,
  blurb,
}: {
  icon: ReactNode
  kicker: string
  title: string
  blurb: string
}) {
  return (
    <Reveal className="text-center">
      <div className="mb-4 inline-flex items-center gap-2 text-primary">
        {icon}
        <span className="text-xs tracking-[0.35em] uppercase">{kicker}</span>
      </div>
      <h2 className="font-heading text-4xl font-semibold tracking-wide text-balance">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted-foreground">
        {blurb}
      </p>
      <div className="mt-6">
        <FlourishDivider />
      </div>
    </Reveal>
  )
}

function QuestCard({ job, index }: { job: IJob; index: number }) {
  const ongoing = job.DateEnd.getUTCFullYear() >= ONGOING_YEAR
  const era = `${formatMonthYearUTC(job.DateStart)} — ${
    ongoing ? "Present" : formatMonthYearUTC(job.DateEnd)
  }`
  const deeds = job.Descriptions
  const hiddenDeeds = deeds.slice(3)

  return (
    <Reveal className="relative pl-12">
      {/* timeline node */}
      <span
        className={cn(
          "absolute top-8 left-4 size-3 -translate-x-1/2 rotate-45 border border-primary bg-background",
          ongoing && "animate-pulse bg-primary shadow-[0_0_12px_var(--primary)]"
        )}
      />
      <article className="group relative rounded-md border border-border bg-card/60 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_40px_-12px_var(--primary)]">
        <CornerOrnaments />
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-heading rounded-sm border border-primary/50 px-2 py-0.5 text-xs tracking-widest text-primary">
            Quest {ROMAN[index] ?? index + 1}
          </span>
          {ongoing && (
            <span className="font-heading rounded-sm border border-accent/60 bg-accent/15 px-2 py-0.5 text-xs tracking-widest text-accent-foreground">
              ⚔ Ongoing
            </span>
          )}
        </div>
        <h3 className="font-heading mt-3 text-2xl font-semibold tracking-wide">
          {job.Title}
        </h3>
        <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Castle className="size-4 shrink-0 text-primary/80" />
            {job.Company}
          </span>
          <span className="inline-flex items-center gap-2">
            <Hourglass className="size-4 shrink-0 text-primary/80" />
            {era}
          </span>
        </div>

        <ul className="mt-5 flex flex-col gap-2 text-sm leading-relaxed">
          {deeds.slice(0, 3).map((deed, i) => (
            <Deed key={i} text={deed} />
          ))}
        </ul>
        {hiddenDeeds.length > 0 && (
          <details className="deeds mt-2">
            <summary className="font-heading inline-flex items-center gap-1 text-xs tracking-widest text-primary uppercase transition hover:text-accent-foreground">
              Reveal {hiddenDeeds.length} more deeds
              <ChevronDown className="chevron size-3 transition-transform" />
            </summary>
            <ul className="mt-2 flex flex-col gap-2 text-sm leading-relaxed">
              {hiddenDeeds.map((deed, i) => (
                <Deed key={i} text={deed} />
              ))}
            </ul>
          </details>
        )}

        {job.Skills?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-4">
            {job.Skills.map((skill) => (
              <span
                key={skill}
                className="rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs text-accent-foreground/90"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </article>
    </Reveal>
  )
}

function Deed({ text }: { text: string }) {
  return (
    <li className="flex gap-2">
      <span className="mt-1 text-xs text-primary">◆</span>
      <span className="text-card-foreground/90">{text}</span>
    </li>
  )
}

const RUNE_LEVELS = ["Apprentice", "Adept", "Expert", "Master"]

function RuneTile({ name, count }: { name: string; count: number }) {
  const level = Math.min(count, RUNE_LEVELS.length)
  return (
    <div className="group relative flex h-full flex-col items-center gap-2 rounded-md border border-border bg-card/60 px-3 py-5 text-center backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_30px_-10px_var(--primary)]">
      <Gem className="size-5 text-accent transition group-hover:text-primary" />
      <p className="font-heading text-sm leading-snug font-semibold tracking-wide">
        {name}
      </p>
      <div className="mt-auto">
        <p className="text-xs tracking-widest text-primary">
          {"◆".repeat(level)}
          <span className="text-border">
            {"◆".repeat(RUNE_LEVELS.length - level)}
          </span>
        </p>
        <p className="mt-1 text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
          {RUNE_LEVELS[level - 1]}
        </p>
      </div>
    </div>
  )
}

export default App
