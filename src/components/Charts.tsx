import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import type { ChartSeries } from '../types';
import { Card } from '../ui/Card';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartsProps {
  velocityData: ChartSeries | null;
  regTempData: ChartSeries | null;
}

export function Charts({ velocityData, regTempData }: ChartsProps) {
  if (!velocityData || !regTempData) {
    return null;
  }

  // 1. Air Velocity Sweep Chart Configuration
  const velocityLabels = velocityData.data.map(d => d.parameterValue.toFixed(1));
  const velocityChartContent = {
    labels: velocityLabels,
    datasets: [
      {
        label: 'Moisture Removal (g/kg)',
        data: velocityData.data.map(d => d.moistureRemovalRatio),
        borderColor: '#1E4E79',
        backgroundColor: '#1E4E79',
        borderWidth: 2,
        pointRadius: 3,
        yAxisID: 'y',
        tension: 0.1
      },
      {
        label: 'Pressure Drop (Pa)',
        data: velocityData.data.map(d => d.pressureDrop),
        borderColor: '#C62828',
        backgroundColor: '#C62828',
        borderWidth: 2,
        pointRadius: 3,
        yAxisID: 'y1',
        tension: 0.1
      }
    ]
  };

  const velocityOptions: ChartOptions<'line'> = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Process Air Velocity (m/s)',
          color: '#2D3748',
          font: { size: 12, weight: 'bold' }
        },
        grid: { color: '#E9ECEF' }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Moisture Removal (g/kg dry air)',
          color: '#1E4E79',
          font: { size: 12, weight: 'bold' }
        },
        grid: { color: '#E9ECEF' }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Pressure Drop (Pa)',
          color: '#C62828',
          font: { size: 12, weight: 'bold' }
        },
        grid: { drawOnChartArea: false } // Avoid overlapping grid lines
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { boxWidth: 12, font: { size: 11 } }
      }
    }
  };

  // 2. Regeneration Temp Sweep Chart Configuration
  const tempLabels = regTempData.data.map(d => d.parameterValue.toFixed(0));
  const tempChartContent = {
    labels: tempLabels,
    datasets: [
      {
        label: 'Outlet Relative Humidity (%)',
        data: regTempData.data.map(d => d.outletRH),
        borderColor: '#1E4E79',
        backgroundColor: '#1E4E79',
        borderWidth: 2,
        pointRadius: 3,
        yAxisID: 'y',
        tension: 0.1
      },
      {
        label: 'Outlet Temperature (°C)',
        data: regTempData.data.map(d => d.outletTemp),
        borderColor: '#D97706',
        backgroundColor: '#D97706',
        borderWidth: 2,
        pointRadius: 3,
        yAxisID: 'y1',
        tension: 0.1
      }
    ]
  };

  const tempOptions: ChartOptions<'line'> = {
    animation: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Regeneration Temperature (°C)',
          color: '#2D3748',
          font: { size: 12, weight: 'bold' }
        },
        grid: { color: '#E9ECEF' }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Outlet RH (%)',
          color: '#1E4E79',
          font: { size: 12, weight: 'bold' }
        },
        grid: { color: '#E9ECEF' }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Outlet Temperature (°C)',
          color: '#D97706',
          font: { size: 12, weight: 'bold' }
        },
        grid: { drawOnChartArea: false }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: { boxWidth: 12, font: { size: 11 } }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      
      {/* Velocity Sweep Chart */}
      <Card
        title="Air Velocity Sensitivity Curve"
        subtitle="Tradeoff between moisture removal effectiveness and hydraulic resistance head-loss"
      >
        <div className="h-[300px] w-full relative">
          <Line data={velocityChartContent} options={velocityOptions} />
        </div>
      </Card>

      {/* Reg Temp Sweep Chart */}
      <Card
        title="Regeneration Temperature Sensitivities"
        subtitle="Impact of reactivation heat on process stream discharge dryness and carryover temperature"
      >
        <div className="h-[300px] w-full relative">
          <Line data={tempChartContent} options={tempOptions} />
        </div>
      </Card>
      
    </div>
  );
}
export default Charts;
