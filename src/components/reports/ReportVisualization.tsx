import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { Report } from '@/lib/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface ReportVisualizationProps {
  type: string
  data: Report
}

export const ReportVisualization: React.FC<ReportVisualizationProps> = ({ type, data }) => {
  const chartData = {
    labels: data.data.labels,
    datasets: data.data.datasets.map(dataset => ({
      label: dataset.name,
      data: dataset.data,
    }))
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: data.title
      },
    },
  }

  switch (type) {
    case 'TOP_REVENUE_PRODUCTS':
    case 'TOP_SELLING_PRODUCTS':
    case 'PAYMENT_METHODS':
    case 'PRODUCT_COMBINATIONS':
      return <Bar data={chartData} options={options} />
    case 'HOURLY_PATTERNS':
    case 'WEEKLY_TRENDS':
    case 'MONTHLY_TRENDS':
      return <Line data={chartData} options={options} />
    default:
      return <div>No visualization available for this report type.</div>
  }
}