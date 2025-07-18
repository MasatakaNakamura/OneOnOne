# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

会話は全て日本語でお願い。

## Development Commands

- `npm run dev` - Start Next.js development server
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a 1on1 management system for SES (System Engineering Service) companies built with:

### Tech Stack
- **Frontend**: Next.js 14.2.3 with React 18, TypeScript
- **Backend**: NestJS (integrated with Next.js API routes)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

### Key Features
- **Goal Management**: OKR-style goal setting with Key Results tracking
- **1on1 Meeting Management**: Scheduling, agenda, minutes, and action items
- **User Management**: Role-based access control (general, leader, manager, executive)
- **External Integrations**: Google Calendar API, Slack API, Google Authentication
- **PDF Export**: Meeting records for ISO audits and HR documentation

### Database Schema
The system uses the following main entities:
- **USERS**: Employee information with role-based permissions and client company details
- **GOALS & KEY_RESULTS**: OKR management system
- **ONE_ON_ONES**: Meeting records with supervisor/member relationships
- **AGENDAS, MINUTES, NEXT_ACTIONS**: Meeting components and follow-up tasks
- **DEPARTMENTS**: Organizational structure

### Project Structure
- `/src/app/` - Next.js 13+ app router structure
- `/docs/` - System documentation (requirements and design specifications)
- `tsconfig.json` - TypeScript configuration with path aliases (`@/*` -> `./src/*`)

### Development Notes
- Uses strict TypeScript configuration
- Styled with Tailwind CSS and PostCSS
- Designed for responsive web (PC, tablet, mobile)
- Target deployment on Vercel with serverless functions
- External database planned (PostgreSQL on Supabase)

### Key Business Requirements
- Multi-tenant role-based access control
- Client company tracking for SES business model
- PDF export for compliance/audit purposes
- Slack/Google Calendar integration for workflow automation
- Japanese language support (docs are in Japanese)

## Gemini CLI 連携ガイド

### 目的
ユーザーが **「Geminiと相談しながら進めて」** と指示した場合、
Claude は以降のタスクを **Gemini CLI** と協調しながら進める。

### トリガー
- 正規表現: `/Gemini.*相談しながら/`

### 基本フロー
1. **PROMPT 生成**
   Claude はユーザーの要件を1つのテキストにまとめ、環境変数 `$PROMPT` に格納

2. **Gemini CLI 呼び出し**
```bash
gemini <<EOF
$PROMPT
EOF

3. **結果の統合**
   - Gemini の回答を提示
   - Claude の追加分析・コメントを付加