import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { getJobApiService } from "./api/api-service.ts"
import type { IImportedData } from "./types/interfaces.ts"


const resume: IImportedData = await getJobApiService(true)
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App importedData={resume} />
    </ThemeProvider>
  </StrictMode>
)
