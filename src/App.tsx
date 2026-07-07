import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import PredictionPanel from './components/PredictionPanel';
import Charts from './components/Charts';
import MetricsTable from './components/MetricsTable';
import EquationSection from './components/EquationSection';
import { usePerformancePrediction } from './hooks/usePerformancePrediction';

export function App() {
  const {
    outputs,
    velocityChartData,
    regTempChartData,
    mlMetrics,
    calculate,
    reset,
    defaultValues
  } = usePerformancePrediction();

  return (
    <div className="min-h-screen bg-[#F2F4F7] text-[#2D3748] flex flex-col justify-between font-sans">
      <div>
        {/* Simple Horizontal Header */}
        <Header />

        {/* Main Center Dashboard */}
        <main className="max-w-[1300px] w-full mx-auto px-4 sm:px-6 mb-8">
          
          {/* Main Grid: Split column on desktop, stacked on mobile/tablet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT Column: Input Panel (5/12 on desktop) */}
            <div className="lg:col-span-5 w-full">
              <InputForm
                onSubmit={calculate}
                onReset={reset}
                defaultValues={defaultValues}
              />
            </div>

            {/* RIGHT Column: Prediction Results & ML Info (7/12 on desktop) */}
            <div className="lg:col-span-7 w-full space-y-6">
              <PredictionPanel outputs={outputs} />
              
              <MetricsTable metrics={mlMetrics} />
            </div>

          </div>

          {/* SENSITIVITY CHARTS: Sweeps generated dynamically on run */}
          {outputs && (
            <Charts
              velocityData={velocityChartData}
              regTempData={regTempChartData}
            />
          )}

          {/* Collapsible Mathematical / Engineering Model Section */}
          <div className="mt-6">
            <EquationSection />
          </div>

        </main>
      </div>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}

export default App;
