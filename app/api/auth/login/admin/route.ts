import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { z } from "zod";
import { canRoleAccessPath } from "@/lib/access-control";

const schema = z.object({ email: z.string().email(), otp: z.string().optional(), next: z.string().optional() });

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/login/admin", method: "POST", status: "REQUEST_RECEIVED" });
  const data = schema.parse(await request.json());
  if (!data.otp || data.otp.length < 4) return NextResponse.json({ ok:false, error:"MFA code required" }, { status:401 });
  const requested = data.next || "/admin";
  const redirectTo = canRoleAccessPath("ADMIN" as any, requested) ? requested : "/admin";
  const res = NextResponse.json({ ok:true, role:"ADMIN", redirectTo });
  res.cookies.set("unisphere_role", "ADMIN", { httpOnly:true, sameSite:"lax", path:"/" });
  res.cookies.set("unisphere_email", data.email, { httpOnly:true, sameSite:"lax", path:"/" });
  res.cookies.set("unisphere_user_id", `${data.email}-admin`, { httpOnly:true, sameSite:"lax", path:"/" });
  res.cookies.set("unisphere_mfa", "true", { httpOnly:true, sameSite:"lax", path:"/" });
  return res;
}
