export function Header() {
  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#D6D9DE] py-4 px-6 mb-6">
      <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side: Brand and Subtitle */}
        <div className="text-left">
          <h1 className="text-[24px] sm:text-[28px] font-bold text-[#1E4E79] leading-tight m-0 p-0">
            Desiccant Wheel Performance Predictor
          </h1>
          <p className="text-[13px] font-semibold text-[#6B7280] tracking-wider uppercase mt-1">
            Mathematical Modeling + Machine Learning
          </p>
        </div>

        {/* Right Side: Links */}
        <nav className="flex items-center gap-6">
          <a
            href="#about"
            className="text-[14px] font-medium text-[#2D3748] hover:text-[#1E4E79] hover:underline transition-colors"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
}
export default Header;
