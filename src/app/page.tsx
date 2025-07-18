import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          1on1管理システム
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          SES企業向けの効率的な1on1ミーティング管理システム
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">目標管理</h3>
            <p className="text-gray-600">OKR形式での目標設定と進捗追跡</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1on1ミーティング</h3>
            <p className="text-gray-600">アジェンダ、議事録、アクション管理</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">進捗追跡</h3>
            <p className="text-gray-600">Next Actionの自動通知と進捗管理</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
