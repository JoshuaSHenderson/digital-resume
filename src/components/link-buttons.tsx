import { Download, Mail, Phone } from "lucide-react"

import { cn } from "@/lib/utils"
import type {
  IContact,
  IContactMethod,
  IDownloadableDocument,
} from "@/types/interfaces"

const primaryButton =
  "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"

const outlineButton =
  "inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition hover:border-primary/50 hover:text-primary"

/**
 * The brand's own mark, served from the URL in the data. A single-colour mark
 * that would disappear against the dark theme passes `dark:invert`.
 */
function BrandMark({
  contact,
  className,
}: {
  contact: IContact
  className?: string
}) {
  return (
    <img
      src={contact.Logo}
      alt=""
      aria-hidden
      className={cn("size-4", className)}
    />
  )
}

export function ContactLinks({
  contact,
  primaryLabel = "Get in touch",
}: {
  contact: IContactMethod
  primaryLabel?: string
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <a href={contact.Email.Link} className={primaryButton}>
        <Mail className="size-4" />
        {primaryLabel}
      </a>
      <a href={contact.Phone.Link} className={outlineButton}>
        <Phone className="size-4" />
        {contact.Phone.Text}
      </a>
      <a
        href={contact.LinkedIn.Link}
        target="_blank"
        rel="noreferrer"
        className={outlineButton}
      >
        <BrandMark contact={contact.LinkedIn} />
        LinkedIn
      </a>
      <a
        href={contact.GitHub.Link}
        target="_blank"
        rel="noreferrer"
        className={outlineButton}
      >
        <BrandMark contact={contact.GitHub} className="dark:invert" />
        GitHub
      </a>
    </div>
  )
}

export function DownloadLinks({
  downloads,
}: {
  downloads: IDownloadableDocument[]
}) {
  if (!downloads?.length) return null

  return (
    <div className="flex flex-wrap gap-3">
      {downloads.map((doc) => (
        <a key={doc.Name} href={doc.Path} download className={outlineButton}>
          <Download className="size-4 text-primary" />
          {doc.Name}
        </a>
      ))}
    </div>
  )
}
