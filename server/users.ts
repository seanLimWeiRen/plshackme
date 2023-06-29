import prisma from "./database";

export async function getAllUsers() {
  return await prisma.user.findMany()
}