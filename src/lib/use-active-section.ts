import { useEffect, useState } from "react"

/**
 * Returns the id of the section currently crossing the middle of the viewport.
 * The rootMargin collapses the viewport to a thin band at its centre, so one
 * section is active at a time without measuring scroll offsets on every frame.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "")
  const key = ids.join(",")

  useEffect(() => {
    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        // ponytail: the band is thin enough that the last hit is the right one.
        if (visible.length > 0) setActive(visible[visible.length - 1].target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [key])

  return active
}
