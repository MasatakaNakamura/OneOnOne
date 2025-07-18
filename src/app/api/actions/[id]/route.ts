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

    const nextAction = await prisma.nextAction.findUnique({
      where: { id: params.id },
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

    if (!nextAction) {
      return NextResponse.json(
        { error: "Next Actionが見つかりません" },
        { status: 404 }
      );
    }

    // 担当者または1on1の参加者のみアクセス可能
    const isAssignee = nextAction.userId === session.user.id;
    const isParticipant = nextAction.oneOnOne.supervisor.id === session.user.id || 
                         nextAction.oneOnOne.member.id === session.user.id;

    if (!isAssignee && !isParticipant) {
      return NextResponse.json(
        { error: "アクセス権限がありません" },
        { status: 403 }
      );
    }

    return NextResponse.json(nextAction);
  } catch (error) {
    console.error("Error fetching next action:", error);
    return NextResponse.json(
      { error: "Next Actionの取得に失敗しました" },
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

    const nextAction = await prisma.nextAction.findUnique({
      where: { id: params.id },
      include: {
        oneOnOne: true,
      },
    });

    if (!nextAction) {
      return NextResponse.json(
        { error: "Next Actionが見つかりません" },
        { status: 404 }
      );
    }

    // 担当者または1on1の参加者のみ更新可能
    const isAssignee = nextAction.userId === session.user.id;
    const isParticipant = nextAction.oneOnOne.supervisorId === session.user.id || 
                         nextAction.oneOnOne.memberId === session.user.id;

    if (!isAssignee && !isParticipant) {
      return NextResponse.json(
        { error: "更新権限がありません" },
        { status: 403 }
      );
    }

    const { title, description, status, dueDate } = await request.json();

    const updatedNextAction = await prisma.nextAction.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
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

    return NextResponse.json(updatedNextAction);
  } catch (error) {
    console.error("Error updating next action:", error);
    return NextResponse.json(
      { error: "Next Actionの更新に失敗しました" },
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

    const nextAction = await prisma.nextAction.findUnique({
      where: { id: params.id },
      include: {
        oneOnOne: true,
      },
    });

    if (!nextAction) {
      return NextResponse.json(
        { error: "Next Actionが見つかりません" },
        { status: 404 }
      );
    }

    // 担当者または1on1の参加者のみ削除可能
    const isAssignee = nextAction.userId === session.user.id;
    const isParticipant = nextAction.oneOnOne.supervisorId === session.user.id || 
                         nextAction.oneOnOne.memberId === session.user.id;

    if (!isAssignee && !isParticipant) {
      return NextResponse.json(
        { error: "削除権限がありません" },
        { status: 403 }
      );
    }

    await prisma.nextAction.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Next Actionが削除されました" });
  } catch (error) {
    console.error("Error deleting next action:", error);
    return NextResponse.json(
      { error: "Next Actionの削除に失敗しました" },
      { status: 500 }
    );
  }
}