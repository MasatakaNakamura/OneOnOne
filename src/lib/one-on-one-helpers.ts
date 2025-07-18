import { OneOnOne, OneOnOneStatus, Agenda, Minutes, NextAction, User } from "@prisma/client";

export interface OneOnOneWithDetails extends OneOnOne {
  supervisor: Pick<User, 'id' | 'name' | 'email' | 'role'>;
  member: Pick<User, 'id' | 'name' | 'email' | 'role'>;
  agendas: Agenda[];
  minutes: Minutes[];
  nextActions: NextAction[];
}

/**
 * 1on1ステータスの日本語表示名を取得する
 * @param status 1on1ステータス
 * @returns 日本語表示名
 */
export function getOneOnOneStatusDisplayName(status: OneOnOneStatus): string {
  const statusNames: { [key in OneOnOneStatus]: string } = {
    SCHEDULED: "予定",
    COMPLETED: "完了",
    CANCELLED: "キャンセル",
  };
  return statusNames[status] || status;
}

/**
 * 1on1ステータスの色を取得する
 * @param status 1on1ステータス
 * @returns TailwindCSS のクラス名
 */
export function getOneOnOneStatusColor(status: OneOnOneStatus): string {
  const statusColors: { [key in OneOnOneStatus]: string } = {
    SCHEDULED: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-gray-100 text-gray-800",
  };
  return statusColors[status] || "bg-gray-100 text-gray-800";
}

/**
 * SES企業向けの1on1アジェンダテンプレートを取得する
 * @returns アジェンダテンプレートの配列
 */
export function getOneOnOneTemplates() {
  return [
    {
      name: "月次定期面談",
      description: "毎月の定期1on1で使用するテンプレート",
      agendas: [
        {
          title: "前回のNext Actionの振り返り",
          description: "前回決定したアクションの進捗確認"
        },
        {
          title: "今月の業務状況",
          description: "担当プロジェクトの進捗、課題、成果について"
        },
        {
          title: "目標の進捗確認",
          description: "設定した目標（OKR）の進捗状況と課題"
        },
        {
          title: "スキルアップ・キャリア相談",
          description: "学習したい技術、取得したい資格、キャリアの方向性"
        },
        {
          title: "現場・環境での困りごと",
          description: "クライアント先での課題、人間関係、業務環境について"
        },
        {
          title: "会社・チームへの要望",
          description: "制度、環境、サポート体制への要望や改善提案"
        },
        {
          title: "来月の目標設定",
          description: "来月重点的に取り組むことの整理"
        }
      ]
    },
    {
      name: "プロジェクト参画初期",
      description: "新しいプロジェクトに参画した際の初期フォロー",
      agendas: [
        {
          title: "プロジェクトの概要確認",
          description: "担当業務、技術スタック、チーム構成の理解度"
        },
        {
          title: "現場環境への適応状況",
          description: "クライアント先の文化、働き方、コミュニケーションスタイル"
        },
        {
          title: "技術的な課題・不安",
          description: "新しい技術、ツール、開発プロセスでの困りごと"
        },
        {
          title: "学習・キャッチアップ計画",
          description: "必要なスキル習得のための学習計画"
        },
        {
          title: "サポート体制の確認",
          description: "質問できる人、相談できる体制の整備"
        },
        {
          title: "短期目標の設定",
          description: "参画から1-3ヶ月での達成目標"
        }
      ]
    },
    {
      name: "四半期レビュー",
      description: "四半期ごとの振り返りと次期計画",
      agendas: [
        {
          title: "四半期の振り返り",
          description: "達成できたこと、課題、学び"
        },
        {
          title: "目標達成度の評価",
          description: "設定した目標の達成状況と要因分析"
        },
        {
          title: "スキル・成長の確認",
          description: "身についたスキル、成長実感、周囲からの評価"
        },
        {
          title: "来期の目標設定",
          description: "次の四半期での挑戦したいこと、学びたいこと"
        },
        {
          title: "キャリアプランの見直し",
          description: "中長期的なキャリア方向性の確認・調整"
        }
      ]
    },
    {
      name: "課題解決・改善提案",
      description: "特定の課題や改善提案について深く議論する",
      agendas: [
        {
          title: "課題の整理",
          description: "現在直面している課題の詳細な整理"
        },
        {
          title: "原因分析",
          description: "課題の根本原因の分析"
        },
        {
          title: "改善案の検討",
          description: "具体的な改善策の立案"
        },
        {
          title: "実行計画の策定",
          description: "改善案の実行に向けた具体的な計画"
        },
        {
          title: "成果測定方法",
          description: "改善効果をどのように測定するか"
        }
      ]
    }
  ];
}

/**
 * 時刻を「HH:MM」形式でフォーマットする
 * @param date 日時
 * @returns 時刻文字列
 */
export function formatTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 1on1の期間を「MM月DD日 HH:MM」形式でフォーマットする
 * @param date 日時
 * @returns 日時文字列
 */
export function formatOneOnOneDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('ja-JP', {
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * 1on1が実施可能かどうかを判定する
 * @param scheduledAt 予定日時
 * @returns 実施可能かどうか
 */
export function canConductOneOnOne(scheduledAt: Date | string): boolean {
  const now = new Date();
  const scheduled = new Date(scheduledAt);
  
  // 予定時刻から30分前～予定時刻後まで実施可能
  const startTime = new Date(scheduled.getTime() - 30 * 60 * 1000);
  const endTime = new Date(scheduled.getTime() + 60 * 60 * 1000);
  
  return now >= startTime && now <= endTime;
}

/**
 * 1on1のステータスに基づいて利用可能なアクションを取得する
 * @param status 1on1ステータス
 * @param isParticipant 参加者かどうか
 * @param scheduledAt 予定日時
 * @returns 利用可能なアクション
 */
export function getAvailableActions(
  status: OneOnOneStatus,
  isParticipant: boolean,
  scheduledAt: Date | string
): {
  canEdit: boolean;
  canCancel: boolean;
  canConduct: boolean;
  canComplete: boolean;
  canExportPDF: boolean;
} {
  const now = new Date();
  const scheduled = new Date(scheduledAt);
  const isPast = now > scheduled;
  
  return {
    canEdit: status === 'SCHEDULED' && !isPast && isParticipant,
    canCancel: status === 'SCHEDULED' && !isPast && isParticipant,
    canConduct: status === 'SCHEDULED' && canConductOneOnOne(scheduledAt) && isParticipant,
    canComplete: status === 'SCHEDULED' && isPast && isParticipant,
    canExportPDF: status === 'COMPLETED',
  };
}