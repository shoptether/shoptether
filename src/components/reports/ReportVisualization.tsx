import { BarChart, LineChart } from '@tremor/react'
import type { Report, ReportType } from '@/lib/types'

interface ReportVisualizationProps {
  type: ReportType
  data: Report
}

export const ReportVisualization: React.FC<ReportVisualizationProps> = ({ type, data }) => {
  switch (type) {
    case 'TOP_REVENUE_PRODUCTS':
    case 'TOP_SELLING_PRODUCTS':
      return (
        <BarChart
          data={data.data.datasets.map(dataset => ({
            name: dataset.name,
            ...data.data.labels.reduce((acc, cat, idx) => ({
              ...acc,
              [cat]: dataset.data[idx]
            }), {})
          }))}
          index="name"
          categories={data.data.labels}
          title={data.title}
        />
      )
    case 'HOURLY_PATTERNS':
    case 'WEEKLY_TRENDS':
    case 'MONTHLY_TRENDS':
      return (
        <LineChart
          data={data.data.datasets.map(dataset => ({
            name: dataset.name,
            ...data.data.labels.reduce((acc, cat, idx) => ({
              ...acc,
              [cat]: dataset.data[idx]
            }), {})
          }))}
          index="name"
          categories={data.data.labels}
          title={data.title}
        />
      )
    default:
      return <div>No visualization available for this report type.</div>
  }
}