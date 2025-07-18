'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { getGoalExamples, getKeyResultUnitExamples } from '@/lib/goal-helpers';
import Layout from '@/components/Layout';

interface KeyResult {
  title: string;
  targetValue: number;
  unit: string;
  description?: string;
}

export default function NewGoalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showExamples, setShowExamples] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const [keyResults, setKeyResults] = useState<KeyResult[]>([
    { title: '', targetValue: 0, unit: '', description: '' }
  ]);

  const examples = getGoalExamples();
  const unitExamples = getKeyResultUnitExamples();

  const handleSubmit = async (status: 'DRAFT' | 'PENDING_APPROVAL') => {
    if (!formData.title || !formData.description || !formData.startDate || !formData.endDate) {
      setError('必須項目を入力してください');
      return;
    }

    if (keyResults.length === 0 || keyResults.some(kr => !kr.title || !kr.targetValue || !kr.unit)) {
      setError('少なくとも1つのKey Resultを正しく入力してください');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await fetch('/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          status,
          keyResults,
        }),
      });

      if (response.ok) {
        router.push('/goals');
      } else {
        const data = await response.json();
        setError(data.error || '目標の作成に失敗しました');
      }
    } catch (error) {
      setError('目標の作成に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const addKeyResult = () => {
    setKeyResults([...keyResults, { title: '', targetValue: 0, unit: '', description: '' }]);
  };

  const removeKeyResult = (index: number) => {
    setKeyResults(keyResults.filter((_, i) => i !== index));
  };

  const updateKeyResult = (index: number, field: keyof KeyResult, value: string | number) => {
    const updated = keyResults.map((kr, i) => 
      i === index ? { ...kr, [field]: value } : kr
    );
    setKeyResults(updated);
  };

  const applyExample = (example: typeof examples[0]) => {
    setFormData({
      ...formData,
      title: example.title,
      description: example.description,
    });
    setKeyResults(example.keyResults);
    setShowExamples(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">新規目標作成</h1>
          <Button variant="secondary" onClick={() => router.back()}>
            戻る
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="text-red-800">{error}</div>
          </div>
        )}

        {/* 入力例表示 */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium text-blue-900">SES企業向け目標例</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExamples(!showExamples)}
            >
              {showExamples ? '隠す' : '表示する'}
            </Button>
          </div>
          {showExamples && (
            <div className="space-y-4">
              {examples.map((example, index) => (
                <div key={index} className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-gray-900 mb-2">{example.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{example.description}</p>
                  <div className="text-sm text-gray-500 mb-3">
                    Key Results: {example.keyResults.length}件
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => applyExample(example)}
                  >
                    この例を使用
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">目標 (Objective)</h2>
          
          <div className="space-y-4">
            <Input
              label="目標タイトル *"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="例: 担当プロジェクトの顧客満足度向上"
            />

            <Textarea
              label="目標説明 *"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="例: クライアント先での技術力向上と円滑なコミュニケーションにより、顧客満足度を最大化し、次期契約更新に繋げる"
              rows={4}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="開始日 *"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
              <Input
                label="終了日 *"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">測定指標 (Key Results)</h2>
            <Button onClick={addKeyResult} size="sm">
              追加
            </Button>
          </div>

          <div className="space-y-4">
            {keyResults.map((kr, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-gray-700">Key Result {index + 1}</h3>
                  {keyResults.length > 1 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeKeyResult(index)}
                    >
                      削除
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="指標名 *"
                    value={kr.title}
                    onChange={(e) => updateKeyResult(index, 'title', e.target.value)}
                    placeholder="例: 顧客満足度アンケートで高評価を獲得"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="目標値 *"
                      type="number"
                      value={kr.targetValue}
                      onChange={(e) => updateKeyResult(index, 'targetValue', Number(e.target.value))}
                      placeholder="例: 4.5"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        単位 *
                      </label>
                      <select
                        value={kr.unit}
                        onChange={(e) => updateKeyResult(index, 'unit', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">選択</option>
                        {unitExamples.map((unit) => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <Textarea
                    label="説明"
                    value={kr.description}
                    onChange={(e) => updateKeyResult(index, 'description', e.target.value)}
                    placeholder="例: 5段階評価中、平均4.5以上を獲得する"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            variant="secondary"
            onClick={() => handleSubmit('DRAFT')}
            disabled={loading}
          >
            下書き保存
          </Button>
          <Button
            onClick={() => handleSubmit('PENDING_APPROVAL')}
            disabled={loading}
          >
            承認を申請
          </Button>
        </div>
      </div>
    </Layout>
  );
}