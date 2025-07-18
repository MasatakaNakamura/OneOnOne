'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { User, Department } from '@prisma/client';
import { Button } from '@/components/ui/Button';
import { canEditUser, getRoleDisplayName } from '@/lib/permissions';
import Layout from '@/components/Layout';

interface UserWithDepartment extends User {
  department?: Department;
}

export default function UserDetailPage() {
  const { data: session } = useSession();
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserWithDepartment | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [supervisors, setSupervisors] = useState<Pick<User, 'id' | 'name' | 'email' | 'role'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'GENERAL',
    departmentId: '',
    supervisorId: '',
    password: '',
  });

  useEffect(() => {
    if (params.id) {
      fetchUser();
      fetchDepartments();
      fetchSupervisors();
    }
  }, [params.id, session]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          role: data.role || 'GENERAL',
          departmentId: data.departmentId || '',
          supervisorId: data.supervisorId || '',
          password: '',
        });
      } else {
        const data = await response.json();
        setError(data.error || 'ユーザーの取得に失敗しました');
      }
    } catch (error) {
      setError('ユーザーの取得に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
      }
    } catch (error) {
      console.error('部署の取得に失敗しました:', error);
    }
  };

  const fetchSupervisors = async () => {
    try {
      const response = await fetch('/api/users/supervisors');
      if (response.ok) {
        const data = await response.json();
        setSupervisors(data);
      }
    } catch (error) {
      console.error('上司の取得に失敗しました:', error);
    }
  };

  const handleSave = async () => {
    try {
      const updateData: any = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }

      const response = await fetch(`/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
        setFormData({ ...formData, password: '' });
      } else {
        const data = await response.json();
        setError(data.error || 'ユーザーの更新に失敗しました');
      }
    } catch (error) {
      setError('ユーザーの更新に失敗しました');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || 'GENERAL',
      departmentId: user?.departmentId || '',
      supervisorId: user?.supervisorId || '',
      password: '',
    });
    setError('');
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

  if (!user) {
    return <Layout><div>ユーザーが見つかりません</div></Layout>;
  }

  const canEdit = canEditUser(session.user.role, session.user.id, user.id, user.role);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">ユーザー詳細</h1>
          <div className="space-x-2">
            <Button variant="secondary" onClick={() => router.back()}>
              戻る
            </Button>
            {canEdit && (
              <>
                {isEditing ? (
                  <>
                    <Button onClick={handleSave}>
                      保存
                    </Button>
                    <Button variant="secondary" onClick={handleCancel}>
                      キャンセル
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    編集
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                名前
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{user.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-gray-900">{user.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                役割
              </label>
              {isEditing && session.user.id !== user.id ? (
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="GENERAL">一般</option>
                  <option value="LEADER">リーダー</option>
                  <option value="MANAGER">マネージャー</option>
                  <option value="DIRECTOR">部長</option>
                  <option value="EXECUTIVE">経営層</option>
                </select>
              ) : (
                <p className="text-gray-900">{getRoleDisplayName(user.role)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                部署
              </label>
              {isEditing ? (
                <select
                  value={formData.departmentId}
                  onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">選択してください</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-gray-900">{user.department?.name || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                上長
              </label>
              {isEditing ? (
                <select
                  value={formData.supervisorId}
                  onChange={(e) => setFormData({ ...formData, supervisorId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">選択してください</option>
                  {supervisors.map((supervisor) => (
                    <option key={supervisor.id} value={supervisor.id}>
                      {supervisor.name} ({supervisor.role})
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-gray-900">{user?.supervisor?.name || '-'}</p>
              )}
            </div>

            {isEditing && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  パスワード（変更する場合のみ）
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}