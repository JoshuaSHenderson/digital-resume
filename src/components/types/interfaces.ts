export interface IJob {
  Id: string
  Title: string
  Company: string
  DateStart: Date
  DateEnd: Date
  Descriptions: string[]
  Skills: string[]
}

export interface IEducation {
  Degree: string
  School: string
  DateStart: Date
  DateEnd: Date
  Descriptions: string[]
}

export interface IProject {
  Title: string
  Description: string
  DateStart: Date
  DateEnd: Date
  Skills: string[]
  Links: string[]
}

export interface ISkill {
  Name: string
  Level: string
}

export interface IContact {
  Name: string
  Email: string
  Phone: string
}
