"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"
import { prisma } from "@repo/db"

export async function createOnRampTransaction(amount: number, bank: string) {
    const session = await getServerSession(authOptions)
    const res = await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            amount: Number(amount) * 100,
            provider: bank,
            userId: Number(session.user.id),
            token: String(Math.random())
        }
    })
    return res
}