export type UniSphereRole = "STUDENT" | "MERCHANT" | "ADMIN" | "SUPER_ADMIN";

export const roleHome: Record<UniSphereRole, string> = {
  STUDENT: "/student",
  MERCHANT: "/student/merchant",
  ADMIN: "/admin",
  SUPER_ADMIN: "/super-admin",
};

export const allowedRolePaths: Record<UniSphereRole, string[]> = {
  STUDENT: ["/student"],
  MERCHANT: ["/student", "/student/merchant"],
  ADMIN: ["/admin"],
  SUPER_ADMIN: ["/super-admin"],
};

export function canAccessPath(role: UniSphereRole, pathname: string) {
  return allowedRolePaths[role].some((prefix) => pathname.startsWith(prefix));
}
