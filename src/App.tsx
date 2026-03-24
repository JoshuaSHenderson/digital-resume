import { useState } from "react"
import { FilterJobs } from "./components/filter-jobs"
import { JobCard } from "./components/job-card"

import type { IJob } from "./components/types/interfaces"

export interface AppProps {
  jobs: IJob[]
}

export function App({ jobs }: AppProps) {
  const [selectedJobTitle, setSelectedJobTitle] = useState<string | undefined>()
  const [selectedDateStart, setSelectedDateStart] = useState<
    string | undefined
  >()
  const [selectedCompany, setSelectedCompany] = useState<string | undefined>()

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6">
      <div className="flex max-w-md min-w-0 flex-col items-center gap-4 text-sm leading-loose">
        <div>
          <h1 className="text-center text-4xl">Joshua Henderson Resume</h1>
        </div>

        <FilterJobs
          jobs={jobs}
          selectedJobTitle={selectedJobTitle}
          onSelectJobTitle={setSelectedJobTitle}
          selectedCompany={selectedCompany}
          selectedDateStart={selectedDateStart}
          onSelectDateStart={setSelectedDateStart}
          onSelectCompany={setSelectedCompany}
        />

        {jobs.map((job) =>
          filterJob(
            job,
            selectedJobTitle,
            selectedDateStart,
            selectedCompany
          ) ? (
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

function filterJob(
  job: IJob,
  selectedJob: string | undefined,
  selectedDateStart: string | undefined,
  selectedCompany: string | undefined
) {
  if (selectedJob && job.Title !== selectedJob) return false
  if (selectedDateStart && job.DateStart.toString() !== selectedDateStart)
    return false
  if (selectedCompany && job.Company !== selectedCompany) return false
  return true
}

export default App
