'use client';

import { useState } from 'react';
import { NextAction, User } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import NextActionForm from './NextActionForm';
import { 
  getNextActionStatusDisplayName, 
  getNextActionStatusColor,
  getDueDateDisplay,
  isOverdue,
  sortNextActions
} from '@/lib/next-action-helpers';
import { formatDate } from '@/lib/utils';

interface NextActionWithUser extends NextAction {
  user: Pick<User, 'id' | 'name' | 'email'>;
}

interface NextActionListProps {
  oneOnOneId: string;
  supervisorId: string;
  memberId: string;
  supervisorName: string;
  memberName: string;
  nextActions: NextActionWithUser[];
  onActionsChange: () => void;
  canEdit?: boolean;
}

export default function NextActionList({
  oneOnOneId,
  supervisorId,
  memberId,
  supervisorName,
  memberName,
  nextActions,
  onActionsChange,
  canEdit = false,
}: NextActionListProps) {
  const [showForm, setShowForm] = useState(false);
  const [loadingActions, setLoadingActions] = useState<string[]>([]);

  const handleStatusChange = async (actionId: string, newStatus: string) => {
    try {
      setLoadingActions(prev => [...prev, actionId]);
      
      const response = await fetch(`/api/actions/${actionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        onActionsChange();
      } else {
        const data = await response.json();
        alert(data.error || 'ステータスの更新に失敗しました');
      }
    } catch (error) {
      alert('ステータスの更新に失敗しました');
    } finally {
      setLoadingActions(prev => prev.filter(id => id !== actionId));
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
        onActionsChange();
      } else {
        const data = await response.json();
        alert(data.error || 'Next Actionの削除に失敗しました');
      }
    } catch (error) {
      alert('Next Actionの削除に失敗しました');
    }
  };

  const sortedActions = sortNextActions(nextActions);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Next Actions</h3>
        {canEdit && (
          <Button
            size="sm"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'キャンセル' : 'Next Action追加'}
          </Button>
        )}
      </div>

      {showForm && (
        <NextActionForm
          oneOnOneId={oneOnOneId}
          supervisorId={supervisorId}
          memberId={memberId}
          supervisorName={supervisorName}
          memberName={memberName}
          onActionCreated={() => {
            setShowForm(false);
            onActionsChange();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {sortedActions.length > 0 ? (
        <div className="space-y-3">
          {sortedActions.map((action) => {
            const overdueFlag = isOverdue(action.dueDate) && action.status !== 'COMPLETED';
            const isLoading = loadingActions.includes(action.id);

            return (
              <div
                key={action.id}
                className={`border rounded-lg p-4 ${
                  overdueFlag ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{action.title}</h4>
                    {action.description && (
                      <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                    )}
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

                <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                  <span>担当者: {(action as any).user?.name || 'Unknown'}</span>
                  <span>期限: {formatDate(action.dueDate)} ({getDueDateDisplay(action.dueDate)})</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <select
                      value={action.status}
                      onChange={(e) => handleStatusChange(action.id, e.target.value)}
                      disabled={isLoading}
                      className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    >
                      <option value="PENDING">未着手</option>
                      <option value="IN_PROGRESS">対応中</option>
                      <option value="COMPLETED">完了</option>
                    </select>
                    {isLoading && (
                      <span className="text-xs text-gray-500">更新中...</span>
                    )}
                  </div>

                  {canEdit && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteAction(action.id)}
                    >
                      削除
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Next Actionがまだ設定されていません
        </div>
      )}
    </div>
  );
}