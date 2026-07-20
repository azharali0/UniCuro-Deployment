import { recordApiRequest } from "@/lib/apiDatabase";
import { NextResponse } from "next/server";
import { assertProductionReadiness } from "@/lib/providerReadiness";

export async function GET() {
  await recordApiRequest({ endpoint: "/api/production-readiness", method: "GET", status: "REQUEST_RECEIVED" });
  const readiness = assertProductionReadiness();
  return NextResponse.json({
    ok: readiness.ready,
    status: readiness.ready ? "READY" : "CONFIGURATION_REQUIRED",
    configured: readiness.configured,
    missing: readiness.missing,
  }, { status: readiness.ready ? 200 : 428 });
}
