'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { OneOnOne, User, Agenda, Minutes, NextAction, Goal, KeyResult } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import NextActionList from '@/components/NextActionList';
import { 
  formatOneOnOneDate, 
  formatTime, 
  getOneOnOneStatusDisplayName,
  getOneOnOneStatusColor,
  getAvailableActions
} from '@/lib/one-on-one-helpers';
import { formatDate } from '@/lib/utils';
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

interface GoalWithKeyResults extends Goal {
  keyResults: KeyResult[];
}

export default function OneOnOneDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const [oneOnOne, setOneOnOne] = useState<OneOnOneWithDetails | null>(null);
  const [memberGoals, setMemberGoals] = useState<GoalWithKeyResults[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMinute, setNewMinute] = useState({ content: '', speakerId: '' });
  const [addingMinute, setAddingMinute] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchOneOnOne();
    }
  }, [params.id]);

  const fetchOneOnOne = async () => {
    try {
      const response = await fetch(`/api/one-on-ones/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setOneOnOne(data);
        
        // 部下の目標も取得
        if (data.member) {
          fetchMemberGoals(data.member.id);
        }
      } else {
        const data = await response.json();
        setError(data.error || '1on1の取得に失敗しました');
      }
    } catch (error) {
      setError('1on1の取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const fetchMemberGoals = async (memberId: string) => {
    try {
      const response = await fetch(`/api/goals?userId=${memberId}&status=ACTIVE`);
      if (response.ok) {
        const goals = await response.json();
        setMemberGoals(goals);
      }
    } catch (error) {
      console.error('目標の取得に失敗しました:', error);
    }
  };

  const addMinute = async () => {
    if (!newMinute.content.trim()) return;

    try {
      setAddingMinute(true);
      const response = await fetch(`/api/one-on-ones/${params.id}/minutes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMinute.content,
          speakerId: newMinute.speakerId || session?.user.id,
        }),
      });

      if (response.ok) {
        setNewMinute({ content: '', speakerId: '' });
        fetchOneOnOne(); // 再取得
      } else {
        const data = await response.json();
        alert(data.error || '議事録の追加に失敗しました');
      }
    } catch (error) {
      alert('議事録の追加に失敗しました');
    } finally {
      setAddingMinute(false);
    }
  };

  if (!session) {
    return <Layout><div>ログインが必要です</div></Layout>;
  }

  if (loading) {
    return <Layout><div>読み込み中...</div></Layout>;
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-800">{error}</div>
        </div>
      </Layout>
    );
  }

  if (!oneOnOne) {
    return <Layout><div>1on1が見つかりません</div></Layout>;
  }

  const isParticipant = oneOnOne.supervisorId === session.user.id || oneOnOne.memberId === session.user.id;
  const otherParticipant = oneOnOne.supervisorId === session.user.id ? oneOnOne.member : oneOnOne.supervisor;
  const actions = getAvailableActions(oneOnOne.status, isParticipant, oneOnOne.scheduledAt);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">1on1詳細</h1>
            <p className="text-gray-600">{otherParticipant.name}との1on1</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getOneOnOneStatusColor(oneOnOne.status)}`}>
              {getOneOnOneStatusDisplayName(oneOnOne.status)}
            </span>
            <Button variant="secondary" onClick={() => router.back()}>
              戻る
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            {/* 基本情報 */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">基本情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">日時</label>
                  <p className="text-gray-900">{formatOneOnOneDate(oneOnOne.scheduledAt)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">参加者</label>
                  <p className="text-gray-900">
                    {oneOnOne.supervisor.name} (上司) ↔ {oneOnOne.member.name} (部下)
                  </p>
                </div>
              </div>
            </div>

            {/* アジェンダ */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">アジェンダ</h2>
              {oneOnOne.agendas.length > 0 ? (
                <div className="space-y-3">
                  {oneOnOne.agendas.map((agenda, index) => (
                    <div key={agenda.id} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="font-medium text-gray-900">{index + 1}. {agenda.title}</h3>
                      {agenda.description && (
                        <p className="text-sm text-gray-600 mt-1">{agenda.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">アジェンダがまだ設定されていません</p>
              )}
            </div>

            {/* 議事録 */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">議事録</h2>
              
              {/* 議事録タイムライン */}
              <div className="space-y-4 mb-6">
                {oneOnOne.minutes.map((minute) => (
                  <div key={minute.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {minute.speaker.name?.charAt(0) || '?'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">{minute.speaker.name}</span>
                        <span className="text-sm text-gray-500">{formatTime(minute.timestamp)}</span>
                      </div>
                      <p className="text-gray-700">{minute.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 議事録追加フォーム */}
              {actions.canConduct && (
                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-3">議事録を追加</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">発言者</label>
                      <select
                        value={newMinute.speakerId}
                        onChange={(e) => setNewMinute({ ...newMinute, speakerId: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">自分 ({session.user.name})</option>
                        <option value={oneOnOne.supervisorId}>
                          {oneOnOne.supervisor.name} (上司)
                        </option>
                        <option value={oneOnOne.memberId}>
                          {oneOnOne.member.name} (部下)
                        </option>
                      </select>
                    </div>
                    <Textarea
                      label="内容"
                      value={newMinute.content}
                      onChange={(e) => setNewMinute({ ...newMinute, content: e.target.value })}
                      placeholder="発言内容を入力してください"
                      rows={3}
                    />
                    <Button
                      onClick={addMinute}
                      disabled={addingMinute || !newMinute.content.trim()}
                      size="sm"
                    >
                      {addingMinute ? '追加中...' : '議事録を追加'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* サイドバー */}
          <div className="space-y-6">
            {/* アクション */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">アクション</h2>
              <div className="space-y-2">
                {actions.canConduct && (
                  <Button
                    className="w-full"
                    onClick={() => router.push(`/one-on-ones/${oneOnOne.id}/conduct`)}
                  >
                    実施する
                  </Button>
                )}
                {actions.canEdit && (
                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() => router.push(`/one-on-ones/${oneOnOne.id}/edit`)}
                  >
                    編集
                  </Button>
                )}
                {actions.canExportPDF && (
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => window.open(`/api/one-on-ones/${oneOnOne.id}/pdf`, '_blank')}
                  >
                    PDF出力
                  </Button>
                )}
              </div>
            </div>

            {/* 関連する目標 */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">関連する目標</h2>
              {memberGoals.length > 0 ? (
                <div className="space-y-3">
                  {memberGoals.map((goal) => (
                    <div key={goal.id} className="border rounded-lg p-3">
                      <h3 className="font-medium text-gray-900 text-sm mb-1">{goal.title}</h3>
                      <p className="text-xs text-gray-600 mb-2">
                        {formatDate(goal.startDate)} - {formatDate(goal.endDate)}
                      </p>
                      <div className="space-y-1">
                        {goal.keyResults.map((kr) => (
                          <div key={kr.id} className="text-xs">
                            <div className="flex justify-between">
                              <span className="text-gray-700">{kr.title}</span>
                              <span className="text-gray-600">
                                {kr.currentValue}/{kr.targetValue} {kr.unit}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">現在アクティブな目標がありません</p>
              )}
            </div>

            {/* Next Actions */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
              <NextActionList
                oneOnOneId={oneOnOne.id}
                supervisorId={oneOnOne.supervisorId}
                memberId={oneOnOne.memberId}
                supervisorName={oneOnOne.supervisor.name || ''}
                memberName={oneOnOne.member.name || ''}
                nextActions={oneOnOne.nextActions}
                onActionsChange={fetchOneOnOne}
                canEdit={actions.canConduct || actions.canEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}