import { Goal, KeyResult, GoalStatus } from "@prisma/client";

export interface GoalWithKeyResults extends Goal {
  keyResults: KeyResult[];
}

/**
 * 目標の進捗率を計算する
 * @param keyResults Key Results の配列
 * @returns 進捗率（0-100）
 */
export function calculateGoalProgress(keyResults: KeyResult[]): number {
  if (!keyResults || keyResults.length === 0) return 0;

  const totalProgress = keyResults.reduce((sum, kr) => {
    const progress = Math.min((kr.currentValue / kr.targetValue) * 100, 100);
    return sum + progress;
  }, 0);

  return Math.round(totalProgress / keyResults.length);
}

/**
 * 目標ステータスの日本語表示名を取得する
 * @param status 目標ステータス
 * @returns 日本語表示名
 */
export function getGoalStatusDisplayName(status: GoalStatus): string {
  const statusNames: { [key in GoalStatus]: string } = {
    DRAFT: "下書き",
    PENDING_APPROVAL: "承認待ち",
    REJECTED: "差し戻し",
    ACTIVE: "進行中",
    COMPLETED: "完了",
    CANCELLED: "キャンセル",
  };
  return statusNames[status] || status;
}

/**
 * 目標ステータスの色を取得する
 * @param status 目標ステータス
 * @returns TailwindCSS のクラス名
 */
export function getGoalStatusColor(status: GoalStatus): string {
  const statusColors: { [key in GoalStatus]: string } = {
    DRAFT: "bg-gray-100 text-gray-800",
    PENDING_APPROVAL: "bg-yellow-100 text-yellow-800",
    REJECTED: "bg-red-100 text-red-800",
    ACTIVE: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-gray-100 text-gray-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
}

/**
 * SES企業向けの目標例を取得する
 * @returns 目標例の配列
 */
export function getGoalExamples() {
  return [
    {
      title: "担当プロジェクトの顧客満足度向上",
      description: "クライアント先での技術力向上と円滑なコミュニケーションにより、顧客満足度を最大化し、次期契約更新に繋げる",
      keyResults: [
        {
          title: "顧客満足度アンケートで高評価を獲得",
          targetValue: 4.5,
          unit: "点",
          description: "5段階評価中、平均4.5以上を獲得する"
        },
        {
          title: "月次レポートでの評価維持",
          targetValue: 90,
          unit: "%",
          description: "担当顧客からの月次レポートで「満足」以上を90%維持する"
        },
        {
          title: "技術資格取得による提案力強化",
          targetValue: 1,
          unit: "件",
          description: "AWSソリューションアーキテクト資格を取得し、技術提案の幅を広げる"
        }
      ]
    },
    {
      title: "個人スキルアップによる付加価値向上",
      description: "新しい技術スキルを習得し、チームや顧客に対してより高い価値を提供できるようになる",
      keyResults: [
        {
          title: "新技術フレームワークの習得",
          targetValue: 2,
          unit: "件",
          description: "React/Vue.js等のモダンフレームワークを2つ以上習得する"
        },
        {
          title: "社内勉強会での発表",
          targetValue: 3,
          unit: "回",
          description: "学習した技術内容を社内勉強会で3回以上発表する"
        },
        {
          title: "実プロジェクトでの新技術活用",
          targetValue: 1,
          unit: "件",
          description: "習得した技術を実際のプロジェクトで活用する"
        }
      ]
    }
  ];
}

/**
 * Key Result の単位例を取得する
 * @returns 単位例の配列
 */
export function getKeyResultUnitExamples() {
  return [
    "件", "回", "人", "時間", "日", "週", "ヶ月",
    "%", "点", "円", "万円", "個", "本", "冊"
  ];
}