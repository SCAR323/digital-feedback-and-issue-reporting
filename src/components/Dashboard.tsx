import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, AlertTriangle, XCircle, Eye, Calendar, MapPin, User } from 'lucide-react';
import { Report } from '../types';

interface DashboardProps {
  reports: Report[];
  language: 'en' | 'hi';
}

const Dashboard: React.FC<DashboardProps> = ({ reports, language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const text = {
    title: { en: 'Reports Dashboard', hi: 'रिपोर्ट डैशबोर्ड' },
    search: { en: 'Search reports...', hi: 'रिपोर्ट खोजें...' },
    filter: { en: 'Filter by Status', hi: 'स्थिति के अनुसार फ़िल्टर करें' },
    all: { en: 'All Reports', hi: 'सभी रिपोर्ट' },
    submitted: { en: 'Submitted', hi: 'सबमिट की गई' },
    inProgress: { en: 'In Progress', hi: 'प्रगति में' },
    resolved: { en: 'Resolved', hi: 'हल की गई' },
    closed: { en: 'Closed', hi: 'बंद की गई' },
    noReports: { en: 'No reports found', hi: 'कोई रिपोर्ट नहीं मिली' },
    viewDetails: { en: 'View Details', hi: 'विवरण देखें' },
    reportDetails: { en: 'Report Details', hi: 'रिपोर्ट विवरण' },
    close: { en: 'Close', hi: 'बंद करें' },
    anonymous: { en: 'Anonymous', hi: 'गुमनाम' }
  };

  const statusOptions = [
    { value: 'all', label: text.all[language] },
    { value: 'submitted', label: text.submitted[language] },
    { value: 'in-progress', label: text.inProgress[language] },
    { value: 'resolved', label: text.resolved[language] },
    { value: 'closed', label: text.closed[language] }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in-progress':
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'emergency':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: reports.length,
    submitted: reports.filter(r => r.status === 'submitted').length,
    inProgress: reports.filter(r => r.status === 'in-progress').length,
    resolved: reports.filter(r => r.status === 'resolved').length
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {text.title[language]}
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {language === 'en' ? 'Total Reports' : 'कुल रिपोर्ट'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{text.submitted[language]}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.submitted}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{text.inProgress[language]}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{text.resolved[language]}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.resolved}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={text.search[language]}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-[200px]"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {filteredReports.length === 0 ? (
            <div className="p-12 text-center">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">{text.noReports[language]}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {text[report.status as keyof typeof text]?.[language] || report.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
                          {report.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{report.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {report.submittedAt.toLocaleDateString()}
                        </div>
                        {report.location.station && (
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {report.location.station}
                          </div>
                        )}
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {report.userInfo.isAnonymous ? text.anonymous[language] : report.userInfo.name || text.anonymous[language]}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(report.status)}
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        {text.viewDetails[language]}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Report Details Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{text.reportDetails[language]}</h2>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedReport.title}</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                      {text[selectedReport.status as keyof typeof text]?.[language] || selectedReport.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedReport.priority)}`}>
                      {selectedReport.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-700">{selectedReport.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'en' ? 'Location Details' : 'स्थान विवरण'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      {selectedReport.location.station && (
                        <p><span className="font-medium">Station:</span> {selectedReport.location.station}</p>
                      )}
                      {selectedReport.location.trainNumber && (
                        <p><span className="font-medium">Train:</span> {selectedReport.location.trainNumber}</p>
                      )}
                      {selectedReport.location.platform && (
                        <p><span className="font-medium">Platform:</span> {selectedReport.location.platform}</p>
                      )}
                      {selectedReport.location.coach && (
                        <p><span className="font-medium">Coach:</span> {selectedReport.location.coach}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {language === 'en' ? 'Contact Information' : 'संपर्क जानकारी'}
                    </h4>
                    <div className="space-y-2 text-sm">
                      {selectedReport.userInfo.isAnonymous ? (
                        <p className="text-gray-600">{text.anonymous[language]}</p>
                      ) : (
                        <>
                          {selectedReport.userInfo.name && (
                            <p><span className="font-medium">Name:</span> {selectedReport.userInfo.name}</p>
                          )}
                          {selectedReport.userInfo.phone && (
                            <p><span className="font-medium">Phone:</span> {selectedReport.userInfo.phone}</p>
                          )}
                          {selectedReport.userInfo.email && (
                            <p><span className="font-medium">Email:</span> {selectedReport.userInfo.email}</p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'en' ? 'Report Information' : 'रिपोर्ट जानकारी'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <p><span className="font-medium">ID:</span> {selectedReport.id}</p>
                    <p><span className="font-medium">Type:</span> {selectedReport.type}</p>
                    <p><span className="font-medium">Category:</span> {selectedReport.category}</p>
                    <p><span className="font-medium">Submitted:</span> {selectedReport.submittedAt.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {text.close[language]}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;