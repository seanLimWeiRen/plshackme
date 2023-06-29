import { stringify } from "querystring";
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

export async function createUserAccount(
  displayName: string,
  username: string,
  email: string,
  passwordHash: string
){
  let user = await prisma.user.findFirst({
    where: {
        username: username
    }
  })

  if(user){
    // duplicate username
    return 1
  }

  user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })

  if(user){
    // duplicate email
    return 2
  }

  try{
    await prisma.user.create({
      data:{
        name: displayName,
        username: username,
        email: email,
        passwordHash: passwordHash
      }
    })
    // successful
    return 0
  } catch(e){
    console.log(e)
    return 3
  }
}