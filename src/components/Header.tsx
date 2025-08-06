import React from 'react';
import { Train, Menu, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'report' | 'dashboard';
  setActiveTab: (tab: 'home' | 'report' | 'dashboard') => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, language, setLanguage }) => {
  const text = {
    title: { en: 'Indian Railways Feedback Portal', hi: 'भारतीय रेल फीडबैक पोर्टल' },
    home: { en: 'Home', hi: 'होम' },
    report: { en: 'Report Issue', hi: 'समस्या रिपोर्ट करें' },
    dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' }
  };

  return (
    <header className="bg-white shadow-lg border-b-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2 rounded-lg">
              <Train className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {text.title[language]}
              </h1>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Digital Feedback & Issue Reporting' : 'डिजिटल फीडबैक और समस्या रिपोर्टिंग'}
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'home'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {text.home[language]}
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'report'
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-600 hover:text-orange-600'
              }`}
            >
              {text.report[language]}
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {text.dashboard[language]}
            </button>
            
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
            </button>
          </nav>

          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;