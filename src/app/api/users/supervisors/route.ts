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

    // 上司の役割を持つユーザーのみを取得
    const supervisors = await prisma.user.findMany({
      where: {
        role: {
          in: ['LEADER', 'MANAGER', 'DIRECTOR', 'EXECUTIVE']
        },
        id: {
          not: session.user.id // 自分自身を除外
        }
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        clientCompanyName: true,
      },
      orderBy: [
        { role: 'desc' }, // 役職の高い順
        { name: 'asc' }   // 名前の昇順
      ],
    });

    return NextResponse.json(supervisors);
  } catch (error) {
    console.error("Error fetching supervisors:", error);
    return NextResponse.json(
      { error: "上司一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}