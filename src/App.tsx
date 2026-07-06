import { useEffect, useState, type ReactNode } from "react"
import { Beer, Castle, Hourglass, Send, X } from "lucide-react"

import { useInView } from "@/lib/use-in-view"
import { cn } from "@/lib/utils"
import { formatMonthYearUTC } from "@/lib/format-date"
import { CAST, STRANGER, type TavernCharacter } from "./tavern-cast"
import type { IJob } from "./components/types/interfaces"

export interface AppProps {
  jobs: IJob[]
}

const ONGOING_YEAR = 2098
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]
const TABLE_TILT = ["-rotate-1", "rotate-1", "rotate-0"]

const SPARKS = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 8.9 + 4) % 100,
  delay: (i * 1.9) % 9,
  duration: 7 + (i % 5),
  size: 2 + (i % 3),
}))

function eraOf(job: IJob) {
  const ongoing = job.DateEnd.getUTCFullYear() >= ONGOING_YEAR
  return {
    ongoing,
    era: `${formatMonthYearUTC(job.DateStart)} — ${
      ongoing ? "Present" : formatMonthYearUTC(job.DateEnd)
    }`,
  }
}

export function App({ jobs }: AppProps) {
  const [openJob, setOpenJob] = useState<IJob | null>(null)

  return (
    <div className="relative overflow-x-clip">
      <TavernBackdrop />
      <TopNav />

      {/* ── The sign above the door ── */}
      <section className="relative flex min-h-svh flex-col items-center justify-center px-6 pt-20 pb-16 text-center">
        <Reveal>
          <p className="text-xs tracking-[0.4em] text-muted-foreground uppercase">
            Weary traveler, welcome to
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="animate-sway mt-8 origin-top rounded-md border-2 border-primary/60 bg-card/80 px-10 py-8 shadow-[0_0_50px_-12px_var(--primary)] backdrop-blur">
            <CornerOrnaments />
            <h1 className="font-display text-shimmer text-5xl leading-tight font-bold text-balance md:text-7xl">
              The Rusty Server
            </h1>
            <p className="font-heading mt-3 text-sm tracking-[0.3em] text-muted-foreground uppercase">
              Tavern of Tales · Est. MMXIII
            </p>
          </div>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 max-w-xl leading-relaxed text-muted-foreground">
            {jobs.length} tables, {jobs.length} storytellers — each patron
            keeps one chapter of{" "}
            <span className="font-heading text-primary">
              Joshua Henderson's
            </span>{" "}
            long road through the cloud kingdoms. Pull up a chair, order a
            flagon, and listen.
          </p>
        </Reveal>
        <Reveal delay={450}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#tables"
              className="font-heading rounded-sm border border-primary bg-primary px-6 py-3 text-sm tracking-widest text-primary-foreground uppercase shadow-[0_0_20px_-4px_var(--primary)] transition hover:shadow-[0_0_32px_-4px_var(--primary)]"
            >
              Enter the Common Room
            </a>
            <a
              href="#barkeep"
              className="font-heading rounded-sm border border-border px-6 py-3 text-sm tracking-widest uppercase transition hover:border-primary hover:text-primary"
            >
              See the Barkeep
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── The common room ── */}
      <section id="tables" className="relative mx-auto max-w-5xl px-6 py-24">
        <Reveal className="text-center">
          <div className="mb-4 inline-flex items-center gap-2 text-primary">
            <Beer className="size-5" />
            <span className="text-xs tracking-[0.35em] uppercase">
              The Common Room
            </span>
          </div>
          <h2 className="font-heading text-4xl font-semibold tracking-wide text-balance">
            Choose a Table
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted-foreground">
            Every patron here rode beside the adventurer in a different era.
            Sit with one, and they'll tell you what they saw.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, i) => (
            <Reveal key={job.Id} delay={(i % 3) * 120}>
              <TavernTable
                job={job}
                index={i}
                character={CAST[job.Id] ?? STRANGER}
                onSit={() => setOpenJob(job)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── The barkeep ── */}
      <section id="barkeep" className="relative mx-auto max-w-2xl px-6 py-24">
        <Reveal>
          <div className="relative rounded-lg border border-primary/40 bg-card/70 px-8 py-14 text-center shadow-[0_0_60px_-20px_var(--primary)] backdrop-blur">
            <CornerOrnaments />
            <span className="text-5xl">🧔</span>
            <h2 className="font-heading mt-4 text-3xl font-semibold tracking-wide text-balance md:text-4xl">
              A Word with the Barkeep
            </h2>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
              "Looking to hire the adventurer these tales speak of? Wise. I
              keep a raven cage behind the bar — scratch out your message and
              I'll see it delivered."
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
          to snuff the candles
        </p>
      </section>

      {openJob && (
        <TaleDialog
          job={openJob}
          character={CAST[openJob.Id] ?? STRANGER}
          onClose={() => setOpenJob(null)}
        />
      )}
    </div>
  )
}

