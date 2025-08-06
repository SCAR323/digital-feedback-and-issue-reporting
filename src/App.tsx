import React, { useState } from 'react';
import { Train, MapPin, Phone, Mail, Star, AlertTriangle, CheckCircle, Clock, User, Camera, Globe } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import ReportForm from './components/ReportForm';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { Report } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'report' | 'dashboard'>('home');
  const [reports, setReports] = useState<Report[]>([]);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const addReport = (report: Report) => {
    setReports(prev => [report, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
      />
      
      {activeTab === 'home' && <Hero setActiveTab={setActiveTab} language={language} />}
      {activeTab === 'report' && <ReportForm onSubmit={addReport} language={language} />}
      {activeTab === 'dashboard' && <Dashboard reports={reports} language={language} />}
      
      <Footer language={language} />
    </div>
  );
}

export default App;