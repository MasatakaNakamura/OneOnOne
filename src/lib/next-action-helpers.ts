import { NextAction, NextActionStatus, User } from "@prisma/client";

export interface NextActionWithDetails extends NextAction {
  user: Pick<User, 'id' | 'name' | 'email'>;
  oneOnOne: {
    id: string;
    scheduledAt: Date;
    supervisor: Pick<User, 'id' | 'name' | 'email'>;
    member: Pick<User, 'id' | 'name' | 'email'>;
  };
}

/**
 * Next Actionステータスの日本語表示名を取得する
 * @param status Next Actionステータス
 * @returns 日本語表示名
 */
export function getNextActionStatusDisplayName(status: NextActionStatus): string {
  const statusNames: { [key in NextActionStatus]: string } = {
    PENDING: "未着手",
    IN_PROGRESS: "対応中",
    COMPLETED: "完了",
  };
  return statusNames[status] || status;
}

/**
 * Next Actionステータスの色を取得する
 * @param status Next Actionステータス
 * @returns TailwindCSS のクラス名
 */
export function getNextActionStatusColor(status: NextActionStatus): string {
  const statusColors: { [key in NextActionStatus]: string } = {
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
}

/**
 * Next Actionの優先度を期限に基づいて計算する
 * @param dueDate 期限
 * @returns 優先度レベル
 */
export function getNextActionPriority(dueDate: Date): 'high' | 'medium' | 'low' {
  const now = new Date();
  const diffTime = dueDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 1) return 'high';
  if (diffDays <= 7) return 'medium';
  return 'low';
}

/**
 * Next Actionの優先度に基づく色を取得する
 * @param priority 優先度
 * @returns TailwindCSS のクラス名
 */
export function getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
  const priorityColors = {
    high: "border-red-500 bg-red-50",
    medium: "border-yellow-500 bg-yellow-50",
    low: "border-green-500 bg-green-50",
  };
  return priorityColors[priority];
}

/**
 * Next Actionが期限切れかどうかを判定する
 * @param dueDate 期限
 * @returns 期限切れかどうか
 */
export function isOverdue(dueDate: Date): boolean {
  const now = new Date();
  return dueDate < now;
}

/**
 * Next Actionが期限前日かどうかを判定する
 * @param dueDate 期限
 * @returns 期限前日かどうか
 */
export function isDueTomorrow(dueDate: Date): boolean {
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);
  
  return dueDate.toDateString() === tomorrow.toDateString();
}

/**
 * Next Actionが今日期限かどうかを判定する
 * @param dueDate 期限
 * @returns 今日期限かどうか
 */
export function isDueToday(dueDate: Date): boolean {
  const now = new Date();
  return dueDate.toDateString() === now.toDateString();
}

/**
 * Next Actionの期限までの残り日数を取得する
 * @param dueDate 期限
 * @returns 残り日数
 */
export function getDaysUntilDue(dueDate: Date): number {
  const now = new Date();
  const diffTime = dueDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Next Actionの期限表示文字列を取得する
 * @param dueDate 期限
 * @returns 期限表示文字列
 */
export function getDueDateDisplay(dueDate: Date): string {
  const daysUntil = getDaysUntilDue(dueDate);
  
  if (daysUntil < 0) {
    return `${Math.abs(daysUntil)}日遅れ`;
  } else if (daysUntil === 0) {
    return '今日まで';
  } else if (daysUntil === 1) {
    return '明日まで';
  } else {
    return `${daysUntil}日後`;
  }
}

/**
 * Next Actionをステータスと期限でソートする
 * @param actions Next Actionの配列
 * @returns ソート済みの配列
 */
export function sortNextActions(actions: NextAction[]): NextAction[] {
  return [...actions].sort((a, b) => {
    // 完了済みは最後に
    if (a.status === 'COMPLETED' && b.status !== 'COMPLETED') return 1;
    if (a.status !== 'COMPLETED' && b.status === 'COMPLETED') return -1;
    
    // 期限の近い順
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}

/**
 * Next Actionのフィルタリング条件
 */
export interface NextActionFilters {
  status?: NextActionStatus;
  overdue?: boolean;
  dueThisWeek?: boolean;
  userId?: string;
  oneOnOneId?: string;
}

/**
 * Next Actionをフィルタリングする
 * @param actions Next Actionの配列
 * @param filters フィルタリング条件
 * @returns フィルタリングされた配列
 */
export function filterNextActions(
  actions: NextAction[],
  filters: NextActionFilters
): NextAction[] {
  return actions.filter((action) => {
    if (filters.status && action.status !== filters.status) return false;
    
    if (filters.overdue && !isOverdue(action.dueDate)) return false;
    
    if (filters.dueThisWeek) {
      const daysUntil = getDaysUntilDue(action.dueDate);
      if (daysUntil < 0 || daysUntil > 7) return false;
    }
    
    if (filters.userId && action.userId !== filters.userId) return false;
    
    if (filters.oneOnOneId && action.oneOnOneId !== filters.oneOnOneId) return false;
    
    return true;
  });
}

/**
 * Next Actionの統計情報を取得する
 * @param actions Next Actionの配列
 * @returns 統計情報
 */
export function getNextActionStats(actions: NextAction[]) {
  const total = actions.length;
  const completed = actions.filter(a => a.status === 'COMPLETED').length;
  const inProgress = actions.filter(a => a.status === 'IN_PROGRESS').length;
  const pending = actions.filter(a => a.status === 'PENDING').length;
  const overdue = actions.filter(a => isOverdue(a.dueDate) && a.status !== 'COMPLETED').length;
  const dueThisWeek = actions.filter(a => {
    const days = getDaysUntilDue(a.dueDate);
    return days >= 0 && days <= 7 && a.status !== 'COMPLETED';
  }).length;

  return {
    total,
    completed,
    inProgress,
    pending,
    overdue,
    dueThisWeek,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}