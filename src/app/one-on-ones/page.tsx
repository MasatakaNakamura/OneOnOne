'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { OneOnOne, User, Agenda, Minutes, NextAction } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import { 
  getOneOnOneStatusDisplayName, 
  getOneOnOneStatusColor,
  formatOneOnOneDate,
  getAvailableActions
} from '@/lib/one-on-one-helpers';
import Layout from '@/components/Layout';

interface OneOnOneWithDetails extends OneOnOne {
  supervisor: Pick<User, 'id' | 'name' | 'email' | 'role'>;
  member: Pick<User, 'id' | 'name' | 'email' | 'role'>;
  agendas: Agenda[];
  minutes: (Minutes & {
    speaker: Pick<User, 'id' | 'name' | 'email'>;
  })[];
  nextActions: (NextAction & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
}

export default function OneOnOnesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [oneOnOnes, setOneOnOnes] = useState<OneOnOneWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    if (session) {
      fetchOneOnOnes();
    }
  }, [session, selectedStatus]);

  const fetchOneOnOnes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedStatus) params.append('status', selectedStatus);

      const response = await fetch(`/api/one-on-ones?${params}`);
      if (response.ok) {
        const data = await response.json();
        setOneOnOnes(data);
      } else {
        setError('1on1の取得に失敗しました');
      }
    } catch (error) {
      setError('1on1の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOneOnOne = async (oneOnOneId: string) => {
    if (!confirm('この1on1をキャンセルしてもよろしいですか？')) {
      return;
    }

    try {
      const response = await fetch(`/api/one-on-ones/${oneOnOneId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchOneOnOnes(); // 一覧を再取得
      } else {
        const data = await response.json();
        alert(data.error || '1on1のキャンセルに失敗しました');
      }
    } catch (error) {
      alert('1on1のキャンセルに失敗しました');
    }
  };

  const handleCompleteOneOnOne = async (oneOnOneId: string) => {
    if (!confirm('この1on1を完了にしてもよろしいですか？')) {
      return;
    }

    try {
      const response = await fetch(`/api/one-on-ones/${oneOnOneId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'COMPLETED' }),
      });

      if (response.ok) {
        fetchOneOnOnes(); // 一覧を再取得
      } else {
        const data = await response.json();
        alert(data.error || '1on1の完了に失敗しました');
      }
    } catch (error) {
      alert('1on1の完了に失敗しました');
    }
  };

  if (!session) {
    return <Layout><div>ログインが必要です</div></Layout>;
  }

  if (loading) {
    return <Layout><div>読み込み中...</div></Layout>;
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">1on1ミーティング</h1>
          <Button onClick={() => router.push('/one-on-ones/new')}>
            新規1on1作成
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">{error}</div>
          </div>
        )}

        {/* フィルター */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">
              ステータス:
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">すべて</option>
              <option value="SCHEDULED">予定</option>
              <option value="COMPLETED">完了</option>
              <option value="CANCELLED">キャンセル</option>
            </select>
          </div>
        </div>

        {/* 1on1一覧 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oneOnOnes.map((oneOnOne) => {
            const isParticipant = oneOnOne.supervisorId === session.user.id || oneOnOne.memberId === session.user.id;
            const otherParticipant = oneOnOne.supervisorId === session.user.id ? oneOnOne.member : oneOnOne.supervisor;
            const actions = getAvailableActions(oneOnOne.status, isParticipant, oneOnOne.scheduledAt);

            return (
              <div key={oneOnOne.id} className="bg-white rounded-lg border shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {otherParticipant.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {oneOnOne.supervisorId === session.user.id ? '部下' : '上司'}
                    </p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getOneOnOneStatusColor(oneOnOne.status)}`}>
                    {getOneOnOneStatusDisplayName(oneOnOne.status)}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">日時:</span> {formatOneOnOneDate(oneOnOne.scheduledAt)}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">アジェンダ:</span> {oneOnOne.agendas.length}件
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">議事録:</span> {oneOnOne.minutes.length}件
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Next Action:</span> {oneOnOne.nextActions.length}件
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push(`/one-on-ones/${oneOnOne.id}`)}
                  >
                    詳細
                  </Button>

                  {actions.canEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/one-on-ones/${oneOnOne.id}/edit`)}
                    >
                      編集
                    </Button>
                  )}

                  {actions.canConduct && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => router.push(`/one-on-ones/${oneOnOne.id}/conduct`)}
                    >
                      実施
                    </Button>
                  )}

                  {actions.canComplete && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleCompleteOneOnOne(oneOnOne.id)}
                    >
                      完了
                    </Button>
                  )}

                  {actions.canCancel && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancelOneOnOne(oneOnOne.id)}
                    >
                      キャンセル
                    </Button>
                  )}

                  {actions.canExportPDF && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(`/api/one-on-ones/${oneOnOne.id}/pdf`, '_blank')}
                    >
                      PDF出力
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {oneOnOnes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              1on1がまだ作成されていません
            </div>
            <Button onClick={() => router.push('/one-on-ones/new')}>
              最初の1on1を作成する
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}