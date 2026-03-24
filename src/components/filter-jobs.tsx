import type { IJob } from "./types/interfaces"
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "./ui/combobox"

export interface FilterJobsProps {
  jobs: IJob[]
  selectedJob: string
  onSelect: (value: string) => void
}

export function FilterJobs({ jobs, selectedJob, onSelect }: FilterJobsProps) {
  return (
    <Combobox
      value={selectedJob}
      onValueChange={(value) => onSelect(value ?? "all")}
    >
      <ComboboxTrigger className="align-left flex gap-2">
        Filter Jobs by Title
      </ComboboxTrigger>

      <ComboboxContent>
        <ComboboxList>
          <ComboboxItem value="all">All</ComboboxItem>
          {jobs.map((job) => (
            <ComboboxItem key={job.Title} value={job.Title}>
              {job.Title}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
