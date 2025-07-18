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
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    // 自分が参加者である1on1を取得
    const whereClause: any = {
      OR: [
        { supervisorId: session.user.id },
        { memberId: session.user.id },
      ],
    };

    // ステータスでフィルタリング
    if (status) {
      whereClause.status = status;
    }

    // 日付範囲でフィルタリング
    if (startDate && endDate) {
      whereClause.scheduledAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const oneOnOnes = await prisma.oneOnOne.findMany({
      where: whereClause,
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
      orderBy: { scheduledAt: "desc" },
    });

    return NextResponse.json(oneOnOnes);
  } catch (error) {
    console.error("Error fetching one-on-ones:", error);
    return NextResponse.json(
      { error: "1on1の取得に失敗しました" },
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

    const { supervisorId, memberId, scheduledAt, agendas } = await request.json();

    console.log('1on1作成リクエスト受信:', {
      supervisorId,
      memberId,
      scheduledAt,
      sessionUserId: session.user.id,
      sessionUserEmail: session.user.email,
    });

    // セッションからユーザーIDを取得、失敗した場合はメールアドレスから取得
    let actualMemberId = memberId;
    if (!actualMemberId && session.user.email) {
      const userByEmail = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      if (userByEmail) {
        actualMemberId = userByEmail.id;
        console.log('メールアドレスからユーザーIDを取得:', actualMemberId);
      }
    }

    if (!supervisorId || !actualMemberId || !scheduledAt) {
      return NextResponse.json(
        { error: "必要な情報が入力されていません" },
        { status: 400 }
      );
    }

    // 申請者は member である必要がある（メールアドレスで比較）
    if (session.user.email) {
      const sessionUser = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      });
      if (!sessionUser || actualMemberId !== sessionUser.id) {
        return NextResponse.json(
          { error: "自分の1on1のみ申請できます" },
          { status: 403 }
        );
      }
    }

    // supervisorId と memberId のユーザーが存在するかチェック
    const supervisor = await prisma.user.findUnique({
      where: { id: supervisorId },
      select: { id: true, name: true, role: true },
    });

    const member = await prisma.user.findUnique({
      where: { id: actualMemberId },
      select: { id: true, name: true, role: true },
    });

    console.log('ユーザー検索結果:', {
      supervisorFound: !!supervisor,
      supervisorData: supervisor,
      memberFound: !!member,
      memberData: member,
    });

    if (!supervisor) {
      return NextResponse.json(
        { error: "指定された上司が見つかりません" },
        { status: 404 }
      );
    }

    if (!member) {
      return NextResponse.json(
        { error: "指定されたメンバーが見つかりません" },
        { status: 404 }
      );
    }

    // 上司の役職をチェック
    if (!['LEADER', 'MANAGER', 'DIRECTOR', 'EXECUTIVE'].includes(supervisor.role)) {
      return NextResponse.json(
        { error: "指定されたユーザーは上司の役職ではありません" },
        { status: 400 }
      );
    }

    // 同じ時刻に既に予定がないかチェック
    const existingOneOnOne = await prisma.oneOnOne.findFirst({
      where: {
        OR: [
          { supervisorId, scheduledAt: new Date(scheduledAt) },
          { memberId: actualMemberId, scheduledAt: new Date(scheduledAt) },
        ],
        status: "SCHEDULED",
      },
    });

    if (existingOneOnOne) {
      return NextResponse.json(
        { error: "指定された時刻に既に予定があります" },
        { status: 409 }
      );
    }

    // 1on1を作成
    const oneOnOne = await prisma.oneOnOne.create({
      data: {
        supervisorId,
        memberId: actualMemberId,
        scheduledAt: new Date(scheduledAt),
        status: "SCHEDULED",
      },
    });

    // アジェンダを作成
    if (agendas && agendas.length > 0) {
      await prisma.agenda.createMany({
        data: agendas.map((agenda: any) => ({
          oneOnOneId: oneOnOne.id,
          title: agenda.title,
          description: agenda.description || "",
        })),
      });
    }

    // 作成した1on1を詳細情報と一緒に取得
    const createdOneOnOne = await prisma.oneOnOne.findUnique({
      where: { id: oneOnOne.id },
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

    return NextResponse.json(createdOneOnOne, { status: 201 });
  } catch (error) {
    console.error("Error creating one-on-one:", error);
    return NextResponse.json(
      { error: "1on1の作成に失敗しました" },
      { status: 500 }
    );
  }
}