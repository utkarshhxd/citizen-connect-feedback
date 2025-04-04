
export type UserRole = "resident" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

export type FeedbackStatus = "pending" | "in-progress" | "resolved";

export type UrgencyLevel = "low" | "medium" | "high";

export interface Location {
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface Feedback {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: FeedbackStatus;
  urgency: UrgencyLevel;
  issueType: string;
  location: Location;
  images: string[];
  submittedBy?: {
    name?: string;
    phone?: string;
    userId?: string;
  };
  assignedTo?: string;
  comments?: FeedbackComment[];
}

export interface FeedbackComment {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    role: UserRole;
  };
}
