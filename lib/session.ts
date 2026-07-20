import { cookies } from "next/headers";
import { UniCuroRole } from "./access-control";

export async function getUniCuroSession() {
  const store = await cookies();
  const role = store.get("unicuro_role")?.value as UniCuroRole | undefined;
  if (!role) return null;

  return {
    id: store.get("unicuro_user_id")?.value || "session-user",
    email: store.get("unicuro_email")?.value || "user@unicuro.com",
    role,
    mfaVerified: store.get("unicuro_mfa")?.value === "true",
  };
}

export async function requireRole(roles: UniCuroRole[]) {
  const session = await getUniCuroSession();
  if (!session || !roles.includes(session.role)) {
    throw new Error("UNAUTHORIZED_ROLE");
  }
  return session;
}
