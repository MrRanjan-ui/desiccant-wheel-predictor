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
              <p className="text-[#718096] text-[12px]">3rd Year, B.Tech B.Mech</p>
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

      {/* SECTION 1: INTRODUCTION & ABSTRACT */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          1.0 Introduction & Abstract
        </h2>
        <div className="text-[15px] leading-relaxed text-[#2D3748] space-y-4">
          <p>
            Solid desiccant wheels are critical components in modern HVAC and dehumidification systems, 
            providing deep moisture control in lithium-battery dry rooms (requiring dew points below -40°C), 
            pharmaceutical packaging environments, and high-performance agricultural cold chains. 
            Unlike vapor-compression chillers, desiccant matrices capture moisture in the vapor phase, 
            enabling efficient humidity control without sub-cooling process air below its dewpoint.
          </p>
          <p>
            Traditional computational modeling of rotary adsorption relies on solving highly non-linear, coupled 
            partial differential equations (PDEs) representing mass, momentum, and energy conservation. 
            Because numerical solving of these equations requires iterative finite-difference methods, 
            multi-variable parametric sweeping is computationally expensive. This research resolves this latency 
            by deploying a **Physics-Informed ML Surrogate Model** that acts as an instantaneous solver.
          </p>
        </div>
      </section>

      {/* SECTION 2: WORKING PRINCIPLE */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          2.0 Working Principle & System Physics
        </h2>
        <div className="text-[15px] leading-relaxed text-[#2D3748] space-y-4">
          <p>
            The desiccant wheel rotates continuously between two separate, counter-flowing air streams:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-sans">
            <div className="border-l-2 border-[#1E4E79] pl-4 space-y-2">
              <h4 className="font-bold text-[#1E4E79] text-[14px] uppercase tracking-wider">A. Adsorption Sector</h4>
              <p className="text-[13px] text-[#4A5568] leading-relaxed">
                Moist process air passes axially through the micro-channels of the silica gel matrix. 
                Water vapor is adsorbed inside the desiccant pores due to vapor pressure differences. 
                This adsorption is exothermic: the released latent heat elevates the temperature of the dry discharge air.
              </p>
            </div>
            <div className="border-l-2 border-[#C62828] pl-4 space-y-2">
              <h4 className="font-bold text-[#C62828] text-[14px] uppercase tracking-wider">B. Desorption / Reactivation</h4>
              <p className="text-[13px] text-[#4A5568] leading-relaxed">
                A heated reactivation air stream (typically 80°C - 140°C) flows counter-currently through the regeneration sector. 
                The high thermal energy vaporizes the bound water inside the silica gel, driving it out of the matrix 
                to fully reactivate the wheel for the next adsorption pass.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ML SURROGATE STRATEGY */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          3.0 Physics-Informed ML Surrogate Model
        </h2>
        <div className="text-[15px] leading-relaxed text-[#2D3748] space-y-4">
          <p>
            The surrogate is structured as a **hybrid solver**. Rather than using a generic black-box neural network that can violate physical laws, 
            we train a **degree-2 Polynomial Ridge Regression** model to predict the primary independent thermodynamic states (T_out and Y_out). 
            All secondary outputs are derived using exact conservation laws in TypeScript:
          </p>
          <div className="my-3 bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-[4px] font-mono text-[12.5px] text-[#2D3748]">
            <b>Primary State Predictions (ML Regression)</b>:<br/>
            &nbsp;&nbsp;[T_in, RH_in, v_face, RPM, T_reg, L, h, Flow_p, Flow_reg] → [T_out_ML, Y_out_ML]<br/><br/>
            <b>Secondary Metric Calculations (Exact Physics Equations)</b>:<br/>
            &nbsp;&nbsp;• RH_out = calculateRH(T_out_ML, Y_out_ML)<br/>
            &nbsp;&nbsp;• moistureRemovedRate = processMassFlow * (Y_in - Y_out_ML)<br/>
            &nbsp;&nbsp;• pressureDrop = calculatePressureDrop(L, v_face, h)<br/>
            &nbsp;&nbsp;• COP_th = calculateCOP(processMassFlow, regMassFlow, Y_in, Y_out_ML, T_in, T_reg)
          </div>
          <p>
            This hybrid structure guarantees that physical limits are strictly respected (e.g., relative humidity cannot exceed 100% or drop below 0%, 
            and COP accurately reflects energy conservation), making it highly robust for engineering design use.
          </p>
        </div>
      </section>

      {/* SECTION 4: OPERATIONAL TRADE-OFFS */}
      <section className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#2D3748] border-b border-[#D6D9DE] pb-1 uppercase tracking-wide font-sans">
          4.0 Operational Sensitivity & Design Trade-offs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[13.5px] leading-relaxed text-[#4A5568] font-sans">
          <div className="space-y-1">
            <h4 className="font-bold text-[#2D3748] text-[14px]">I. Velocity vs. Dehumidification</h4>
            <p>
              Increasing face velocity increases the volume of processed air but decreases contact time ($NTU$) inside the channels, 
              resulting in a higher discharge humidity ratio. It also scales fan power pressure drop quadratically.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-[#2D3748] text-[14px]">II. Regeneration Carryover Heat</h4>
            <p>
              Higher regeneration heater temperatures reactivate the desiccant better but dump sensible carryover heat 
              directly into the process stream, raising downstream cooling coil loads and dropping thermal COP.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-[#2D3748] text-[14px]">III. Rotation Speed (RPM) Optimization</h4>
            <p>
              Operating too slowly leads to desiccant saturation, while operating too quickly carries over sensible heat 
              without additional moisture removal. Finding the optimal RPM curve is key to maximizing performance.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
export default OverviewPage;
