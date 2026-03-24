import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import type { IJob } from "./components/types/interfaces.ts"
import { generateMockJobs } from "./mocks/mock-api.ts"

type RawJob = Omit<IJob, "DateStart" | "DateEnd"> & {
  DateStart: string
  DateEnd: string
}

// const jobs: IJob[] = await getJobApiService(true)

const mockJobs = await generateMockJobs({ JobsToCreate: 10 })
const jobs: IJob[] = (mockJobs as RawJob[]).map((j) => ({
  ...j,
  DateStart: new Date(j.DateStart),
  DateEnd: new Date(j.DateEnd),
}))
console.log("Jobs fetched successfully")
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App jobs={jobs} />
    </ThemeProvider>
  </StrictMode>
)
