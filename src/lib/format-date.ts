/** Entries ending in or after this year are still running, and show as "Present". */
export const ONGOING_YEAR = 2098

/** Formats a date for display in UTC (calendar month + year in the UTC zone). */
export function formatMonthYearUTC(date: Date): string {
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "short",
  })
}
