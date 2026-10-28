import { ContactLinks } from "@/components/link-buttons"
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
            Open to conversations about System Administration, Application Development, Cloud
            Architecture and System/Cloud Engineering.
          </p>
          <div className="mt-6">
            <ContactLinks
              contact={contact}
              primaryLabel={contact.Email.Text}
            />
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
