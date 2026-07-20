import { z } from "zod";
import { recordApiRequest } from "@/lib/apiDatabase";
import { registerUser, createAuthCode } from "@/lib/authEngine";
import { sendEmail } from "@/lib/emailProvider";
import { ok } from "@/lib/http";
const schema = z.object({ email: z.string().email(), password: z.string().min(10), role: z.enum(["STUDENT","MERCHANT"]), phoneNumber: z.string().optional() });
export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/auth/register", method: "POST", status: "REQUEST_RECEIVED" });
  const body = schema.parse(await request.json());
  const user = await registerUser(body);
  const { code } = await createAuthCode(user.id, "EMAIL_VERIFICATION");
  await sendEmail({ userId: user.id, to: user.email, subject: "Verify your UniSphere account", html: `<p>Your verification code is <strong>${code}</strong>.</p>`, templateKey: "EMAIL_VERIFICATION" });
  return ok({ userId: user.id }, { status: 201 });
}
