import { PrismaClient } from "@repo/db"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export const GET = async () => {
    const session = await getServerSession(authOptions)
    if(!session?.user){
        return NextResponse.json({Message: "Unauthorized"})
    }
    try {
        const userBalance = await prisma.balance.findFirst({
            where: {
                userId: Number(session.user.id)
            }
        })
        console.log(JSON.stringify(userBalance))
        return NextResponse.json(userBalance)
    } catch (error) {
        return NextResponse.json({Error: error})
    }
}