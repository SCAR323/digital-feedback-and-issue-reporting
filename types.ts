// src/types.ts

export interface Report {
  id: string;
  type: "station" | "train" | "general" | "appreciation";
  category: string;
  priority: "low" | "medium" | "high" | "emergency";
  title: string;
  description: string;
  location: {
    station?: string;
    trainNumber?: string;
    platform?: string;
    coach?: string;
  };
  userInfo: {
    name?: string;
    phone?: string;
    email?: string;
    isAnonymous: boolean;
  };
  photos: string[];
  status: "submitted" | "in_progress" | "resolved";
  submittedAt: Date;
}
