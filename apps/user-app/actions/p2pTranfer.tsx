"use server"

import { prisma } from "@repo/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export async function p2pTransfer(phone: string, txAmount: number) {
    const session = await getServerSession(authOptions)
    const userBalance = await getBalance(Number(session.user.id))

    if(userBalance < txAmount) {
        return {
            message: "Insufficient Balance"
        }
    }
    const creditAccount = await prisma.user.findUnique({
        where: {
            phone: phone
        }
    })
    if(!creditAccount){
        return {
            message: "No matching account found to send"
        }
    }
    try{
        const result = await prisma.$transaction([
            prisma.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user.id)} FOR UPDATE`,
            prisma.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${creditAccount.id} FOR UPDATE`,
            
            prisma.balance.update({
                where: {
                    userId: Number(session.user.id)
                },
                data: {
                    amount: {
                        decrement: txAmount
                    }
                }
            }),
    
            prisma.balance.update({
                where: {
                    userId: creditAccount.id
                },
                data: {
                    amount: {
                        increment: txAmount
                    }
                }
            }),

            prisma.p2PTransactions.create({
                data: {
                    amount: txAmount,
                    senderId: Number(session.user.id),
                    receiverId: creditAccount.id
                }
            })
        ])
        return {
            message: "Success"
        }
    } catch(error){
        return {
            message: "Failure"
        }
    }
}

async function getBalance(id: number) {
    const balance = await prisma.balance.findUnique({
        where: {
            userId: id
        }, 
        select: {
            amount: true
        }
    })
    return balance?.amount || 0
}