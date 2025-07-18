import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
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

    const oneOnOne = await prisma.oneOnOne.findUnique({
      where: { id: params.id },
    });

    if (!oneOnOne) {
      return NextResponse.json(
        { error: "1on1が見つかりません" },
        { status: 404 }
      );
    }

    // 参加者のみNext Actionを作成可能
    if (oneOnOne.supervisorId !== session.user.id && oneOnOne.memberId !== session.user.id) {
      return NextResponse.json(
        { error: "Next Action作成権限がありません" },
        { status: 403 }
      );
    }

    const { title, description, userId, dueDate } = await request.json();

    if (!title || !userId || !dueDate) {
      return NextResponse.json(
        { error: "タイトル、担当者、期限は必須です" },
        { status: 400 }
      );
    }

    // 担当者が参加者かどうかチェック
    if (userId !== oneOnOne.supervisorId && userId !== oneOnOne.memberId) {
      return NextResponse.json(
        { error: "担当者は参加者である必要があります" },
        { status: 400 }
      );
    }

    const nextAction = await prisma.nextAction.create({
      data: {
        oneOnOneId: params.id,
        userId,
        title,
        description: description || "",
        dueDate: new Date(dueDate),
        status: "PENDING",
      },
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
    });

    // TODO: 即時通知の送信
    // await sendNextActionNotification(nextAction);

    return NextResponse.json(nextAction, { status: 201 });
  } catch (error) {
    console.error("Error creating next action:", error);
    return NextResponse.json(
      { error: "Next Actionの作成に失敗しました" },
      { status: 500 }
    );
  }
}

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

    const oneOnOne = await prisma.oneOnOne.findUnique({
      where: { id: params.id },
    });

    if (!oneOnOne) {
      return NextResponse.json(
        { error: "1on1が見つかりません" },
        { status: 404 }
      );
    }

    // 参加者のみアクセス可能
    if (oneOnOne.supervisorId !== session.user.id && oneOnOne.memberId !== session.user.id) {
      return NextResponse.json(
        { error: "アクセス権限がありません" },
        { status: 403 }
      );
    }

    const nextActions = await prisma.nextAction.findMany({
      where: { oneOnOneId: params.id },
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