/* ── Scenery ── */

function TavernBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* hearth glow */}
      <div className="animate-flicker absolute bottom-0 left-1/6 size-96 rounded-full bg-accent/25 blur-3xl" />
      <div
        className="animate-float-slow absolute -top-24 right-1/5 size-80 rounded-full bg-primary/15 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />
      {/* hearth sparks drifting up */}
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="animate-ember absolute -bottom-2 rounded-full bg-primary shadow-[0_0_6px_1px_var(--primary)]"
          style={{
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
      {/* candlelight vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,var(--background))]" />
    </div>
  )
}

function TopNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/50 bg-background/60 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <a
          href="#"
          className="font-heading flex items-center gap-2 text-lg font-semibold tracking-widest"
        >
          <Beer className="size-4 text-primary" />
          The Rusty Server
        </a>
        <div className="font-heading flex items-center gap-6 text-sm tracking-wider">
          <a href="#tables" className="transition hover:text-primary">
            Tables
          </a>
          <a href="#barkeep" className="transition hover:text-primary">
            Barkeep
          </a>
        </div>
      </nav>
    </header>
  )
}

/* ── Tables ── */

function TavernTable({
  job,
  index,
  character,
  onSit,
}: {
  job: IJob
  index: number
  character: TavernCharacter
  onSit: () => void
}) {
  const { ongoing } = eraOf(job)
  return (
    <button
      type="button"
      onClick={onSit}
      className={cn(
        "group relative flex h-full w-full flex-col items-center rounded-md border border-border bg-card/60 px-6 py-8 text-center backdrop-blur transition duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_0_40px_-10px_var(--primary)]",
        TABLE_TILT[index % TABLE_TILT.length]
      )}
    >
      <CornerOrnaments />
      {/* candle */}
      <span className="animate-flicker absolute top-3 right-4 text-lg drop-shadow-[0_0_8px_var(--primary)]">
        🕯️
      </span>
      {/* tabletop with patron */}
      <span className="relative flex size-24 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,oklch(0.42_0.07_60),oklch(0.24_0.05_50))] shadow-[inset_0_2px_10px_rgb(0_0_0/0.5),0_6px_16px_-6px_rgb(0_0_0/0.6)] ring-2 ring-primary/30 transition group-hover:ring-primary/70">
        <span className="text-4xl transition duration-300 group-hover:scale-110">
          {character.emoji}
        </span>
      </span>
      <span className="font-heading mt-4 text-xs tracking-[0.3em] text-primary uppercase">
        Table {ROMAN[index] ?? index + 1}
      </span>
      <span className="font-heading mt-2 text-xl font-semibold tracking-wide">
        {character.name}
      </span>
      <span className="text-sm text-muted-foreground italic">
        {character.archetype}
      </span>
      <span className="mt-3 text-xs text-muted-foreground">
        Keeper of the tale of{" "}
        <span className="text-card-foreground">{job.Title}</span>
      </span>
      {ongoing && (
        <span className="font-heading mt-3 rounded-sm border border-accent/60 bg-accent/15 px-2 py-0.5 text-xs tracking-widest text-accent-foreground">
          ⚔ Still on the quest
        </span>
      )}
      <span className="font-heading mt-4 text-xs tracking-widest text-primary uppercase opacity-0 transition group-hover:opacity-100">
        Sit &amp; listen ›
      </span>
    </button>
  )
}

/* ── The tale, told RPG-dialogue style ── */

function useTypewriter(text: string, speed = 16) {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    setShown(0)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text.length)
      return
    }
    const id = setInterval(() => {
      setShown((n) => {
        if (n >= text.length) {
          clearInterval(id)
          return n
        }
        return n + 1
      })
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return {
    out: text.slice(0, shown),
    done: shown >= text.length,
    skip: () => setShown(text.length),
  }
}

function TaleDialog({
  job,
  character,
  onClose,
}: {
  job: IJob
  character: TavernCharacter
  onClose: () => void
}) {
  const { era, ongoing } = eraOf(job)
  const { out, done, skip } = useTypewriter(character.intro)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`The tale of ${job.Title}`}
        onClick={(e) => e.stopPropagation()}
        className="animate-in fade-in slide-in-from-bottom-4 relative max-h-[85svh] w-full max-w-2xl overflow-y-auto rounded-lg border border-primary/50 bg-card p-6 shadow-[0_0_80px_-20px_var(--primary)] duration-300 sm:p-8"
      >
        <CornerOrnaments />
        <button
          type="button"
          onClick={onClose}
          aria-label="Leave the table"
          className="absolute top-3 right-3 rounded-sm border border-border p-1.5 text-muted-foreground transition hover:border-primary hover:text-primary"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,oklch(0.42_0.07_60),oklch(0.24_0.05_50))] text-3xl ring-2 ring-primary/50">
            {character.emoji}
          </span>
          <div className="min-w-0">
            <h3 className="font-heading text-2xl font-semibold tracking-wide">
              {character.name}{" "}
              <span className="text-base font-normal text-muted-foreground italic">
                · {character.archetype}
              </span>
            </h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Castle className="size-4 shrink-0 text-primary/80" />
              <span className="truncate">{job.Company}</span>
            </p>
            <p className="mt-0.5 flex items-center gap-2 text-sm text-muted-foreground">
              <Hourglass className="size-4 shrink-0 text-primary/80" />
              {job.Title} · {era}
              {ongoing && <span className="text-accent-foreground">· ⚔</span>}
            </p>
          </div>
        </div>

        {/* the tale — click to skip the typewriter */}
        <p
          onClick={skip}
          className="mt-6 min-h-24 cursor-pointer border-l-2 border-primary/50 pl-4 leading-relaxed text-card-foreground/95 italic"
        >
          “{out}”
          {!done && (
            <span className="animate-blink ml-0.5 text-primary">▌</span>
          )}
        </p>

        {done && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h4 className="font-heading mt-6 text-xs tracking-[0.3em] text-primary uppercase">
              Deeds from this chapter
            </h4>
            <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed">
              {job.Descriptions.map((deed, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1 text-xs text-primary">◆</span>
                  <span className="text-card-foreground/90">{deed}</span>
                </li>
              ))}
            </ul>
            {job.Skills?.length > 0 && (
              <>
                <h4 className="font-heading mt-6 text-xs tracking-[0.3em] text-primary uppercase">
                  Talents wielded
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.Skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs text-accent-foreground/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="font-heading mt-8 rounded-sm border border-primary px-5 py-2.5 text-xs tracking-widest text-primary uppercase transition hover:bg-primary hover:text-primary-foreground"
            >
              Return to your table
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Shared bits ── */

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

function CornerOrnaments() {
  return (
    <>
      <span className="pointer-events-none absolute top-2 left-2 size-3 border-t border-l border-primary/70" />
      <span className="pointer-events-none absolute top-2 right-2 size-3 border-t border-r border-primary/70" />
      <span className="pointer-events-none absolute bottom-2 left-2 size-3 border-b border-l border-primary/70" />
      <span className="pointer-events-none absolute right-2 bottom-2 size-3 border-r border-b border-primary/70" />
    </>
  )
}

export default App
