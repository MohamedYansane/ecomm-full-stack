import { PrismaClient } from "@prisma/client";
declare global {
  var prisma: PrismaClient | undefined;
}
// global est un type de globalThis donc je l'utilise
// et on l'a ajoute a prisma define dans le global
const prismadb = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;
// si je mets pas le if et que la production est instancie avec new PrismaClient();
// on risque d'avoir un bunch de problem
export default prismadb;
