import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { getCareerProfile, updateCareerProfile } from "@/lib/studentEnginesDb";
import { ok } from "@/lib/http";
const schema = z.object({ targetRole: z.string().optional(), skills: z.array(z.string()).optional(), cvUrl: z.string().url().optional() });
export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/career/profile", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ profile: await getCareerProfile(user.id) });
}
export async function PATCH(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/career/profile", method: "PATCH", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ profile: await updateCareerProfile(user.id, schema.parse(await request.json())) });
}
