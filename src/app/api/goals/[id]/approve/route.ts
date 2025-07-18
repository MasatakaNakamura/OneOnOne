import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    const { status, comment } = await request.json();

    if (!status || !['ACTIVE', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: "有効なステータスを指定してください" },
        { status: 400 }
      );
    }

    const goal = await prisma.goal.findUnique({
      where: { id: params.id },
      include: {
        user: true,
      },
    });

    if (!goal) {
      return NextResponse.json(
        { error: "目標が見つかりません" },
        { status: 404 }
      );
    }

    // 承認待ちの目標のみ承認・差し戻し可能
    if (goal.status !== 'PENDING_APPROVAL') {
      return NextResponse.json(
        { error: "承認待ちの目標ではありません" },
        { status: 400 }
      );
    }

    // TODO: 実際の上司・部下関係をチェック
    // 現在は簡単にするため、MANAGERレベル以上なら承認可能とする
    const userRole = session.user.role;
    if (!['MANAGER', 'DIRECTOR', 'EXECUTIVE'].includes(userRole)) {
      return NextResponse.json(
        { error: "承認権限がありません" },
        { status: 403 }
      );
    }

    // 自分の目標は承認できない
    if (goal.userId === session.user.id) {
      return NextResponse.json(
        { error: "自分の目標は承認できません" },
        { status: 400 }
      );
    }

    // 目標のステータスを更新
    const updatedGoal = await prisma.goal.update({
      where: { id: params.id },
      data: {
        status: status,
        updatedAt: new Date(),
      },
      include: {
        keyResults: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    // TODO: 通知機能
    // 承認・差し戻しの通知をSlackやメールで送信

    return NextResponse.json({
      message: status === 'ACTIVE' ? '目標が承認されました' : '目標が差し戻されました',
      goal: updatedGoal,
    });
  } catch (error) {
    console.error("Error approving goal:", error);
    return NextResponse.json(
      { error: "目標の承認処理に失敗しました" },
      { status: 500 }
    );
  }
}