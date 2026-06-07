import { useState } from 'react';

import { PixelSpaceBackground } from './components/PixelSpaceBackground';

import { LandingPage } from './components/LandingPage';

import { DashboardPage } from './components/DashboardPage';

import { useHelioGuardData } from './hooks/useHelioGuardData';



type ActiveView = 'home' | 'dashboard';



function App() {

  const [activeView, setActiveView] = useState<ActiveView>('home');

  const [studentMode] = useState(true);



  const {

    error,

    asteroids,

    indexData,

    briefing,

    spaceEvents,

    donkiUnavailable,

    donkiError,

    dateRange,

    isLoading,

    loadData,

  } = useHelioGuardData();



  const goToDashboard = () => {
    setActiveView('dashboard');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const goToHome = () => {

    setActiveView('home');

    window.scrollTo({ top: 0, behavior: 'smooth' });

  };



  return (

    <div className="app">

      <PixelSpaceBackground />



      {activeView === 'home' ? (

        <LandingPage

          onLaunch={goToDashboard}

          asteroids={asteroids}

          indexData={indexData}

          briefing={briefing}

          isLoading={isLoading}

          studentMode={studentMode}

          error={error}

          onRetry={loadData}

        />

      ) : (

        <DashboardPage

          onBack={goToHome}

          asteroids={asteroids}

          indexData={indexData}

          briefing={briefing}

          spaceEvents={spaceEvents}

          donkiUnavailable={donkiUnavailable}

          donkiError={donkiError}

          dateRange={dateRange}

          isLoading={isLoading}

          studentMode={studentMode}

          error={error}

          onRetry={loadData}

        />

      )}

    </div>

  );

}



export default App;

