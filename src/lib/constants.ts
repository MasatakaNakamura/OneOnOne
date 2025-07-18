// Application constants

export const USER_ROLES = {
  GENERAL: 'general',
  LEADER: 'leader',
  MANAGER: 'manager',
  DIRECTOR: 'director',
  EXECUTIVE: 'executive'
} as const;

export const GOAL_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export const ONE_ON_ONE_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

export const NEXT_ACTION_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
} as const;

export const ROLE_PERMISSIONS = {
  [USER_ROLES.GENERAL]: {
    canViewOwnData: true,
    canEditOwnData: true,
    canViewSubordinates: false,
    canManageUsers: false,
    canViewAnalytics: false
  },
  [USER_ROLES.LEADER]: {
    canViewOwnData: true,
    canEditOwnData: true,
    canViewSubordinates: true,
    canManageUsers: false,
    canViewAnalytics: false
  },
  [USER_ROLES.MANAGER]: {
    canViewOwnData: true,
    canEditOwnData: true,
    canViewSubordinates: true,
    canManageUsers: true,
    canViewAnalytics: true
  },
  [USER_ROLES.DIRECTOR]: {
    canViewOwnData: true,
    canEditOwnData: true,
    canViewSubordinates: true,
    canManageUsers: true,
    canViewAnalytics: true
  },
  [USER_ROLES.EXECUTIVE]: {
    canViewOwnData: true,
    canEditOwnData: true,
    canViewSubordinates: true,
    canManageUsers: true,
    canViewAnalytics: true
  }
} as const;

// API Routes
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me'
  },
  USERS: {
    LIST: '/api/users',
    CREATE: '/api/users',
    UPDATE: (id: number) => `/api/users/${id}`,
    DELETE: (id: number) => `/api/users/${id}`
  },
  GOALS: {
    LIST: '/api/goals',
    CREATE: '/api/goals',
    UPDATE: (id: number) => `/api/goals/${id}`,
    DELETE: (id: number) => `/api/goals/${id}`
  },
  ONE_ON_ONES: {
    LIST: '/api/one-on-ones',
    CREATE: '/api/one-on-ones',
    UPDATE: (id: number) => `/api/one-on-ones/${id}`,
    DELETE: (id: number) => `/api/one-on-ones/${id}`
  },
  ACTIONS: {
    LIST: '/api/actions',
    CREATE: '/api/actions',
    UPDATE: (id: number) => `/api/actions/${id}`,
    DELETE: (id: number) => `/api/actions/${id}`
  }
} as const;