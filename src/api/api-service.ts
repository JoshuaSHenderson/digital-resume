import * as mockData from "../mocks/mock-data.json"

export async function getJobApiService(isDemo: boolean): Promise<[]> {
  let data = []
  if (!isDemo) {
    const response = await fetch(import.meta.env.VITE_MOCK_DATA_PATH)
    data = await response.json()
  } else {
    data = mockData
  }

  return Promise.resolve(data)
}
