export async function generateMockJobs({
  JobsToCreate,
}: {
  JobsToCreate: number
}) {
  const jobs = []
  for (let i = 0; i < JobsToCreate; i++) {
    const dateStart = generateRandomDate(new Date(2020, 0, 1), new Date())
    const dateEnd = generateRandomDate(dateStart, new Date())
    jobs.push({
      Id: `${i + 1}`,
      Title: `Job ${i + 1}`,
      Company: `Company ${i + 1}`,
      DateStart: dateStart.toISOString(),
      DateEnd: dateEnd.toISOString(),
      Descriptions: generateRandomDescriptions(
        Math.floor(Math.random() * 10) + 1
      ),
      Skills: generateRandomSkills(Math.floor(Math.random() * 10) + 1),
    })
  }
  return jobs
}

function generateRandomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

function generateRandomSkills(numberOfSkills: number) {
  return Array.from(
    { length: numberOfSkills },
    () => `Skill ${Math.random().toString(36).substring(2, 15)}`
  )
}

function generateRandomDescriptions(numberOfDescriptions: number) {
  return Array.from(
    { length: numberOfDescriptions },
    () => `Description ${Math.random().toString(36).substring(2, 15)}`
  )
}
