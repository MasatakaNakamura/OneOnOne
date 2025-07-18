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

    // 参加者のみアジェンダを追加可能
    if (oneOnOne.supervisorId !== session.user.id && oneOnOne.memberId !== session.user.id) {
      return NextResponse.json(
        { error: "アジェンダ追加権限がありません" },
        { status: 403 }
      );
    }

    const { title, description } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "アジェンダタイトルが必要です" },
        { status: 400 }
      );
    }

    const agenda = await prisma.agenda.create({
      data: {
        oneOnOneId: params.id,
        title,
        description: description || "",
      },
    });

    return NextResponse.json(agenda, { status: 201 });
  } catch (error) {
    console.error("Error creating agenda:", error);
    return NextResponse.json(
      { error: "アジェンダの作成に失敗しました" },
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

    const agendas = await prisma.agenda.findMany({
      where: { oneOnOneId: params.id },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(agendas);
  } catch (error) {
    console.error("Error fetching agendas:", error);
    return NextResponse.json(
      { error: "アジェンダの取得に失敗しました" },
      { status: 500 }
    );
  }
}