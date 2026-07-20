import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { completeOnboardingStep } from "@/lib/onboardingRuntimeEngine";
import { ok } from "@/lib/http";

const schema = z.object({
  stepCode: z.string().min(1),
  payload: z.record(z.union([z.string(), z.boolean(), z.number(), z.null()])),
});

export async function POST(request: Request) {
  await recordApiRequest({
    endpoint: "/api/onboarding/step",
    method: "POST",
    status: "REQUEST_RECEIVED",
  });

  const user = await requireRole(["STUDENT", "MERCHANT"]);
  const body = schema.parse(await request.json());
  return ok(await completeOnboardingStep(user.id, body.stepCode, body.payload), {
    status: 201,
  });
}
