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

    // 参加者のみ議事録を追加可能
    if (oneOnOne.supervisorId !== session.user.id && oneOnOne.memberId !== session.user.id) {
      return NextResponse.json(
        { error: "議事録追加権限がありません" },
        { status: 403 }
      );
    }

    const { content, speakerId, timestamp } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: "議事録内容が必要です" },
        { status: 400 }
      );
    }

    // 発言者が指定されていない場合は現在のユーザーを設定
    const actualSpeakerId = speakerId || session.user.id;

    // 発言者が参加者かどうかチェック
    if (actualSpeakerId !== oneOnOne.supervisorId && actualSpeakerId !== oneOnOne.memberId) {
      return NextResponse.json(
        { error: "発言者は参加者である必要があります" },
        { status: 400 }
      );
    }

    const minute = await prisma.minutes.create({
      data: {
        oneOnOneId: params.id,
        speakerId: actualSpeakerId,
        content,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
      },
      include: {
        speaker: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(minute, { status: 201 });
  } catch (error) {
    console.error("Error creating minute:", error);
    return NextResponse.json(
      { error: "議事録の作成に失敗しました" },
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

    const minutes = await prisma.minutes.findMany({
      where: { oneOnOneId: params.id },
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
    });

    return NextResponse.json(minutes);
  } catch (error) {
    console.error("Error fetching minutes:", error);
    return NextResponse.json(
      { error: "議事録の取得に失敗しました" },
      { status: 500 }
    );
  }
}