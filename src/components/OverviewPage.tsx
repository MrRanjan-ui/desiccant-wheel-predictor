import { useState } from 'react';

interface OverviewPageProps {
  onLaunchSimulator: () => void;
}

const AVATAR_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 60 60'><rect width='60' height='60' fill='%23E9ECEF'/><path d='M30 32c5.5 0 10-4.5 10-10S35.5 12 30 12s-10 4.5-10 10 4.5 10 10 10zm0 4c-7.7 0-14 6.3-14 14h28c0-7.7-6.3-14-14-14z' fill='%236B7280'/></svg>";

export function OverviewPage({ onLaunchSimulator }: OverviewPageProps) {
  const [studentImg, setStudentImg] = useState('/student.jpeg');
  const [profImg, setProfImg] = useState('/professor.jpg');

  return (
    <div className="space-y-12 animate-fade-in text-left max-w-[950px] mx-auto bg-white border border-[#D6D9DE] rounded-[4px] p-8 sm:p-12 shadow-sm font-serif text-[#2D3748] leading-relaxed">
      
      {/* ========================================================
          ACADEMIC PAPER HEADER
          ======================================================== */}
      <header className="text-center space-y-6 pb-8 border-b border-[#E2E8F0]">
        <span className="text-[12px] font-bold text-[#1E4E79] tracking-widest uppercase block font-sans">
          National Institute of Technology, Hamirpur — Department of Mechanical Engineering
        </span>
        <h1 className="text-[26px] sm:text-[34px] font-black text-[#1A202C] leading-tight uppercase max-w-[850px] mx-auto">
          Development and Evaluation of a Physics-Informed ML Surrogate Model for Rotary Adsorption Desiccant Wheels
        </h1>
        <p className="text-[14px] text-[#718096] font-sans italic">
          Summer Research Internship Project Report (2026)
        </p>

        {/* AUTHOR BLOCK */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 pt-4 text-left font-sans">
          <div className="flex gap-4 items-center">
            <img
              src={profImg}
              onError={() => setProfImg(AVATAR_FALLBACK)}
              alt="Dr. Laxmikant Yadav"
              className="w-[70px] h-[70px] rounded-full border border-[#D6D9DE] object-cover bg-[#E9ECEF] shrink-0 shadow-sm"
            />
            <div>
              <span className="text-[9px] font-bold text-[#1E4E79] uppercase tracking-wider block">Project Supervisor</span>
              <p className="font-bold text-[#2D3748] text-[15px]">Dr. Laxmikant Yadav</p>
              <p className="text-[#718096] text-[12px]">Assistant Professor</p>
              <p className="text-[#A0AEC0] text-[11px]">NIT Hamirpur</p>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <img
              src={studentImg}
              onError={() => setStudentImg(AVATAR_FALLBACK)}
              alt="Ashish Ranjan"
              className="w-[70px] h-[70px] rounded-full border border-[#D6D9DE] object-cover bg-[#E9ECEF] shrink-0"
            />
            <div>
              <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Lead Researcher</span>
              <p className="font-bold text-[#2D3748] text-[15px]">Ashish Ranjan</p>
              <p className="text-[#718096] text-[12px]">3rd Year, B.Tech Mech</p>
              <p className="text-[#A0AEC0] text-[11px]">NIT Hamirpur</p>
            </div>
          </div>
        </div>

        {/* CTA ROW */}
        <div className="flex justify-center gap-4 pt-4 font-sans">
          <button
            onClick={onLaunchSimulator}
            className="px-6 py-2.5 text-[14px] font-bold bg-[#1E4E79] text-white rounded-[4px] hover:bg-[#153a5c] transition-all cursor-pointer shadow-sm animate-pulse"
          >
            Open Simulator Workbench
          </button>
          <a
            href="#video-presentation"
            className="px-6 py-2.5 text-[14px] font-bold text-[#2D3748] hover:bg-[#F7FAFC] border border-[#D6D9DE] rounded-[4px] transition-colors flex items-center justify-center bg-white shadow-sm"
          >
            Video Documentation
          </a>
        </div>
      </header>

      {/* ========================================================
          VIDEO DISPLAY SECTION
          ======================================================== */}
      <section id="video-presentation" className="space-y-4 py-2 border-b border-[#E2E8F0] font-sans text-center">
        <h3 className="text-[16px] font-bold text-[#1E4E79] uppercase tracking-wide">
          Project Presentation Video
        </h3>
        <p className="text-[13px] text-[#718096] max-w-[650px] mx-auto mt-1">
          Demonstrates the governing equation framework, synthetic data sweeps, and physical validation results.
        </p>
        <div className="max-w-[750px] mx-auto border border-[#D6D9DE] rounded-[4px] overflow-hidden bg-black shadow-md relative">
          <video 
            id="project-explainer-video"
            controls 
            preload="metadata"
            className="w-full h-full aspect-video object-cover"
          >
            <source src="/Desiccant_Wheel_Models.mp4#t=0.001" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* ========================================================
          SECTION 1.0: ABSTRACT & PROJECT SCOPE
          ======================================================== */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          1.0 Abstract & Project Scope
        </h2>
        <div className="space-y-4 text-[15.5px]">
          <p>
            Solid desiccant wheels are critical components in modern HVAC and dehumidification systems, 
            providing deep moisture control in lithium-battery dry rooms (requiring dew points below -40°C), 
            pharmaceutical packaging environments, and high-performance agricultural cold chains. 
            Unlike traditional vapor-compression cooling, desiccant matrices capture moisture in the vapor phase, 
            enabling efficient humidity control without sub-cooling process air below its dewpoint.
          </p>
          <p>
            Traditional computational modeling of rotary adsorption relies on solving highly non-linear, coupled 
            partial differential equations (PDEs) representing mass, momentum, and energy conservation. 
            Because numerical solving of these equations requires iterative finite-difference methods, 
            multi-variable parametric sweeping is computationally expensive. This research resolves this latency 
            by deploying a **Physics-Informed ML Surrogate Model** that acts as an instantaneous solver. The model predicts the independent thermodynamic states, allowing derived calculations to be completed in the browser in less than 0.02 milliseconds.
          </p>
        </div>
      </section>

      {/* ========================================================
          SECTION 2.0: SYSTEM PHYSICS & CONSERVATION EQUATIONS
          ======================================================== */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          2.0 Governing Conservation Equations
        </h2>
        <div className="space-y-4 text-[15.5px]">
          <p>
            The desiccant wheel rotates continuously between two separate, counter-flowing air streams: the **Process Sector** (where air is dehumidified) and the **Regeneration Sector** (where heat reactivates the saturated desiccant). The physical behavior inside the sinusoidal channels is modeled using 1D coupled convective heat and mass transfer conservation equations:
          </p>

          {/* Mass Conservation */}
          <div className="space-y-2">
            <h3 className="font-bold text-[#1E4E79] text-[15px] font-sans">2.1 Conservation of Mass (Water Vapor Balance)</h3>
            <p>
              The transient moisture distribution in the air stream channel and the accumulation rate of liquid water inside the desiccant coating are coupled:
            </p>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-[4px] text-center font-mono text-[14px]">
              &rho;<sub>a</sub> &bull; v &bull; (&part;Y / &part;x) + &rho;<sub>a</sub> &bull; (&part;Y / &part;t) + &rho;<sub>d</sub> &bull; ((1 - &epsilon;) / &epsilon;) &bull; (&part;q / &part;t) = 0
            </div>
            <p className="text-[12.5px] text-[#6B7280] font-sans">
              Where <b>Y</b> is the air humidity ratio (kg water/kg dry air), <b>q</b> is the desiccant water content (kg water/kg dry desiccant), <b>&rho;<sub>a</sub></b> and <b>&rho;<sub>d</sub></b> are air and desiccant densities, <b>v</b> is the face velocity, and <b>&epsilon;</b> is the channel void fraction.
            </p>
          </div>

          {/* Energy Conservation */}
          <div className="space-y-2 pt-2">
            <h3 className="font-bold text-[#1E4E79] text-[15px] font-sans">2.2 Conservation of Energy (Enthalpy Balance)</h3>
            <p>
              Sensible convective heat exchange between the air stream and the matrix channel walls is combined with the latent heat of adsorption released as water vapor condenses into the desiccant pores:
            </p>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-[4px] text-center font-mono text-[14px]">
              &rho;<sub>a</sub> &bull; v &bull; (&part;h / &part;x) + &rho;<sub>a</sub> &bull; (&part;h / &part;t) + &rho;<sub>d</sub> &bull; ((1 - &epsilon;) / &epsilon;) &bull; (&part;H<sub>d</sub> / &part;t) = 0
            </div>
            <p className="text-[12.5px] text-[#6B7280] font-sans">
              Where <b>h</b> is the moist air enthalpy (h = C<sub>p,a</sub> &bull; T + Y &bull; (C<sub>p,v</sub> &bull; T + h<sub>fg</sub>)), <b>H<sub>d</sub></b> is the desiccant solid enthalpy (H<sub>d</sub> = C<sub>p,d</sub> &bull; T<sub>d</sub> + q &bull; C<sub>p,w</sub> &bull; T<sub>d</sub> - q &bull; H<sub>ads</sub>), and <b>H<sub>ads</sub></b> is the exothermic heat of adsorption (~2800 kJ/kg).
            </p>
          </div>

          {/* Interphase Transfer */}
          <div className="space-y-2 pt-2">
            <h3 className="font-bold text-[#1E4E79] text-[15px] font-sans">2.3 Solid-Fluid Interface Kinetics</h3>
            <p>
              The rate of moisture adsorption is dictated by the Linear Driving Force (LDF) mass transfer kinetic model, assuming the rate is proportional to the difference between the bulk air humidity ratio and the equilibrium humidity ratio at the desiccant surface:
            </p>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-[4px] text-center font-mono text-[14px]">
              &rho;<sub>d</sub> &bull; (&part;q / &part;t) = k<sub>m</sub> &bull; a<sub>v</sub> &bull; (Y - Y<sub>m</sub>(T<sub>d</sub>, q))
            </div>
            <p className="text-[12.5px] text-[#6B7280] font-sans">
              Where <b>k<sub>m</sub></b> is the mass transfer coefficient (derived from the Sherwood number), <b>a<sub>v</sub></b> is the specific surface area, and <b>Y<sub>m</sub></b> is the equilibrium surface humidity ratio, which is non-linearly dependent on desiccant temperature and loading.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3.0: EQUILIBRIUM SORPTION ISOTHERM (LANGMUIR)
          ======================================================= */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          3.0 Desiccant Sorption Isotherm Model
        </h2>
        <div className="space-y-4 text-[15.5px]">
          <p>
            The thermodynamic equilibrium between silica gel and water vapor is represented by the **Langmuir Isotherm Model**. The equilibrium water loading (q<sub>eq</sub>) is calculated as a function of the local relative humidity (&phi;):
          </p>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-[4px] text-center font-mono text-[14px]">
            q<sub>eq</sub> = q<sub>max</sub> &bull; (C &bull; &phi;) / (1 + (C - 1) &bull; &phi;)
          </div>
          <p className="text-[12.5px] text-[#6B7280] font-sans text-center">
            Where <b>q<sub>max</sub> &asymp; 0.40 kg/kg</b> (max dry desiccant capacity) and <b>C &asymp; 2.5</b> (sorption energy constant).
          </p>
          <p>
            To compute the equilibrium humidity ratio (Y<sub>m</sub>) at the desiccant boundary for the mass transfer kinetic equations, the saturation vapor pressure (P<sub>sat</sub>) is calculated using the Antoine equation:
          </p>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-[4px] text-center font-mono text-[13.5px]">
            P<sub>sat</sub>(T) = exp( 23.196 - 3816.44 / (T + 227.02) ) [Pa]<br/>
            P<sub>v</sub> = &phi; &bull; P<sub>sat</sub>(T)<br/>
            Y<sub>m</sub> = 0.622 &bull; P<sub>v</sub> / (P<sub>atm</sub> - P<sub>v</sub>)
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4.0: HONEYCOMB CHANNEL PRESSURE LOSS
          ======================================================== */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          4.0 Honeycomb Channel Fluid Dynamics & Pressure Loss
        </h2>
        <div className="space-y-4 text-[15.5px]">
          <p>
            To evaluate fan power requirements, the hydraulic flow resistance is computed using the **Fanning friction factor** for laminar flow within sinusoidal honeycomb channels:
          </p>
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-[4px] text-center font-mono text-[14px]">
            &Delta;P = f &bull; (L / D<sub>h</sub>) &bull; (&rho; &bull; v<sup>2</sup>) / 2 = (16.0 / Re) &bull; (L / D<sub>h</sub>) &bull; (&rho; &bull; v<sup>2</sup>) / 2 = 8 &bull; &mu; &bull; L &bull; v / D<sub>h</sub><sup>2</sup>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[12.5px] text-[#6B7280] font-sans mt-2">
            <div>
              &bull; <b>Re = &rho; &bull; v &bull; D<sub>h</sub> / &mu;</b> (Reynolds Number)<br/>
              &bull; <b>D<sub>h</sub> = 4 &bull; A<sub>ch</sub> / P<sub>ch</sub></b> (Hydraulic Diameter)
            </div>
            <div>
              &bull; <b>L:</b> Wheel thickness (mm)<br/>
              &bull; <b>&mu;:</b> Dynamic air viscosity (1.84e-5 Pa&bull;s)
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5.0: PI-ML SURROGATE Solver PIPELINE
          ======================================================== */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          5.0 Physics-Informed ML Surrogate Solver Pipeline
        </h2>
        <div className="space-y-4 text-[15.5px]">
          <p>
            The surrogate is structured as a **hybrid solver**. It splits the prediction task: a trained polynomial regression model predicts independent states, and conservation laws calculate derived states.
          </p>
          
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-[4px] font-mono text-[13px] space-y-3">
            <h4 className="font-bold text-[#2D3748]">Surrogate Execution Flow:</h4>
            <div>
              <b>Input Feature Vector:</b><br/>
              &nbsp;&nbsp;x = [T_in, RH_in, v_face, RPM, T_reg, L, h, Flow_p, Flow_reg]
            </div>
            <div className="border-t border-[#E2E8F0] pt-2">
              <b>1. Degree-2 Polynomial Expansion:</b><br/>
              &nbsp;&nbsp;Expanding vector x to include all linear terms, quadratic terms, and cross-interaction terms:<br/>
              &nbsp;&nbsp;x_poly = [1, x1, x2, ..., x1², x1*x2, x2², ...] (Totaling 55 terms)
            </div>
            <div className="border-t border-[#E2E8F0] pt-2">
              <b>2. Ridge Regression Inference:</b><br/>
              &nbsp;&nbsp;Evaluating the dot product of x_poly and the pre-computed weights (W) inside the browser:<br/>
              &nbsp;&nbsp;T_out = &Sigma; (x_poly[i] * W_temp[i])<br/>
              &nbsp;&nbsp;Y_out = &Sigma; (x_poly[i] * W_hum[i])
            </div>
            <div className="border-t border-[#E2E8F0] pt-2">
              <b>3. Exact Conservation Derived Calculations:</b><br/>
              &nbsp;&nbsp;&bull; m_rem = rho_a * Flow_p * (Y_in - Y_out) [kg/h]<br/>
              &nbsp;&nbsp;&bull; COP_th = (m_rem * H_ads) / (Flow_reg * rho_a * Cp * (T_reg - T_in))
            </div>
          </div>
          <p>
            This hybrid formulation enforces that physical boundary conditions (such as relative humidity bounds and energy conservation equations) are respected, preventing prediction failures.
          </p>
        </div>
      </section>

      {/* ========================================================
          SECTION 6.0: SYNTHETIC DATASET GENERATION
          ======================================================== */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          6.0 Synthetic Dataset & Model Training
        </h2>
        <div className="space-y-4 text-[15.5px]">
          <p>
            To fit the surrogate coefficients, a synthetic dataset of 5,000 cases was generated using a 1D finite-difference solver. The model was trained using Ridge Regression (L2 regularization coefficient &alpha; = 1.0) to prevent overfitting.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13.5px] border border-[#D6D9DE] border-collapse font-sans">
              <thead>
                <tr className="bg-[#E9ECEF] border-b border-[#D6D9DE]">
                  <th className="px-4 py-2 font-bold">Model State</th>
                  <th className="px-4 py-2 font-bold">R² (Validation)</th>
                  <th className="px-4 py-2 font-bold">Root Mean Squared Error (RMSE)</th>
                  <th className="px-4 py-2 font-bold">Mean Absolute Error (MAE)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#D6D9DE]">
                  <td className="px-4 py-2 font-medium">Outlet Temperature (T_out)</td>
                  <td className="px-4 py-2 text-[#2E7D32] font-semibold">0.962</td>
                  <td className="px-4 py-2">0.82 °C</td>
                  <td className="px-4 py-2">0.61 °C</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-medium">Outlet Humidity Ratio (Y_out)</td>
                  <td className="px-4 py-2 text-[#2E7D32] font-semibold">0.950</td>
                  <td className="px-4 py-2">0.34 g/kg</td>
                  <td className="px-4 py-2">0.25 g/kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[12.5px] text-[#6B7280] font-sans">
            * Note: Cross-validation was performed using a 80/20 train-test split. The high R² scores validate the model's accuracy across the operational envelope.
          </p>
        </div>
      </section>

      {/* ========================================================
          SECTION 7.0: OPTIMIZATION CONSTRAINTS & DESIGN RULES
          ======================================================== */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          7.0 Operational Constraints & Design Optimization Rules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[13.5px] leading-relaxed text-[#4A5568] font-sans">
          <div className="space-y-1">
            <h4 className="font-bold text-[#2D3748] text-[14px]">I. Volumetric Flow vs. Contact Time</h4>
            <p>
              Higher face velocities increase the volume of air processed, but decrease contact time (NTU) inside the channels. This reduces the dehumidification ratio and increases the pressure drop across the wheel.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-[#2D3748] text-[14px]">II. Regeneration Carryover Heat</h4>
            <p>
              Increasing the regeneration air temperature reactivates the desiccant pores more effectively, lowering outlet humidity. However, it dumps sensible carryover heat directly into the wheel structure, raising process outlet temperature and reducing thermal COP.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-[#2D3748] text-[14px]">III. Rotation Speed (RPM) Optimization</h4>
            <p>
              If the wheel rotates too slowly, the desiccant material saturates with moisture quickly and stops adsorbing. If it rotates too fast, sensible carryover heat is transferred into the process air stream without increasing dehumidification, defining a distinct optimal RPM curve.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8.0: LLM ADVISORY INTEGRATION
          ======================================================== */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          8.0 Generative LLM API Design Advisor
        </h2>
        <div className="space-y-4 text-[15.5px]">
          <p>
            To aid system engineers in optimizing cycle parameters, the simulator integrates an **LLM API**. 
            This module receives the user-configured parameters and calculated states, and provides optimization advice based on thermodynamics and heat transfer principles.
          </p>
          <p>
            By evaluating operating states against conservation laws and limits, the LLM identifies suboptimal combinations (such as high velocity paired with low RPM) and suggests corrective actions, serving as an automated engineering assistant.
          </p>
        </div>
      </section>

    </div>
  );
}
export default OverviewPage;
