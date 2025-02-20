import { useState } from 'react';
import Header from './components/Header';
import RegistrationForm from './components/RegistrationForm';
import TicketSuccess from './components/TicketSuccess';
import PageTransition from './components/PageTransition';
import './App.css';

function App() {
  const [registrationData, setRegistrationData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegistrationSubmit = async (data) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRegistrationData(data);
    setShowSuccess(true);
  };

  const handleReset = () => {
    setShowSuccess(false);
    // We'll clear the registration data after the exit animation completes
  };

  return (
    <div className="app">
      <Header />
      <main>
        <PageTransition isVisible={!showSuccess}>
          <RegistrationForm onSubmit={handleRegistrationSubmit} />
        </PageTransition>
        
        {registrationData && (
          <PageTransition 
            isVisible={showSuccess} 
            onExited={() => setRegistrationData(null)}
          >
            <TicketSuccess 
              registrationData={registrationData}
              onReset={handleReset}
            />
          </PageTransition>
        )}
      </main>
    </div>
  );
}

export default App;
