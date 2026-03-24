import { formatMonthYearUTC } from "@/lib/format-date"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"

export interface JobCardProps {
  Id: string
  Title: string
  Company: string
  DateStart: Date
  DateEnd: Date
  Descriptions: string[]
}

export function JobCard({
  Title,
  Company,
  DateStart,
  DateEnd,
  Descriptions,
}: JobCardProps) {
  return (
    <Card className="grid min-w-3xl grid-cols-[minmax(0,10rem)_1fr] items-start gap-x-6">
      <CardHeader className="col-start-1 row-start-1 gap-2">
        <CardTitle>{Title}</CardTitle>
        <CardDescription>
          {Company} <br />
          {formatMonthYearUTC(DateStart)} - {formatMonthYearUTC(DateEnd)}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-none col-start-2 row-start-1 border-l border-border pl-6">
        <ul className="list-inside list-disc">
          {Descriptions.map((description, index) => (
            <li key={index}>{description}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
