import { recordApiRequest } from "@/lib/apiDatabase";
import { requireRole } from "@/lib/session";
import { likeCommunityPost } from "@/lib/communityEngine";
import { ok } from "@/lib/http";

export async function POST(_: Request, { params }: { params: { postId: string } }) {
  await recordApiRequest({ endpoint: "/api/community/posts/:postId/like", method: "POST", status: "REQUEST_RECEIVED" });
  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const like = await likeCommunityPost(user.id, params.postId);
  return ok({ like });
}
