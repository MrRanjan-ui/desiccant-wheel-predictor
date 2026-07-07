import { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import type { PredictionInputs, PredictionOutputs } from '../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface AIAdvisorProps {
  inputs: PredictionInputs;
  outputs: PredictionOutputs;
}

export function AIAdvisor({ inputs, outputs }: AIAdvisorProps) {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [apiKeySet, setApiKeySet] = useState<boolean>(false);

  // Check if API key is defined in the client build environment
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  useEffect(() => {
    setApiKeySet(!!apiKey);
    // Reset advice when outputs change to force re-evaluation
    setAdvice('');
    setError('');
  }, [inputs, outputs, apiKey]);

  // Offline rule-based warnings if no API key is set
  const getOfflineAdvice = () => {
    const warnings: string[] = [];
    if (inputs.airVelocity > 3.0) {
      warnings.push("⚠️ High Process Air Velocity: Air velocity is above 3.0 m/s. This drastically reduces NTU (residence contact time) leading to lower moisture extraction efficiency. Fan pressure drop is also high.");
    }
    if (inputs.wheelSpeed > 20) {
      warnings.push("⚠️ High Wheel Speed (RPM): Operating above 20 RPM increases sensible heat carryover from the regeneration sector to the process stream, heating up process discharge air unnecessarily.");
    } else if (inputs.wheelSpeed < 4) {
      warnings.push("⚠️ Low Wheel Speed (RPM): Operating below 4 RPM can saturate the silica gel pores before completing a full rotation, drastically reducing total moisture removal.");
    }
    if (inputs.regTemp < 80) {
      warnings.push("⚠️ Low Regeneration Temperature: Operating below 80°C does not provide sufficient vapor pressure differential to fully reactivate the silica gel pores, keeping dehumidification efficiency low.");
    }
    if (outputs.cop < 0.2) {
      warnings.push("⚠️ Low Thermal COP: The thermal coefficient of performance is low. Consider reducing regeneration heat input or optimizing air flows to reduce waste energy.");
    }
    
    if (warnings.length === 0) {
      return "✅ System parameters are operating within balanced, optimal ranges. To run deep generative AI physics analyses, please configure the `VITE_GEMINI_API_KEY` key.";
    }
    return warnings.join('\n\n');
  };

  const handleAIAnalysis = async () => {
    if (!apiKey) {
      setError('API key is missing.');
      return;
    }

    setLoading(true);
    setError('');
    setAdvice('');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      const prompt = `
        You are a senior Mechanical Research Engineer specializing in HVAC, desiccant dehumidification systems, and thermal systems optimization.
        Analyze the following operational parameters of a silica gel rotary desiccant wheel:

        [INPUT PARAMETERS]
        - Process Inlet Air Temp: ${inputs.inletTemp} °C
        - Process Inlet Relative Humidity: ${inputs.relativeHumidity} %
        - Air Face Velocity: ${inputs.airVelocity} m/s
        - Wheel Speed: ${inputs.wheelSpeed} RPM
        - Regeneration Reactivation Temp: ${inputs.regTemp} °C
        - Wheel Thickness: ${inputs.wheelThickness} mm
        - Channel Hydraulic Height: ${inputs.channelHeight} mm
        - Process Air Volumetric Flow: ${inputs.processFlowRate} m³/h
        - Regeneration Air Volumetric Flow: ${inputs.regFlowRate} m³/h

        [COMPUTED OUTPUT METRICS]
        - Process Outlet Temperature: ${outputs.outletTemp} °C
        - Process Outlet Humidity Ratio: ${outputs.outletHumidityRatio} g/kg
        - Process Outlet Relative Humidity: ${outputs.outletRH} %
        - Moisture Removed Ratio: ${outputs.moistureRemovalRatio} g/kg
        - Moisture Removal Rate: ${outputs.moistureRemovalRate} kg/h
        - Thermal COP: ${outputs.cop}
        - Pressure Drop: ${outputs.pressureDrop} Pa
        - Temp Effectiveness: ${outputs.effectivenessTemp} %
        - Humidity Effectiveness: ${outputs.effectivenessHumidity} %

        Provide a concise 3-bullet-point thermodynamic analysis:
        1. Diagnose the primary performance bottleneck of the current run (e.g. residence time limit, sensible carryover, regeneration energy waste, or pore saturation).
        2. Give one concrete design improvement recommendation (e.g. specific RPM adjustment, velocity scale, or regeneration heat input level).
        3. Highlight the thermodynamic COP impact of that recommendation.
        Keep the response strictly technical, minimal, and engineering-focused. Do not add marketing jargon. Return raw text with simple bullet points.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAdvice(response.text());
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to generate AI advice from Gemini.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="AI Thermal Design Advisor">
      <div className="space-y-4 text-left">
        {!advice && !loading && (
          <div className="space-y-3">
            <p className="text-[13px] text-[#6B7280]">
              Query the Gemini generative AI model to analyze your current cycle states, check efficiency bounds, and receive physical optimization advice.
            </p>
            
            {/* API Status Notice */}
            {!apiKeySet && (
              <div className="p-3 bg-[#FFF9E6] border border-[#FFE0B2] text-[#B78103] text-[12px] rounded-[4px] font-sans">
                <b>💡 Offline Mode:</b> No VITE_GEMINI_API_KEY detected in the environment. Clicking "Analyze Cycle" will display local rule-based warning metrics. To activate active AI analysis, configure the variable in Vercel or locally.
              </div>
            )}
            
            <div className="pt-1">
              <Button 
                variant="primary" 
                onClick={apiKeySet ? handleAIAnalysis : () => setAdvice(getOfflineAdvice())}
                className="text-[13px] px-4 py-2"
              >
                {apiKeySet ? 'Analyze Cycle with Gemini AI' : 'Run Offline Advisor Analysis'}
              </Button>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center gap-3 py-4 text-[13px] text-[#1E4E79] font-medium">
            {/* Spinning Indicator */}
            <svg className="animate-spin h-5 w-5 text-[#1E4E79]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating thermal system analysis...
          </div>
        )}

        {error && (
          <div className="p-3 bg-[#FFEBEE] border border-[#FFCDD2] text-[#C62828] text-[13px] rounded-[4px]">
            <b>Error:</b> {error}
          </div>
        )}

        {advice && (
          <div className="space-y-3 animate-fade-in text-[13px] leading-relaxed text-[#2D3748]">
            <div className="bg-[#F8F9FA] border border-[#D6D9DE] rounded-[4px] p-3 font-sans whitespace-pre-line shadow-inner">
              {advice}
            </div>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setAdvice('')} 
                className="text-[12px] px-3 py-1.5"
              >
                Reset Analysis
              </Button>
              {apiKeySet && (
                <Button 
                  variant="primary" 
                  onClick={handleAIAnalysis} 
                  className="text-[12px] px-3 py-1.5"
                >
                  Recalculate
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
export default AIAdvisor;
