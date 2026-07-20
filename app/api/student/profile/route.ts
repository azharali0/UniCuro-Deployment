import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { getStudentProfile, updateStudentProfile } from "@/lib/studentRuntimeEngine";
import { ok } from "@/lib/http";
const schema = z.object({ displayName:z.string().optional(), bio:z.string().optional(), university:z.string().optional(), course:z.string().optional(), yearOfStudy:z.string().optional(), countryCode:z.string().optional(), avatarUrl:z.string().url().optional() });
export async function GET(){ await recordApiRequest({endpoint:"/api/student/profile",method:"GET",status:"REQUEST_RECEIVED"}); const u=await requireRole(["STUDENT","MERCHANT"]); return ok({profile:await getStudentProfile(u.id)});}
export async function PATCH(request:Request){ await recordApiRequest({endpoint:"/api/student/profile",method:"PATCH",status:"REQUEST_RECEIVED"}); const u=await requireRole(["STUDENT","MERCHANT"]); return ok({profile:await updateStudentProfile(u.id,schema.parse(await request.json()))});}
