import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface OverviewPageProps {
  onLaunchSimulator: () => void;
}

const AVATAR_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><rect width='60' height='60' fill='%23E9ECEF'/><path d='M30 32c5.5 0 10-4.5 10-10S35.5 12 30 12s-10 4.5-10 10 4.5 10 10 10zm0 4c-7.7 0-14 6.3-14 14h28c0-7.7-6.3-14-14-14z' fill='%236B7280'/></svg>";

export function OverviewPage({ onLaunchSimulator }: OverviewPageProps) {
  const [studentImg, setStudentImg] = useState('/student.jpeg');
  const [profImg, setProfImg] = useState('/professor.jpg');

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white border border-[#D6D9DE] rounded-[6px] p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] text-[12px] font-semibold bg-[#E9ECEF] text-[#1E4E79] border border-[#D6D9DE]">
              Mechanical Engineering Research Project
            </span>
            <h2 className="text-[28px] sm:text-[34px] font-extrabold text-[#243447] leading-tight tracking-tight">
              Advanced Rotary Dehumidification Predictor
            </h2>
            <p className="text-[16px] text-[#6B7280] leading-relaxed">
              Accelerating system design and cycle optimization through a physics-informed Machine Learning surrogate model. Run multi-parameter sweeps and view psychrometric states in milliseconds.
            </p>
            <div className="flex gap-4 pt-2">
              <Button variant="primary" onClick={onLaunchSimulator} className="px-6 py-2.5 text-[15px]">
                Launch Interactive Simulator
              </Button>
              <a 
                href="#about" 
                className="px-4 py-2.5 text-[15px] font-medium text-[#2D3748] hover:text-[#1E4E79] hover:bg-[#E9ECEF] border border-transparent rounded-[4px] transition-colors flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
          
          {/* Right Video Placeholder Frame */}
          <div className="lg:col-span-5 w-full">
            <div className="border border-[#D6D9DE] rounded-[4px] overflow-hidden bg-[#E9ECEF] shadow-inner relative group">
              <div className="aspect-video w-full flex flex-col items-center justify-center p-6 text-center">
                {/* Visual Explainer Video Overlay */}
                <div className="w-12 h-12 rounded-full bg-[#1E4E79] flex items-center justify-center text-white mb-3 shadow-md group-hover:scale-105 transition-transform cursor-pointer">
                  {/* Play Icon representation */}
                  <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <h4 className="text-[14px] font-bold text-[#2D3748] mb-1">
                  Project Explainer Video
                </h4>
                <p className="text-[11px] text-[#6B7280] max-w-[280px]">
                  Presented by <b>Ashish Ranjan</b>, NIT Hamirpur. Guided by <b>Dr. Laxmikant Yadav</b>.
                </p>
                
                {/* Real Video Element Placeholder */}
                <video 
                  id="project-explainer-video"
                  controls 
                  className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity bg-black"
                  poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'></svg>"
                >
                  <source src="explainer_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="text-[10px] text-center text-[#6B7280] mt-1.5 italic">
              * Note: Record your explainer video, save it as "explainer_video.mp4" in the project folder, and it will play directly in this frame.
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT THE PROJECT */}
      <section id="about" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Academic Context" className="md:col-span-2">
          <div className="space-y-3 text-[14.5px] leading-relaxed text-[#2D3748]">
            <p>
              This simulator and machine learning surrogate system was developed as a 
              <b> Summer Research Internship Project</b> by <b>Ashish Ranjan</b>, a 3rd-year 
              Mechanical Engineering student at the <b>National Institute of Technology, Hamirpur (NIT Hamirpur)</b>, 
              under the expert supervision of <b>Dr. Laxmikant Yadav</b>.
            </p>
            <p>
              Solid desiccant wheels are critical components in advanced HVAC systems, providing energy-efficient 
              humidity control in lithium-battery dry rooms (requiring dew points below -40°C), pharmaceutical 
              formulation chambers, and high-performance agricultural storage.
            </p>
            <p>
              Traditional computational modeling of rotary adsorption relies on complex finite-difference or 
              finite-volume methods to solve coupled partial differential equations (PDEs) of heat and moisture transfer. 
              These solvers take significant time, making iterative design sweeps slow and difficult. 
              This project bridges the gap by training a Machine Learning surrogate to emulate the physics instantaneously.
            </p>
          </div>
        </Card>

        <Card title="Research Personnel">
          <div className="space-y-4 text-[14px]">
            {/* Student */}
            <div className="flex gap-3 items-center">
              <img
                src={studentImg}
                onError={() => setStudentImg(AVATAR_FALLBACK)}
                alt="Ashish Ranjan"
                className="w-[60px] h-[60px] rounded-[4px] border border-[#D6D9DE] object-cover bg-[#E9ECEF] shrink-0"
              />
              <div>
                <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider block">Lead Researcher</span>
                <p className="font-bold text-[#2D3748] text-[14px] mt-0.5">Ashish Ranjan</p>
                <p className="text-[#6B7280] text-[11.5px] leading-tight">3rd Year, B.Tech Mech. Eng.</p>
                <p className="text-[#6B7280] text-[11px]">NIT Hamirpur</p>
              </div>
            </div>
            
            {/* Professor */}
            <div className="flex gap-3 items-center border-t border-[#D6D9DE] pt-3">
              <img
                src={profImg}
                onError={() => setProfImg(AVATAR_FALLBACK)}
                alt="Dr. Laxmikant Yadav"
                className="w-[60px] h-[60px] rounded-[4px] border border-[#D6D9DE] object-cover bg-[#E9ECEF] shrink-0"
              />
              <div>
                <span className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wider block">Project Supervisor</span>
                <p className="font-bold text-[#2D3748] text-[14px] mt-0.5">Dr. Laxmikant Yadav</p>
                <p className="text-[#6B7280] text-[11.5px] leading-tight">Assistant Professor, Mech. Eng.</p>
                <p className="text-[#6B7280] text-[11px]">NIT Hamirpur</p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 3. WORKING PHYSICS */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Working Physics & Adsorption Cycle">
          <div className="space-y-3 text-[14px] leading-relaxed text-[#2D3748]">
            <p>
              Rotary dehumidifiers operate continuously by transitioning silica-gel channels between two active sectors:
            </p>
            <div className="space-y-2 mt-2">
              <div className="p-3 bg-[#F2F4F7] border border-[#D6D9DE] rounded-[4px]">
                <h5 className="font-bold text-[#1E4E79] text-[13.5px]">A. Adsorption (Process Sector)</h5>
                <p className="text-[12.5px] text-[#2D3748] mt-1">
                  Wet process air passes axially through the wheel. Water vapor is captured by the desiccant pores. 
                  Adsorption is exothermic: the latent heat of phase-change is released, resulting in dry but warmed process discharge air.
                </p>
              </div>
              <div className="p-3 bg-[#F2F4F7] border border-[#D6D9DE] rounded-[4px]">
                <h5 className="font-bold text-[#C62828] text-[13.5px]">B. Desorption / Reactivation (Regeneration Sector)</h5>
                <p className="text-[12.5px] text-[#2D3748] mt-1">
                  Reactivation heaters supply thermal energy (sensible heating up to 140°C) to the regeneration sector. 
                  This vaporizes bound moisture from the silica gel matrix, purging it as hot, wet exhaust gas.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Physics-Informed ML Surrogate Strategy">
          <div className="space-y-3 text-[14px] leading-relaxed text-[#2D3748]">
            <p>
              Our machine learning surrogate model operates as a <b>Surrogate Emulator</b>. 
              By training on physics-consistent numerical solvers, it learns the non-linear mappings:
            </p>
            <div className="my-2 bg-[#E9ECEF] p-3 rounded-[4px] font-mono text-[12px] border border-[#D6D9DE] text-[#243447]">
              <b>Inputs (9-Dim)</b>: [T_in, RH_in, v_face, RPM, T_reg, L_wheel, h_channel, Flow_p, Flow_reg]<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;↓ <i>Random Forest Mapping</i><br/>
              <b>Outputs (9-Dim)</b>: [T_out, Y_out, RH_out, MRR, ΔP, COP_th, η_T, η_Y]
            </div>
            <p>
              This emulates full PDE balances. In conventional design optimization (e.g. Genetic Algorithms), 
              the system must run thousands of evaluations. The ML surrogate reduces this optimization time 
              from hours to under a second, enabling interactive, real-time sweep adjustments.
            </p>
          </div>
        </Card>
      </section>

      {/* 4. DESIGN SENSITIVITY AND TRADE-OFFS */}
      <section className="bg-white border border-[#D6D9DE] rounded-[6px] p-5 shadow-sm">
        <h3 className="text-[18px] font-bold text-[#1E4E79] mb-4 pb-1 border-b border-[#D6D9DE]">
          Engineering Optimization & Operational Trade-offs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[13.5px] text-[#2D3748] leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-[#243447] text-[14.5px]">I. Air Velocity Trade-off</h4>
            <p>
              Higher process air velocities yield high flow rates but decrease contact residence time ($NTU$). 
              This reduces moisture extraction efficiency ($g/kg$ drop). Additionally, the pressure drop across the channel 
              increases linearly with velocity, scaling fan head-loss and energy bills.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#243447] text-[14.5px]">II. Regeneration Heater Level</h4>
            <p>
              Increasing the regeneration air temperature drys the silica gel better. 
              However, the hot matrix carries sensible heat directly into the process sector. 
              This carryover heats the process air stream, reducing downstream thermal COP and adding to cooling loads.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#243447] text-[14.5px]">III. Rotation Speed Optimum (RPM)</h4>
            <p>
              Rotary wheels require an optimal speed curve. 
              Rotating too slowly leads to desiccant saturation, halting adsorption. 
              Rotating too fast increases leakage carryover from the heater. 
              Optimizing RPM is crucial to maximize the Coefficient of Performance.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
export default OverviewPage;
