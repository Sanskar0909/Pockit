import express from "express"
import { PrismaClient } from "@repo/db"
const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.post('/hdfcWebhook', async (req, res) => {
    //zod validation
    const paymentInfo = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    }

    try{
        await prisma.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: Number(paymentInfo.userId)
                }, 
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount) 
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: {
                    token: paymentInfo.token
                }, 
                data: {
                    status: "Successful"
                }
            })
        ])
        res.json({ Message: "Captured" })
    } catch (e){
        console.log(e)
    }
})

app.listen(3003)