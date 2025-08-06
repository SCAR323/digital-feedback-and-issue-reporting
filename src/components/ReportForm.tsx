import React, { useState } from "react";
import {
  Camera,
  MapPin,
  Train,
  AlertTriangle,
  User,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import { Report } from "../types";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

interface ReportFormProps {
  onSubmit: (report: Report) => void;
  language: "en" | "hi";
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit, language }) => {
  const [formData, setFormData] = useState({
    type: "station" as "station" | "train" | "general" | "appreciation",
    category: "",
    priority: "medium" as "low" | "medium" | "high" | "emergency",
    title: "",
    description: "",
    station: "",
    trainNumber: "",
    platform: "",
    coach: "",
    name: "",
    phone: "",
    email: "",
    isAnonymous: false,
    photos: [] as string[],
  });

  const text = {
    title: {
      en: "Report an Issue or Share Feedback",
      hi: "समस्या रिपोर्ट करें या फीडबैक साझा करें",
    },
    type: { en: "Report Type", hi: "रिपोर्ट प्रकार" },
    category: { en: "Category", hi: "श्रेणी" },
    priority: { en: "Priority Level", hi: "प्राथमिकता स्तर" },
    title_field: { en: "Issue Title", hi: "समस्या शीर्षक" },
    description: { en: "Detailed Description", hi: "विस्तृत विवरण" },
    location: { en: "Location Details", hi: "स्थान विवरण" },
    contact: {
      en: "Contact Information (Optional)",
      hi: "संपर्क जानकारी (वैकल्पिक)",
    },
    anonymous: { en: "Submit Anonymously", hi: "गुमनाम रूप से सबमिट करें" },
    submit: { en: "Submit Report", hi: "रिपोर्ट सबमिट करें" },
  };

  const reportTypes = [
    { value: "station", label: { en: "Station Issue", hi: "स्टेशन समस्या" } },
    { value: "train", label: { en: "Train Issue", hi: "ट्रेन समस्या" } },
    {
      value: "general",
      label: { en: "General Feedback", hi: "सामान्य फीडबैक" },
    },
    { value: "appreciation", label: { en: "Appreciation", hi: "प्रशंसा" } },
  ];

  const categories = [
    { value: "cleanliness", label: { en: "Cleanliness", hi: "स्वच्छता" } },
    { value: "safety", label: { en: "Safety & Security", hi: "सुरक्षा" } },
    {
      value: "infrastructure",
      label: { en: "Infrastructure", hi: "अवसंरचना" },
    },
    { value: "staff", label: { en: "Staff Behavior", hi: "कर्मचारी व्यवहार" } },
    {
      value: "technical",
      label: { en: "Technical Issues", hi: "तकनीकी समस्याएं" },
    },
    { value: "food", label: { en: "Food Quality", hi: "भोजन गुणवत्ता" } },
    { value: "accessibility", label: { en: "Accessibility", hi: "पहुंच" } },
    { value: "other", label: { en: "Other", hi: "अन्य" } },
  ];

  const priorities = [
    { value: "low", label: { en: "Low", hi: "कम" }, color: "text-green-600" },
    {
      value: "medium",
      label: { en: "Medium", hi: "मध्यम" },
      color: "text-yellow-600",
    },
    {
      value: "high",
      label: { en: "High", hi: "उच्च" },
      color: "text-orange-600",
    },
    {
      value: "emergency",
      label: { en: "Emergency", hi: "आपातकाल" },
      color: "text-red-600",
    },
  ];

  // ------ Firestore-enabled version of handleSubmit ------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const report: Report = {
      id: Date.now().toString(),
      type: formData.type,
      category: formData.category,
      priority: formData.priority,
      title: formData.title,
      description: formData.description,
      location: {
        station: formData.station,
        trainNumber: formData.trainNumber,
        platform: formData.platform,
        coach: formData.coach,
      },
      userInfo: {
        name: formData.isAnonymous ? null : formData.name || null,
        phone: formData.isAnonymous ? null : formData.phone || null,
        email: formData.isAnonymous ? null : formData.email || null,
        isAnonymous: formData.isAnonymous,
      },
      photos: formData.photos,
      status: "submitted",
      submittedAt: new Date(),
    };

    try {
      await addDoc(collection(db, "reports"), report);
      onSubmit(report);
      alert(
        language === "en"
          ? "✅ Report submitted successfully! You will receive a confirmation shortly."
          : "✅ रिपोर्ट सफलतापूर्वक सबमिट की गई! आपको जल्द ही पुष्टि मिलेगी।"
      );
      setFormData({
        type: "station",
        category: "",
        priority: "medium",
        title: "",
        description: "",
        station: "",
        trainNumber: "",
        platform: "",
        coach: "",
        name: "",
        phone: "",
        email: "",
        isAnonymous: false,
        photos: [],
      });
    } catch (error: any) {
      console.error("Error submitting report:", error.message || error);
      alert(
        (language === "en"
          ? "❌ Failed to submit report: "
          : "❌ रिपोर्ट सबमिट नहीं हो सकी: ") +
          (error.message || "Unknown error")
      );
    }
  };
  // -------------------------------------------------------

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {text.title[language]}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {text.type[language]}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {reportTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type: type.value as any })
                    }
                    className={`p-4 rounded-lg border-2 text-center transition-all ${
                      formData.type === type.value
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {type.label[language]}
                  </button>
                ))}
              </div>
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {text.category[language]}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label[language]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {text.priority[language]}
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label[language]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title and Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {text.title_field[language]}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  language === "en"
                    ? "Brief summary of the issue"
                    : "समस्या का संक्षिप्त सारांश"
                }
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {text.description[language]}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  language === "en"
                    ? "Provide detailed information about the issue..."
                    : "समस्या के बारे में विस्तृत जानकारी प्रदान करें..."
                }
                required
              />
            </div>

            {/* Location Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                {text.location[language]}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === "en" ? "Station Name" : "स्टेशन का नाम"}
                  </label>
                  <input
                    type="text"
                    value={formData.station}
                    onChange={(e) =>
                      setFormData({ ...formData, station: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      language === "en" ? "e.g., New Delhi" : "जैसे, नई दिल्ली"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === "en" ? "Train Number" : "ट्रेन नंबर"}
                  </label>
                  <input
                    type="text"
                    value={formData.trainNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, trainNumber: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      language === "en" ? "e.g., 12345" : "जैसे, 12345"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === "en" ? "Platform Number" : "प्लेटफॉर्म नंबर"}
                  </label>
                  <input
                    type="text"
                    value={formData.platform}
                    onChange={(e) =>
                      setFormData({ ...formData, platform: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      language === "en"
                        ? "e.g., Platform 1"
                        : "जैसे, प्लेटफॉर्म 1"
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === "en" ? "Coach Number" : "कोच नंबर"}
                  </label>
                  <input
                    type="text"
                    value={formData.coach}
                    onChange={(e) =>
                      setFormData({ ...formData, coach: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                      language === "en" ? "e.g., S1, B2" : "जैसे, S1, B2"
                    }
                  />
                </div>
              </div>
            </div>

            {/* Photo Upload (Not implemented yet, placeholder UI) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {language === "en"
                  ? "Upload Photos (Optional)"
                  : "फोटो अपलोड करें (वैकल्पिक)"}
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  {language === "en"
                    ? "Click to upload photos or drag and drop"
                    : "फोटो अपलोड करने के लिए क्लिक करें या ड्रैग एंड ड्रॉप करें"}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {language === "en"
                    ? "PNG, JPG up to 10MB each"
                    : "PNG, JPG प्रत्येक 10MB तक"}
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  {text.contact[language]}
                </h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        isAnonymous: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {text.anonymous[language]}
                  </span>
                </label>
              </div>
              {!formData.isAnonymous && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "en" ? "Full Name" : "पूरा नाम"}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "en" ? "Phone Number" : "फोन नंबर"}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === "en" ? "Email Address" : "ईमेल पता"}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center mx-auto"
              >
                <Send className="h-5 w-5 mr-2" />
                {text.submit[language]}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
