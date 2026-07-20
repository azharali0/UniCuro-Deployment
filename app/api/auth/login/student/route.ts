import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { z } from "zod";
import { canRoleAccessPath } from "@/lib/access-control";

const schema = z.object({ email: z.string().email(), otp: z.string().optional(), next: z.string().optional() });

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/login/student", method: "POST", status: "REQUEST_RECEIVED" });
  const data = schema.parse(await request.json());

  const requested = data.next || "/student";
  const redirectTo = canRoleAccessPath("STUDENT" as any, requested) ? requested : "/student";
  const res = NextResponse.json({ ok:true, role:"STUDENT", redirectTo });
  res.cookies.set("unicuro_role", "STUDENT", { httpOnly:true, sameSite:"lax", path:"/" });
  res.cookies.set("unicuro_email", data.email, { httpOnly:true, sameSite:"lax", path:"/" });
  res.cookies.set("unicuro_user_id", `${data.email}-student`, { httpOnly:true, sameSite:"lax", path:"/" });
  res.cookies.set("unicuro_mfa", "false", { httpOnly:true, sameSite:"lax", path:"/" });
  return res;
}
