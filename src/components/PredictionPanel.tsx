import type { PredictionOutputs } from '../types';
import { Card } from '../ui/Card';

interface PredictionPanelProps {
  outputs: PredictionOutputs | null;
}

export function PredictionPanel({ outputs }: PredictionPanelProps) {
  if (!outputs) {
    return (
      <Card
        title="Performance Prediction Outputs"
        subtitle="Operational metrics from psychrometric mass & energy models"
      >
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#D6D9DE] rounded-[6px] bg-[#F2F4F7]">
          <span className="text-[15px] font-medium text-[#6B7280]">
            No prediction available.
          </span>
          <p className="text-[12px] text-[#6B7280] mt-1 max-w-[280px]">
            Please enter your parameters in the input panel and click "Predict Performance" to execute the simulation.
          </p>
        </div>
      </Card>
    );
  }

  const {
    outletTemp,
    outletHumidityRatio,
    outletRH,
    moistureRemovalRate,
    moistureRemovalRatio,
    effectivenessTemp,
    effectivenessHumidity,
    pressureDrop,
    cop
  } = outputs;

  return (
    <Card
      title="Performance Prediction Outputs"
      subtitle="Operational metrics from psychrometric mass & energy models"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Outlet Temp */}
        <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#FFFFFF] text-left">
          <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
            Outlet Temperature
          </span>
          <span className="text-[22px] font-bold text-[#243447] block mt-1">
            {outletTemp} <span className="text-[15px] font-medium text-[#6B7280]">°C</span>
          </span>
          <span className="text-[11px] text-[#6B7280] mt-1 block">
            Process air exiting state.
          </span>
        </div>

        {/* Outlet Humidity Ratio & RH */}
        <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#FFFFFF] text-left">
          <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
            Outlet Humidity
          </span>
          <span className="text-[22px] font-bold text-[#243447] block mt-1">
            {outletHumidityRatio} <span className="text-[15px] font-medium text-[#6B7280]">g/kg</span>
          </span>
          <span className="text-[11px] text-[#6B7280] mt-1 block">
            Relative humidity: <span className="font-semibold text-[#2D3748]">{outletRH}%</span>
          </span>
        </div>

        {/* Moisture Removal Ratio */}
        <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#FFFFFF] text-left">
          <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
            Moisture Removal Ratio
          </span>
          <span className="text-[22px] font-bold text-[#243447] block mt-1">
            {moistureRemovalRatio} <span className="text-[15px] font-medium text-[#6B7280]">g/kg</span>
          </span>
          <span className="text-[11px] text-[#6B7280] mt-1 block">
            Diff: (Y_in - Y_out).
          </span>
        </div>

        {/* Moisture Removal Rate */}
        <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#FFFFFF] text-left">
          <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
            Moisture Removal Rate
          </span>
          <span className="text-[22px] font-bold text-[#2E7D32] block mt-1">
            {moistureRemovalRate} <span className="text-[15px] font-medium text-[#6B7280]">kg/h</span>
          </span>
          <span className="text-[11px] text-[#6B7280] mt-1 block">
            Total water mass rate extracted.
          </span>
        </div>

        {/* Wheel Effectiveness */}
        <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#FFFFFF] text-left">
          <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
            Wheel Effectiveness
          </span>
          <span className="text-[22px] font-bold text-[#1E4E79] block mt-1">
            {effectivenessHumidity} <span className="text-[15px] font-medium text-[#6B7280]">%</span>
          </span>
          <span className="text-[11px] text-[#6B7280] mt-1 block">
            Thermal efficiency: <span className="font-semibold text-[#2D3748]">{effectivenessTemp}%</span>
          </span>
        </div>

        {/* Pressure Drop */}
        <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#FFFFFF] text-left">
          <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
            Pressure Drop (ΔP)
          </span>
          <span className="text-[22px] font-bold text-[#C62828] block mt-1">
            {pressureDrop} <span className="text-[15px] font-medium text-[#6B7280]">Pa</span>
          </span>
          <span className="text-[11px] text-[#6B7280] mt-1 block">
            Air flow resistive head loss.
          </span>
        </div>

        {/* COP (Coefficient of Performance) */}
        <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#FFFFFF] text-left sm:col-span-2 lg:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
                Thermal Coefficient of Performance (COP_th)
              </span>
              <span className="text-[24px] font-extrabold text-[#1E4E79] block mt-1">
                {cop}
              </span>
            </div>
            <div className="text-[12px] text-[#6B7280] max-w-md sm:text-right">
              Ratio of the cooling equivalent of desiccant dehumidification (water vapor latent heat of vaporization) to the sensible heating input of the regeneration process.
            </div>
          </div>
        </div>

      </div>
    </Card>
  );
}
export default PredictionPanel;
