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

    const oneOnOne = await prisma.oneOnOne.findUnique({
      where: { id: params.id },
      include: {
        supervisor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        member: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        agendas: true,
        minutes: {
          include: {
            speaker: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { timestamp: "asc" },
        },
        nextActions: {
          include: {
            user: {
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

    return NextResponse.json(oneOnOne);
  } catch (error) {
    console.error("Error fetching one-on-one:", error);
    return NextResponse.json(
      { error: "1on1の取得に失敗しました" },
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

    const oneOnOne = await prisma.oneOnOne.findUnique({
      where: { id: params.id },
    });

    if (!oneOnOne) {
      return NextResponse.json(
        { error: "1on1が見つかりません" },
        { status: 404 }
      );
    }

    // 参加者のみ更新可能（メールアドレスでも確認）
    let canEdit = false;
    if (session.user.email) {
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      if (sessionUser) {
        canEdit = oneOnOne.supervisorId === sessionUser.id || oneOnOne.memberId === sessionUser.id;
      }
    }
    
    if (!canEdit) {
      return NextResponse.json(
        { error: "更新権限がありません" },
        { status: 403 }
      );
    }

    const { supervisorId, scheduledAt, status, agendas } = await request.json();

    console.log('1on1更新リクエスト:', {
      id: params.id,
      supervisorId,
      scheduledAt,
      status,
      agendas: agendas?.length || 0,
    });

    // 1on1を更新
    const updatedOneOnOne = await prisma.oneOnOne.update({
      where: { id: params.id },
      data: {
        ...(supervisorId && { supervisorId }),
        ...(scheduledAt && { scheduledAt: new Date(scheduledAt) }),
        ...(status && { status }),
      },
    });

    // アジェンダを更新
    if (agendas) {
      // 既存のアジェンダを削除
      await prisma.agenda.deleteMany({
        where: { oneOnOneId: params.id },
      });

      // 新しいアジェンダを作成
      if (agendas.length > 0) {
        await prisma.agenda.createMany({
          data: agendas.map((agenda: any) => ({
            oneOnOneId: params.id,
            title: agenda.title,
            description: agenda.description || "",
          })),
        });
      }
    }

    // 更新した1on1を取得
    const result = await prisma.oneOnOne.findUnique({
      where: { id: params.id },
      include: {
        supervisor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        member: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        agendas: true,
        minutes: {
          include: {
            speaker: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { timestamp: "asc" },
        },
        nextActions: {
          include: {
            user: {
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

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating one-on-one:", error);
    return NextResponse.json(
      { error: "1on1の更新に失敗しました" },
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

    const oneOnOne = await prisma.oneOnOne.findUnique({
      where: { id: params.id },
    });

    if (!oneOnOne) {
      return NextResponse.json(
        { error: "1on1が見つかりません" },
        { status: 404 }
      );
    }

    // 参加者のみ削除可能
    if (oneOnOne.supervisorId !== session.user.id && oneOnOne.memberId !== session.user.id) {
      return NextResponse.json(
        { error: "削除権限がありません" },
        { status: 403 }
      );
    }

    // 1on1をキャンセル（削除ではなくステータス変更）
    await prisma.oneOnOne.update({
      where: { id: params.id },
      data: {
        status: "CANCELLED",
      },
    });

    return NextResponse.json({ message: "1on1がキャンセルされました" });
  } catch (error) {
    console.error("Error cancelling one-on-one:", error);
    return NextResponse.json(
      { error: "1on1のキャンセルに失敗しました" },
      { status: 500 }
    );
  }
}