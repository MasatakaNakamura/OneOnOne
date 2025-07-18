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
    const overdue = searchParams.get("overdue") === "true";
    const dueThisWeek = searchParams.get("dueThisWeek") === "true";
    const userId = searchParams.get("userId");

    // 基本的には自分にアサインされたNext Actionを取得
    let whereClause: any = {
      userId: userId || session.user.id,
    };

    // ステータスでフィルタリング
    if (status) {
      whereClause.status = status;
    }

    // 期限切れフィルタ
    if (overdue) {
      whereClause.dueDate = {
        lt: new Date(),
      };
      whereClause.status = {
        not: "COMPLETED",
      };
    }

    // 今週期限フィルタ
    if (dueThisWeek) {
      const now = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(now.getDate() + 7);
      
      whereClause.dueDate = {
        gte: now,
        lte: nextWeek,
      };
      whereClause.status = {
        not: "COMPLETED",
      };
    }

    // 他のユーザーのNext Actionを見る場合の権限チェック
    if (userId && userId !== session.user.id) {
      const userRole = session.user.role;
      if (!['MANAGER', 'DIRECTOR', 'EXECUTIVE'].includes(userRole)) {
        return NextResponse.json(
          { error: "アクセス権限がありません" },
          { status: 403 }
        );
      }
    }

    const nextActions = await prisma.nextAction.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        oneOnOne: {
          select: {
            id: true,
            scheduledAt: true,
            supervisor: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            member: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { dueDate: "asc" },
    });

    return NextResponse.json(nextActions);
  } catch (error) {
    console.error("Error fetching next actions:", error);
    return NextResponse.json(
      { error: "Next Actionの取得に失敗しました" },
      { status: 500 }
    );
  }
}