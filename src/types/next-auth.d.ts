import NextAuth from "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: Role;
      departmentId?: string | null;
      clientCompanyName?: string | null;
    };
  }

  interface User {
    role: Role;
    departmentId?: string | null;
    clientCompanyName?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
    departmentId?: string | null;
    clientCompanyName?: string | null;
  }
}