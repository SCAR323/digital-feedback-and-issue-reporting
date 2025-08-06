import React from 'react';
import { Train, MapPin, Star, AlertTriangle, Phone, Mail, Shield, Clock } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: 'home' | 'report' | 'dashboard') => void;
  language: 'en' | 'hi';
}

const Hero: React.FC<HeroProps> = ({ setActiveTab, language }) => {
  const text = {
    title: { 
      en: 'Your Voice Matters in Making Railways Better', 
      hi: 'रेलवे को बेहतर बनाने में आपकी आवाज़ मायने रखती है' 
    },
    subtitle: { 
      en: 'Report issues, share feedback, and help us improve your travel experience', 
      hi: 'समस्याओं की रिपोर्ट करें, फीडबैक साझा करें, और अपने यात्रा अनुभव को बेहतर बनाने में हमारी मदद करें' 
    },
    reportButton: { en: 'Report an Issue', hi: 'समस्या रिपोर्ट करें' },
    viewDashboard: { en: 'View Dashboard', hi: 'डैशबोर्ड देखें' },
    features: {
      title: { en: 'Key Features', hi: 'मुख्य विशेषताएं' },
      anonymous: { en: 'Anonymous Reporting', hi: 'गुमनाम रिपोर्टिंग' },
      realtime: { en: 'Real-time Tracking', hi: 'रियल-टाइम ट्रैकिंग' },
      multilingual: { en: 'Multi-language Support', hi: 'बहुभाषी समर्थन' },
      priority: { en: 'Priority Classification', hi: 'प्राथमिकता वर्गीकरण' }
    },
    emergency: {
      title: { en: 'Emergency Contacts', hi: 'आपातकालीन संपर्क' },
      helpline: { en: 'Railway Helpline', hi: 'रेलवे हेल्पलाइन' },
      security: { en: 'Railway Security', hi: 'रेलवे सुरक्षा' }
    }
  };

  const features = [
    {
      icon: Shield,
      title: text.features.anonymous[language],
      description: language === 'en' 
        ? 'Report issues anonymously or with your details' 
        : 'गुमनाम रूप से या अपने विवरण के साथ समस्याओं की रिपोर्ट करें'
    },
    {
      icon: Clock,
      title: text.features.realtime[language],
      description: language === 'en' 
        ? 'Track the status of your reported issues in real-time' 
        : 'अपनी रिपोर्ट की गई समस्याओं की स्थिति को रियल-टाइम में ट्रैक करें'
    },
    {
      icon: MapPin,
      title: text.features.multilingual[language],
      description: language === 'en' 
        ? 'Available in English and Hindi for better accessibility' 
        : 'बेहतर पहुंच के लिए अंग्रेजी और हिंदी में उपलब्ध'
    },
    {
      icon: AlertTriangle,
      title: text.features.priority[language],
      description: language === 'en' 
        ? 'Classify issues by priority for faster resolution' 
        : 'तेज़ समाधान के लिए समस्याओं को प्राथमिकता के अनुसार वर्गीकृत करें'
    }
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {text.title[language]}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {text.subtitle[language]}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('report')}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {text.reportButton[language]}
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                {text.viewDashboard[language]}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {text.features.title[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-blue-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {text.emergency.title[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Phone className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {text.emergency.helpline[language]}
              </h3>
              <p className="text-3xl font-bold text-red-600 mb-2">139</p>
              <p className="text-gray-600">
                {language === 'en' ? '24/7 Customer Care' : '24/7 ग्राहक सेवा'}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {text.emergency.security[language]}
              </h3>
              <p className="text-3xl font-bold text-blue-600 mb-2">182</p>
              <p className="text-gray-600">
                {language === 'en' ? 'Railway Security Helpline' : 'रेलवे सुरक्षा हेल्पलाइन'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;