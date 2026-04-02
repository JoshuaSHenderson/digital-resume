import type { IJob } from "@/components/types/interfaces"
import mockData from "../mocks/mock-data.json"

export async function getJobApiService(isDemo: boolean) {
  let data: IJob[]
  if (!isDemo) {
    const response = await fetch(import.meta.env.VITE_MOCK_DATA_PATH)
    data = await response.json()
  } else {
    data = mockData as unknown as IJob[]
  }

  return Array.isArray(data) ? data : []
}
