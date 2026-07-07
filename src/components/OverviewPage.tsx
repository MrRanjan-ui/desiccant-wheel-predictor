import { useState } from 'react';

interface OverviewPageProps {
  onLaunchSimulator: () => void;
}

const AVATAR_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 60 60'><rect width='60' height='60' fill='%23E9ECEF'/><path d='M30 32c5.5 0 10-4.5 10-10S35.5 12 30 12s-10 4.5-10 10 4.5 10 10 10zm0 4c-7.7 0-14 6.3-14 14h28c0-7.7-6.3-14-14-14z' fill='%236B7280'/></svg>";

export function OverviewPage({ onLaunchSimulator }: OverviewPageProps) {
  const [studentImg, setStudentImg] = useState('/student.jpeg');
  const [profImg, setProfImg] = useState('/professor.jpg');

  return (
    <div className="space-y-12 animate-fade-in text-left max-w-[950px] mx-auto bg-white border border-[#D6D9DE] rounded-[4px] p-8 sm:p-12 shadow-sm font-serif">
      
      {/* HEADER: ACADEMIC TITLE BLOCK */}
      <header className="text-center space-y-4 pb-8 border-b border-[#E2E8F0]">
        <span className="text-[12px] font-bold text-[#1E4E79] tracking-widest uppercase block font-sans">
          National Institute of Technology, Hamirpur
        </span>
        <h1 className="text-[26px] sm:text-[34px] font-black text-[#1A202C] leading-tight tracking-tight uppercase max-w-[850px] mx-auto">
          Development of a Physics-Informed ML Surrogate for Rotary Adsorption Dehumidification Systems
        </h1>
        <p className="text-[14px] text-[#718096] font-sans">
          Summer Research Internship Project — Department of Mechanical Engineering
        </p>

        {/* RESEARCHERS / AUTHORS ROW */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-16 pt-6 text-left font-sans">
          {/* Professor */}
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

          {/* Student */}
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

        {/* HERO CTA BUTTONS */}
        <div className="flex justify-center gap-4 pt-6 font-sans">
          <button
            onClick={onLaunchSimulator}
            className="px-6 py-2.5 text-[14px] font-bold bg-[#1E4E79] text-white rounded-[4px] hover:bg-[#153a5c] transition-all cursor-pointer shadow-sm"
          >
            Launch Interactive Simulator
          </button>
          <a
            href="#video-presentation"
            className="px-6 py-2.5 text-[14px] font-bold text-[#2D3748] hover:bg-[#F7FAFC] border border-[#D6D9DE] rounded-[4px] transition-colors flex items-center justify-center bg-white shadow-sm"
          >
            Watch Video Presentation
          </a>
        </div>
      </header>

      {/* DEDICATED PROJECT VIDEO PRESENTATION SECTION */}
      <section id="video-presentation" className="space-y-4 py-4 border-b border-[#E2E8F0] font-sans">
        <div className="text-center">
          <h3 className="text-[18px] font-bold text-[#1E4E79] uppercase tracking-wide">
            Project Explainer Video Demonstration
          </h3>
          <p className="text-[13px] text-[#718096] max-w-[650px] mx-auto mt-1">
            Visual breakdown of the psychrometric governing equations, local training dataset generation, and model verification.
          </p>
        </div>
        
        {/* Large Centered Video Player */}
        <div className="max-w-[750px] mx-auto border border-[#D6D9DE] rounded-[4px] overflow-hidden bg-black shadow-md relative group">
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

      {/* SECTION 1: ARCHITECTURAL OVERVIEW & WORKFLOW */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          1.0 System Architecture & Operational Workflow
        </h2>
        <div className="text-[15px] leading-relaxed text-[#2D3748] space-y-4">
          <p>
            The project operates as a hybrid **Physics-Machine Learning workbench**. Traditional PDE solvers require significant computational time, preventing real-time sweeps. This application bypasses that bottleneck by extracting pre-computed polynomial coefficients of a Ridge Regression model and running the matrix operations in the client browser under 0.02 milliseconds.
          </p>
          
          {/* STEP-BY-STEP WORKFLOW BLOCK */}
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-[4px] font-sans space-y-4 shadow-inner">
            <h4 className="font-bold text-[#1E4E79] text-[14px] uppercase tracking-wider">
              Step-by-Step Data Flow
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-[12px] text-[#4A5568] relative">
              <div className="bg-white border border-[#D6D9DE] p-3 rounded-[4px] shadow-sm">
                <span className="font-bold text-[#1E4E79] block mb-1">1. User Controls</span>
                User sets inlet temperatures, humidity ratios, RPM, and channel geometry.
              </div>
              <div className="bg-white border border-[#D6D9DE] p-3 rounded-[4px] shadow-sm">
                <span className="font-bold text-[#1E4E79] block mb-1">2. Poly Mapping</span>
                Inputs are mathematically expanded to a degree-2 polynomial space (e.g. x1², x1*x2, etc).
              </div>
              <div className="bg-white border border-[#D6D9DE] p-3 rounded-[4px] shadow-sm">
                <span className="font-bold text-[#1E4E79] block mb-1">3. ML Inference</span>
                Vite engine evaluates the dot product of poly features against model coefficients.
              </div>
              <div className="bg-white border border-[#D6D9DE] p-3 rounded-[4px] shadow-sm">
                <span className="font-bold text-[#1E4E79] block mb-1">4. Physics Post-proc</span>
                Calculates absolute moisture extraction rate, pressure drop, and thermal COP in real-time.
              </div>
              <div className="bg-white border border-[#D6D9DE] p-3 rounded-[4px] shadow-sm">
                <span className="font-bold text-[#1E4E79] block mb-1">5. AI Analysis</span>
                System feeds the input-output states into the Large Language Model (LLM) API to fetch optimization diagnostics.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ADSORPTION CYCLE & SYSTEM PHYSICS */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          2.0 Adsorption Cycle & Governing Physical Laws
        </h2>
        <div className="text-[15px] leading-relaxed text-[#2D3748] space-y-4">
          <p>
            The rotary desiccant wheel rotates continuously between two separate, counter-flowing air streams:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
            <div className="border-l-2 border-[#1E4E79] pl-4 space-y-2">
              <h4 className="font-bold text-[#1E4E79] text-[14px] uppercase tracking-wider">A. Adsorption Sector</h4>
              <p className="text-[13px] text-[#4A5568] leading-relaxed">
                Moist process air passes axially through the sinusoidal channels of the silica gel matrix. 
                Water vapor is adsorbed inside the micro-pores due to vapor pressure differences. 
                This adsorption is exothermic: the released latent heat elevates the temperature of the dry discharge air.
              </p>
            </div>
            <div className="border-l-2 border-[#C62828] pl-4 space-y-2">
              <h4 className="font-bold text-[#C62828] text-[14px] uppercase tracking-wider">B. Desorption / Reactivation Sector</h4>
              <p className="text-[13px] text-[#4A5568] leading-relaxed">
                A heated reactivation air stream (typically 80°C - 140°C) flows counter-currently through the regeneration sector. 
                The high thermal energy vaporizes the bound water inside the silica gel, driving it out of the matrix 
                to fully reactivate the wheel for the next adsorption pass.
              </p>
            </div>
          </div>
          <p>
            The core mass and energy balances coupling the fluid stream and the solid matrix are solved numerically via finite-difference grids:
          </p>
          <ul className="list-disc pl-5 text-[14px] text-[#4A5568] space-y-2 font-sans">
            <li><b>Moisture Balance:</b> Change in air moisture ratio matches the transfer rate to the desiccant matrix (governed by the mass transfer coefficient km).</li>
            <li><b>Enthalpy Balance:</b> Sensible heat transfer between air and wheel is coupled with the latent heat of adsorption (H_ads), elevating the process air's temperature.</li>
            <li><b>Linear Driving Force Kinetics:</b> Desiccant moisture accumulation rate is modeled as proportional to the difference between current and equilibrium water loading.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 3: ML pipeline & dataset */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          3.0 Synthetic Dataset Generation & Model Pipeline
        </h2>
        <div className="text-[15px] leading-relaxed text-[#2D3748] space-y-4">
          <p>
            Because direct PDE calculations take up to several seconds per simulation run, we generated a comprehensive synthetic dataset to train our surrogate ML solver:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-[4px]">
              <span className="text-xl">📊</span>
              <h4 className="font-bold text-[#2D3748] text-[13px] uppercase mt-2">1. Numerical Sampling</h4>
              <p className="text-[12px] text-[#718096] mt-1">
                We executed 5,000+ full-cycle numerical solver runs, systematically varying inlet states (Temp: 15–45°C, RH: 10–95%, Velocity: 0.5–5 m/s, Regen Temp: 50–160°C) to cover the operational envelope.
              </p>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-[4px]">
              <span className="text-xl">🧪</span>
              <h4 className="font-bold text-[#2D3748] text-[13px] uppercase mt-2">2. Polynomial Regression</h4>
              <p className="text-[12px] text-[#718096] mt-1">
                A degree-2 polynomial mapping was selected to model the nonlinear thermal effects (like exothermicity and flow rate interactions). Ridge Regression was trained in Python to determine the matrix coefficients.
              </p>
            </div>
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-[4px]">
              <span className="text-xl">🚀</span>
              <h4 className="font-bold text-[#2D3748] text-[13px] uppercase mt-2">3. Browser Porting</h4>
              <p className="text-[12px] text-[#718096] mt-1">
                The regression coefficients were exported as a lightweight JSON map and integrated directly into the React client application, enabling zero-latency calculation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FLUID DYNAMICS & THERMODYNAMICS */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          4.0 Fluid Dynamics & Thermodynamic Efficiency Formulas
        </h2>
        <div className="text-[15px] leading-relaxed text-[#2D3748] space-y-4">
          <p>
            The surrogate predicts the primary variables (outlet temperature T_out and outlet humidity ratio Y_out). Once predicted, the portal uses exact physical relations to calculate derived states:
          </p>
          <div className="space-y-3 font-mono text-[13px] bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-[4px]">
            <div>
              <b>1. Moisture Extraction Rate (m_rem):</b><br/>
              &nbsp;&nbsp;m_rem = rho_a * V_dot_process * (Y_in - Y_out) [kg/h]<br/>
              &nbsp;&nbsp;<i>(Represents the absolute mass flow of water vapor extracted from the process air stream)</i>
            </div>
            <div className="border-t border-[#E2E8F0] pt-2">
              <b>2. Channel Pressure Drop (delta_P):</b><br/>
              &nbsp;&nbsp;delta_P = 8 * mu * L * v / Dh² [Pa]<br/>
              &nbsp;&nbsp;<i>(Derived from the laminar Fanning friction factor for sinusoidal honeycomb channels)</i>
            </div>
            <div className="border-t border-[#E2E8F0] pt-2">
              <b>3. Thermal COP (COP_th):</b><br/>
              &nbsp;&nbsp;COP_th = (m_rem_rate * H_ads) / (m_dot_reg * Cp_a * (T_reg - T_in))<br/>
              &nbsp;&nbsp;<i>(The ratio of latent cooling capacity achieved to the heat energy consumed by the regeneration heater)</i>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: OPERATIONAL TRADE-OFFS */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          5.0 Key Design Optimization Trade-offs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[13.5px] leading-relaxed text-[#4A5568] font-sans">
          <div className="space-y-1">
            <h4 className="font-bold text-[#2D3748] text-[14px]">I. Velocity vs. Pressure Drop</h4>
            <p>
              Increasing face velocity increases the volumetric throughput of processed air, but decreases the residence time (NTU) inside the channels, which raises outlet humidity. Additionally, pressure drop scales quadratically, requiring larger fan power.
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

    </div>
  );
}
export default OverviewPage;
