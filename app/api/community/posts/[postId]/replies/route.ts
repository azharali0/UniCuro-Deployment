import { recordApiRequest } from "@/lib/apiDatabase";
import { z } from "zod";
import { requireRole } from "@/lib/session";
import { createCommunityReply } from "@/lib/communityEngine";
import { ok } from "@/lib/http";

const schema = z.object({ body: z.string().min(2) });

export async function POST(request: Request, { params }: { params: { postId: string } }) {
  await recordApiRequest({ endpoint: "/api/community/posts/:postId/replies", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const { body } = schema.parse(await request.json());
  const reply = await createCommunityReply(user.id, params.postId, body);
  return ok({ reply }, { status: 201 });
}
