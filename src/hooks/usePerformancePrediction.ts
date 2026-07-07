import { useState, useCallback } from 'react';
import type { PredictionInputs, PredictionOutputs, ModelMetrics, ChartSeries } from '../types';
import {
  predictPerformance,
  getMLModelMetrics,
  generateVelocitySweep,
  generateRegempSweep,
  generateSpeedSweep
} from '../services/predictionModel';

const DEFAULT_INPUTS: PredictionInputs = {
  inletTemp: 30.0,
  relativeHumidity: 60.0,
  airVelocity: 2.0,
  wheelSpeed: 12.0,
  regTemp: 120.0,
  wheelThickness: 200.0,
  channelHeight: 2.0,
  processFlowRate: 500.0,
  regFlowRate: 250.0
};

export function usePerformancePrediction() {
  const [inputs, setInputs] = useState<PredictionInputs>(DEFAULT_INPUTS);
  const [outputs, setOutputs] = useState<PredictionOutputs | null>(null);
  const [sweepParameter, setSweepParameter] = useState<'velocity' | 'regTemp' | 'wheelSpeed'>('velocity');
  const [velocityChartData, setVelocityChartData] = useState<ChartSeries | null>(null);
  const [regTempChartData, setRegTempChartData] = useState<ChartSeries | null>(null);
  const [speedChartData, setSpeedChartData] = useState<ChartSeries | null>(null);
  const [mlMetrics] = useState<ModelMetrics>(getMLModelMetrics());
  const [isCalculated, setIsCalculated] = useState(false);

  const calculate = useCallback((newInputs: PredictionInputs) => {
    // Measure prediction start time
    const start = performance.now();
    const result = predictPerformance(newInputs);
    const end = performance.now();
    
    // Inject calculated duration into ML metrics for visualization
    const predictionTime = Number((end - start).toFixed(2));
    mlMetrics.predictionTime = predictionTime > 0 ? predictionTime : 1.2;

    setInputs(newInputs);
    setOutputs(result);
    setIsCalculated(true);

    // Generate Chart Sweeps
    const vSweep = generateVelocitySweep(newInputs);
    const tSweep = generateRegempSweep(newInputs);
    const sSweep = generateSpeedSweep(newInputs);

    setVelocityChartData({
      title: 'Face Velocity Sweep (0.5 - 5.0 m/s)',
      xAxisLabel: 'Air Velocity (m/s)',
      yAxisLabel: 'Outlet Metrics / Delta P',
      data: vSweep
    });

    setRegTempChartData({
      title: 'Regeneration Temperature Sweep (50 - 160 °C)',
      xAxisLabel: 'Regeneration Temperature (°C)',
      yAxisLabel: 'Outlet Metrics',
      data: tSweep
    });

    setSpeedChartData({
      title: 'Wheel Speed Sweep (1 - 30 RPM)',
      xAxisLabel: 'Wheel Speed (RPM)',
      yAxisLabel: 'Outlet Metrics',
      data: sSweep
    });
  }, [mlMetrics]);

  const reset = useCallback(() => {
    setInputs(DEFAULT_INPUTS);
    setOutputs(null);
    setIsCalculated(false);
    setVelocityChartData(null);
    setRegTempChartData(null);
    setSpeedChartData(null);
  }, []);

  return {
    inputs,
    outputs,
    sweepParameter,
    setSweepParameter,
    velocityChartData,
    regTempChartData,
    speedChartData,
    mlMetrics,
    isCalculated,
    calculate,
    reset,
    defaultValues: DEFAULT_INPUTS
  };
}
export type UsePerformancePredictionReturn = ReturnType<typeof usePerformancePrediction>;
