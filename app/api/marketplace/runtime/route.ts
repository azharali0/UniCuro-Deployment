import { z } from "zod";
import { requireRole } from "@/lib/session";
import { recordApiRequest } from "@/lib/apiDatabase";
import { prisma } from "@/lib/prisma";
import { ok } from "@/lib/http";
const schema=z.object({title:z.string().min(2),description:z.string().min(2),priceCents:z.number().int().nonnegative(),currencyCode:z.string().length(3)});
export async function GET(){await recordApiRequest({endpoint:"/api/marketplace/runtime",method:"GET",status:"REQUEST_RECEIVED"});await requireRole(["STUDENT","MERCHANT"]);return ok({listings:await prisma.studentMarketplaceListing.findMany({where:{active:true},orderBy:{createdAt:"desc"}})});}
export async function POST(request:Request){await recordApiRequest({endpoint:"/api/marketplace/runtime",method:"POST",status:"REQUEST_RECEIVED"});const u=await requireRole(["MERCHANT"]);return ok({listing:await prisma.studentMarketplaceListing.create({data:{sellerId:u.id,active:true,...schema.parse(await request.json())}})},{status:201});}
