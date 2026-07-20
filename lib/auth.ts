import { cookies } from "next/headers";
import { UniSphereRole } from "./roles";

export type SessionUser = {
  id: string;
  email: string;
  role: UniSphereRole;
  mfaVerified?: boolean;
  subscriptionTier?: "FREE" | "PREMIUM";
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const role = (cookieStore.get("unisphere_role")?.value || "STUDENT") as UniSphereRole;
  return {
    id: cookieStore.get("unisphere_user_id")?.value || "session-user",
    email: cookieStore.get("unisphere_email")?.value || "session-user@account",
    role,
    mfaVerified: cookieStore.get("unisphere_mfa")?.value === "true",
    subscriptionTier: (cookieStore.get("unisphere_tier")?.value || "FREE") as "FREE" | "PREMIUM",
  };
}

export async function requireRole(roles: UniSphereRole[]) {
  const user = await getSessionUser();
  if (!user || !roles.includes(user.role)) throw new Error("UNAUTHORIZED_ROLE");
  return user;
}

export function hasPremium(user: SessionUser | null) {
  return user?.subscriptionTier === "PREMIUM";
}
