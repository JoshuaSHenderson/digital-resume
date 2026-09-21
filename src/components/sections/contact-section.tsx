import { Mail, Phone } from "lucide-react"

import { Reveal } from "@/components/reveal"
import type { IContactMethod } from "@/types/interfaces"

export function ContactSection({
  name,
  contact,
}: {
  name: string
  contact: IContactMethod
}) {
  return (
    <section id="contact" className="mx-auto max-w-3xl scroll-mt-20 px-6 py-20">
      <Reveal>
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
          <h2 className="text-3xl font-bold tracking-tight">
            Let's work together
          </h2>
          <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
            Open to conversations about application development, cloud
            architecture, and systems work.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={contact.Email.Link}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <Mail className="size-4" />
              {contact.Email.Text}
            </a>
            <a
              href={contact.Phone.Link}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary/50 hover:text-primary"
            >
              <Phone className="size-4" />
              {contact.Phone.Text}
            </a>
          </div>
        </div>
      </Reveal>
      <footer className="mt-12 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          © {new Date().getFullYear()} {name}
        </span>
        <span>
          Press{" "}
          <kbd className="rounded border border-border px-1.5 py-0.5">D</kbd> to
          toggle theme
        </span>
      </footer>
    </section>
  )
}
