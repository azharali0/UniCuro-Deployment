export type UniSphereRole = "STUDENT" | "MERCHANT" | "ADMIN" | "SUPER_ADMIN";

export const roleHome: Record<UniSphereRole, string> = {
  STUDENT: "/student",
  MERCHANT: "/student/merchant",
  ADMIN: "/admin",
  SUPER_ADMIN: "/super-admin",
};

export const allowedRolePaths: Record<UniSphereRole, string[]> = {
  STUDENT: ["/student", "/onboarding", "/support"],
  MERCHANT: ["/student", "/student/merchant", "/onboarding", "/support"],
  ADMIN: ["/admin", "/support"],
  SUPER_ADMIN: ["/super-admin", "/support"],
};

export function canRoleAccessPath(role: UniSphereRole, pathname: string) {
  return allowedRolePaths[role].some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"));
}

export function isProtectedPath(pathname: string) {
  return pathname.startsWith("/student") || pathname.startsWith("/admin") || pathname.startsWith("/super-admin") || pathname.startsWith("/onboarding") || pathname.startsWith("/support");
}

export function loginPathFor(pathname: string) {
  if (pathname.startsWith("/super-admin")) return "/login/super-admin";
  if (pathname.startsWith("/admin")) return "/login/admin";
  return "/login/student";
}

export function requiresMfa(role: UniSphereRole) {
  return role === "ADMIN" || role === "SUPER_ADMIN";
}
