import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
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

    const goal = await prisma.goal.findUnique({
      where: { id: params.id },
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

    if (!goal) {
      return NextResponse.json(
        { error: "目標が見つかりません" },
        { status: 404 }
      );
    }

    // 自分の目標または上司権限でアクセス可能かチェック
    if (goal.userId !== session.user.id) {
      const userRole = session.user.role;
      if (!['MANAGER', 'DIRECTOR', 'EXECUTIVE'].includes(userRole)) {
        return NextResponse.json(
          { error: "アクセス権限がありません" },
          { status: 403 }
        );
      }
    }

    return NextResponse.json(goal);
  } catch (error) {
    console.error("Error fetching goal:", error);
    return NextResponse.json(
      { error: "目標の取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const goal = await prisma.goal.findUnique({
      where: { id: params.id },
    });

    if (!goal) {
      return NextResponse.json(
        { error: "目標が見つかりません" },
        { status: 404 }
      );
    }

    // 自分の目標のみ編集可能
    if (goal.userId !== session.user.id) {
      return NextResponse.json(
        { error: "編集権限がありません" },
        { status: 403 }
      );
    }

    const { title, description, startDate, endDate, status, keyResults } = await request.json();

    // 目標を更新
    const updatedGoal = await prisma.goal.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(startDate && { startDate: new Date(startDate) }),
        ...(endDate && { endDate: new Date(endDate) }),
        ...(status && { status }),
      },
    });

    // Key Results を更新
    if (keyResults) {
      // 既存の Key Results を削除
      await prisma.keyResult.deleteMany({
        where: { goalId: params.id },
      });

      // 新しい Key Results を作成
      if (keyResults.length > 0) {
        await prisma.keyResult.createMany({
          data: keyResults.map((kr: any) => ({
            goalId: params.id,
            title: kr.title,
            targetValue: kr.targetValue,
            currentValue: kr.currentValue || 0,
            unit: kr.unit,
          })),
        });
      }
    }

    // 更新した目標を取得
    const result = await prisma.goal.findUnique({
      where: { id: params.id },
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

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating goal:", error);
    return NextResponse.json(
      { error: "目標の更新に失敗しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const goal = await prisma.goal.findUnique({
      where: { id: params.id },
    });

    if (!goal) {
      return NextResponse.json(
        { error: "目標が見つかりません" },
        { status: 404 }
      );
    }

    // 自分の目標のみ削除可能
    if (goal.userId !== session.user.id) {
      return NextResponse.json(
        { error: "削除権限がありません" },
        { status: 403 }
      );
    }

    // Key Results も一緒に削除される（Cascadeが設定されている）
    await prisma.goal.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "目標が削除されました" });
  } catch (error) {
    console.error("Error deleting goal:", error);
    return NextResponse.json(
      { error: "目標の削除に失敗しました" },
      { status: 500 }
    );
  }
}