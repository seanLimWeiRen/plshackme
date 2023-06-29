import prisma from './database';

export async function getAllChallenges() {
    return await prisma.challenge.findMany()
}

export async function getChallengeByID(findID: string){
    return await prisma.challenge.findUnique({
        where: {
            id: findID
        }
    })
}

export async function getChallengesByCat(category: string){
    return await prisma.challenge.findMany({
        where: {
            categoryName: category 
        }
    })
}


export async function getChallengesByParams(
    id: string | undefined,
    title: string | undefined,
    hash: string | undefined,
    solves: number | undefined,
    category: string | undefined,
    description: string | undefined,
    flag: string | undefined,
    ctfname: string | undefined
) {
    try {
        return await prisma.challenge.findMany({
            where: {
                id: id ? { equals: id } : undefined,
                title: title ? { equals: title } : undefined,
                hash: hash ? { equals: hash } : undefined,
                solves: solves ? { equals: solves } : undefined,
                categoryName: category ? { equals: category } : undefined,
                description: description ? { equals: description } : undefined,
                flag: flag ? { equals: flag } : undefined,
                ctfname: ctfname ? { equals: ctfname } : undefined
            },
        });
    } catch(e) {
        console.error(e);
    }
}

export async function getCategories(){
    return await prisma.category.findMany()
}
