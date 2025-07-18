const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // 既存のデータを削除
  await prisma.nextAction.deleteMany();
  await prisma.minutes.deleteMany();
  await prisma.agenda.deleteMany();
  await prisma.oneOnOne.deleteMany();
  await prisma.keyResult.deleteMany();
  await prisma.goal.deleteMany();
  await prisma.user.deleteMany();
  await prisma.department.deleteMany();

  // 部署を作成
  const department = await prisma.department.create({
    data: {
      name: '開発部',
    },
  });

  // パスワードハッシュを作成
  const hashedPassword = await bcrypt.hash('password123', 10);

  // テストユーザーを作成
  const users = await Promise.all([
    // 役員
    prisma.user.create({
      data: {
        name: '田中 太郎',
        email: 'tanaka@example.com',
        passwordHash: hashedPassword,
        role: 'EXECUTIVE',
        departmentId: department.id,
        clientCompanyName: '株式会社ABC',
      },
    }),
    // 部長
    prisma.user.create({
      data: {
        name: '佐藤 花子',
        email: 'sato@example.com',
        passwordHash: hashedPassword,
        role: 'DIRECTOR',
        departmentId: department.id,
        clientCompanyName: '株式会社XYZ',
      },
    }),
    // マネージャー
    prisma.user.create({
      data: {
        name: '鈴木 一郎',
        email: 'suzuki@example.com',
        passwordHash: hashedPassword,
        role: 'MANAGER',
        departmentId: department.id,
        clientCompanyName: '株式会社DEF',
      },
    }),
    // リーダー
    prisma.user.create({
      data: {
        name: '高橋 美咲',
        email: 'takahashi@example.com',
        passwordHash: hashedPassword,
        role: 'LEADER',
        departmentId: department.id,
        clientCompanyName: '株式会社GHI',
      },
    }),
    // 一般社員
    prisma.user.create({
      data: {
        name: '山田 次郎',
        email: 'yamada@example.com',
        passwordHash: hashedPassword,
        role: 'GENERAL',
        departmentId: department.id,
        clientCompanyName: '株式会社JKL',
      },
    }),
    // 一般社員2
    prisma.user.create({
      data: {
        name: '中村 三郎',
        email: 'nakamura@example.com',
        passwordHash: hashedPassword,
        role: 'GENERAL',
        departmentId: department.id,
        clientCompanyName: '株式会社MNO',
      },
    }),
  ]);

  console.log('テストユーザーが作成されました:');
  users.forEach((user) => {
    console.log(`- ${user.name} (${user.email}) - ${user.role}`);
  });

  // サンプルの1on1を作成
  const oneOnOne = await prisma.oneOnOne.create({
    data: {
      supervisorId: users[2].id, // マネージャー
      memberId: users[4].id, // 一般社員
      scheduledAt: new Date('2024-01-15T10:00:00Z'),
      status: 'SCHEDULED',
      agendas: {
        create: [
          {
            title: 'キャリア目標の確認',
            description: '今四半期のキャリア目標と進捗状況について話し合う',
          },
          {
            title: '現在のプロジェクトの振り返り',
            description: '現在参加しているプロジェクトの課題と成果について',
          },
        ],
      },
    },
  });

  console.log(`サンプル1on1が作成されました: ${oneOnOne.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });