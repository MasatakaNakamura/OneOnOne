'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NextAction, OneOnOne, User } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import { 
  getNextActionStatusDisplayName, 
  getNextActionStatusColor,
  getDueDateDisplay,
  isOverdue,
  getNextActionStats
} from '@/lib/next-action-helpers';
import { formatOneOnOneDate } from '@/lib/one-on-one-helpers';
import Layout from '@/components/Layout';

interface NextActionWithDetails extends NextAction {
  user: Pick<User, 'id' | 'name' | 'email'>;
  oneOnOne: {
    id: string;
    scheduledAt: Date;
    supervisor: Pick<User, 'id' | 'name' | 'email'>;
    member: Pick<User, 'id' | 'name' | 'email'>;
  };
}

interface OneOnOneWithDetails extends OneOnOne {
  supervisor: Pick<User, 'id' | 'name' | 'email' | 'role'>;
  member: Pick<User, 'id' | 'name' | 'email' | 'role'>;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [nextActions, setNextActions] = useState<NextActionWithDetails[]>([]);
  const [oneOnOnes, setOneOnOnes] = useState<OneOnOneWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchDashboardData();
    }
  }, [session]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Next Actions取得
      const actionsResponse = await fetch('/api/actions');
      if (actionsResponse.ok) {
        const actionsData = await actionsResponse.json();
        setNextActions(actionsData);
      }

      // 1on1取得
      const oneOnOnesResponse = await fetch('/api/one-on-ones');
      if (oneOnOnesResponse.ok) {
        const oneOnOnesData = await oneOnOnesResponse.json();
        setOneOnOnes(oneOnOnesData);
      }
    } catch (error) {
      console.error('ダッシュボードデータの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return <Layout><div>ログインが必要です</div></Layout>;
  }

  if (loading) {
    return <Layout><div>読み込み中...</div></Layout>;
  }

  const actionStats = getNextActionStats(nextActions);
  const upcomingOneOnOnes = oneOnOnes
    .filter(o => o.status === 'SCHEDULED' && new Date(o.scheduledAt) > new Date())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, 5);

  const pendingActions = nextActions
    .filter(a => a.status !== 'COMPLETED')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <p className="text-gray-600">あなたの1on1とアクションの概要</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">今後の1on1</h3>
            <p className="text-3xl font-bold text-blue-600">{upcomingOneOnOnes.length}</p>
            <p className="text-gray-600">予定</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">未完了アクション</h3>
            <p className="text-3xl font-bold text-orange-600">{actionStats.pending + actionStats.inProgress}</p>
            <p className="text-gray-600">要対応</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">期限切れ</h3>
            <p className="text-3xl font-bold text-red-600">{actionStats.overdue}</p>
            <p className="text-gray-600">要対応</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">完了率</h3>
            <p className="text-3xl font-bold text-green-600">{actionStats.completionRate}%</p>
            <p className="text-gray-600">Next Action</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">今後の1on1</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/one-on-ones')}
              >
                すべて見る
              </Button>
            </div>
            <div className="space-y-3">
              {upcomingOneOnOnes.length > 0 ? (
                upcomingOneOnOnes.map((oneOnOne) => {
                  const otherParticipant = oneOnOne.supervisorId === session.user.id ? oneOnOne.member : oneOnOne.supervisor;
                  return (
                    <div key={oneOnOne.id} className="flex items-center justify-between py-2 border-b">
                      <div>
                        <p className="font-medium">{otherParticipant.name}</p>
                        <p className="text-sm text-gray-600">{formatOneOnOneDate(oneOnOne.scheduledAt)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/one-on-ones/${oneOnOne.id}`)}
                      >
                        詳細
                      </Button>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">予定されている1on1がありません</p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">未完了アクション</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/actions')}
              >
                すべて見る
              </Button>
            </div>
            <div className="space-y-3">
              {pendingActions.length > 0 ? (
                pendingActions.map((action) => {
                  const overdueFlag = isOverdue(action.dueDate);
                  return (
                    <div key={action.id} className="flex items-center justify-between py-2 border-b">
                      <div className="flex-1">
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm text-gray-600">期限: {getDueDateDisplay(action.dueDate)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm px-2 py-1 rounded ${getNextActionStatusColor(action.status)}`}>
                          {getNextActionStatusDisplayName(action.status)}
                        </span>
                        {overdueFlag && (
                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                            期限切れ
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">未完了のアクションがありません</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}