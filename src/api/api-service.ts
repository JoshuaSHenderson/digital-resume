import type { IImportedData, IJob, IProject } from "@/types/interfaces"
import resumeData from "../mocks/resumeData.json"

/** Anything with DateStart/DateEnd arrives from JSON as ISO strings. */
type Undated<T> = Omit<T, "DateStart" | "DateEnd"> & {
  DateStart: string
  DateEnd: string
}

type RawImportedData = Omit<IImportedData, "Experiance" | "Projects"> & {
  Experiance: Undated<IJob>[]
  Projects: Undated<IProject>[]
}

const withDates = <T,>(item: Undated<T>) => ({
  ...item,
  DateStart: new Date(item.DateStart),
  DateEnd: new Date(item.DateEnd),
})

export async function getJobApiService(
  isDemo: boolean
): Promise<IImportedData> {
  let data: RawImportedData
  if (!isDemo) {
    const response = await fetch(import.meta.env.VITE_MOCK_DATA_PATH)
    data = await response.json()
  } else {
    data = resumeData as unknown as RawImportedData
  }

  return {
    ...data,
    Experiance: data.Experiance.map(withDates),
    Projects: (data.Projects ?? []).map(withDates),
  }
}
