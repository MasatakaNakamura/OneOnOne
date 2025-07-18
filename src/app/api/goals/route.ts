import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const userId = searchParams.get("userId");

    // 基本的には自分の目標のみを取得
    let whereClause: any = {
      userId: userId || session.user.id,
    };

    // ステータスでフィルタリング
    if (status) {
      whereClause.status = status;
    }

    // 上司の場合は部下の目標も取得可能
    if (userId && userId !== session.user.id) {
      // TODO: 権限チェック - 上司が部下の目標を見れるかチェック
      // 今回は簡単にするため、MANAGERレベル以上なら他人の目標も見れることとする
      const userRole = session.user.role;
      if (!['MANAGER', 'DIRECTOR', 'EXECUTIVE'].includes(userRole)) {
        return NextResponse.json(
          { error: "アクセス権限がありません" },
          { status: 403 }
        );
      }
    }

    const goals = await prisma.goal.findMany({
      where: whereClause,
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
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json(
      { error: "目標の取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "認証が必要です" },
        { status: 401 }
      );
    }

    const { title, description, startDate, endDate, status, keyResults } = await request.json();

    if (!title || !description || !startDate || !endDate) {
      return NextResponse.json(
        { error: "必要な情報が入力されていません" },
        { status: 400 }
      );
    }

    // 目標を作成
    const goal = await prisma.goal.create({
      data: {
        title,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: status || "DRAFT",
        userId: session.user.id,
      },
    });

    // Key Results を作成
    if (keyResults && keyResults.length > 0) {
      await prisma.keyResult.createMany({
        data: keyResults.map((kr: any) => ({
          goalId: goal.id,
          title: kr.title,
          targetValue: kr.targetValue,
          currentValue: kr.currentValue || 0,
          unit: kr.unit,
        })),
      });
    }

    // 作成した目標を Key Results と一緒に取得
    const createdGoal = await prisma.goal.findUnique({
      where: { id: goal.id },
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

    return NextResponse.json(createdGoal, { status: 201 });
  } catch (error) {
    console.error("Error creating goal:", error);
    return NextResponse.json(
      { error: "目標の作成に失敗しました" },
      { status: 500 }
    );
  }
}