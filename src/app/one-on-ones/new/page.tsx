'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { getOneOnOneTemplates } from '@/lib/one-on-one-helpers';
import Layout from '@/components/Layout';

interface Agenda {
  title: string;
  description: string;
}

export default function NewOneOnOnePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [supervisors, setSupervisors] = useState<Pick<User, 'id' | 'name' | 'email' | 'role'>[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  
  const [formData, setFormData] = useState({
    supervisorId: '',
    scheduledAt: '',
  });

  const [agendas, setAgendas] = useState<Agenda[]>([
    { title: '', description: '' }
  ]);

  const templates = getOneOnOneTemplates();

  useEffect(() => {
    fetchSupervisors();
  }, []);

  const fetchSupervisors = async () => {
    try {
      const response = await fetch('/api/users/supervisors');
      if (response.ok) {
        const supervisors = await response.json();
        setSupervisors(supervisors);
      } else {
        console.error('上司の取得に失敗しました:', response.statusText);
      }
    } catch (error) {
      console.error('上司の取得に失敗しました:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.supervisorId || !formData.scheduledAt) {
      setError('必須項目を入力してください');
      return;
    }

    if (agendas.length === 0 || agendas.some(agenda => !agenda.title)) {
      setError('少なくとも1つのアジェンダを入力してください');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const payload = {
        supervisorId: formData.supervisorId,
        memberId: session?.user.id,
        scheduledAt: formData.scheduledAt,
        agendas: agendas.filter(agenda => agenda.title),
      };

      console.log('1on1作成リクエスト:', payload);

      const response = await fetch('/api/one-on-ones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push('/one-on-ones');
      } else {
        const data = await response.json();
        console.error('1on1作成エラー:', data);
        setError(data.error || '1on1の作成に失敗しました');
      }
    } catch (error) {
      setError('1on1の作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const addAgenda = () => {
    setAgendas([...agendas, { title: '', description: '' }]);
  };

  const removeAgenda = (index: number) => {
    setAgendas(agendas.filter((_, i) => i !== index));
  };

  const updateAgenda = (index: number, field: keyof Agenda, value: string) => {
    const updated = agendas.map((agenda, i) => 
      i === index ? { ...agenda, [field]: value } : agenda
    );
    setAgendas(updated);
  };

  const applyTemplate = (template: typeof templates[0]) => {
    setAgendas(template.agendas);
    setShowTemplates(false);
  };

  if (!session) {
    return <Layout><div>ログインが必要です</div></Layout>;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">新規1on1作成</h1>
          <Button variant="secondary" onClick={() => router.back()}>
            戻る
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">{error}</div>
          </div>
        )}

        {/* テンプレート選択 */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-blue-900">SES企業向けアジェンダテンプレート</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              {showTemplates ? '隠す' : '表示する'}
            </Button>
          </div>
          {showTemplates && (
            <div className="space-y-3">
              {templates.map((template, index) => (
                <div key={index} className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                  <div className="text-sm text-gray-500 mb-3">
                    アジェンダ: {template.agendas.length}件
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => applyTemplate(template)}
                  >
                    このテンプレートを使用
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg border shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">基本情報</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  上司を選択 *
                </label>
                <select
                  value={formData.supervisorId}
                  onChange={(e) => setFormData({ ...formData, supervisorId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">選択してください</option>
                  {supervisors.map((supervisor) => (
                    <option key={supervisor.id} value={supervisor.id}>
                      {supervisor.name} ({supervisor.role}) - {supervisor.clientCompanyName || supervisor.email}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="実施日時 *"
                type="datetime-local"
                value={formData.scheduledAt}
                onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">アジェンダ</h2>
              <Button type="button" onClick={addAgenda} size="sm">
                追加
              </Button>
            </div>

            <div className="space-y-4">
              {agendas.map((agenda, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-700">アジェンダ {index + 1}</h3>
                    {agendas.length > 1 && (
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeAgenda(index)}
                      >
                        削除
                      </Button>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Input
                      label="タイトル *"
                      value={agenda.title}
                      onChange={(e) => updateAgenda(index, 'title', e.target.value)}
                      placeholder="例: 前回のNext Actionの振り返り"
                    />
                    <Textarea
                      label="説明"
                      value={agenda.description}
                      onChange={(e) => updateAgenda(index, 'description', e.target.value)}
                      placeholder="例: 前回決定したアクションの進捗確認"
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              キャンセル
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? '作成中...' : '1on1を作成'}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}