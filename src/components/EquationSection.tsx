import { useState, useEffect, useRef } from 'react';
import katex from 'katex';

interface LatexProps {
  math: string;
  block?: boolean;
}

// Inline custom LaTeX component utilizing the native KaTeX library
function Latex({ math, block = false }: LatexProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(math, ref.current, {
          displayMode: block,
          throwOnError: false
        });
      } catch (err) {
        console.error('KaTeX rendering error:', err);
      }
    }
  }, [math, block]);

  return <span ref={ref} className="font-mono text-[#243447]" />;
}

export function EquationSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#D6D9DE] rounded-[4px] bg-white shadow-sm overflow-hidden select-none font-sans">
      <div className="border-b border-[#D6D9DE] px-4 py-3 bg-[#E9ECEF] flex items-center justify-between">
        <div>
          <h3 className="text-[14px] font-bold text-[#2D3748] uppercase tracking-wider">
            📚 Governing Mathematical Model Equations
          </h3>
          <p className="text-[11px] text-[#6B7280] mt-0.5 font-normal">
            Fundamental heat and mass transfer conservation laws of the rotary system
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1.5 text-[12px] font-bold text-[#1E4E79] border border-[#1E4E79] rounded-[4px] bg-[#FFFFFF] hover:bg-[#F2F4F7] transition-colors cursor-pointer"
        >
          {isOpen ? 'Collapse Equations' : 'Expand Equations'}
        </button>
      </div>
      <div className="p-5">
        {!isOpen ? (
          <div className="text-center py-2 text-[13px] text-[#6B7280]">
            Governing balance equations, adsorption kinetics, and pressure drop equations are collapsed. Click "Expand Equations" to view the mathematical details.
          </div>
        ) : (
          <div className="space-y-6 text-left text-[13.5px] text-[#2D3748] leading-relaxed divide-y divide-[#D6D9DE]">
            
            {/* Section 1: Mass Balance */}
            <div className="pt-2">
              <h4 className="text-[14px] font-bold text-[#1E4E79] mb-2">1. Conservation of Mass (Moisture Balance)</h4>
              <p className="mb-3">
                The conservation of water vapor inside the process or regeneration air channel and the solid desiccant coating matrix is governed by:
              </p>
              <div className="my-4 overflow-x-auto py-2 bg-[#F2F4F7] px-4 rounded-[4px] border border-[#D6D9DE]">
                <Latex
                  block
                  math="\rho_a A_{ch} \frac{\partial Y}{\partial t} + \rho_a A_{ch} v \frac{\partial Y}{\partial x} = P_{ch} k_m (Y_m - Y)"
                />
              </div>
              <p className="text-[12px] text-[#6B7280]">
                Where <Latex math="\rho_a" /> is the air density, <Latex math="A_{ch}" /> is the channel area, <Latex math="v" /> is the air face velocity, <Latex math="k_m" /> is the mass transfer coefficient, and <Latex math="Y_m" /> is the humidity ratio at the desiccant surface.
              </p>
            </div>

            {/* Section 2: Energy Balance */}
            <div className="pt-4">
              <h4 className="text-[14px] font-bold text-[#1E4E79] mb-2">2. Conservation of Energy (Enthalpy Balance)</h4>
              <p className="mb-3">
                The coupled thermal energy balance accounts for sensible heating of the air and the release of heat of adsorption within the solid desiccant pores:
              </p>
              <div className="my-4 overflow-x-auto py-2 bg-[#F2F4F7] px-4 rounded-[4px] border border-[#D6D9DE]">
                <Latex
                  block
                  math="\rho_a A_{ch} C_{p,a} \frac{\partial T}{\partial t} + \rho_a A_{ch} v C_{p,a} \frac{\partial T}{\partial x} = P_{ch} h_{c} (T_d - T) + P_{ch} k_m H_{ads} (Y_m - Y)"
                />
              </div>
              <p className="text-[12px] text-[#6B7280]">
                Where <Latex math="C_{p,a}" /> is the specific heat capacity of moist air, <Latex math="h_c" /> is the convective heat transfer coefficient, <Latex math="T_d" /> is the desiccant solid temperature, and <Latex math="H_{ads}" /> is the exothermic heat of adsorption.
              </p>
            </div>

            {/* Section 3: Adsorption Kinetics */}
            <div className="pt-4">
              <h4 className="text-[14px] font-bold text-[#1E4E79] mb-2">3. Solid Phase Adsorption Kinetics</h4>
              <p className="mb-3">
                The rate of moisture accumulation inside the solid desiccant mass is modeled using the Linear Driving Force (LDF) model:
              </p>
              <div className="my-4 overflow-x-auto py-2 bg-[#F2F4F7] px-4 rounded-[4px] border border-[#D6D9DE]">
                <Latex
                  block
                  math="\rho_d A_d \frac{\partial q}{\partial t} = P_{ch} k_m (Y - Y_m)"
                />
              </div>
              <p className="text-[12px] text-[#6B7280]">
                Where <Latex math="\rho_d" /> is the desiccant density, <Latex math="A_d" /> is the desiccant coating area, and <Latex math="q" /> is the water content of the desiccant in kg water / kg dry desiccant.
              </p>
            </div>

            {/* Section 4: Adsorption Isotherm */}
            <div className="pt-4">
              <h4 className="text-[14px] font-bold text-[#1E4E79] mb-2">4. Desiccant Sorption Equilibrium (Langmuir Isotherm)</h4>
              <p className="mb-3">
                The equilibrium water content <Latex math="q_{eq}" /> of the silica gel as a function of the local relative humidity <Latex math="\phi" /> is calculated using the Langmuir equation:
              </p>
              <div className="my-4 overflow-x-auto py-2 bg-[#F2F4F7] px-4 rounded-[4px] border border-[#D6D9DE]">
                <Latex
                  block
                  math="q_{eq} = q_{max} \frac{C \cdot \phi}{1 + (C - 1)\phi}"
                />
              </div>
              <p className="text-[12px] text-[#6B7280]">
                Where <Latex math="q_{max} \approx 0.40 \, \text{kg}/\text{kg}" /> is the maximum adsorption capacity, and <Latex math="C \approx 2.5" /> is the equilibrium kinetic factor.
              </p>
            </div>

            {/* Section 5: Friction Factor and Pressure Drop */}
            <div className="pt-4">
              <h4 className="text-[14px] font-bold text-[#1E4E79] mb-2">5. Hydraulic Resistive Pressure Drop (Fanning Equation)</h4>
              <p className="mb-3">
                The pressure loss across the matrix is computed via the Fanning friction factor for laminar flows inside sinusoidal channels:
              </p>
              <div className="my-4 overflow-x-auto py-2 bg-[#F2F4F7] px-4 rounded-[4px] border border-[#D6D9DE]">
                <Latex
                  block
                  math="\Delta P = f \left(\frac{L}{D_h}\right) \frac{\rho v^2}{2} = \left(\frac{16.0}{Re}\right) \left(\frac{L}{D_h}\right) \frac{\rho v^2}{2} = \frac{8 \mu L v}{D_h^2}"
                />
              </div>
              <p className="text-[12px] text-[#6B7280]">
                Where <Latex math="Re = \frac{\rho v D_h}{\mu}" /> is the Reynolds number, <Latex math="D_h" /> is the hydraulic diameter of the channels, <Latex math="\mu" /> is the air dynamic viscosity, and <Latex math="L" /> is the wheel thickness.
              </p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
export default EquationSection;
