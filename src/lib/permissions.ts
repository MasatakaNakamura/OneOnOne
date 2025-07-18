import { Role } from "@prisma/client";

const roleHierarchy: { [key in Role]: number } = {
  GENERAL: 0,
  LEADER: 1,
  MANAGER: 2,
  DIRECTOR: 3,
  EXECUTIVE: 4,
};

/**
 * ユーザーが必要な権限を持っているか確認する
 * @param userRole ユーザーの役割
 * @param requiredRole 必要な役割
 * @returns boolean
 */
export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  const userLevel = roleHierarchy[userRole] ?? -1;
  const requiredLevel = roleHierarchy[requiredRole] ?? -1;
  return userLevel >= requiredLevel;
}

/**
 * ユーザーが他のユーザーの情報を閲覧できるか確認する
 * @param viewerRole 閲覧者の役割
 * @param viewerId 閲覧者のID
 * @param targetUserId 対象ユーザーのID
 * @param targetDepartmentId 対象ユーザーの部署ID
 * @param viewerDepartmentId 閲覧者の部署ID
 * @returns boolean
 */
export function canViewUser(
  viewerRole: Role,
  viewerId: string,
  targetUserId: string,
  targetDepartmentId?: string,
  viewerDepartmentId?: string
): boolean {
  // 自分の情報は常に閲覧可能
  if (viewerId === targetUserId) {
    return true;
  }

  // 役割による権限チェック
  switch (viewerRole) {
    case "GENERAL":
      return false; // 自分以外は閲覧不可
    case "LEADER":
      // 直属の部下のみ（同じ部署）または部署が未設定の場合
      return targetDepartmentId === viewerDepartmentId || !targetDepartmentId;
    case "MANAGER":
      // 配下の部署全体および部署が未設定の場合
      return targetDepartmentId === viewerDepartmentId || !targetDepartmentId;
    case "DIRECTOR":
      // 全ての部署および部署が未設定の場合
      return true;
    case "EXECUTIVE":
      return true; // 全ユーザー閲覧可能
    default:
      return false;
  }
}

/**
 * ユーザーが他のユーザーの情報を編集できるか確認する
 * @param editorRole 編集者の役割
 * @param editorId 編集者のID
 * @param targetUserId 対象ユーザーのID
 * @param targetRole 対象ユーザーの役割
 * @returns boolean
 */
export function canEditUser(
  editorRole: Role,
  editorId: string,
  targetUserId: string,
  targetRole: Role
): boolean {
  // 自分の情報は編集可能（ただし役割は変更不可）
  if (editorId === targetUserId) {
    return true;
  }

  // 上位の役割のユーザーは下位の役割のユーザーを編集可能
  const editorLevel = roleHierarchy[editorRole] ?? -1;
  const targetLevel = roleHierarchy[targetRole] ?? -1;
  
  // 編集者の役割が対象ユーザーより上位であれば編集可能
  if (editorLevel > targetLevel) {
    return true;
  }

  return false;
}

/**
 * ユーザーが他のユーザーを削除できるか確認する
 * @param deleterRole 削除者の役割
 * @param targetRole 対象ユーザーの役割
 * @returns boolean
 */
export function canDeleteUser(deleterRole: Role, targetRole: Role): boolean {
  // DIRECTOR以上が必要
  if (!hasPermission(deleterRole, "DIRECTOR")) {
    return false;
  }

  // 同じまたは上位の役割のユーザーは削除不可
  const deleterLevel = roleHierarchy[deleterRole] ?? -1;
  const targetLevel = roleHierarchy[targetRole] ?? -1;
  return deleterLevel > targetLevel;
}

/**
 * ユーザーが役割を変更できるか確認する
 * @param changerRole 変更者の役割
 * @param targetRole 対象ユーザーの現在の役割
 * @param newRole 変更後の役割
 * @returns boolean
 */
export function canChangeRole(
  changerRole: Role,
  targetRole: Role,
  newRole: Role
): boolean {
  // EXECUTIVE以上が必要
  if (!hasPermission(changerRole, "EXECUTIVE")) {
    return false;
  }

  // 自分より上位の役割には変更不可
  const changerLevel = roleHierarchy[changerRole] ?? -1;
  const targetLevel = roleHierarchy[targetRole] ?? -1;
  const newLevel = roleHierarchy[newRole] ?? -1;

  return changerLevel > targetLevel && changerLevel >= newLevel;
}

/**
 * 役割の日本語名を取得する
 * @param role 役割
 * @returns 日本語名
 */
export function getRoleDisplayName(role: Role): string {
  const roleNames: { [key in Role]: string } = {
    GENERAL: "一般",
    LEADER: "リーダー",
    MANAGER: "マネージャー",
    DIRECTOR: "部長",
    EXECUTIVE: "経営層",
  };
  return roleNames[role] || role;
}