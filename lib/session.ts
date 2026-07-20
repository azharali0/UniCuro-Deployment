import { cookies } from "next/headers";
import { UniSphereRole } from "./access-control";

export async function getUniSphereSession() {
  const store = await cookies();
  const role = store.get("unisphere_role")?.value as UniSphereRole | undefined;
  if (!role) return null;

  return {
    id: store.get("unisphere_user_id")?.value || "session-user",
    email: store.get("unisphere_email")?.value || "user@unisphere.local",
    role,
    mfaVerified: store.get("unisphere_mfa")?.value === "true",
  };
}

export async function requireRole(roles: UniSphereRole[]) {
  const session = await getUniSphereSession();
  if (!session || !roles.includes(session.role)) {
    throw new Error("UNAUTHORIZED_ROLE");
  }
  return session;
}
