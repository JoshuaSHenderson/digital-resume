import { formatMonthYearUTC } from "@/lib/format-date"
import type { IJob } from "./types/interfaces"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Button } from "./ui/button"
import { XIcon } from "lucide-react"

function SelectClearControl({ onClear }: { onClear: () => void }) {
  return (
    <button
      type="button"
      className="pointer-events-auto -mr-1 inline-flex size-6 shrink-0 items-center justify-center rounded-none text-muted-foreground hover:text-foreground [&_svg]:pointer-events-auto"
      onPointerDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClear()
      }}
      aria-label="Clear selection"
    >
      <XIcon className="size-3 shrink-0" />
    </button>
  )
}

export interface FilterJobsProps {
  jobs: IJob[]
  selectedJobTitle?: string
  onSelectJobTitle: (value: string | undefined) => void
  selectedCompany?: string
  onSelectCompany: (value: string | undefined) => void
  selectedDateStart?: string
  onSelectDateStart: (value: string | undefined) => void
}

export function FilterJobs({
  jobs,
  onSelectJobTitle,
  onSelectCompany,
  onSelectDateStart,
  selectedDateStart,
  selectedJobTitle,
  selectedCompany,
}: FilterJobsProps) {
  const onClearFilters = () => {
    onSelectJobTitle(undefined)
    onSelectCompany(undefined)
    onSelectDateStart(undefined)
  }

  return (
    <>
      <div className="horizontal-center flex flex-row gap-3">
        <Select
          value={selectedJobTitle ?? undefined}
          onValueChange={(value) => onSelectJobTitle(value || undefined)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter On Job Title" />
            {selectedJobTitle ? (
              <SelectClearControl onClear={() => onSelectJobTitle(undefined)} />
            ) : null}
          </SelectTrigger>
          <SelectContent>
            {jobs.map((job) => (
              <SelectItem key={job.Id} value={job.Title}>
                {job.Title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedCompany ?? undefined}
          onValueChange={(value) => onSelectCompany(value || undefined)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter On Company" />
            {selectedCompany ? (
              <SelectClearControl onClear={() => onSelectCompany(undefined)} />
            ) : null}
          </SelectTrigger>
          <SelectContent>
            {jobs.map((job) => (
              <SelectItem key={job.Id} value={job.Company}>
                {job.Company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedDateStart ?? undefined}
          onValueChange={(value) => onSelectDateStart(value || undefined)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter On Date Start" />
            {selectedDateStart ? (
              <SelectClearControl
                onClear={() => onSelectDateStart(undefined)}
              />
            ) : null}
          </SelectTrigger>
          <SelectContent>
            {jobs.map((job) => (
              <SelectItem key={job.Id} value={job.DateStart.toString()}>
                {formatMonthYearUTC(job.DateStart)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant={"default"} onClick={() => onClearFilters()}>
          Clear Filters
        </Button>
      </div>
    </>
  )
}
