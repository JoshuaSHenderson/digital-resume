import { SectionRail, type RailSection } from "@/components/section-rail"
import { TopNav } from "@/components/top-nav"
import { ContactSection } from "@/components/sections/contact-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { RecommendationsSection } from "@/components/sections/recommendations-section"
import { SkillsSection } from "@/components/sections/skills-section"
import type { IImportedData } from "./types/interfaces"

export interface AppProps {
  importedData: IImportedData
}

// Ids match the section elements; order is the order down the page.
const SECTIONS: RailSection[] = [
  { id: "top", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "recommendations", label: "Recommendations" },
  { id: "contact", label: "Contact" },
]

export function App({ importedData }: AppProps) {
  return (
    <div className="relative">
      <TopNav name={importedData.Name} />
      <SectionRail sections={SECTIONS} />
      <HeroSection data={importedData} />
      <ExperienceSection jobs={importedData.Experiance} />
      <ProjectsSection projects={importedData.Projects} />
      <SkillsSection jobs={importedData.Experiance} />
      <RecommendationsSection
        recommendations={importedData.Recomendations}
        jobs={importedData.Experiance}
      />
      <ContactSection
        name={importedData.Name}
        contact={importedData.Contact}
      />
    </div>
  )
}

export default App
