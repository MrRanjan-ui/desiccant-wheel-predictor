export interface PredictionInputs {
  inletTemp: number; // °C
  relativeHumidity: number; // %
  airVelocity: number; // m/s
  wheelSpeed: number; // RPM
  regTemp: number; // °C
  wheelThickness: number; // mm
  channelHeight: number; // mm
  processFlowRate: number; // m³/h
  regFlowRate: number; // m³/h
}

export interface PredictionOutputs {
  outletTemp: number; // °C
  outletHumidityRatio: number; // g/kg dry air
  outletRH: number; // %
  moistureRemovalRate: number; // kg/h (water removed)
  moistureRemovalRatio: number; // g/kg (inlet Y - outlet Y)
  effectivenessTemp: number; // %
  effectivenessHumidity: number; // %
  pressureDrop: number; // Pa
  cop: number; // Coefficient of Performance (thermal)
}

export interface ModelMetrics {
  selectedModel: string;
  trainingAccuracy: number; // %
  rmse: number;
  r2Score: number;
  datasetSize: number;
  predictionTime: number; // ms
}

export interface ChartDataPoint {
  parameterValue: number;
  outletTemp: number;
  outletRH: number;
  moistureRemovalRatio: number;
  pressureDrop: number;
}

export interface ChartSeries {
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  data: ChartDataPoint[];
}
