import prisma from "./database";

export async function getUserByID(findID: string) {
  return await prisma.user.findUnique({
    where: {
      id: findID
    }
  })
}

export async function getAllUsers() {
  return await prisma.user.findMany()
}

export async function deleteUserByID(deleteID: string){
  // check if user exists before deleting
  if(getUserByID(deleteID) == null){
    return true
  }

  try{
    await prisma.user.delete({
      where: {
        id: deleteID
      }
    })
    return true
  } catch (e){
    console.log(e)
    return false
  }
}