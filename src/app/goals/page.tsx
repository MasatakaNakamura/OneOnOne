'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Goal, KeyResult, User } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import { 
  calculateGoalProgress, 
  getGoalStatusDisplayName, 
  getGoalStatusColor,
  GoalWithKeyResults 
} from '@/lib/goal-helpers';
import { formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';

interface GoalWithDetails extends Goal {
  keyResults: KeyResult[];
  user: Pick<User, 'id' | 'name' | 'email' | 'role'>;
}

export default function GoalsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [goals, setGoals] = useState<GoalWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'my' | 'subordinates'>('my');

  useEffect(() => {
    if (session) {
      fetchGoals();
    }
  }, [session, activeTab]);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      if (activeTab === 'subordinates') {
        // TODO: 部下の目標を取得するロジック
        // 現在は空の配列を返す
        setGoals([]);
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/goals?${params}`);
      if (response.ok) {
        const data = await response.json();
        setGoals(data);
      } else {
        setError('目標の取得に失敗しました');
      }
    } catch (error) {
      setError('目標の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (!confirm('この目標を削除してもよろしいですか？')) {
      return;
    }

    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setGoals(goals.filter(goal => goal.id !== goalId));
      } else {
        const data = await response.json();
        alert(data.error || '目標の削除に失敗しました');
      }
    } catch (error) {
      alert('目標の削除に失敗しました');
    }
  };

  const handleApproveGoal = async (goalId: string, status: 'ACTIVE' | 'REJECTED') => {
    try {
      const response = await fetch(`/api/goals/${goalId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchGoals(); // 一覧を再取得
        const data = await response.json();
        alert(data.message);
      } else {
        const data = await response.json();
        alert(data.error || '承認処理に失敗しました');
      }
    } catch (error) {
      alert('承認処理に失敗しました');
    }
  };

  if (!session) {
    return <Layout><div>ログインが必要です</div></Layout>;
  }

  if (loading) {
    return <Layout><div>読み込み中...</div></Layout>;
  }

  const canViewSubordinates = ['MANAGER', 'DIRECTOR', 'EXECUTIVE'].includes(session.user.role);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">目標管理</h1>
          <Button onClick={() => router.push('/goals/new')}>
            新規目標作成
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">{error}</div>
          </div>
        )}

        {/* タブ */}
        {canViewSubordinates && (
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('my')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'my'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                自分の目標
              </button>
              <button
                onClick={() => setActiveTab('subordinates')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'subordinates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                部下の目標
              </button>
            </nav>
          </div>
        )}

        {/* 目標一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-white rounded-lg border shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {goal.title}
                </h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGoalStatusColor(goal.status)}`}>
                  {getGoalStatusDisplayName(goal.status)}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {goal.description}
              </p>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">進捗</span>
                  <span className="text-sm text-gray-600">
                    {calculateGoalProgress(goal.keyResults)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateGoalProgress(goal.keyResults)}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                <p>期間: {formatDate(goal.startDate)} - {formatDate(goal.endDate)}</p>
                <p>Key Results: {goal.keyResults.length}件</p>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/goals/${goal.id}`)}
                >
                  詳細
                </Button>
                
                {goal.userId === session.user.id && ['DRAFT', 'REJECTED'].includes(goal.status) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/goals/${goal.id}/edit`)}
                  >
                    編集
                  </Button>
                )}

                {goal.userId === session.user.id && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    削除
                  </Button>
                )}

                {/* 承認ボタン（上司向け） */}
                {goal.status === 'PENDING_APPROVAL' && goal.userId !== session.user.id && (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleApproveGoal(goal.id, 'ACTIVE')}
                    >
                      承認
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleApproveGoal(goal.id, 'REJECTED')}
                    >
                      差し戻し
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {goals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              {activeTab === 'my' ? '目標がまだ作成されていません' : '部下の目標がありません'}
            </div>
            {activeTab === 'my' && (
              <Button onClick={() => router.push('/goals/new')}>
                最初の目標を作成する
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}