export function TopNav({ name }: { name: string }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a href="#" className="text-sm font-semibold tracking-tight">
          {name}
        </a>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#experience" className="transition hover:text-foreground">
            Experience
          </a>
          <a
            href="#projects"
            className="hidden transition hover:text-foreground sm:inline"
          >
            Projects
          </a>
          <a href="#skills" className="transition hover:text-foreground">
            Skills
          </a>
          <a
            href="#recommendations"
            className="hidden transition hover:text-foreground sm:inline"
          >
            Recommendations
          </a>
          <a href="#contact" className="transition hover:text-foreground">
            Contact
          </a>
        </div>
      </nav>
    </header>
  )
}
