import { evaluateAcademicIntegrityPrompt } from "@/lib/academicIntegrityEngine";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { createCoursework, listCoursework } from "@/lib/courseworkStudioEngine";
import { ok } from "@/lib/http";

const schema = z.object({
  title: z.string().min(2),
  courseName: z.string().optional(),
  assignmentType: z.string().min(2),
  briefText: z.string().min(10),
  deadlineAt: z.string().datetime().optional(),
  wordTarget: z.number().int().positive().optional(),
});

export async function GET() {
  await recordApiRequest({ endpoint: "/api/student/coursework", method: "GET", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  return ok({ coursework: await listCoursework(user.id) });
}

export async function POST(request: Request) {
  await recordApiRequest({ endpoint: "/api/student/coursework", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const body = schema.parse(await request.json());
  const integrity = evaluateAcademicIntegrityPrompt(body.briefText);
  if (integrity.blocked) return Response.json({ ok: false, error: "ACADEMIC_INTEGRITY_RESTRICTION", guidance: integrity.guidance }, { status: 422 });
  const coursework = await createCoursework(user.id, { ...body, deadlineAt: body.deadlineAt ? new Date(body.deadlineAt) : undefined });
  return ok({ coursework }, { status: 201 });
}
