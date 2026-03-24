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

export interface FilterJobsProps {
  jobs: IJob[]
  selectedJob?: string
  onSelect: (value: string | undefined) => void
}

export function FilterJobs({ jobs, selectedJob, onSelect }: FilterJobsProps) {
  return (
    <>
      <div className="horizontal-center flex flex-row gap-3">
        <Select
          value={selectedJob ?? ""}
          onValueChange={(value) => onSelect(value || undefined)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter On Job Title" />
          </SelectTrigger>
          <SelectContent>
            {jobs.map((job) => (
              <SelectItem key={job.Id} value={job.Id.toString()}>
                {job.Title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedJob ?? ""}
          onValueChange={(value) => onSelect(value || undefined)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter On Company" />
          </SelectTrigger>
          <SelectContent>
            {jobs.map((job) => (
              <SelectItem key={job.Id} value={job.Id.toString()}>
                {job.Company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedJob ?? ""}
          onValueChange={(value) => onSelect(value || undefined)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter On Date Start" />
          </SelectTrigger>
          <SelectContent>
            {jobs.map((job) => (
              <SelectItem key={job.Id} value={job.Id.toString()}>
                {formatMonthYearUTC(job.DateStart)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button variant={"default"} onClick={() => onSelect(undefined)}>
          Clear Filters
        </Button>
      </div>
    </>
  )
}
