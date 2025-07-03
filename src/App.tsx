import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Settings } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import HomePage from './components/HomePage';
import LaunchSuccess from './components/LaunchSuccess';
import AdminPanel from './components/AdminPanel';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Router>
      <div className="App relative">
        {/* Admin Toggle Button */}
        <button
          onClick={() => setShowAdmin(!showAdmin)}
          className="fixed top-4 left-4 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg z-50 transition-colors"
          title="Toggle Admin Panel"
        >
          <Settings size={20} />
        </button>

        {/* Admin Panel */}
        {showAdmin && <AdminPanel />}

        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/launch-success" element={<LaunchSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;