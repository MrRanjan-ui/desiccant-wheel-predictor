interface HeaderProps {
  activeTab: 'overview' | 'simulator';
  onTabChange: (tab: 'overview' | 'simulator') => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="w-full bg-[#FFFFFF] border-b border-[#D6D9DE] py-4 px-6 mb-6">
      <div className="max-w-[1300px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side: Brand and Subtitle */}
        <div 
          className="text-left cursor-pointer select-none group" 
          onClick={() => onTabChange('overview')}
        >
          <h1 className="text-[24px] sm:text-[28px] font-bold text-[#1E4E79] leading-tight m-0 p-0 group-hover:opacity-90 transition-opacity">
            Desiccant Wheel Performance Predictor
          </h1>
          <p className="text-[13px] font-semibold text-[#6B7280] tracking-wider uppercase mt-1">
            Mathematical Modeling + Machine Learning
          </p>
        </div>

        {/* Right Side: Tab Controls */}
        <nav className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onTabChange('overview')}
            className={`px-3 py-1.5 text-[14px] font-medium transition-colors border-b-2 rounded-t-[4px] cursor-pointer outline-none 
              ${activeTab === 'overview'
                ? 'border-[#1E4E79] text-[#1E4E79] font-bold bg-[#E9ECEF]'
                : 'border-transparent text-[#2D3748] hover:text-[#1E4E79] hover:bg-[#F2F4F7]'
              }`}
          >
            Project Overview
          </button>
          <button
            type="button"
            onClick={() => onTabChange('simulator')}
            className={`px-3 py-1.5 text-[14px] font-medium transition-colors border-b-2 rounded-t-[4px] cursor-pointer outline-none 
              ${activeTab === 'simulator'
                ? 'border-[#1E4E79] text-[#1E4E79] font-bold bg-[#E9ECEF]'
                : 'border-transparent text-[#2D3748] hover:text-[#1E4E79] hover:bg-[#F2F4F7]'
              }`}
          >
            Interactive Simulator
          </button>
        </nav>
      </div>
    </header>
  );
}
export default Header;
