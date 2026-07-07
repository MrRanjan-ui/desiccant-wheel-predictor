import { useState, useEffect, useRef } from 'react';
import katex from 'katex';
import { Card } from '../ui/Card';

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
    <Card
      title="Governing Mathematical Model Equations"
      subtitle="Fundamental heat and mass transfer conservation laws of the rotary system"
      headerActions={
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 text-[13px] font-semibold text-[#1E4E79] border border-[#1E4E79] rounded-[4px] bg-[#FFFFFF] hover:bg-[#F2F4F7] transition-colors"
        >
          {isOpen ? 'Collapse Technical Report' : 'Expand Technical Report'}
        </button>
      }
    >
      {!isOpen ? (
        <div className="text-center py-2 text-[14px] text-[#6B7280]">
          Governing balance equations, adsorption kinetics, and pressure drop equations are collapsed. Click expand to view the technical report.
        </div>
      ) : (
        <div className="space-y-6 text-left text-[14px] text-[#2D3748] leading-relaxed divide-y divide-[#D6D9DE]">
          
          {/* Section 1: Mass Balance */}
          <div className="pt-2">
            <h4 className="text-[15px] font-bold text-[#1E4E79] mb-2">1. Conservation of Mass (Moisture Balance)</h4>
            <p className="mb-3">
              The conservation of water vapor inside the process or regeneration air channel and the solid desiccant coating matrix is governed by:
            </p>
            <div className="my-4 overflow-x-auto py-2 bg-[#F2F4F7] px-4 rounded-[4px] border border-[#D6D9DE]">
              <Latex
                block
                math="\rho_a v \frac{\partial Y}{\partial x} + \rho_a \frac{\partial Y}{\partial t} + \rho_d \left(\frac{1 - \epsilon}{\epsilon}\right) \frac{\partial q}{\partial t} = 0"
              />
            </div>
            <p className="text-[12px] text-[#6B7280]">
              Where <Latex math="Y" /> is the air humidity ratio (<Latex math="\text{kg}_{H_2O}/\text{kg}_{dry\_air}" />), <Latex math="q" /> is the water content of the desiccant matrix (<Latex math="\text{kg}_{H_2O}/\text{kg}_{desiccant}" />), <Latex math="\rho_a" /> and <Latex math="\rho_d" /> represent air and desiccant dry densities, <Latex math="v" /> is the air velocity, and <Latex math="\epsilon" /> is the channels voids porosity ratio.
            </p>
          </div>

          {/* Section 2: Energy Balance */}
          <div className="pt-4">
            <h4 className="text-[15px] font-bold text-[#1E4E79] mb-2">2. Conservation of Energy (Enthalpy Balance)</h4>
            <p className="mb-3">
              The temperature field in the fluid air stream and the solid matrix includes sensible heat transfer and the phase-change release of heat of adsorption:
            </p>
            <div className="my-4 overflow-x-auto py-2 bg-[#F2F4F7] px-4 rounded-[4px] border border-[#D6D9DE]">
              <Latex
                block
                math="\rho_a v \frac{\partial h}{\partial x} + \rho_a \frac{\partial h}{\partial t} + \rho_d \left(\frac{1 - \epsilon}{\epsilon}\right) \frac{\partial H_d}{\partial t} = 0"
              />
            </div>
            <p className="text-[12px] text-[#6B7280]">
              Where <Latex math="h" /> is moist air enthalpy (<Latex math="h = c_{pa} T + Y(c_{pv} T + h_{fg})" />), and <Latex math="H_d" /> is the desiccant solid phase enthalpy (<Latex math="H_d = c_{pd} T_d + q c_{pw} T_d - q \Delta H_{ads}" />) with heat of adsorption <Latex math="\Delta H_{ads}" />.
            </p>
          </div>

          {/* Section 3: Adsorption Kinetics */}
          <div className="pt-4">
            <h4 className="text-[15px] font-bold text-[#1E4E79] mb-2">3. Interphase Heat and Mass Transfer Kinetics</h4>
            <p className="mb-3">
              Coupling between the fluid phase and solid phase is defined by convective heat and mass transfer coefficients:
            </p>
            <div className="my-4 overflow-x-auto py-2 bg-[#F2F4F7] px-4 rounded-[4px] border border-[#D6D9DE] grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-[12px] font-semibold text-[#6B7280] block mb-1">Mass Transfer:</span>
                <Latex
                  block
                  math="\rho_d \frac{\partial q}{\partial t} = k_m a_v (Y_a - Y_{eq}(T_d, q))"
                />
              </div>
              <div>
                <span className="text-[12px] font-semibold text-[#6B7280] block mb-1">Heat Transfer:</span>
                <Latex
                  block
                  math="\rho_d c_{pd} \frac{\partial T_d}{\partial t} = h_c a_v (T_a - T_d) + \rho_d \Delta H_{ads} \frac{\partial q}{\partial t}"
                />
              </div>
            </div>
            <p className="text-[12px] text-[#6B7280]">
              Where <Latex math="k_m" /> is the mass transfer coefficient, <Latex math="h_c" /> is the convective heat transfer coefficient, <Latex math="a_v" /> is the specific transfer surface area per unit volume, and <Latex math="Y_{eq}" /> is the equilibrium humidity ratio at the desiccant surface.
            </p>
          </div>

          {/* Section 4: Sorption Isotherm */}
          <div className="pt-4">
            <h4 className="text-[15px] font-bold text-[#1E4E79] mb-2">4. Desiccant Sorption Equilibrium Isotherm</h4>
            <p className="mb-3">
              For silica gel Type 1 desiccant, the equilibrium state <Latex math="q_{eq}" /> is related to the relative humidity (<Latex math="\phi" />) near the matrix surface using a modified Langmuir model:
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
            <h4 className="text-[15px] font-bold text-[#1E4E79] mb-2">5. Hydraulic Resistive Pressure Drop (Fanning Equation)</h4>
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
    </Card>
  );
}
export default EquationSection;
