export interface Report {
  id: string;
  type: 'station' | 'train' | 'general' | 'appreciation';
  category: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  title: string;
  description: string;
  location: {
    station?: string;
    trainNumber?: string;
    platform?: string;
    coach?: string;
    gpsLocation?: string;
  };
  userInfo: {
    name?: string;
    phone?: string;
    email?: string;
    isAnonymous: boolean;
  };
  photos: string[];
  status: 'submitted' | 'in-progress' | 'resolved' | 'closed';
  submittedAt: Date;
  estimatedResolution?: Date;
}

export interface Language {
  en: string;
  hi: string;
}