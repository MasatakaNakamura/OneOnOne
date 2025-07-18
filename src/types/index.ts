// Database schema types based on basic design document

export interface User {
  id: number;
  departmentId: number;
  name: string;
  email: string;
  passwordHash: string;
  role: 'general' | 'leader' | 'manager' | 'director' | 'executive';
  clientCompanyName?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  id: number;
  userId: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface KeyResult {
  id: number;
  goalId: number;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OneOnOne {
  id: number;
  supervisorId: number;
  memberId: number;
  scheduledAt: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface Agenda {
  id: number;
  oneOnOneId: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Minutes {
  id: number;
  oneOnOneId: number;
  speakerId: number;
  content: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NextAction {
  id: number;
  oneOnOneId: number;
  userId: number;
  title: string;
  description?: string;
  dueDate: Date;
  status: 'pending' | 'in_progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth types
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: User['role'];
  departmentId: number;
  clientCompanyName?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

// Dashboard types
export interface DashboardData {
  upcomingOneOnOnes: OneOnOne[];
  pendingActions: NextAction[];
  membersSummary?: {
    totalMembers: number;
    completedOneOnOnes: number;
    pendingActions: number;
  };
}