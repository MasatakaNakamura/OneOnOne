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

    const { keyResults } = await request.json();

    if (!keyResults || !Array.isArray(keyResults)) {
      return NextResponse.json(
        { error: "Key Results のデータが正しくありません" },
        { status: 400 }
      );
    }

    const goal = await prisma.goal.findUnique({
      where: { id: params.id },
      include: {
        keyResults: true,
      },
    });

    if (!goal) {
      return NextResponse.json(
        { error: "目標が見つかりません" },
        { status: 404 }
      );
    }

    // 自分の目標のみ進捗更新可能
    if (goal.userId !== session.user.id) {
      return NextResponse.json(
        { error: "進捗更新権限がありません" },
        { status: 403 }
      );
    }

    // アクティブな目標のみ進捗更新可能
    if (goal.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: "アクティブな目標ではありません" },
        { status: 400 }
      );
    }

    // Key Results の進捗を更新
    const updatePromises = keyResults.map((kr: any) => {
      return prisma.keyResult.update({
        where: { id: kr.id },
        data: {
          currentValue: kr.currentValue,
        },
      });
    });

    await Promise.all(updatePromises);

    // 更新された目標を取得
    const updatedGoal = await prisma.goal.findUnique({
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

    return NextResponse.json({
      message: "進捗が更新されました",
      goal: updatedGoal,
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { error: "進捗の更新に失敗しました" },
      { status: 500 }
    );
  }
}