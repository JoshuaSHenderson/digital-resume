import { useActiveSection } from "@/lib/use-active-section"
import { cn } from "@/lib/utils"

export interface RailSection {
  id: string
  label: string
}

export function SectionRail({ sections }: { sections: RailSection[] }) {
  const active = useActiveSection(sections.map((s) => s.id))

  return (
    <nav
      aria-label="Sections"
      className="fixed top-1/2 right-8 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative">
        {/* The line the dots sit on: centred under the 1rem dot column. */}
        <span
          aria-hidden
          className="absolute top-3 right-2 bottom-3 w-px -translate-x-1/2 bg-border"
        />
        <ul className="relative flex flex-col items-end gap-6">
          {sections.map((section) => {
            const isActive = section.id === active
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex items-center justify-end gap-3"
                >
                  <span
                    className={cn(
                      "text-sm whitespace-nowrap transition-all duration-300",
                      isActive
                        ? "font-semibold text-primary"
                        : "text-muted-foreground/70 group-hover:text-foreground"
                    )}
                  >
                    {section.label}
                  </span>
                  <span className="flex w-4 justify-center">
                    <span
                      aria-hidden
                      className={cn(
                        "block rounded-full ring-4 ring-background transition-all duration-300",
                        isActive
                          ? "size-4 bg-primary"
                          : "size-2.5 bg-border group-hover:bg-primary/60"
                      )}
                    />
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
