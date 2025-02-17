import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
    
    try {
        const user = await prisma.user.upsert({
            where: {
                phone: "999999999"
            }, 
            update: {},
            create: {
                email: "alice@gmail.com",
                name: "Alice",
                password: await bcrypt.hash("alice", 10),
                phone: "999999999",
                OnRampTransaction: {
                    create: {
                        amount: 10000,
                        token: "axce",
                        provider: "HDFC Bank",
                        status: "Successful"
                    }
                },
                Balance: {
                    create: {
                        amount: 7000,
                        locked: 3000
                    }
                }
            }
        })

        console.log({ user })
    } catch (e) {
        console.log(e)
    }
}

main().then( async() => {
    prisma.$disconnect()
}).catch(async (e) => {
    prisma.$disconnect()
    console.log("Error in Main", e)
})