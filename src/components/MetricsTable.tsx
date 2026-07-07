import type { ModelMetrics } from '../types';
import { Card } from '../ui/Card';

interface MetricsTableProps {
  metrics: ModelMetrics;
}

export function MetricsTable({ metrics }: MetricsTableProps) {
  return (
    <Card
      title="Machine Learning Surrogate Model Specifications"
      subtitle="Model performance metrics validated against finite-difference numerical solver runs"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[14px] border border-[#D6D9DE] border-collapse">
          <thead>
            <tr className="bg-[#E9ECEF] border-b border-[#D6D9DE]">
              <th className="px-4 py-2 font-bold text-[#2D3748] border-r border-[#D6D9DE] w-1/2">
                Metric / Parameter
              </th>
              <th className="px-4 py-2 font-bold text-[#2D3748]">
                Value / Specification
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#D6D9DE]">
              <td className="px-4 py-2 font-medium text-[#6B7280] border-r border-[#D6D9DE]">
                Surrogate Algorithm
              </td>
              <td className="px-4 py-2 text-[#2D3748] font-mono">
                {metrics.selectedModel}
              </td>
            </tr>
            <tr className="border-b border-[#D6D9DE]">
              <td className="px-4 py-2 font-medium text-[#6B7280] border-r border-[#D6D9DE]">
                Cross-Validation R² Score
              </td>
              <td className="px-4 py-2 text-[#2E7D32] font-semibold font-mono">
                {metrics.r2Score.toFixed(3)}
              </td>
            </tr>
            <tr className="border-b border-[#D6D9DE]">
              <td className="px-4 py-2 font-medium text-[#6B7280] border-r border-[#D6D9DE]">
                Root Mean Squared Error (RMSE)
              </td>
              <td className="px-4 py-2 text-[#2D3748] font-mono">
                {metrics.rmse.toFixed(2)}
              </td>
            </tr>
            <tr className="border-b border-[#D6D9DE]">
              <td className="px-4 py-2 font-medium text-[#6B7280] border-r border-[#D6D9DE]">
                Training Accuracy
              </td>
              <td className="px-4 py-2 text-[#2E7D32] font-semibold font-mono">
                {metrics.trainingAccuracy.toFixed(2)}%
              </td>
            </tr>
            <tr className="border-b border-[#D6D9DE]">
              <td className="px-4 py-2 font-medium text-[#6B7280] border-r border-[#D6D9DE]">
                Training Dataset Size
              </td>
              <td className="px-4 py-2 text-[#2D3748] font-mono">
                {metrics.datasetSize} simulated cases
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-medium text-[#6B7280] border-r border-[#D6D9DE]">
                Surrogate Prediction Latency
              </td>
              <td className="px-4 py-2 text-[#2D3748] font-mono">
                {metrics.predictionTime} ms
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-[11px] text-[#6B7280] mt-3">
        * Note: The surrogate ML model maps the high-dimensional parameter space of desiccant wheels to accelerate design optimizations, bypassing expensive partial differential equations (PDE) solver iterations.
      </div>
    </Card>
  );
}
export default MetricsTable;
