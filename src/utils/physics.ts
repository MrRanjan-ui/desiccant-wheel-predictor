/**
 * Physics utilities for psychrometrics and pressure drop calculations.
 * All formulas use standard SI units or standard HVAC conventions.
 */

export const P_ATM = 101325; // Standard atmospheric pressure in Pa
export const CP_AIR = 1.006; // Specific heat capacity of dry air in kJ/(kg·K)
export const CP_VAPOR = 1.86; // Specific heat capacity of water vapor in kJ/(kg·K)
export const H_FG = 2501.0; // Latent heat of vaporization of water in kJ/kg
export const AIR_DENSITY = 1.204; // Dry air density at 20°C in kg/m³
export const DYNAMIC_VISCOSITY = 1.85e-5; // Dynamic viscosity of air at 25°C in Pa·s

/**
 * Calculates saturation vapor pressure using Tetens equation.
 * @param tempC Temperature in °C
 * @returns Saturation vapor pressure in Pa
 */
export function calculateSatVaporPressure(tempC: number): number {
  return 610.78 * Math.exp((17.27 * tempC) / (tempC + 237.3));
}

/**
 * Calculates humidity ratio (humidity by mass) of air.
 * @param tempC Temperature in °C
 * @param rhPercent Relative humidity in % (0 - 100)
 * @returns Humidity ratio (Y) in kg of water / kg of dry air
 */
export function calculateHumidityRatio(tempC: number, rhPercent: number): number {
  const pSat = calculateSatVaporPressure(tempC);
  const pVapor = pSat * (Math.min(100, Math.max(0, rhPercent)) / 100);
  
  // Guard against division by zero if vapor pressure equals atmospheric pressure
  if (pVapor >= P_ATM) {
    return 0.62194 * (pVapor / (P_ATM - pVapor + 0.1));
  }
  
  return 0.62194 * (pVapor / (P_ATM - pVapor));
}

/**
 * Calculates relative humidity from temperature and humidity ratio.
 * @param tempC Temperature in °C
 * @param humidityRatio Humidity ratio in kg/kg dry air
 * @returns Relative humidity in % (0 - 100)
 */
export function calculateRH(tempC: number, humidityRatio: number): number {
  const pSat = calculateSatVaporPressure(tempC);
  const pVapor = (humidityRatio * P_ATM) / (0.62194 + humidityRatio);
  
  const rh = (pVapor / pSat) * 100;
  return Math.min(100, Math.max(0, rh));
}

/**
 * Calculates moist air enthalpy in kJ/kg dry air.
 * @param tempC Temperature in °C
 * @param humidityRatio Humidity ratio in kg/kg dry air
 * @returns Air enthalpy in kJ/kg dry air
 */
export function calculateEnthalpy(tempC: number, humidityRatio: number): number {
  return CP_AIR * tempC + humidityRatio * (CP_VAPOR * tempC + H_FG);
}

/**
 * Calculates pressure drop across the desiccant wheel matrix.
 * Assumes laminar flow inside sinusoidal or triangular channels.
 * Formula: Delta P = f * (L / D_h) * (rho * v^2 / 2)
 * For laminar sinusoidal channels, f * Re = 16.0
 * Leads to simplified linear equation in terms of velocity:
 * Delta P = (8 * viscosity * L_m * v) / D_h^2
 * @param thicknessMm Wheel thickness in mm
 * @param velocityMs Air face velocity in m/s
 * @param channelHeightMm Tri-sinusoidal channel height in mm
 * @returns Pressure drop in Pa
 */
export function calculatePressureDrop(
  thicknessMm: number,
  velocityMs: number,
  channelHeightMm: number
): number {
  // Convert mm to meters
  const L = thicknessMm / 1000;
  // Hydraulic diameter is typically approx 0.7 * channel height for sinusoidal shape
  const Dh = (0.7 * channelHeightMm) / 1000;
  
  // Avoid division by zero
  if (Dh <= 0) return 0;

  // Pressure drop = (8 * viscosity * L * v) / Dh^2
  const dp = (8 * DYNAMIC_VISCOSITY * L * velocityMs) / (Dh * Dh);
  return Math.max(0.1, dp);
}

/**
 * Calculates the thermal Coefficient of Performance (COP) of the desiccant dehumidification cycle.
 * Defined as (Moisture removed * Heat of vaporization) / (Regeneration heat input)
 * @param processMassFlowKgS Process dry air mass flow rate in kg/s
 * @param regMassFlowKgS Regeneration dry air mass flow rate in kg/s
 * @param inletY Inlet process humidity ratio in kg/kg dry air
 * @param outletY Outlet process humidity ratio in kg/kg dry air
 * @param inletT Inlet process temperature in °C
 * @param regT Regeneration inlet temperature in °C
 * @returns Coefficient of performance (dimensionless)
 */
export function calculateCOP(
  processMassFlowKgS: number,
  regMassFlowKgS: number,
  inletY: number,
  outletY: number,
  inletT: number,
  regT: number
): number {
  if (inletT >= regT || regMassFlowKgS <= 0 || processMassFlowKgS <= 0) {
    return 0;
  }
  
  const moistureRemovedKgS = processMassFlowKgS * Math.max(0, inletY - outletY);
  const coolingPowerKW = moistureRemovedKgS * H_FG; // kg/s * kJ/kg = kW
  
  // Heat required to heat regeneration air from ambient (assumed process inlet temperature) to regeneration temperature
  const heatingPowerKW = regMassFlowKgS * CP_AIR * (regT - inletT); // kg/s * kJ/kg.K * K = kW
  
  if (heatingPowerKW <= 0) return 0;
  
  return coolingPowerKW / heatingPowerKW;
}
