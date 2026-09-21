import type { ReactNode } from "react"

import { useInView } from "@/lib/use-in-view"
import { cn } from "@/lib/utils"

export function Reveal({
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
