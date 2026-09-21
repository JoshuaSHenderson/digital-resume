export interface IImportedData {
  Name: string
  Headline: string
  Location: string
  Summary: string
  Contact: IContactMethod
  Highlights: IHighlight[]
  Range: IRange
  Experiance: IJob[]
  Projects: IProject[]
  SoftSkills: ISoftSkill[]
  HardSkills: IHardSkill[]
  Education: IEducation
  Recomendations: IRecommendation[]
}

export interface IContactMethod {
  LinkedIn: IContact,
  Email: IContact,
  Phone: IContact,
  GitHub: IContact
}



export interface IJob {
  Id: string
  Title: string
  Company: string
  DateStart: Date
  DateEnd: Date
  JobDescription: string
  Descriptions: string[]
  Skills: string[]
  Recommendations?: IRecommendation[]
}

export interface IRecommendation {
  Name: string
  Title: string
  Relationship: string
  Date: string
  Text: string
  /** Ids of the IJob entries this recommendation speaks to. */
  LinkedJob?: number[]
}

/** A hero stat card. Value is free text so "30+" and "13" both work. */
export interface IHighlight {
  Value: string
  Label: string
}

/** The two ends of the career, shown as one wide card under the stats. */
export interface IRange {
  Label: string
  From: string
  To: string
}

export interface ISoftSkill {
  Name: string
  Description: string
}

export interface IHardSkill {
  Application: string
  Details: string
}

export interface IEducation {
  School: string
  Degree: string
  GPA: string
  DateEnd: string
}

export interface IProject {
  Title: string
  Tagline: string
  Description: string
  DateStart: Date
  DateEnd: Date
  Highlights: string[]
  Skills: string[]
  Links: ILink[]
}

export interface ILink {
  Label: string
  Url: string
}

export interface ISkill {
  Name: string
  Level: string
}

export interface IContact {
  Logo: string
  Text: string
  Link: string
}
