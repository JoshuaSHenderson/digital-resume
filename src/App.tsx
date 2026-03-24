import { useState } from "react"
import { FilterJobs } from "./components/filter-jobs"
import { JobCard } from "./components/job-card"

import type { IJob } from "./components/types/interfaces"

export interface AppProps {
  jobs: IJob[]
}

export function App({ jobs }: AppProps) {
  const [selectedJob, setSelectedJob] = useState<string | undefined>()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col items-center gap-4 text-sm leading-loose">
        <div>
          <h1 className="text-center text-4xl">Joshua Henderson Resume</h1>
        </div>

        <FilterJobs
          jobs={jobs}
          selectedJob={selectedJob}
          onSelect={setSelectedJob}
        />

        {jobs.map((job) =>
          selectedJob === "All" ||
          selectedJob == undefined ||
          selectedJob === job.Id.toString() ? (
            <JobCard
              key={job.Id}
              Id={job.Id.toString()}
              Title={job.Title}
              Company={job.Company}
              DateStart={job.DateStart}
              DateEnd={job.DateEnd}
              Descriptions={job.Descriptions}
            />
          ) : null
        )}
      </div>
    </div>
  )
}

export default App
