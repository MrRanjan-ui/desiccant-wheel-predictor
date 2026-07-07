import type { PredictionOutputs } from '../types';

interface PredictionPanelProps {
  outputs: PredictionOutputs | null;
}

export function PredictionPanel({ outputs }: PredictionPanelProps) {
  if (!outputs) {
    return (
      <div className="flex flex-col h-full bg-white select-none">
        <div className="border-b border-[#D6D9DE] px-4 py-3 bg-[#E9ECEF]">
          <h3 className="text-[14px] font-bold text-[#2D3748] uppercase tracking-wider">
            📊 Simulation Console (Calculated States)
          </h3>
          <p className="text-[11px] text-[#6B7280] mt-0.5 font-normal">
            Operational metrics from psychrometric mass & energy models
          </p>
        </div>
        <div className="p-12 flex flex-col items-center justify-center text-center flex-1 border border-dashed border-[#D6D9DE] m-5 rounded-[4px] bg-[#F8FAFC]">
          <span className="text-[15px] font-medium text-[#6B7280]">
            No active prediction available.
          </span>
          <p className="text-[12px] text-[#6B7280] mt-1 max-w-[280px]">
            Please enter parameters in the Control Panel and click "Predict Performance" to execute the surrogate model.
          </p>
        </div>
      </div>
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
    <div className="flex flex-col bg-white select-none">
      <div className="border-b border-[#D6D9DE] px-4 py-3 bg-[#E9ECEF]">
        <h3 className="text-[14px] font-bold text-[#2D3748] uppercase tracking-wider">
          📊 Simulation Console (Calculated States)
        </h3>
        <p className="text-[11px] text-[#6B7280] mt-0.5 font-normal">
          Operational metrics from psychrometric mass & energy models
        </p>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Outlet Temp */}
          <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#F8FAFC] text-left">
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
          <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#F8FAFC] text-left">
            <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
              Outlet Humidity Ratio
            </span>
            <span className="text-[22px] font-bold text-[#243447] block mt-1">
              {outletHumidityRatio} <span className="text-[15px] font-medium text-[#6B7280]">g/kg</span>
            </span>
            <span className="text-[11px] text-[#6B7280] mt-1 block">
              Outlet Relative Humidity: <b>{outletRH}%</b>
            </span>
          </div>

          {/* Moisture Removal Ratio */}
          <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#F8FAFC] text-left">
            <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
              Humidity Drop (ΔY)
            </span>
            <span className="text-[22px] font-bold text-[#1E4E79] block mt-1">
              {moistureRemovalRatio} <span className="text-[15px] font-medium text-[#6B7280]">g/kg</span>
            </span>
            <span className="text-[11px] text-[#6B7280] mt-1 block">
              Process humidity reduction.
            </span>
          </div>

          {/* Moisture Removal Rate */}
          <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#F8FAFC] text-left">
            <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
              Moisture Extraction
            </span>
            <span className="text-[22px] font-bold text-[#1E4E79] block mt-1">
              {moistureRemovalRate} <span className="text-[15px] font-medium text-[#6B7280]">kg/h</span>
            </span>
            <span className="text-[11px] text-[#6B7280] mt-1 block">
              Absolute hourly water mass removed.
            </span>
          </div>

          {/* Thermal Effectiveness */}
          <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#F8FAFC] text-left">
            <span className="text-[12px] font-semibold text-[#6B7280] tracking-wider uppercase block">
              Wheel Efficiencies
            </span>
            <span className="text-[22px] font-bold text-[#243447] block mt-1">
              {effectivenessHumidity} <span className="text-[15px] font-medium text-[#6B7280]">%</span>
            </span>
            <span className="text-[11px] text-[#6B7280] mt-1 block">
              Thermal Temp Rise Eff: <b>{effectivenessTemp}%</b>
            </span>
          </div>

          {/* Pressure Drop */}
          <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#F8FAFC] text-left">
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
          <div className="border border-[#D6D9DE] rounded-[4px] p-4 bg-[#F8FAFC] text-left sm:col-span-2 lg:col-span-3">
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
      </div>
    </div>
  );
}
export default PredictionPanel;
