'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextAction, User } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import { 
  getNextActionStatusDisplayName, 
  getNextActionStatusColor,
  getNextActionPriority,
  getPriorityColor,
  getDueDateDisplay,
  isOverdue,
  sortNextActions,
  getNextActionStats
} from '@/lib/next-action-helpers';

// API response type for NextAction with related data
type NextActionWithRelations = NextAction & {
  user: {
    id: string;
    name: string;
    email: string;
  };
  oneOnOne: {
    id: string;
    scheduledAt: Date;
    supervisor: {
      id: string;
      name: string;
      email: string;
    };
    member: {
      id: string;
      name: string;
      email: string;
    };
  };
};
import { formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';

export default function ActionsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [nextActions, setNextActions] = useState<NextActionWithRelations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('');

  useEffect(() => {
    if (session) {
      fetchNextActions();
    }
  }, [session, selectedStatus, selectedFilter]);

  const fetchNextActions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (selectedStatus) params.append('status', selectedStatus);
      if (selectedFilter === 'overdue') params.append('overdue', 'true');
      if (selectedFilter === 'dueThisWeek') params.append('dueThisWeek', 'true');

      const response = await fetch(`/api/actions?${params}`);
      if (response.ok) {
        const data = await response.json();
        setNextActions(data);
      } else {
        setError('Next Actionの取得に失敗しました');
      }
    } catch (error) {
      setError('Next Actionの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (actionId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/actions/${actionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchNextActions(); // 一覧を再取得
      } else {
        const data = await response.json();
        alert(data.error || 'ステータスの更新に失敗しました');
      }
    } catch (error) {
      alert('ステータスの更新に失敗しました');
    }
  };

  const handleDeleteAction = async (actionId: string) => {
    if (!confirm('このNext Actionを削除してもよろしいですか？')) {
      return;
    }

    try {
      const response = await fetch(`/api/actions/${actionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchNextActions(); // 一覧を再取得
      } else {
        const data = await response.json();
        alert(data.error || 'Next Actionの削除に失敗しました');
      }
    } catch (error) {
      alert('Next Actionの削除に失敗しました');
    }
  };

  if (!session) {
    return <Layout><div>ログインが必要です</div></Layout>;
  }

  if (loading) {
    return <Layout><div>読み込み中...</div></Layout>;
  }

  const stats = getNextActionStats(nextActions);
  const sortedActions = sortNextActions(nextActions);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Next Action管理</h1>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">{error}</div>
          </div>
        )}

        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg">
                <div className="w-6 h-6 text-white">📋</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500 rounded-lg">
                <div className="w-6 h-6 text-white">⏳</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">未着手</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-2 bg-red-500 rounded-lg">
                <div className="w-6 h-6 text-white">🚨</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">期限切れ</p>
                <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg">
                <div className="w-6 h-6 text-white">✅</div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">完了率</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* フィルター */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">ステータス:</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">すべて</option>
                <option value="PENDING">未着手</option>
                <option value="IN_PROGRESS">対応中</option>
                <option value="COMPLETED">完了</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">フィルター:</label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">すべて</option>
                <option value="overdue">期限切れ</option>
                <option value="dueThisWeek">今週期限</option>
              </select>
            </div>
          </div>
        </div>

        {/* Next Action一覧 */}
        <div className="space-y-4">
          {sortedActions.map((action) => {
            const priority = getNextActionPriority(action.dueDate);
            const overdueFlag = isOverdue(action.dueDate) && action.status !== 'COMPLETED';

            return (
              <div
                key={action.id}
                className={`bg-white rounded-lg border shadow-sm p-6 ${
                  overdueFlag ? 'border-red-300' : getPriorityColor(priority)
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    {action.description && (
                      <p className="text-gray-600 mb-2">{action.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>担当者: {(action as any).user?.name || 'Unknown'}</span>
                      <span>期限: {formatDate(action.dueDate)} ({getDueDateDisplay(action.dueDate)})</span>
                      <span>
                        1on1: {formatDate((action as any).oneOnOne?.scheduledAt)} 
                        ({(action as any).oneOnOne?.supervisor?.name} ↔ {(action as any).oneOnOne?.member?.name})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getNextActionStatusColor(action.status)}`}>
                      {getNextActionStatusDisplayName(action.status)}
                    </span>
                    {overdueFlag && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        期限切れ
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <select
                      value={action.status}
                      onChange={(e) => handleStatusChange(action.id, e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="PENDING">未着手</option>
                      <option value="IN_PROGRESS">対応中</option>
                      <option value="COMPLETED">完了</option>
                    </select>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/one-on-ones/${action.oneOnOneId}`)}
                    >
                      1on1を見る
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteAction(action.id)}
                    >
                      削除
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sortedActions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">Next Actionがありません</div>
            <Button onClick={() => router.push('/one-on-ones')}>
              1on1を確認する
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}