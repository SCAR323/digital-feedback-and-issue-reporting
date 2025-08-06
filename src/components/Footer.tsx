import React from "react";
import {
  Train,
  Phone,
  Mail,
  MapPin,
  Globe,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import favicon from "/public/favicon.png";

interface FooterProps {
  language: "en" | "hi";
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const text = {
    title: {
      en: "Indian Railways Feedback Portal",
      hi: "भारतीय रेल फीडबैक पोर्टल",
    },
    description: {
      en: "Making your railway journey better through digital feedback and issue reporting.",
      hi: "डिजिटल फीडबैक और समस्या रिपोर्टिंग के माध्यम से आपकी रेल यात्रा को बेहतर बनाना।",
    },
    quickLinks: { en: "Quick Links", hi: "त्वरित लिंक" },
    contact: { en: "Contact Information", hi: "संपर्क जानकारी" },
    emergency: { en: "Emergency Numbers", hi: "आपातकालीन नंबर" },
    followUs: { en: "Follow Us", hi: "हमें फॉलो करें" },
    copyright: {
      en: "© 2024 Indian Railways. All rights reserved. Developed for internship project.",
      hi: "© 2024 भारतीय रेलवे। सभी अधिकार सुरक्षित। इंटर्नशिप प्रोजेक्ट के लिए विकसित।",
    },
    links: {
      home: { en: "Home", hi: "होम" },
      report: { en: "Report Issue", hi: "समस्या रिपोर्ट करें" },
      dashboard: { en: "Dashboard", hi: "डैशबोर्ड" },
      about: { en: "About Railways", hi: "रेलवे के बारे में" },
      careers: { en: "Careers", hi: "करियर" },
      privacy: { en: "Privacy Policy", hi: "गोपनीयता नीति" },
    },
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              {/* <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2 rounded-lg"> */}
              <div className="text-blue-800 w-10 h-10 mr-2">
                <img src={favicon} alt="icon" />
              </div>
              {/* </div> */}
              <div>
                <h3 className="text-xl font-bold">{text.title[language]}</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {text.description[language]}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/RailMinIndia/"
                target="blank"
                className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/RailMinIndia/highlights?lang=bg%3Flang%3Del"
                target="blank"
                className="bg-blue-400 p-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/railminindia/?hl=en"
                target="blank"
                className="bg-pink-600 p-2 rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {text.quickLinks[language]}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {text.links.home[language]}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {text.links.report[language]}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {text.links.dashboard[language]}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {text.links.about[language]}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {text.links.careers[language]}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {text.links.privacy[language]}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {text.contact[language]}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">139</p>
                  <p className="text-sm text-gray-300">
                    {language === "en" ? "Railway Helpline" : "रेलवे हेल्पलाइन"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">182</p>
                  <p className="text-sm text-gray-300">
                    {language === "en" ? "Railway Security" : "रेलवे सुरक्षा"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">feedback@indianrailways.gov.in</p>
                  <p className="text-sm text-gray-300">
                    {language === "en" ? "Email Support" : "ईमेल सहायता"}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">
                    {language === "en"
                      ? "Rail Bhavan, New Delhi"
                      : "रेल भवन, नई दिल्ली"}
                  </p>
                  <p className="text-sm text-gray-300">
                    {language === "en" ? "Headquarters" : "मुख्यालय"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {text.copyright[language]}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                {language === "en"
                  ? "Powered by Digital India Initiative"
                  : "डिजिटल इंडिया पहल द्वारा संचालित"}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-4 bg-orange-500 rounded-sm"></div>
                <div className="w-6 h-4 bg-white rounded-sm"></div>
                <div className="w-6 h-4 bg-green-500 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
