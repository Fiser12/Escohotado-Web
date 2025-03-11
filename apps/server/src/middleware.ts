/* import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth: middleware } = NextAuth(authConfig);
export default middleware; */

import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const maintenanceMode = process.env.MAINTENANCE_MODE === 'true';

  if (maintenanceMode) {
    const token = req.cookies.get('dev_token')?.value;

    if (!token || token !== process.env.DEV_TOKEN) {
      return new NextResponse('Sitio en mantenimiento. Acceso restringido.', { status: 503 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|admin/login|_next/static|_next/image|favicon.ico).*)"],
};
