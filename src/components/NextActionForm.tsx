'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface NextActionFormProps {
  oneOnOneId: string;
  supervisorId: string;
  memberId: string;
  supervisorName: string;
  memberName: string;
  onActionCreated: () => void;
  onCancel: () => void;
}

export default function NextActionForm({
  oneOnOneId,
  supervisorId,
  memberId,
  supervisorName,
  memberName,
  onActionCreated,
  onCancel,
}: NextActionFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    userId: '',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.userId || !formData.dueDate) {
      setError('タイトル、担当者、期限は必須です');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch(`/api/one-on-ones/${oneOnOneId}/next-actions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: '',
          description: '',
          userId: '',
          dueDate: '',
        });
        onActionCreated();
      } else {
        const data = await response.json();
        setError(data.error || 'Next Actionの作成に失敗しました');
      }
    } catch (error) {
      setError('Next Actionの作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Next Action作成</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <div className="text-red-800 text-sm">{error}</div>
        </div>
      )}

      <div className="space-y-4">
        <Input
          label="タイトル *"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="例: 新しいスキルの学習計画を作成する"
        />

        <Textarea
          label="説明"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="詳細な説明や補足情報"
          rows={3}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            担当者 *
          </label>
          <select
            value={formData.userId}
            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">選択してください</option>
            <option value={supervisorId}>{supervisorName} (上司)</option>
            <option value={memberId}>{memberName} (部下)</option>
          </select>
        </div>

        <Input
          label="期限 *"
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
        />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          キャンセル
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? '作成中...' : '作成'}
        </Button>
      </div>
    </form>
  );
}