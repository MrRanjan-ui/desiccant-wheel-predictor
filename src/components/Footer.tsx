export function Footer() {
  return (
    <footer className="w-full bg-[#FFFFFF] border-t border-[#D6D9DE] py-6 px-6 mt-8">
      <div className="max-w-[1300px] mx-auto text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Academic Context */}
        <div>
          <p className="text-[13px] font-semibold text-[#2D3748]">
            Department of Mechanical Engineering — Thermal Energy Systems Lab
          </p>
          <p className="text-[12px] text-[#6B7280] mt-0.5">
            Summer Internship Research Project: Rotary Desiccant Wheel Simulation
          </p>
        </div>

        {/* Supervision & Date */}
        <div className="md:text-right text-[12px] text-[#6B7280]">
          <p>
            <span className="font-medium text-[#2D3748]">Project Advisor:</span> Dr. Lakshmikant
          </p>
          <p className="mt-0.5">
            © {new Date().getFullYear()} — Engineering Simulation System
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
