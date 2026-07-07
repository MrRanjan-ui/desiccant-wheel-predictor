import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import InputForm from './components/InputForm';
import PredictionPanel from './components/PredictionPanel';
import Charts from './components/Charts';
import MetricsTable from './components/MetricsTable';
import EquationSection from './components/EquationSection';
import OverviewPage from './components/OverviewPage';
import AIAdvisor from './components/AIAdvisor';
import { usePerformancePrediction } from './hooks/usePerformancePrediction';

export function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator'>('overview');

  const {
    inputs,
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
        {/* Navigation Header */}
        <Header activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content Area */}
        <main className="max-w-[1300px] w-full mx-auto px-4 sm:px-6 mb-8">
          {activeTab === 'overview' ? (
            // Landing Page View
            <OverviewPage onLaunchSimulator={() => setActiveTab('simulator')} />
          ) : (
            // Simulator View
            <div className="space-y-6">
              {/* Main Grid: Inputs and Predictions */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT Column: Inputs (5/12) */}
                <div className="lg:col-span-5 w-full">
                  <InputForm
                    onSubmit={calculate}
                    onReset={reset}
                    defaultValues={defaultValues}
                  />
                </div>

                {/* RIGHT Column: Outputs and ML Info (7/12) */}
                <div className="lg:col-span-7 w-full space-y-6">
                  <PredictionPanel outputs={outputs} />
                  {outputs && <AIAdvisor inputs={inputs} outputs={outputs} />}
                  <MetricsTable metrics={mlMetrics} />
                </div>
              </div>

              {/* Dynamic Sensitivity Sweep Charts */}
              {outputs && (
                <Charts
                  velocityData={velocityChartData}
                  regTempData={regTempChartData}
                />
              )}

              {/* Collapsible Mathematical / Scientific Formulas */}
              <div className="mt-6">
                <EquationSection />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Minimal Academic Footer */}
      <Footer />
    </div>
  );
}

export default App;
